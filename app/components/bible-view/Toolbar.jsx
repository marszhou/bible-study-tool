import React from 'react'
import styles from './Toolbar.css'
import { Button, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { toolbarSelectors, layoutSelectors, bibleSelectors } from 'app/reducers'
import cx from 'classnames'
import * as bibleActions from '../../actions/bible'
import * as toolbarActions from '../../actions/toolbar'

import { remote, ipcRenderer } from 'electron'
const appMenu = remote.app.getApplicationMenu()
const copyMenuItem = appMenu.items[1].submenu.items[0]

class Toolbar extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillReceiveProps(nextProps) {
    copyMenuItem.enabled = nextProps.isShow
  }

  componentDidMount() {
    ipcRenderer.on('copy', this.handleCopy)
  }

  componentWillUnmount() {
    ipcRenderer.off('copy', this.handleCopy)
  }

  handleCopy = () => {
    const { activatedTabId, cleanVerseSelection, doCopyVerses } = this.props

    doCopyVerses(activatedTabId)
    cleanVerseSelection(activatedTabId)
  }

  render() {
    const { dontDisturb, isShow } = this.props
    const classNames = {
      [styles.toolbarFrame]: true,
      [styles.dontDisturb]: dontDisturb
    }
    return isShow ? (
      <div className={cx(classNames)}>
        <div className={styles.toolbar}>
          <Button.Group>
            <Button icon onClick={this.handleCopy}>
              <Icon name="copy" />
            </Button>
            <Button icon>
              <Icon name="thumbtack" />
            </Button>
            <Button icon>
              <Icon name="edit outline" />
            </Button>
          </Button.Group>
        </div>
      </div>
    ) : null
  }
}

export default connect(
  state => {
    const activatedTab = layoutSelectors.getActivatedTab(state)
    const tabId = activatedTab.id

    return {
      activatedTabId: tabId,
      dontDisturb: toolbarSelectors.getDontDisturb(state),
      isShow: bibleSelectors.getSelectedVersesByTabId(state, tabId).length > 0
    }
  },
  {
    ...bibleActions,
    ...toolbarActions
  }
)(Toolbar)
