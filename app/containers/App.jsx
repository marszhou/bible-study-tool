import React, { Component } from 'react'
import type { Children } from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import db from '../utils/databases'

(async function test() {
  console.log(await db.book.all())
})()

class App extends Component {
  props: {
    children: Children
  }

  render() {
    return <div>{this.props.children}</div>
  }
}

export default DragDropContext(HTML5Backend)(App)
