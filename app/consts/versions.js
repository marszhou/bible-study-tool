const versions = [
  { name: '和合本', id: 'cuvs', hasCode: true, lang: 'cn', abbr: '和合本' },
  { name: '吕振中中文译本', id: 'lzz', lang: 'cn', abbr: '吕振中' },
  {
    name: 'Holman Christian Standard Bible',
    id: 'hcsb',
    hasCode: true,
    lang: 'en',
    abbr: 'HCSB'
  },
  { name: 'Lexham English Bible', id: 'leb', lang: 'en', abbr: 'LEB' }
]

export const getVersion = id => versions.find(v => v.id === id) || {}
export const sortVersions = vs =>
  versions
    .filter(version => vs.indexOf(version.id) > -1)
    .map(version => version.id)

export default versions
