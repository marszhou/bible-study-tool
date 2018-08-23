import _ from 'lodash'
import db from './databases'

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
