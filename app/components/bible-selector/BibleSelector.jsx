import { React, PropTypes, cx } from 'app/bootstrap'; // eslint-disable-line
import BookSelector from './BookSelector';
import ChapterSelector from './ChapterSelector';
import VerseSelector from './VerseSelector';
import { PropType_BookGroup } from './BookGroup';

class BibleSelector extends React.Component {
  static propTypes = {
    bookId: PropTypes.number,
    chapter: PropTypes.number,
    verse: PropTypes.number,
    bookGroups: PropTypes.arrayOf(PropType_BookGroup),
    onChange: PropTypes.func,
  };

  static defaultProps = {
    bookId: -1,
    chapter: 0,
    verse: 0,
    bookGroups: [],
    onChange: () => {},
  };

  handleBookSelect = book => {
    this.props.onChange({ book });
  };

  handleChapterSelect = chapter => {
    this.props.onChange({ chapter });
  };

  handleVerseSelect = verse => {
    this.props.onChange({ verse });
  };

  getBookFromID(id) {
    const { bookGroups } = this.props;
    if (bookGroups) {
      return bookGroups
        .reduce((books, group) => [...books, ...group.books], [])
        .find(book => book.id === id);
    }
    return null;
  }

  render() {
    const { bookId, chapter, verse, bookGroups } = this.props;
    const book = this.getBookFromID(bookId);

    return (
      <div>
        <BookSelector
          currentBookId={bookId}
          bookGroups={bookGroups}
          onSelect={this.handleBookSelect}
        />
        {book ? (
          <ChapterSelector
            count={book.chapters}
            selected={chapter}
            onSelect={this.handleChapterSelect}
          />
        ) : null}
        {book ? (
          <VerseSelector
            count={50}
            selected={verse}
            onSelect={this.handleVerseSelect}
          />
        ) : null}
      </div>
    );
  }
}

export default BibleSelector;
