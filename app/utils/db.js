import _ from 'lodash'
import { remote } from 'electron'
import { resolve } from 'path'

const path = remote.require('path')
const dbPath = path.join(__dirname, '../resources/databases/bible_YHWH.sqlite')
const Database = remote.require('better-sqlite3')

const sqlite = remote.require('sqlite3').verbose()
const d = new sqlite.Database(dbPath)
function a() {
  return new Promise((resolve, reject) => {
    d.get('select * from books', (error, result) => resolve(result))
  })
}

async function b () {
  const result = await a()
  console.log(result)
}

b()

const db = new Database(dbPath)

const bookTableName = id => 'b_' + id

export const fetchVersesForChapter = (bookId, chapterIndex, versionId) => {
  const sql = `select * from ${bookTableName(versionId)}
                where book_id=@bookId and chapter=@chapterIndex`
  return db.prepare(sql).all({ bookId, chapterIndex })
}

export const fetchVersesForChapterByVersions = (
  bookId,
  chapterIndex,
  versions
) =>
  _.zip(
    ...versions.map(versionId => {
      return fetchVersesForChapter(bookId, chapterIndex, versionId)
    })
  )
