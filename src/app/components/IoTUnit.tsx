import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { IUnitData } from '../models/Unit'
import { UnitStore } from '../stores/UnitStore'
import { EventList } from './EventList'

interface IProps {
  unit: IUnitData
  UnitStore?: UnitStore
}

@inject('UnitStore')
@observer
class IoTUnit extends React.Component<IProps> {
  eventListener?: () => void

  private fetchData = () => {
    this.eventListener = this.props.UnitStore.getUnitEvents(
      this.props.unit.unitId
    )
  }

  private stopListeningForEvents = () => {
    this.props.UnitStore.clearUnitEvents(this.props.unit.unitId)
    if (this.eventListener) this.eventListener()
  }

  render() {
    const { units } = this.props.UnitStore
    const { lastUpdate, latlng, unitId } = this.props.unit

    return (
      <div id="unit">
        <div className="unit-id">
          Id: {unitId} | {lastUpdate.toLocaleString()}
        </div>
        <div>
          Position: {latlng.latitude}, {latlng.longitude}
        </div>
        {this.props.unit.events ? (
          <button onClick={this.stopListeningForEvents}>Hide events</button>
        ) : null}
        {this.props.unit.events ? null : (
          <button onClick={this.fetchData}>Show events</button>
        )}

        {this.props.unit.events ? (
          <EventList events={this.props.unit.events} />
        ) : null}
        <style jsx>{`
          #unit {
            display: inline-block;
            background: #fff;
            border-radius: 3px;
            padding: 10px 20px;
          }
        `}</style>
      </div>
    )
  }
}

export { IoTUnit }
