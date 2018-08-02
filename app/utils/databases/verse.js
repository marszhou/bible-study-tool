import mixins from './mixins'
import versions from '../../consts/versions'

const getTableName = id => `b_${id}`

const verse = versions.map(v => v.id).reduce((ret, version) => {
  const TABLE = getTableName(version)
  return {
    ...ret,
    [version]: {
      ...mixins(TABLE),
      getVerses: (bookId, chapter) => (db, cb) => {
        db.all(
          `select * from ${TABLE} where book_id=? and chapter=? order by verse`,
          bookId,
          chapter,
          cb
        )
      },
      getVerse: (bookId, chapter, verse) => (db, cb) => {
        db.get(
          `select * from ${TABLE} where book_id=? and chapter=? and verse=?`,
          bookId,
          chapter,
          verse,
          cb
        )
      }
    }
  }
}, {})

export default verse
