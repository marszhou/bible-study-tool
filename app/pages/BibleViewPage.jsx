import React, { Component } from 'react'
// import update from 'immutability-helper'
import { Breadcrumb, Button, Grid, Popup, Label, Icon } from 'semantic-ui-react'
import styles from './BibleViewPage.css'
import BibleSelector from '../components/bible-selector/BibleSelector'

class BibleViewPage extends Component {
  constructor(props: {}) {
    super(props)
    this.state = {
      bibleSelectorIsOpen: {},
      bookId: 0,
      value: {
        bookId: -1,
        chapter: 0,
        verse: 0
      }
    }
  }

  handleBibleSelectorChange = value => {
    console.log('select', value)
    this.setState({ value })
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

  render() {
    const { match } = this.props
    const { value, bibleSelectorIsOpen } = this.state

    return (
      <div className={styles.bibleViewWrapper}>
        <Breadcrumb>
          <Breadcrumb.Section link>
            <Popup
              position='bottom left'
              trigger={<Label content="Book" />}
              className={styles.bibleSelectorPopup}
              open={bibleSelectorIsOpen.book}
              on="click"
              onOpen={this.handleBibleSelectorToggle.bind(this, 'book', true)}
              onClose={this.handleBibleSelectorToggle.bind(this, 'book', false)}
              content={
                <BibleSelector
                  value={value}
                  showClose
                  onCloseClick={this.handleBibleSelectorCloseClick.bind(
                    this,
                    'book'
                  )}
                  onChange={this.handleBibleSelectorChange}
                  columnClassNames={{
                    'bible-selector-height': true
                  }}
                />
              }
            />
          </Breadcrumb.Section>
          <Breadcrumb.Divider />
          <Breadcrumb.Section link>
            <Popup
              position='bottom left'
              trigger={<Label content="chapter" />}
              className={styles.bibleSelectorPopup}
              open={bibleSelectorIsOpen.chapter}
              on="click"
              onOpen={this.handleBibleSelectorToggle.bind(
                this,
                'chapter',
                true
              )}
              onClose={this.handleBibleSelectorToggle.bind(
                this,
                'chapter',
                false
              )}
              content={
                <BibleSelector
                  value={value}
                  showClose
                  onCloseClick={this.handleBibleSelectorCloseClick.bind(
                    this,
                    'chapter'
                  )}
                  onChange={this.handleBibleSelectorChange}
                  columnClassNames={{
                    'bible-selector-height': true
                  }}
                />
              }
            />
          </Breadcrumb.Section>
          <Breadcrumb.Divider />
          <Breadcrumb.Section active>
            <Popup
              position='bottom left'
              trigger={<Label content="verse" />}
              className={styles.bibleSelectorPopup}
              open={bibleSelectorIsOpen.verse}
              on="click"
              onOpen={this.handleBibleSelectorToggle.bind(
                this,
                'verse',
                true
              )}
              onClose={this.handleBibleSelectorToggle.bind(
                this,
                'verse',
                false
              )}
              content={
                <BibleSelector
                  value={value}
                  showClose
                  onCloseClick={this.handleBibleSelectorCloseClick.bind(
                    this,
                    'verse'
                  )}
                  onChange={this.handleBibleSelectorChange}
                  columnClassNames={{
                    'bible-selector-height': true
                  }}
                />
              }
            />
          </Breadcrumb.Section>
        </Breadcrumb>

        <div>
          match.params.tabId:
          {match.params.tabId}
          <br />
          match.params.bookId:
          {match.params.bookId}
          <br />
          match.params.chapterIndex:
          {match.params.chapterIndex}
        </div>
      </div>
    )
  }
}

export default BibleViewPage
