import { remote } from 'electron'

const path = remote.require('path')
const dbPath = path.join(__dirname, '../resources/databases/bible_YHWH.sqlite')
const sqlite = remote.require('sqlite3').verbose()

export default () => new sqlite.Database(dbPath)
