// eslint-disable-line
// @flow
import { _ } from 'app/bootstrap' // eslint-disable-line

const updateBind = (props: {}): [string, Array<number | string>] => {
  const params = []
  const values = []

  _.keys(props).forEach(key => {
    params.push(`${key} = ?`)
    values.push(props[key])
  })

  return [params.join(','), values]
}

export default updateBind
