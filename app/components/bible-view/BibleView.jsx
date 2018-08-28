import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styles from './styles.css'
import * as bibleActions from '../../actions/bible'
import { bibleSelectors } from 'app/reducers'
import VerseDisplay from 'app/components/bible-display/VerseDisplay'

class BibleView extends Component {
  static propTypes = {
    tabId: PropTypes.string,
    bookId: PropTypes.number,
    chapter: PropTypes.number,
    verse: PropTypes.number,
    versions: PropTypes.array
  }

  static defaultProps = {
    tabId: null,
    bookId: 0,
    chapter: 0,
    verse: 0,
    versions: ['cuvs']
  }

  componentWillMount() {
    const { bookId, chapter, versions, tabId } = this.props
    this.tryFetch(tabId, bookId, chapter, versions)
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.bookId !== this.props.bookId ||
      nextProps.chapter !== this.props.chapter ||
      nextProps.versions !== this.props.versions
    ) {
      this.tryFetch(
        nextProps.tabId,
        nextProps.bookId,
        nextProps.chapter,
        nextProps.versions
      )
    }
  }

  tryFetch(tabId, bookId, chapter, versions) {
    if (bookId && chapter && versions.length > 0) {
      this.props.fetchVersesForChapter(tabId, bookId, chapter, versions)
    }
  }

  handleVerseClick = (e, index, verseId, version) => {
    this.props.toggleVerse(this.props.tabId, index)
  }

  handeCodeClick = () => {}

  handleCodeHover = () => {}

  render() {
    const { verses, versions, isDisplayCode, selectedVerses } = this.props
    return (
      <div>
        {verses.map(verse => (
          <VerseDisplay
            key={verse.index}
            verse={verse}
            versions={versions}
            displayCode={isDisplayCode}
            selected={selectedVerses.indexOf(verse.index) > -1}
            onVerseClick={this.handleVerseClick}
            onCodeClick={this.handeCodeClick}
            onCodeHover={this.handleCodeHover}
          />
        ))}
      </div>
    )
  }
}

export default connect(
  (state, ownProps) => {
    const { tabId } = ownProps
    return {
      verses: bibleSelectors.getVersesByTabId(state, tabId),
      versions: bibleSelectors.getVersionsByTabId(state, tabId),
      isDisplayCode: bibleSelectors.getIsDisplayCodeByTabId(state, tabId),
      selectedVerses: bibleSelectors.getSelectedVersesByTabId(state, tabId)
    }
  },
  bibleActions
)(BibleView)
