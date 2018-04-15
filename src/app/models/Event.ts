export interface IIoTEvent {
  uuid: string
  centerPir: number
  leftPir: number
  rightPir: number
  timestamp: Date
  unitId: string
  uvLevel: number | null
}
