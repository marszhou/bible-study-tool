// eslint-disable-line
// @flow
import { _ } from 'app/bootstrap' // eslint-disable-line
import type { Database } from './getDatabase'

const dbWrapper = (db: Database) => (methods: {}): {} => {
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
