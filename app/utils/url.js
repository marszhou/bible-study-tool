import pathToRegexp from 'path-to-regexp'

export const parseUrlParams = (routeRegex, url) => {
  const keys = []
  const re = pathToRegexp(routeRegex, keys)
  const result = re.exec(url)
  return result ? keys.reduce((ret, key, index) => ({
    ...ret,
    [key.name]: result[index+1]
  }), {}) : {}
}
