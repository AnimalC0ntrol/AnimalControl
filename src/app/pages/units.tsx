import * as React from 'react'
import App from '../components/App'
import { inject, observer } from 'mobx-react'
import withMobx from '../util/withMobx'
import { UnitStore } from '../stores/UnitStore'
import { IoTUnit } from '../components/IoTUnit'

interface IProps {
  UnitStore: UnitStore
}

@inject('UnitStore')
@observer
class Units extends React.Component<IProps> {
  render() {
    const { units } = this.props.UnitStore
    return (
      <App>{units.map(unit => <IoTUnit key={unit.unitId} unit={unit} />)}</App>
    )
  }
}

export default withMobx(Units)
