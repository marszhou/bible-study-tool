import React from 'react'
import styles from './Toolbar.css'
import { Button, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { toolbarSelectors, layoutSelectors, bibleSelectors } from 'app/reducers'
import cx from 'classnames'
import { ToastStore } from 'react-toasts'
import * as bibleActions from '../../actions/bible'

class Toolbar extends React.Component {
  constructor(props) {
    super(props)
  }

  handleCopy = () => {
    const { activatedTabId, cleanVerseSelection} = this.props
    const { clipboard } = require('electron')
    ToastStore.success('复制成功！')
    clipboard.writeText('Electron 示例!')
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
            <Button icon>
              <Icon name="copy" onClick={this.handleCopy} />
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
      isShow: bibleSelectors.getSelectedVersesByTabId(state, tabId).length >0
    }
  },
  {
    ...bibleActions
  }
)(Toolbar)
