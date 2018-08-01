// eslint-disable-line
// @flow
import { _ } from 'app/bootstrap' // eslint-disable-line

const joinCondition = (conditions: {}): [string, Array<any>] => {
  const keys = _.keys(conditions)
  const wheres = ['1=1']
  const params = []

  keys.forEach(key => {
    const value = conditions[key]
    if (typeof value === 'object') {
      wheres.push(`${key} ${value.op} ?`)
      params.push(value.value)
    } else {
      wheres.push(`${key} = ?`)
      params.push(value)
    }
  })

  return [wheres.join(' AND '), params]
}

export default joinCondition
