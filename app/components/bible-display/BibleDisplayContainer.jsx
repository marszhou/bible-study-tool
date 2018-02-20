import { React, PropTypes, cx, _ } from 'app/bootstrap' // eslint-disable-line
import {
  Header,
  Container,
  Sticky,
  Segment,
  Divider,
  Icon,
  Grid,
  Rail,
  Image
} from 'semantic-ui-react'
import { PropType_BookItem } from '../bible-selector/BookItem'
import * as db from '../../utils/db'
import ChapterDisplay from 'app/components/bible-display/ChapterDisplay'

const Placeholder = () => <Image src="/assets/images/wireframe/paragraph.png" />

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
      selectedVersions: ['cuvs'],
      selectedVerses: [],
      displayCode: false
    }
  }

  componentWillMount() {
    this.setState({
      verses: this.fetchVerses(this.props)
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      verses: this.fetchVerses(nextProps),
      selectedVerses: []
    })
  }

  fetchVerses(props) {
    const { book, chapterIndex } = props
    const { selectedVersions } = this.state
    const verses = db.fetchVersesForChapterByVersions(
      book.id,
      chapterIndex,
      selectedVersions
    )
    return verses.map(verse => ({
      index: verse[0].verse,
      versions: verse.map(version => version.org_text)
    }))
  }

  toggleSelectedVerse(verseIndex) {
    const { selectedVerses } = this.state
    return selectedVerses.indexOf(verseIndex) > -1
      ? selectedVerses.filter(v => v !== verseIndex)
      : [...selectedVerses, verseIndex]
  }

  handleDisplayCode = e => {
    e.preventDefault()
    this.setState({ displayCode: !this.state.displayCode })
  }

  handleContextRef = contextRef => this.setState({ contextRef })

  handleVerseClick = (e, verseIndex) => {
    this.setState({
      selectedVerses: this.toggleSelectedVerse(verseIndex)
    })
  }

  handleCodeClick = (e, data) => {}

  handleCodeOver = (e, data) => {
    console.log('hover', data)
  }

  renderChapter() {
    const { book, chapterIndex, versions } = this.props
    const {
      verses,
      displayCode,
      selectedVersions,
      selectedVerses,
      contextRef
    } = this.state
    return (
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
        onCodeClick={this.handleCodeClick}
        onCodeHover={this.handleCodeOver}
      />
    )
  }

  renderHeader() {
    const { book, chapterIndex, versions } = this.props
    const {
      verses,
      displayCode,
      selectedVersions,
      selectedVerses,
      contextRef
    } = this.state
    return (
      <Sticky context={contextRef}>
        <div style={{ background: 'white' }}>
          <Header as="h2">
            {book.name} {book.chapterCount > 1 ? `第${chapterIndex}章` : ''}
          </Header>
          <a href="###" onClick={this.handleDisplayCode}>
            <Icon name={`toggle ${displayCode ? 'on' : 'off'}`} />
            {displayCode ? '不显示原文' : '显示原文'}
          </a>
        </div>
      </Sticky>
    )
  }

  render() {
    const { book, chapterIndex, versions } = this.props
    const {
      verses,
      displayCode,
      selectedVersions,
      selectedVerses,
      contextRef
    } = this.state
    return (
      <Grid centered columns={1}>
        <Grid.Column>
          <div ref={contextRef => this.setState({ contextRef })}>
            {this.renderHeader()}
            {this.renderChapter()}
          </div>
        </Grid.Column>
      </Grid>
    )
  }
}

export default BibleDisplayContainer
