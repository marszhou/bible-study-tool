import mixins from './mixins'

// const langs = ['cn', 'en']

// const dictionary = langs.reduce((ret, lang) => {
//   const TABLE = lang === 'cn' ? 'str_def_cn' : 'str_def'
//   return {
//     ...ret,
//     [lang] : {
//       ...mixins(TABLE),
//       get: no => (db, cb) => {
//         db.get(`select * from ${TABLE} where str_no=?`, no, cb)
//       }
//     }
//   }
// }, {})

const TABLE =
  '(select en.*, cn.def as def_cn  from str_def as en left join str_def_cn as cn on en.str_no = cn.str_no) as dictionary'
const dictionary = {
  ...mixins(TABLE),
  get: no => (db, cb) => {
    db.get(`select * from ${TABLE} where str_no=?`, no, cb)
  }
}

export default dictionary
