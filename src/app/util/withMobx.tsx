/*
 * Used to initialize all pages in /pages directory.
 * Will inject the mobx store.
 */

import * as React from 'react'
import { Provider } from 'mobx-react'
import { getUnitStore, UnitStore } from '../stores/UnitStore'

export default function withMobx(UI) {
  return class PageComponent extends React.Component {
    unitStore: UnitStore
    constructor(props) {
      super(props)
      this.unitStore = getUnitStore()
    }

    render() {
      return (
        <Provider UnitStore={this.unitStore}>
          <UI />
        </Provider>
      )
    }
  }
}
