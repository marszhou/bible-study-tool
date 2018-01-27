import React, { Component } from 'react'
import BibleSelector from '../../components/bible-selector/BibleSelector'

export default class BibleSelectorPage extends Component {
  props: {}
  state: {
    visible: boolean,
    value: {
      bookId: number,
      chapter: number,
      verse: number
    }
  }
  constructor(props: {}) {
    super(props)
    this.state = {
      visible: false,
      bookId: 0,
      value: {
        bookId: -1,
        chapter: 0,
        verse: 0
      }
    }
  }

  handleBibleSelectorChange = value => {
    console.log('select', value)
    this.setState({ value })
  }

  render() {
    const { value } = this.state
    return (
      <BibleSelector
        value={value}
        onChange={this.handleBibleSelectorChange}
        columnClassNames={{
          'client-height': true
        }}
      />
    )
  }
}
