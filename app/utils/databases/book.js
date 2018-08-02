import camel from 'camelcase'
import mixins from './mixins'

const TABLE = 'books'

const names = ['abbr_en', 'abbr_cn', 'abbr_tr', 'name_cn', 'name_en', 'name_tr']

const getByTypeOfName = type => name => (db, cb) =>
  db.get(`select * from ${TABLE} where ${type} = ? `, name, cb)

const getByNames: {} = names.reduce(
  (ret: {}, name: string) => ({
    ...ret,
    [camel('get_' + name)]: getByTypeOfName(name)
  }),
  {}
)

const book = {
  ...mixins(TABLE),
  ...getByNames,
}

export default book
