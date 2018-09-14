import React from 'react'
import styles from './Toolbar.css'
import { Button, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import {toolbarSelectors} from 'app/reducers'
import cx from 'classnames'

const Toolbar = ({dontDisturb}) => {
  const classNames = {
    [styles.toolbarFrame]: true,
    [styles.dontDisturb]: dontDisturb
  }
  return (
    <div className={cx(classNames)}>
      <div className={styles.toolbar}>
        <Button.Group>
          <Button icon>
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
  )
}

export default connect(state => ({
  dontDisturb: toolbarSelectors.getDontDisturb(state)
}), {})(Toolbar)
