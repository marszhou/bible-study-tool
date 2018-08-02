import { _ } from 'app/bootstrap' // eslint-disable-line

const dbWrapper = (db) => (methods) => {
  return _.keys(methods).reduce((ret, methodName) => {
    ret[methodName] = (...args) =>
      new Promise((resolve, reject) => {
        methods[methodName](...args)(db, function(error, result) {
          if (error) {
            reject(error)
          } else {
            if (this.lastID || this.changes) {
              resolve(_.pick({ ...this }, 'lastID', 'changes'))
            } else {
              resolve(result)
            }
          }
        })
      })
    return ret
  }, {})
}

export default dbWrapper
