import React, { Component } from 'react'
import ChapterDisplay from '../../components/bible-display/ChapterDisplay'
import BibleDisplayContainer from '../../components/bible-display/BibleDisplayContainer'

const book = {
  id: 1153072783907,
  name: '创世纪',
  chapterCount: 40
}
const versions = [
  { name: '和合本', id: 'cuvs', hasCode: true, lang: 'cn' },
  { name: '吕振中中文译本', id: 'lzz', lang: 'cn' },
  { name: 'Holman Christian Standard Bible', id: 'HCSB', hasCode: true, lang: 'en' },
  { name: 'Lexham English Bible', id: 'leb', lang: 'en' }
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
