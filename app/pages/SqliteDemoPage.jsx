import { React, ReactDOM, PropTypes, cx, update } from 'app/bootstrap'; // eslint-disable-line
import { remote } from 'electron';

// const sqlite = remote.require('sqlite3').verbose();
const Database = remote.require('better-sqlite3');
const db = new Database('/Users/User1/Documents/git/_working/bible-study-tool/resources/databases/bible_YHWH.sqlite');
const rows = db.prepare('SELECT * FROM books').all();

class SqliteDemoPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleQuery = () => {

  }

  render() {
    return (
      <div>
        <button onClick={this.handleQuery}>do query</button>
        <div>{ remote.process.cwd() }</div>
        <div>{ remote.app.getAppPath() }</div>
      </div>
    );
  }
}

export default SqliteDemoPage;
