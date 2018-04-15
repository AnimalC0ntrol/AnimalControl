import { IIoTEvent } from './Event'

export interface IUnitData {
  unitId: string
  batterylevel: number | null
  latlng: {
    latitude: number
    longitude: number
  }
  lastUpdate: Date
  events?: IIoTEvent[]
  signalStrength: number
}
