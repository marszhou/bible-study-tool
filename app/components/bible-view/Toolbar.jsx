import React from 'react'
import styles from './Toolbar.css'
import { Button, Icon } from 'semantic-ui-react'

const Toolbar = () => {
  return (
    <div className={styles.toolbarFrame}>
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

export default Toolbar
