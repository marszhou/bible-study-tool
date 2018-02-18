import { React, PropTypes, cx } from 'app/bootstrap'; // eslint-disable-line
import { PropType_BookItem } from '../bible-selector/BookItem';

class BibleDisplayContainer extends React.PureComponent {
  static propTypes = {
    book: PropType_BookItem.isRequired,
    chapterIndex: PropTypes.number.isRequired,
    versions: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      verses: [],
      selectedVersions: [],
      selectedVerses: [],
      displayCode: false
    }
  }

  render() {
    return (
      <div>

      </div>
    );
  }
}

export default BibleDisplayContainer;
