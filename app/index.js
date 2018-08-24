import React from 'react'
import { render } from 'react-dom'
import { remote } from 'electron'

const sqlite = remote.require('sqlite3')
const path = remote.require('path')

const app = remote.app

const basepath = app.getAppPath()

const dbPath =
  process.env.NODE_ENV === 'production'
    ? path.join(
        path.dirname(basepath),
        '../app/resources/databases/bible_YHWH.sqlite'
      )
    : path.join(__dirname, './resources/databases/bible_YHWH.sqlite')

alert(dbPath)

// export default () => new sqlite.Database(dbPath)


render(
  <div>home2</div>,
  document.getElementById('root')
)

