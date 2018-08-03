import React, { Component } from 'react'
import BibleDisplayContainer from '../../components/bible-display/BibleDisplayContainer'

const book = {
  id: 1153072783907,
  name: '创世纪',
  chapterCount: 40
}
const versions = [
  { name: '和合本', id: 'cuvs', hasCode: true, lang: 'cn', abbr: '和合本' },
  { name: '吕振中中文译本', id: 'lzz', lang: 'cn' , abbr: '吕振中'},
  { name: 'Holman Christian Standard Bible', id: 'HCSB', hasCode: true, lang: 'en' , abbr: 'HCSB'},
  { name: 'Lexham English Bible', id: 'leb', lang: 'en', abbr: 'LEB'}
]
class Read extends React.PureComponent {
  render() {
    return (
      <div>
        <BibleDisplayContainer
          book={book}
          chapterIndex={1}
          versions={versions}
        />
      </div>
    )
  }
}

export default Read
