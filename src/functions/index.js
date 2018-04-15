const functions = require('firebase-functions')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const admin = require('firebase-admin')
admin.initializeApp()
const db = admin.firestore()
const uuidv4 = require('uuid/v4')

app.use(bodyParser.json())

app.post('/event', (req, res) => {
  const event = req.body

  if (!validFields(req.body)) {
    return res
      .status(400)
      .json({ success: false, error: 'Missing fields in body.' })
  }

  const uniqueId = uuidv4()
  const timestamp = new Date(event.motion_timestamp)

  const unitData = {
    unitId: event.dev_eui,
    batterylevel: null,
    latlng: {
      latitude: event.lat,
      longitude: event.lng
    },
    lastUpdate: timestamp,
    signalStrength: event.tcxn.cellular.rssi
  }

  const eventData = {
    uuid: uuidv4(),
    unitId: event.dev_eui,
    timestamp: timestamp,
    leftPir: null,
    centerPir: event.motion,
    rightPir: null,
    uvLevel: null
  }

  db
    .collection('units')
    .doc(event.dev_eui)
    .set(unitData)
    .catch(error => {
      console.error(error)
      return res.status(503).json({ success: false, error })
    })

  db
    .collection('events')
    .doc(uniqueId)
    .set(eventData)
    .catch(error => {
      console.error(error)
      return res.status(503).json({ success: false, error })
    })

  return res.status(201).json({ succes: true })
})

function validFields(body) {
  const validPresentValues = [
    'lat',
    'lng',
    'motion',
    'motion_timestamp',
    'dev_eui'
  ]

  for (let value of validPresentValues) {
    if (!(value in body)) return false
  }

  return true
}

exports.api = functions.https.onRequest(app)
