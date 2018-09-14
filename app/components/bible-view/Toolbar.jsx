import React from 'react'
import styles from './Toolbar.css'
import { Button, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { toolbarSelectors } from 'app/reducers'
import cx from 'classnames'

class Toolbar extends React.Component {
  constructor(props) {
    super(props)
  }

  handleCopy = () => {
    const { clipboard } = require('electron')

    clipboard.writeText('Electron 示例!')
  }

  render() {
    const { dontDisturb } = this.props
    const classNames = {
      [styles.toolbarFrame]: true,
      [styles.dontDisturb]: dontDisturb
    }
    return (
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
    )
  }
}

export default connect(
  state => ({
    dontDisturb: toolbarSelectors.getDontDisturb(state)
  }),
  {}
)(Toolbar)
