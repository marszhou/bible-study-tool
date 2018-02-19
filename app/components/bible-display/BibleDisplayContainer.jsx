import { React, PropTypes, cx } from 'app/bootstrap' // eslint-disable-line
import { PropType_BookItem } from '../bible-selector/BookItem'
import * as db from '../../utils/db'
import ChapterDisplay from 'app/components/bible-display/ChapterDisplay'

class BibleDisplayContainer extends React.PureComponent {
  static propTypes = {
    book: PropType_BookItem.isRequired,
    chapterIndex: PropTypes.number.isRequired,
    versions: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      verses: [],
      selectedVersions: ['cuvs', 'lzz'],
      selectedVerses: [],
      displayCode: false
    }
  }

  componentWillMount() {
    this.fetchVerses(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.fetchVerses(nextProps)
  }

  fetchVerses(props) {
    const { book, chapterIndex } = props
    const { selectedVersions } = this.state
    const verses = db.fetchVersesForChapterByVersions(
      book.id,
      chapterIndex,
      selectedVersions
    )
    this.setState({
      verses: verses.map(verse => ({
        index: verse[0].verse,
        versions: verse.map(version => version.org_text)
      }))
    })
  }

  handleDisplayCode = () => this.setState({displayCode: !this.state.displayCode})

  handleVerseClick = (e, verseIndex) => {
    console.log(verseIndex, e)
  }

  handleCodeClick = (e, data) => {

  }

  handleCodeOver = (e, data) => {

  }

  render() {
    const { book, chapterIndex, versions } = this.props
    const { verses, displayCode, selectedVersions, selectedVerses } = this.state

    return (
      <div>
        <button onClick={this.handleDisplayCode}>
          display code = {displayCode ? 'on' : 'off'}
        </button>
        <ChapterDisplay
          book={book}
          chapterIndex={chapterIndex}
          displayCode={displayCode}
          verses={verses}
          selectedVerses={selectedVerses}
          versions={selectedVersions.map(
            versionId => versions.find(v => v.id === versionId).name
          )}
          onVerseClick={this.handleVerseClick}
          onCodeHover={this.handleCodeOver}
          onCodeClick={this.handleCodeClick}
        />
      </div>
    )
  }
}

export default BibleDisplayContainer
