import { React, PropTypes, cx } from 'app/bootstrap' // eslint-disable-line
import VerseDisplay from './VerseDisplay'
// import { PropType_BookItem } from '../bible-selector/BookItem';
import styles from './styles.css'

class ChapterDisplay extends React.Component {
  static propTypes = {
    // book: PropType_BookItem.isRequired,
    // chapterIndex: PropTypes.number.isRequired,
    versions: PropTypes.arrayOf(PropTypes.string).isRequired,
    verses: PropTypes.array,
    selectedVerses: PropTypes.array,
    displayCode: PropTypes.bool,
    onVerseClick: PropTypes.func,
    onCodeClick: PropTypes.func,
    onCodeHover: PropTypes.func
  }

  static defaultProps = {
    verses: [],
    selectedVerses: [],
    displayCode: false,
    onVerseClick: (e, verseIndex) => {},
    onCodeClick: (e, data) => {},
    onCodeHover: (e, data) => {}
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {
      displayCode,
      selectedVerses,
      verses,
      versions,
      onVerseClick
    } = this.props
    return (
      <div className={styles.chapter}>
        {verses.map(verse => (
          <VerseDisplay
            key={verse.index}
            verse={verse}
            versions={versions}
            displayCode={displayCode}
            selected={selectedVerses.indexOf(verse.index) > -1}
            onVerseClick={onVerseClick}
          />
        ))}
      </div>
    )
  }
}
export default ChapterDisplay
