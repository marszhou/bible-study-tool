import getDatabase from './getDatabase'
import dbWrapper from './dbWrapper'
import book from './book'

const wrapper = dbWrapper(getDatabase())

export default {
  book: wrapper(book)
}
