import { React, PropTypes, cx, _ } from 'app/bootstrap' // eslint-disable-line
import {
  Header,
  // Container,
  // Sticky,
  Segment,
  // Divider,
  Icon,
  // Grid,
  // Rail,
  // Image,
  Dropdown,
  Label,
  Button
} from 'semantic-ui-react'
import { PropType_BookItem } from '../bible-selector/BookItem'
import * as db from '../../utils/db'
import ChapterDisplay from 'app/components/bible-display/ChapterDisplay'
import styles from './styles.css'

class BibleDisplayContainer extends React.PureComponent {
  static propTypes = {
    book: PropType_BookItem.isRequired,
    chapterIndex: PropTypes.number.isRequired,
    versions: PropTypes.array.isRequired,
    onStep: PropTypes.func
  }

  static defaultProps = {
    onStep: direction => {}
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

  fetchVerses(props, state) {
    const { book, chapterIndex } = props || this.props
    const { selectedVersions } = state || this.state
    const verses = db.fetchVersesForChapterByVersions(
      book.id,
      chapterIndex,
      selectedVersions
    )
    return verses.map(verse => ({
      index: verse[0].verse,
      versions: verse.map(version => version.org_text || version.scripture)
    }))
  }

  toggleSelectedVerse(verseIndex) {
    const { selectedVerses } = this.state
    return selectedVerses.indexOf(verseIndex) > -1
      ? selectedVerses.filter(v => v !== verseIndex)
      : [...selectedVerses, verseIndex]
  }

  toggleSelectedVersion(version) {
    const { selectedVersions } = this.state
    return selectedVersions.indexOf(version.id) > -1
      ? selectedVersions.filter(vid => vid !== version.id)
      : [...selectedVersions, version.id]
  }

  getSelectVersion(index) {
    return this.props.versions.find(
      v => v.id === this.state.selectedVersions[index]
    )
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

  handleStep = (e, direction) => {
    e.preventDefault()
    this.props.onStep(direction)
  }

  handleVersionChoose = (e, version) => {
    e.preventDefault()
    e.stopPropagation()
    const selectedVersions = this.toggleSelectedVersion(version)
    if (selectedVersions.length === 0) {
      return
    }
    this.setState(
      {
        selectedVersions: this.toggleSelectedVersion(version)
      },
      () =>
        this.setState({
          verses: this.fetchVerses(this.props)
        })
    )
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
          versionId => versions.find(v => v.id === versionId).abbr
        )}
        onVerseClick={this.handleVerseClick}
        onCodeClick={this.handleCodeClick}
        onCodeHover={this.handleCodeOver}
      />
    )
  }

  renderVersionDropdown(versions, selectedVersions) {
    let description = ''
    if (selectedVersions.length === 1) {
      description = versions.find(version => version.id === selectedVersions[0])
        .name
    } else if (selectedVersions.length > 1) {
      description = `${selectedVersions.length}个版本`
    }
    return (
      <Dropdown
        icon={null}
        closeOnChange={false}
        floating
        disabled={this.state.displayCode}
        trigger={
          <Button
            basic
            color="black"
            content="选择版本"
            size="small"
            icon="book"
            label={{
              as: 'a',
              basic: true,
              color: 'black',
              pointing: 'left',
              content: description
            }}
          />
        }
      >
        <Dropdown.Menu>
          <Dropdown.Header>
            <Icon name="info circle" />
            红色 <Label circular color="red" empty size="mini" />{' '}
            代表该版本有原文编号
          </Dropdown.Header>
          <Dropdown.Menu scrolling>
            {versions.map(version => (
              <Dropdown.Item
                key={version.id}
                className="small"
                selected={selectedVersions.indexOf(version.id) > -1}
                onClick={e => this.handleVersionChoose(e, version)}
              >
                {selectedVersions.indexOf(version.id) > -1 ? (
                  <Icon name="checkmark" className="right floated" />
                ) : null}
                <div className={styles.versionItem}>
                  <Label
                    circular
                    color={version.hasCode ? 'red' : 'black'}
                    empty
                    size="mini"
                  />{' '}
                  <span>{version.name}</span>
                </div>
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown.Menu>
      </Dropdown>
    )
  }

  renderHeader() {
    const { book, chapterIndex, versions } = this.props
    const {
      displayCode,
      selectedVersions,
    } = this.state

    const showCodeDisabled =
      selectedVersions.length > 1 || !this.getSelectVersion(0).hasCode
    return (
      <div style={{ background: 'white' }}>
        <div className={styles.titleContainer}>
          <div className={styles.titleItem} style={{ flexGrow: 0 }}>
            <a href="###" onClick={e => this.handleStep(e, -1)}>
              <Icon name="chevron left" />
            </a>
          </div>
          <div className={styles.titleItem}>
            <Header as="h2">
              {book.name} {book.chapterCount > 1 ? `第${chapterIndex}章` : ''}
            </Header>
          </div>
          <div className={styles.titleItem} style={{ flexGrow: 0 }}>
            <a href="###" onClick={e => this.handleStep(e, 1)}>
              <Icon name="chevron right" />
            </a>
          </div>
        </div>
        <Segment>
          <a
            href="###"
            onClick={this.handleDisplayCode}
            disabled={showCodeDisabled}
          >
            <Icon name={`toggle ${displayCode ? 'on' : 'off'}`} />
            {displayCode ? '不显示原文' : '显示原文'}
          </a>{' '}
          {this.renderVersionDropdown(versions, selectedVersions)}
        </Segment>
      </div>
    )
  }

  render() {
    return (
      <div
        ref={contextRef => this.setState({ contextRef })}
        className={styles.bibleDisplay}
      >
        {this.renderHeader()}
        {this.renderChapter()}
      </div>
    )
  }
}

export default BibleDisplayContainer
