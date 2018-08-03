import mixins from './mixins'

const TABLE = 'book_group_set'

const bookGroupSet = {
  ...mixins(TABLE),
  getBooksByGroup: groupId => (db, cb) => {
    db.all(`select book_id from ${TABLE} where group_id=?`, groupId, cb)
  }
}

export default bookGroupSet
