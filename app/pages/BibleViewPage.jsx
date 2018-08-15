import React, { Component } from 'react'
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
              trigger={<Label content="111" />}
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
              on="click"
            />
          </Breadcrumb.Section>
          <Breadcrumb.Divider />
          <Breadcrumb.Section link>Store</Breadcrumb.Section>
          <Breadcrumb.Divider />
          <Breadcrumb.Section active>T-Shirt</Breadcrumb.Section>
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
