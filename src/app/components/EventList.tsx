import * as React from 'react'
import { IIoTEvent } from '../models/Event'

interface IProps {
  events: IIoTEvent[]
}

export class EventList extends React.Component<IProps> {
  render() {
    const { events } = this.props
    console.log(events)
    return (
      <div id="eventlist">
        {events.map(event => (
          <div key={event.uuid} className="event">
            <div className="timestamp">{event.timestamp.toLocaleString()}</div>
            <div>
              PIR State: [ {event.leftPir || 0} | {event.centerPir} |{' '}
              {event.rightPir || 0} ]
            </div>
            <div>UV level: {event.uvLevel || 'None'}</div>
          </div>
        ))}
        <style jsx>{`
          .event {
            border: 1px solid #bbb;
            margin-bottom: 10px;
            padding: 5px 10px;
          }

          .timestamp {
            margin-left: -10px;
            margin-top: -5px;
            margin-right: -10px;
            background: orange;
            padding: 5px 10px;
            margin-bottom: 5px;
          }
        `}</style>
      </div>
    )
  }
}
