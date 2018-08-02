import mixins from './mixins'

const TABLE = 'verse_count'
const verseCount = {
  ...mixins(TABLE),
  getCount: (bookId, chapter) => (db, cb) => {
    db.get(
      `select *  from ${TABLE} where book_id=? and chapter=?`,
      bookId,
      chapter,
      cb
    )
  }
}

export default verseCount
