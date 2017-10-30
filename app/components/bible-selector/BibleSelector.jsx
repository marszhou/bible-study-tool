import { React, PropTypes, cx } from 'app/bootstrap'; // eslint-disable-line
import BookSelector from './BookSelector';
import ChapterSelector from './ChapterSelector';
import VerseSelector from './VerseSelector';
import { PropType_BookGroup, filterBooks } from './BookGroup';

class BibleSelector extends React.Component {
  static propTypes = {
    bookId: PropTypes.number,
    chapter: PropTypes.number,
    verse: PropTypes.number,
    bookGroups: PropTypes.arrayOf(PropType_BookGroup),
    columnClassNames: PropTypes.object,
    bookListStyle: PropTypes.oneOf(['list', 'grid']),
    onChange: PropTypes.func,
    onBookListStyleToggle: PropTypes.func,
  };

  static defaultProps = {
    bookId: -1,
    chapter: 0,
    verse: 0,
    bookGroups: [],
    columnClassNames: {},
    bookListStyle: 'list',
    onChange: () => {},
    onBookListStyleToggle: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      bookFilter: '',
    };
  }

  handleBookSelect = book => {
    this.props.onChange({ bookId: book.id });
  };

  handleChapterSelect = chapter => {
    this.props.onChange({ chapter });
  };

  handleVerseSelect = verse => {
    this.props.onChange({ verse });
  };

  getAllBooks() {
    const { bookGroups } = this.props;
    return (bookGroups || []).reduce(
      (books, group) => [...books, ...group.books],
      [],
    );
  }

  getBookFromID(id, books) {
    if (!books) {
      books = this.getAllBooks();
    }
    return books.find(book => book.id === id);
  }

  handleBookFilterChange = bookFilter => {
    this.setState({ bookFilter });
  };

  render() {
    const {
      bookId,
      chapter,
      verse,
      bookGroups,
      columnClassNames,
      bookListStyle,
      onBookListStyleToggle,
    } = this.props;
    const book = this.getBookFromID(
      bookId,
      filterBooks(this.state.bookFilter, this.getAllBooks()),
    );

    return (
      <div style={{ display: 'flex' }}>
        <BookSelector
          currentBookId={bookId}
          bookGroups={bookGroups}
          classNames={columnClassNames}
          listStyle={bookListStyle}
          onSelect={this.handleBookSelect}
          onListStyleToggle={onBookListStyleToggle}
          onFilterChange={this.handleBookFilterChange}
        />
        {book ? (
          <ChapterSelector
            count={book.chapterCount}
            selected={chapter}
            classNames={columnClassNames}
            onSelect={this.handleChapterSelect}
          />
        ) : null}
        {book ? (
          <VerseSelector
            count={50}
            selected={verse}
            classNames={columnClassNames}
            onSelect={this.handleVerseSelect}
          />
        ) : null}
      </div>
    );
  }
}

export default BibleSelector;
