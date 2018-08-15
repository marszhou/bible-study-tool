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
      ...this.getStateFromProps(props)
    }
    this.bookGroups = getSelectorBookGroups()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState(this.getStateFromProps(nextProps))
    }
  }

  getStateFromProps(props) {
    return { ...props.value }
  }

  triggerChange() {
    const { bookId, chapter, verse } = this.state
    this.props.onChange({ bookId, chapterIndex: chapter, verseIndex: verse })
  }

  handleChange(change) {
    this.setState(change, () => this.triggerChange())
  }

  handleBookSelect = book => {
    if (book.id === this.props.value.bookId) return
    const newState = {
      bookId: book.id,
      chapter: 0,
      verse: 0
    }
    if (book.chapterCount === 1) {
      newState.chapter = 1
    }
    this.handleChange(newState)
  }

  handleChapterSelect = chapter => {
    if (chapter === this.props.value.chapter) return
    this.handleChange({ chapter, verse: 0 })
  }

  handleVerseSelect = verse => {
    this.handleChange({ verse })
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
    const { columnClassNames, viewMode, onCloseClick } = this.props
    const { bookId, chapter, verse, bookListStyle } = this.state

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
