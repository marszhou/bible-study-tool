import _ from 'lodash'
import { remote } from 'electron'

const Database = remote.require('better-sqlite3')

const db = new Database(
  '/Users/mattzhou/Documents/git/_working/bible-study-tool/resources/databases/bible_YHWH.sqlite'
)

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
