import React, { Component } from 'react'
import { Popup, Ref, Loader } from 'semantic-ui-react'
import { connect } from 'react-redux'
import * as dictionaryActions from '../../actions/dictionary'
import { dictionarySelectors } from 'app/reducers'
import { isDescendant } from 'app/utils/dom'

class DictionaryPopup extends Component {
  componentWillMount() {
    document.documentElement.addEventListener('click', this.handleGlobalClick)
  }

  componentWillUnmount() {
    document.documentElement.removeEventListener(
      'click',
      this.handleGlobalClick
    )
  }

  handleGlobalClick = e => {
    if (!isDescendant(this.popup, e.target)) {
      const { dictionaryPopdown } = this.props
      dictionaryPopdown()
    }
  }

  render() {
    const { contextNode } = this.props
    return contextNode ? (
      <Ref innerRef={ref => (this.popup = ref)}>
        <Popup context={contextNode} position="top center" open wide>
          <Loader active inline size='mini' />
        </Popup>
      </Ref>
    ) : null
  }
}

DictionaryPopup = connect(
  state => ({
    contextNode: dictionarySelectors.getPopupNode(state),
    def: dictionarySelectors.getPopupDef(state)
  }),
  { ...dictionaryActions }
)(DictionaryPopup)

export default DictionaryPopup
