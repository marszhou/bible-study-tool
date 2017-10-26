import { React, PropTypes, cx } from "app/bootstrap"; // eslint-disable-line

class BookSelector extends React.Component {
  static propTypes = {
    book: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      chapterCount: PropTypes.number
    }),
    bookGroups: PropTypes.array,
    onSelect: PropTypes.func
  }

  static defaultProps = {
    book: null,
    bookGroups: [],
    onSelect: () => {}
  }

  render() {
    return (
      <div>
        bible selector
      </div>
    )
  }
}

export default BookSelector
