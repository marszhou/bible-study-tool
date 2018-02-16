import { React, PropTypes, cx } from 'app/bootstrap'; // eslint-disable-line
import VerseDisplay from './VerseDisplay';
import { PropType_BookItem } from '../bible-selector/BookItem';

class ChapterDisplay extends React.Component {
  static propTypes = {
    book: PropType_BookItem.isRequired,
    chapterIndex: PropTypes.number.isRequired,
    verses: PropTypes.array,
    selectedVerseIndexes: PropTypes.array,
    displayCode: PropTypes.bool,
  };

  static defaultProps = {
    verses: [],
    selectedVerseIndexes: [],
    displayCode: false,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { displayCode, selectedVerseIndexes, verses } = this.props;

    return (
      <div>
        {verses.map((verse, index) => (
          <VerseDisplay
            key={index}
            verse={verse}
            displayCode={displayCode}
            selected={selectedVerseIndexes.indexOf(index) > -1}
          />
        ))}
      </div>
    );
  }
}
export default ChapterDisplay;
