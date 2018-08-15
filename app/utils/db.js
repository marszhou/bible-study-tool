import _ from 'lodash'
import db from './databases'

// export const fetchVersesForChapter = (bookId, chapter, versionId) => {
//   const sql = `select * from ${bookTableName(versionId)}
//                 where book_id=@bookId and chapter=@chapter`
//   return db.prepare(sql).all({ bookId, chapter })
// }

export const fetchVersesForChapterByVersions = async (
  bookId,
  chapter,
  versions
) => {
  console.log(bookId, chapter, versions)

  const verses = []
  for (const versionId of versions) {
    verses.push(await db.verse(versionId).getVerses(bookId, chapter))
  }
  return _.zip(...verses)
}
  // _.zip(
  //   ...versions.map(versionId => {
  //     return fetchVersesForChapter(bookId, chapter, versionId)
  //   })
  // )
