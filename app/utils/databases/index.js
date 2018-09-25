import getDatabase from './getDatabase'
import dbWrapper from './dbWrapper'

const wrapper = dbWrapper(getDatabase())

export default {
  book: wrapper(require('./book')),
  bookGroup: wrapper(require('./bookGroup')),
  bookGroupSet: wrapper(require('./bookGroupSet')),
  verse: (book) => wrapper(require('./verse')[book]),
  verseCount: wrapper(require('./verseCount')),
  // dictionary: (lang) => wrapper(require('./dictionary')[lang])
  dictionary: wrapper(require('./dictionary'))
}
