import { observable, action } from 'mobx'
import { loadDB } from '../util/database'
import { FirebaseFirestore } from '@firebase/firestore-types'
import { IUnitData } from '../models/Unit'
import { IIoTEvent } from '../models/Event'

const uuidv4 = require('uuid/v4')

let store = null

export class UnitStore {
  db: FirebaseFirestore
  @observable units: IUnitData[] = []
  @observable error?: string = undefined

  constructor() {
    this.db = loadDB()
    this.getUnits()
  }

  @action
  getUnits = async () => {
    try {
      this.db
        .collection('units')
        .orderBy('unitId', 'asc')
        .onSnapshot(snap => {
          let newState = []

          snap.forEach(doc => {
            const unitData: IUnitData = {
              batterylevel: doc.data().batterylevel,
              lastUpdate: doc.data().lastUpdate,
              latlng: doc.data().latlng,
              unitId: doc.data().unitId,
              signalStrength: doc.data().signalStrength
            }
            newState.push(unitData)
          })

          this.units = newState
        })
    } catch (error) {
      console.error(error)
      this.error = error
    }
  }

  @action
  getUnitEvents = (unitId: string) => {
    const eventListener = this.db
      .collection('events')
      .where('unitId', '==', unitId)
      .orderBy('timestamp', 'desc')
      .limit(10)
      .onSnapshot(snap => {
        const events: IIoTEvent[] = []
        snap.forEach(doc => {
          const data = doc.data()
          console.log(data)
          const iotEvent: IIoTEvent = {
            centerPir: data.centerPir,
            leftPir: data.leftPir,
            rightPir: data.rightPir,
            timestamp: data.timestamp,
            unitId: data.unitId,
            uuid: data.uuid || uuidv4(),
            uvLevel: data.uvLevel
          }
          events.push(iotEvent)
        })
        const otherUnits = this.units.filter(unit => unit.unitId != unitId)
        const thisUnit = this.units.find(unit => unit.unitId == unitId)
        thisUnit.events = events

        this.units = [...otherUnits, thisUnit]
      })
    return eventListener
  }

  @action
  clearUnitEvents = async (unitId: string) => {
    const otherUnits = this.units.filter(unit => unit.unitId != unitId)
    const unit = this.units.find(unit => unit.unitId == unitId)
    unit.events = undefined
    this.units = [...otherUnits, unit]
  }
}

export function getUnitStore() {
  if (store === null) {
    store = new UnitStore()
  }
  return store
}
