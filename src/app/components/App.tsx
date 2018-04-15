import * as React from 'react'
import Header from './Header'

class App extends React.Component {
  render() {
    return (
      <div id="main">
        <Header />
        {this.props.children}
        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css?family=Roboto');

          body,
          html {
            margin: 0;
            background: #f8f8f8;
            font-family: 'Roboto', sans-serif;
          }
          *,
          *:before,
          *:after {
            box-sizing: border-box;
          }

          #main {
            max-width: 1200px;
            margin: 0 auto;
            padding-left: 30px;
            padding-right: 30px;
          }
        `}</style>
      </div>
    )
  }
}

export default App
