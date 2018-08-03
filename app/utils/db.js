import _ from 'lodash'
import db from './databases'

// export const fetchVersesForChapter = (bookId, chapterIndex, versionId) => {
//   const sql = `select * from ${bookTableName(versionId)}
//                 where book_id=@bookId and chapter=@chapterIndex`
//   return db.prepare(sql).all({ bookId, chapterIndex })
// }

export const fetchVersesForChapterByVersions = async (
  bookId,
  chapterIndex,
  versions
) => {
  console.log(bookId, chapterIndex, versions)

  const verses = []
  for (const versionId of versions) {
    verses.push(await db.verse(versionId).getVerses(bookId, chapterIndex))
  }
  return _.zip(...verses)
}
  // _.zip(
  //   ...versions.map(versionId => {
  //     return fetchVersesForChapter(bookId, chapterIndex, versionId)
  //   })
  // )
