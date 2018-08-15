import { React, PropTypes, cx } from 'app/bootstrap' // eslint-disable-line
import BookSelector from './BookSelector'
import ChapterSelector from './ChapterSelector'
import VerseSelector from './VerseSelector'
import Close from '../icons/Close'
import {
  getSelectorBookGroups,
  getVerseCountOf,
  filterBooks
} from '../../consts/bible'
import styles from './BibleSelector.css'

class BibleSelector extends React.Component {
  static propTypes = {
    viewMode: PropTypes.oneOf([
      'full',
      'bookOnly',
      'chapter',
      'chapterOnly',
      'verse'
    ]),
    showClose: PropTypes.bool,
    onCloseClick: PropTypes.func,
    value: PropTypes.shape({
      bookId: PropTypes.number,
      chapter: PropTypes.number,
      verse: PropTypes.number
    }),
    columnClassNames: PropTypes.object,
    onChange: PropTypes.func
  }

  static defaultProps = {
    viewMode: 'full',
    showClose: false,
    onCloseClick: () => {},
    value: {
      bookId: -1,
      chapter: 0,
      verse: 0
    },
    bookGroups: [],
    columnClassNames: {},
    onChange: () => {}
  }

  constructor(props) {
    super(props)
    this.state = {
      bookFilter: '',
      bookListStyle: 'list', // or grid
    }
    this.bookGroups = getSelectorBookGroups()
  }

  handleChange(change) {
    this.props.onChange(change)
  }

  handleBookSelect = book => {
    if (book.id === this.props.value.bookId) return
    const change = {
      bookId: book.id,
      chapter: 0,
      verse: 0
    }
    if (book.chapterCount === 1) {
      change.chapter = 1
    }
    this.handleChange(change)
  }

  handleChapterSelect = chapter => {
    if (chapter === this.props.value.chapter) return
    this.handleChange({
      ...this.props.value,
      ...{ chapter, verse: 0 }
    })
  }

  handleVerseSelect = verse => {
    this.handleChange({
      ...this.props.value,
      verse
    })
  }

  getAllBooks() {
    const { bookGroups } = this
    return (bookGroups || []).reduce(
      (books, group) => [...books, ...group.books],
      []
    )
  }

  getBookFromID(id, books) {
    if (!books) {
      books = this.getAllBooks()
    }
    return books.find(book => book.id === id)
  }

  handleBookFilterChange = bookFilter => {
    this.setState({ bookFilter })
  }

  hanldeListStyleToggle = () => {
    const bookListStyle = this.state.bookListStyle === 'list' ? 'grid' : 'list'
    this.setState({ bookListStyle })
  }

  render() {
    const { value, columnClassNames, viewMode, onCloseClick } = this.props
    const { bookId, chapter, verse } = value
    const { bookListStyle } = this.state

    const book = this.getBookFromID(
      bookId,
      filterBooks(this.state.bookFilter, this.getAllBooks())
    )
    const showBook = viewMode === 'full' || viewMode === 'bookOnly'
    const showChapter =
      (viewMode === 'full' ||
        viewMode === 'chapter' ||
        viewMode === 'chapterOnly') &&
      book &&
      book.chapterCount > 1
    const showVerse =
      (viewMode === 'full' || viewMode === 'chapter' || viewMode === 'verse') &&
      book &&
      chapter

    return (
      <div style={{ display: 'flex' }} className="bible-selector-height">
        <a
          href="###"
          role="button"
          className={styles.close}
          onClick={e => {
            e.preventDefault()
            onCloseClick()
          }}
        >
          <Close />
        </a>
        {showBook ? (
          <BookSelector
            currentBookId={bookId}
            bookGroups={this.bookGroups}
            classNames={columnClassNames}
            listStyle={bookListStyle}
            onSelect={this.handleBookSelect}
            onListStyleToggle={this.hanldeListStyleToggle}
            onFilterChange={this.handleBookFilterChange}
          />
        ) : null}
        {showChapter ? (
          <ChapterSelector
            count={book.chapterCount}
            selected={chapter}
            classNames={columnClassNames}
            onSelect={this.handleChapterSelect}
          />
        ) : null}
        {showVerse ? (
          <VerseSelector
            count={getVerseCountOf(bookId, chapter)}
            selected={verse}
            classNames={columnClassNames}
            onSelect={this.handleVerseSelect}
          />
        ) : null}
      </div>
    )
  }
}

export default BibleSelector
