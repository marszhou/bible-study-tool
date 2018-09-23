import React, { Component } from 'react'
import { Popup, Ref, Loader, Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'
import * as dictionaryActions from '../../actions/dictionary'
import { dictionarySelectors } from 'app/reducers'
import { isDescendant } from 'app/utils/dom'
import DictionaryDef from 'app/components/dictionary/DictionaryDef'

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
    const { contextNode, def } = this.props
    return contextNode ? (
      <Ref innerRef={ref => (this.popup = ref)}>
        {!def ? (
          <Popup key="loading" context={contextNode} open wide>
            <Loader active inline size="mini" />
          </Popup>
        ) : (
          <Popup key="def" context={contextNode} open wide>
            <Popup.Header>
              <Grid columns={2} >
                <Grid.Row>
                  <Grid.Column>{def.str_no}</Grid.Column>
                  <Grid.Column>{def.bible_word}</Grid.Column>
                </Grid.Row>
              </Grid>
            </Popup.Header>
            <Popup.Content>
              <DictionaryDef def={def} />
            </Popup.Content>
          </Popup>
        )}
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
