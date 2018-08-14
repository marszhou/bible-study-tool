import React, { Component } from 'react'
import { Breadcrumb, Button, Grid, Popup, Label, Icon } from 'semantic-ui-react'
import styles from './BibleViewPage.css'

class BibleViewPage extends Component {
  render() {
    const { match } = this.props
    return (
      <div className={styles.bibleViewWrapper}>
        <Breadcrumb>
          <Breadcrumb.Section link>
            <Popup
              trigger={<Label content="111" />}
              className={styles.bibleSelectorPopup}
              content={
                <div style={{ background: 'red', width: 500, height: 500 }} />
              }
              on="click"
              verticalOffset={-10}
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
