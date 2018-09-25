import { filterBooks } from 'app/consts/bible'

export const parseSpotLightDirective = text => {
  const patterns = [standardPattern]

  for (let i = 0; i < patterns.length; i++) {
    const match = patterns[i](text)
    if (match) return match
  }
}

const standardPattern = text => {
  const regex = /([^\s]*)\s*(?:(\d*)[:\：\s]?(\d*))?/i
  const match = text.match(regex)
  if (match) {
    return {
      bookFilter: match[1],
      chapter: +match[2] || 0,
      verse: +match[3] || 0
    }
  }
}

export const makeSearchResults = (
  allBooks,
  supposeBook,
  supposeChapter,
  supposeVerse,
  verseCountByBook
) => {
  const filteredBooks = filterBooks(supposeBook, allBooks)
    .map(book => ({
      id: book.id,
      name: book.name_cn,
      chapter: supposeChapter || 1,
      verse: supposeVerse || 1,
      chapter_count: +book.chapter_count
    }))
    .filter(book => {
      return (
        book.chapter_count >= book.chapter &&
        +verseCountByBook[book.id][book.chapter] >= book.verse
      )
    })

  return filteredBooks.map(book => {
    return { ...book, title: `${book.name} ${book.chapter}:${book.verse}` }
  })
}
