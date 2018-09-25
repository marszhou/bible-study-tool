import React, { Component } from 'react'
import {
  Button,
  Dimmer,
  Header,
  Icon,
  Dropdown,
  Modal,
  Image,
  Search
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import * as spotLightActions from '../../actions/spotLight'
import { tabUpdate } from '../../actions/layout'
import {
  spotLightSelectors,
  bookSelectors,
  layoutSelectors
} from 'app/reducers'
import { verseCountByBook } from 'app/consts/bible'
import {
  parseSpotLightDirective,
  makeSearchResults
} from 'app/components/spotlight/utils'

class SpotLight extends Component {
  state = {
    open: true
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open && nextProps.open !== this.props.open) {
      this.resetComponent()
    }
  }

  resetComponent = () => this.setState({ results: [], value: '' })

  handleResultSelect = (e, { result }) => {
    const { tabUpdate, activatedTabId, spotLightHide } = this.props
    const tabItem = {
      id: activatedTabId,
      bookId: result.id,
      chapter: result.chapter,
      verse: result.verse
    }
    tabUpdate(activatedTabId, tabItem)
    spotLightHide()
  }

  handleSearchChange = (e, { value }) => {
    const { allBooks, verseCountByBook } = this.props
    const parsed = parseSpotLightDirective(value)
    let results = null
    if (parsed) {
      results = makeSearchResults(
        allBooks,
        parsed.bookFilter,
        parsed.chapter,
        parsed.verse,
        verseCountByBook
      )
    }
    this.setState({ value, results })
  }

  handleClose = () => this.props.spotLightHide()

  render() {
    const { isLoading, value, results } = this.state
    const { open } = this.props
    return (
      <Modal
        open={open}
        closeOnEscape
        onClose={this.handleClose}
        closeOnDimmerClick
        size="tiny"
      >
        <Modal.Header>快速跳转</Modal.Header>
        <Modal.Content>
          <Search
            autoFocus
            selectFirstResult
            noResultsMessage="没有符合的记录"
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, {
              leading: true
            })}
            results={results}
            value={value}
          />
        </Modal.Content>
      </Modal>
    )
  }
}

export default connect(
  state => ({
    activatedTabId: layoutSelectors.getActivated(state),
    open: spotLightSelectors.getSpotLightShow(state),
    allBooks: bookSelectors.getAllBooks(state),
    verseCountByBook
  }),
  { ...spotLightActions, tabUpdate }
)(SpotLight)
