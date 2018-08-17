import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styles from './styles.css'
import * as bibleActions from '../../actions/bible'

class BibleView extends Component {
  static propTypes = {
    bookId: PropTypes.number,
    chapter: PropTypes.number,
    verse: PropTypes.number,
    versions: PropTypes.array
  }

  static defaultProps = {
    bookId: 0,
    chapter: 0,
    verse: 0,
    versions: ['cuvs']
  }

  componentWillMount() {
    const { bookId, chapter, versions } = this.props
    this.tryFetch(bookId, chapter, versions)
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.bookId !== this.props.bookId ||
      nextProps.chapter !== this.props.chapter ||
      nextProps.versions !== this.props.versions
    ) {
      this.tryFetch(nextProps.bookId, nextProps.chapter, nextProps.versions)
    }
  }

  tryFetch(bookId, chapter, versions) {
    if (bookId && chapter && versions.length > 0) {
      console.log('query', { bookId, chapter, versions })
      this.props.fetchVersesForChapter(
        this.props.tabId,
        bookId,
        chapter,
        versions
      )
    }
  }

  render() {
    return <div>content</div>
  }
}

export default connect(
  null,
  bibleActions
)(BibleView)
