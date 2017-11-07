import { React, ReactDOM, PropTypes, cx, update } from 'app/bootstrap'; // eslint-disable-line
import { remote } from 'electron';

const sqlite = remote.require('sqlite3').verbose();

class SqliteDemoPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleQuery = () => {
    console.log(sqlite);

  }

  render() {
    return (
      <div>
        <button onClick={this.handleQuery}>do query</button>
      </div>
    );
  }
}

export default SqliteDemoPage;
