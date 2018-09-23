import React, { Component } from 'react'
// import update from 'immutability-helper'
import { connect } from 'react-redux'
import {
  Breadcrumb,
  Button,
  Dropdown,
  Popup,
  Label,
  Icon,
  Segment,
  Ref
} from 'semantic-ui-react'
import styles from './BibleViewPage.css'
import BibleSelector from '../components/bible-selector/BibleSelector'
import { getBook, getNextChapter, getPreviousChapter } from 'app/consts/bible'
import * as layoutActions from '../actions/layout'
import * as bibleActions from '../actions/bible'
import BibleView from 'app/components/bible-view/BibleView'
import { layoutSelectors, bibleSelectors } from 'app/reducers'
import { isDescendant } from '../utils/dom'
import Toolbar from 'app/components/bible-view/Toolbar';
import * as toolbarActions from '../actions/toolbar'
import * as dictionaryActions from '../actions/dictionary'
import debounce from 'lodash/debounce'
import throttle from 'lodash/throttle'
import DictionaryPopup from 'app/components/dictionary/DictionaryPopup'

class BibleViewPage extends Component {
  constructor(props: {}) {
    super(props)
    this.state = {
      bibleSelectorIsOpen: {},
      versionSelectorIsOpen: false
    }
    this.setToolbarDontDisturb_debounce = debounce
    (this.props.setDontDisturb, 1000)
    this.setToolbarDontDisturb_throttle = throttle(this.props.setDontDisturb, 500, {leading: true})
  }

  get value() {
    const { match } = this.props
    return {
      bookId: +match.params.bookId || 0,
      chapter: +match.params.chapter || 0,
      verse: +match.params.verse || 0
    }
  }

  get next() {
    if (this.value.bookId && this.value.chapter) {
      return getNextChapter(this.value)
    }
  }

  get previous() {
    if (this.value.bookId && this.value.chapter) {
      return getPreviousChapter(this.value)
    }
  }

  handleBibleSelectorChange = value => {
    const { match, tabUpdate } = this.props
    const tabId = match.params.tabId
    const tabItem = {
      id: tabId,
      ...value
    }
    console.log(value)
    if (value.verse) {
      this.setState({
        bibleSelectorIsOpen: {
          'book': false,
          'chapter': false
        }
      })
    }
    tabUpdate(tabId, tabItem)
  }

  handleBibleSelectorCloseClick = type => {
    this.setState({
      bibleSelectorIsOpen: {
        [type]: false
      }
    })
  }

  handleBibleSelectorToggle = (type, isOpen) => {
    this.setState({
      bibleSelectorIsOpen: {
        [type]: isOpen
      }
    })
  }

  handleVersionChoose = (e, version) => {
    const { toggleVersion, activatedTab } = this.props
    toggleVersion(activatedTab.id, version.id)
  }

  handleIsDisplayCode = () => {
    const { setIsDisplayCode, activatedTab, isDisplayCode } = this.props
    setIsDisplayCode(activatedTab.id, !isDisplayCode)
  }

  handleScroll = () => {
    this.setToolbarDontDisturb_throttle(true)
    this.setToolbarDontDisturb_debounce(false)
    this.props.dictionaryPopdown()
  }

  renderBibleSelector({ type, isOpen, selectorName, value }) {
    return (
      <Breadcrumb.Section link>
        {' '}
        <Popup
          position="bottom left"
          trigger={
            <Label size="large">
              {selectorName} <Icon name="caret down" size="small" />
            </Label>
          }
          className={styles.bibleSelectorPopup}
          open={isOpen}
          on="click"
          onOpen={this.handleBibleSelectorToggle.bind(this, type, true)}
          onClose={this.handleBibleSelectorToggle.bind(this, type, false)}
          content={
            <BibleSelector
              viewMode={type === 'book' ? 'full' : 'chapter'}
              value={value}
              showClose
              onCloseClick={this.handleBibleSelectorCloseClick.bind(this, type)}
              onChange={this.handleBibleSelectorChange}
              columnClassNames={{
                'bible-selector-height': true
              }}
            />
          }
        />
      </Breadcrumb.Section>
    )
  }

  renderBreadcrumb() {
    const { bibleSelectorIsOpen } = this.state
    const value = this.value

    const bookSelectorName =
      value.bookId > 0 ? getBook(value.bookId).name_cn : '选择书本...'
    const chapterSelectorName =
      value.bookId > 0
        ? value.chapter > 0
          ? `第${value.chapter}章`
          : '选择章...'
        : null
    const bookSelector = this.renderBibleSelector({
      type: 'book',
      isOpen: bibleSelectorIsOpen.book,
      selectorName: bookSelectorName,
      value
    })
    const chapterSelector =
      value.bookId > 0
        ? this.renderBibleSelector({
            type: 'chapter',
            isOpen: bibleSelectorIsOpen.chapter,
            selectorName: chapterSelectorName,
            value
          })
        : null

    return (
      <Breadcrumb size="big">
        {bookSelector}
        {value.bookId > 0 ? <Breadcrumb.Divider icon="right angle" /> : null}
        {chapterSelector}
      </Breadcrumb>
    )
  }

  renderIsDisplayCode() {
    const { isDisplayCode, isShowCodeDisabled } = this.props
    return (
      <Button
        as="a"
        size="tiny"
        color="blue"
        onClick={this.handleIsDisplayCode}
        disabled={isShowCodeDisabled}
      >
        <Icon name={`toggle ${isDisplayCode ? 'on' : 'off'}`} />
        {isDisplayCode ? '不显示原文' : '显示原文'}
      </Button>
    )
  }

  renderVersionDropdown() {
    const { versions, selectedVersions, isDisplayCode } = this.props
    const { versionSelectorIsOpen } = this.state
    let description = ''
    if (selectedVersions.length === 1) {
      description = versions.find(version => version.id === selectedVersions[0])
        .name
    } else if (selectedVersions.length > 1) {
      description = `${selectedVersions.length}个版本`
    }
    return (
      <Ref innerRef={ref => (this.versionMenuRef = ref)}>
        <Dropdown
          icon={null}
          pointing="top right"
          open={versionSelectorIsOpen}
          floating
          disabled={isDisplayCode}
          onOpen={() =>
            this.setState({
              versionSelectorIsOpen: true
            })
          }
          onClose={e => {
            const menu = this.versionMenuRef.querySelector('.versionDropMenu')
            if (!e || !isDescendant(menu, e.target)) {
              this.setState({
                versionSelectorIsOpen: false
              })
            }


          }}
          trigger={
            <Button size="tiny" as="div" labelPosition="right" color="blue">
              <Button icon size="tiny" color="blue">
                <Icon name="book" />
                选择版本
              </Button>
              <Label as="a" basic pointing="left">
                {description}
              </Label>
            </Button>
          }
        >
          <Dropdown.Menu className="versionDropMenu">
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
      </Ref>
    )
  }

  renderChapterSwitch() {
    const { previous, next } = this

    return (
      <div className={styles.chapterSwitch}>
        <Button
          size="tiny"
          disabled={!previous}
          circular
          icon="angle double left"
          color="blue"
          onClick={this.handleBibleSelectorChange.bind(this, previous)}
        />
        <Button
          size="tiny"
          disabled={!next}
          circular
          icon="angle double right"
          color="blue"
          onClick={this.handleBibleSelectorChange.bind(this, next)}
        />
      </div>
    )
  }

  render() {
    const { activatedTab } = this.props
    const { id: tabId, ...bibleInfo } = activatedTab
    return (
      <div className={styles.bibleViewWrapper}>
        <Segment className={styles.bibleViewTop}>
          {this.renderBreadcrumb()}
          <div className={styles.toolkits}>
            {this.renderIsDisplayCode()} {this.renderVersionDropdown()}{' '}
            {this.renderChapterSwitch()}
          </div>
        </Segment>
        <div className={'bible-view-height ' + styles.bibleView} onScroll={this.handleScroll}>
          <BibleView tabId={tabId} {...bibleInfo} />
        </div>
        <Toolbar />
        <DictionaryPopup />
      </div>
    )
  }
}

export default connect(
  state => {
    const activatedTab = layoutSelectors.getActivatedTab(state)
    const tabId = activatedTab.id
    return {
      activatedTab,
      versions: bibleSelectors.getVersions(),
      selectedVersions: bibleSelectors.getVersionsByTabId(state, tabId),
      isDisplayCode: bibleSelectors.getIsDisplayCodeByTabId(state, tabId),
      isShowCodeDisabled: bibleSelectors.getIsShowCodeDisabled(state, tabId)
    }
  },
  { ...layoutActions, ...bibleActions, ...toolbarActions, ...dictionaryActions }
)(BibleViewPage)
