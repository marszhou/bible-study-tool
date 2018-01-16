import React, { Component } from 'react'
import BibleSelector from '../components/bible-selector/BibleSelector'

export default class BibleSelectorPage extends Component {
  props: {}
  state: {
    visible: boolean,
    value: {
      bookId: -1,
      chapter: 0,
      verse: 0
    },
    listStyle: string
  }
  constructor(props: {}) {
    super(props)
    this.state = {
      visible: false,
      bookId: 0,
      listStyle: 'list'
    }
  }

  handleBibleSelectorChange = (value) => {
    console.log('select', value)
    this.setState({value})
  }

  render() {
    const { value, listStyle } = this.state
    return (
      <BibleSelector
        value={value}
        onChange={this.handleBibleSelectorChange}
        bookListStyle={listStyle}
        onBookListStyleToggle={() =>
          this.setState({
            listStyle: listStyle === 'list' ? 'grid' : 'list'
          })
        }
        columnClassNames={{
          'client-height': true
        }}
      />
    )
  }
}
