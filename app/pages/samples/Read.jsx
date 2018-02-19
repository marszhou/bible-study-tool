import React, { Component } from 'react'
import ChapterDisplay from '../../components/bible-display/ChapterDisplay'
import BibleDisplayContainer from '../../components/bible-display/BibleDisplayContainer'

const book = {
  id: 1153072783907,
  name: '创世纪',
  chapterCount: 40
}
const versions = [
  { name: '和合本', id: 'cuvs' },
  { name: '吕振中中文译本', id: 'lzz' },
  { name: 'Holman Christian Standard Bible', id: 'HCSB' },
  { name: 'Lexham English Bible', id: 'leb' }
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
