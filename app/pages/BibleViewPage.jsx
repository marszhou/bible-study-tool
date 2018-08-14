import React, { Component } from 'react'

class BibleViewPage extends Component {
  render() {
    const { match } = this.props
    return (
      <div>
        match.params.tabId:
        {match.params.tabId}
        <br />
        match.params.bookId
        {match.params.bookId}
        <br />
        match.params.chapterIndex
        {match.params.chapterIndex}
      </div>
    )
  }
}

export default BibleViewPage
