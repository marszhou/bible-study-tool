export const stripCode = string => string.replace(/<[^>]*>/g, '')

export const splitCode = code => {
  const regex = /<([\a-z]*)([\d]+)(?:x?)>/gi
  let result = null
  let loop = true

  let ret = []
  while(loop) {
    const {lastIndex} = regex
    result = regex.exec(code)

    if (result) {
      const {index} = result
      const text = code.substring(lastIndex, index)
      if (text.trim()) {
        ret.push({type: 'word', value: text})
      }
      ret.push({
        type: 'code',
        lang: result[1],
        value: result[2]
      })
    } else {
      const text = code.substring(lastIndex)
      ret.push({type: 'word', value: text})
      loop = false
    }
  }
  return ret
}

export const formatChapterVerses = (byVersions) =>
  Object.keys(byVersions).reduce((ret, versionId) => {

  }, [])
