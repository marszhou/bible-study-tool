import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styles from './styles.css'
import * as bibleActions from '../../actions/bible'
import * as dictionaryActions from '../../actions/dictionary'
import { bibleSelectors } from 'app/reducers'
import VerseDisplay from 'app/components/bible-display/VerseDisplay'
import { Popup } from 'semantic-ui-react'

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

  currentNavVerse = 0 // 当前将会跳转到的节

  state = {}

  componentWillMount() {
    const { bookId, chapter, versions, tabId } = this.props
    this.tryFetch(tabId, bookId, chapter, versions)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.verse !== nextProps.verse) {
      this.currentNavVerse = nextProps.verse
    }
    if (
      nextProps.bookId !== this.props.bookId ||
      nextProps.chapter !== this.props.chapter ||
      nextProps.versions !== this.props.versions
    ) {
      if (
        nextProps.tabId === this.props.tabId &&
        (nextProps.bookId !== this.props.bookId ||
          nextProps.chapter !== this.props.chapter)
      ) {
        this.props.cleanVerseSelection(nextProps.tabId)
      }
      this.tryFetch(
        nextProps.tabId,
        nextProps.bookId,
        nextProps.chapter,
        nextProps.versions
      )
    } else {
      this.tryNavToVerse()
    }
  }

  tryFetch(tabId, bookId, chapter, versions) {
    if (bookId && chapter && versions.length > 0) {
      this.props
        .fetchVersesForChapter(tabId, bookId, chapter, versions)
        .then(() => {
          this.tryNavToVerse()
        })
    }
  }

  tryNavToVerse() {
    if (this.currentNavVerse) {
      const el = document.getElementById('verse-' + this.currentNavVerse)
      el.scrollIntoView()
      el.classList.add('emphasis')
      setTimeout(() => {
        el.classList.remove('emphasis')
      }, 4000)

      this.currentNavVerse = 0
    }
  }

  handleVerseClick = (e, index, verseId, version) => {
    this.props.toggleVerseSelection(this.props.tabId, index)
  }

  handeCodeClick = (e, {lang, type, value}) => {
    // console.log('Click', args)
    this.props.dictionaryQuery(lang, type, value)
  }

  handleCodeHover = (e, {lang, type, value}) => {
    this.setState({
      popupNode: e.target
    })
  }

  handleCodeOut = e => {
    console.log('out')
  }

  render() {
    const { verses, versions, isDisplayCode, selectedVerses } = this.props
    const {popupNode} = this.state
    console.log(popupNode)
    return (
      <div className={styles.bibleView}>
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
            onCodeOut={this.handleCodeOut}
          />
        ))}
        <Popup context={popupNode} content='Hello' position='top center' open={!!popupNode} />
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
  { ...bibleActions, ...dictionaryActions }
)(BibleView)
