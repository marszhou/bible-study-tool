import { React, ReactDOM, PropTypes, cx, update } from 'app/bootstrap' // eslint-disable-line
import { remote } from 'electron'

// const sqlite = remote.require('sqlite3').verbose();
const Database = remote.require('better-sqlite3')
const db = new Database(
  '/Users/mattzhou/Documents/git/_working/bible-study-tool/resources/databases/bible_YHWH.sqlite'
)
const rows = db
  .prepare(
    'select * from b_cuvs where book_id=1153072783907 and chapter=1 order by verse'
  )
  .all()
// console.log(
//   JSON.stringify(
//     rows.map(row => ({
//       index: row.verse,
//       versions: [
//         {
//           index: row.verse,
//           content: row.scripture,
//           version: '和合本'
//         }
//       ]
//     }))
//   )
// )

class SqliteDemoPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleQuery = () => {}

  render() {
    return (
      <div>
        <button onClick={this.handleQuery}>do query</button>
        <div>{remote.process.cwd()}</div>
        <div>{remote.app.getAppPath()}</div>
      </div>
    )
  }
}

export default SqliteDemoPage
