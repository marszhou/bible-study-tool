import React, { Component } from 'react'
// import update from 'immutability-helper'
import {connect} from 'react-redux'
import { Breadcrumb, Button, Grid, Popup, Label, Icon } from 'semantic-ui-react'
import styles from './BibleViewPage.css'
import BibleSelector from '../components/bible-selector/BibleSelector'
import { getBook } from 'app/consts/bible'
import * as layoutActions from '../actions/layout'

class BibleViewPage extends Component {
  constructor(props: {}) {
    super(props)
    this.state = {
      bibleSelectorIsOpen: {},
    }
  }

  get value() {
    const {match} = this.props
    return {
      bookId: +match.params.bookId || 0,
      chapter: +match.params.chapter || 0,
      verse: +match.params.verse || 0,
    }
  }

  handleBibleSelectorChange = value => {
    const {match, tabUpdate} = this.props
    const tabId = match.params.tabId
    const tabItem = {
      id: tabId,
      ...value
    }
    tabUpdate(tabId, tabItem)
  }

  handleBibleSelectorCloseClick = type => {
    this.setState({
      bibleSelectorIsOpen: {
        [type]: false
      }
    })
  }

  handleBibleSelectorToggle = (type, isOpen) => {
    this.setState({
      bibleSelectorIsOpen: {
        [type]: isOpen
      }
    })
  }

  renderBibleSelector({ type, isOpen, selectorName, value }) {
    return (
      <Breadcrumb.Section link>
        {' '}
        <Popup
          position="bottom left"
          trigger={
            <Label size="large" >
              {selectorName}{' '}
              <Icon name="caret down" size='small' />
            </Label>
          }
          className={styles.bibleSelectorPopup}
          open={isOpen}
          on="click"
          onOpen={this.handleBibleSelectorToggle.bind(this, type, true)}
          onClose={this.handleBibleSelectorToggle.bind(this, type, false)}
          content={
            <BibleSelector
              viewMode={type === 'book' ? 'full' : 'chapter'}
              value={value}
              showClose
              onCloseClick={this.handleBibleSelectorCloseClick.bind(this, type)}
              onChange={this.handleBibleSelectorChange}
              columnClassNames={{
                'bible-selector-height': true
              }}
            />
          }
        />
      </Breadcrumb.Section>
    )
  }

  renderBreadcrumb() {
    const { bibleSelectorIsOpen } = this.state
    const value = this.value

    const bookSelectorName =
      value.bookId > 0 ? getBook(value.bookId).name_cn : '选择书本...'
    const chapterSelectorName =
      value.bookId > 0
        ? value.chapter > 0
          ? `第${value.chapter}章`
          : '选择章...'
        : null
    const bookSelector = this.renderBibleSelector({
      type: 'book',
      isOpen: bibleSelectorIsOpen.book,
      selectorName: bookSelectorName,
      value
    })
    const chapterSelector =
      value.bookId > 0
        ? this.renderBibleSelector({
            type: 'chapter',
            isOpen: bibleSelectorIsOpen.chapter,
            selectorName: chapterSelectorName,
            value
          })
        : null

    return (
      <Breadcrumb size="big">
        {bookSelector}
        {value.bookId > 0 ? <Breadcrumb.Divider icon='right angle'/> : null}
        {chapterSelector}
      </Breadcrumb>
    )
  }

  render() {
    const { match } = this.props

    return (
      <div className={styles.bibleViewWrapper}>
        {this.renderBreadcrumb()}

        <div>
          match.params.tabId:
          {match.params.tabId}
          <br />
          match.params.bookId:
          {match.params.bookId}
          <br />
          match.params.chapter:
          {match.params.chapter}
        </div>
      </div>
    )
  }
}

export default connect(null, layoutActions)(BibleViewPage)
