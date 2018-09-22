import React, { Component } from 'react'
import { Popup } from 'semantic-ui-react'

class DictionaryPopup extends Component {
  componentWillMount() {
    document.documentElement.addEventListener('click', this.handleGlobalClick)

  }

  componentWillUnmount() {
    document.documentElement.removeEventListener('click', this.handleGlobalClick)
  }

  handleGlobalClick = () => {
    console.log('click')
  }

  render() {
    const { contextNode } = this.props
    return contextNode ? (
      <Popup context={contextNode} position="top center" open>
        hello
      </Popup>
    ) : null
  }
}

export default DictionaryPopup
