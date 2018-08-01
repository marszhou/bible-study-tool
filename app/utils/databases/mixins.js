// @flow
import updateBind from './updateBind'
import type { Database, CallbackFunc } from './getDatabase'

const mixins = (TABLE: string) => ({
  get: (id: string | number) => (db: Database, cb: CallbackFunc) => {
    db.get(`select * from ${TABLE} where id=?`, id, cb)
  },
  all: () => (db: Database, cb: CallbackFunc) => {
    return db.all(`select * from ${TABLE}`, cb)
  },
  in: (ids: Array<string | number>) => (db: Database, cb: CallbackFunc) => {
    return db.all(
      `select * from ${TABLE} where id in (${ids.map(() => '?').join(',')})`,
      ids,
      cb
    )
  },
  delete: (id: number | string) => (db: Database, cb: CallbackFunc) => {
    return db
      .prepare(`delete from ${TABLE} where id=?`)
      .run(id, cb)
      .finalize()
  },
  update: (id: number | string, props: {}) => (
    db: Database,
    cb: CallbackFunc
  ) => {
    const bind = updateBind(props)
    return db
      .prepare(`update ${TABLE} set ${bind[0]} where id=?`)
      .run([...bind[1], id], cb)
      .finalize()
  },
  list: (offset: number, length: number) => (
    db: Database,
    cb: CallbackFunc
  ) => {
    return db.all(
      `select * from ${TABLE} \
      limit ${offset}, ${length}`,
      cb
    )
  },
  count: () => (db: Database, cb: CallbackFunc) => {
    const { rc } = db.get(`select count(*) as rc from ${TABLE} `, cb)
    return rc
  },
  listByUser: (userId: number, offset: number, length: number) => (
    db: Database,
    cb: CallbackFunc
  ) => {
    return db.all(
      `select * from ${TABLE} \
      where user_id=? ` +
        (offset !== undefined ? `limit ${offset}, ${length}` : ''),
      userId,
      cb
    )
  },
  countByUser: (userId: number) => (db: Database, cb: CallbackFunc) => {
    const { rc } = db.get(
      `select count(*) as rc from ${TABLE} where user_id=?`,
      userId,
      cb
    )
    return rc
  }
})

export default mixins
