import { React, PropTypes, cx } from 'app/bootstrap' // eslint-disable-line
import BookSelector from './BookSelector'
import ChapterSelector from './ChapterSelector'
import VerseSelector from './VerseSelector'
import { filterBooks } from './BookGroup'
import { getSelectorBookGroups, getVerseCoutOf } from '../../consts/bible'

class BibleSelector extends React.Component {
  static propTypes = {
    value: PropTypes.shape({
      bookId: PropTypes.number,
      chapter: PropTypes.number,
      verse: PropTypes.number
    }),
    columnClassNames: PropTypes.object,
    bookListStyle: PropTypes.oneOf(['list', 'grid']),
    onChange: PropTypes.func,
    onBookListStyleToggle: PropTypes.func
  }

  static defaultProps = {
    value: {
      bookId: -1,
      chapter: 0,
      verse: 0
    },
    bookGroups: [],
    columnClassNames: {},
    bookListStyle: 'list',
    onChange: () => {},
    onBookListStyleToggle: () => {}
  }

  constructor(props) {
    super(props)
    this.state = {
      bookFilter: '',
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

  tryTriggerChange() {
    const { bookId, chapter, verse } = this.state
    if (bookId > 0 && chapter > 0 && verse > 0) {
      this.props.onChange({ bookId, chapter, verse })
    }
  }

  handleChange(change) {
    this.setState(change, () => this.tryTriggerChange())
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

  render() {
    const {
      columnClassNames,
      bookListStyle,
      onBookListStyleToggle
    } = this.props
    const { bookId, chapter, verse } = this.state

    const book = this.getBookFromID(
      bookId,
      filterBooks(this.state.bookFilter, this.getAllBooks())
    )

    const showBook = book && book.chapterCount>1;
    const showVerse = book && chapter;

    return (
      <div style={{ display: 'flex' }}>
        <BookSelector
          currentBookId={bookId}
          bookGroups={this.bookGroups}
          classNames={columnClassNames}
          listStyle={bookListStyle}
          onSelect={this.handleBookSelect}
          onListStyleToggle={onBookListStyleToggle}
          onFilterChange={this.handleBookFilterChange}
        />
        {showBook ? (
          <ChapterSelector
            count={book.chapterCount}
            selected={chapter}
            classNames={columnClassNames}
            onSelect={this.handleChapterSelect}
          />
        ) : null}
        {showVerse ? (
          <VerseSelector
            count={getVerseCoutOf(bookId, chapter)}
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
