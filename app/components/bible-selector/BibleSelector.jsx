import { React, PropTypes, cx } from "app/bootstrap"; // eslint-disable-line
import BookSelector from './BookSelector'
import ChapterSelector from './ChapterSelector'
import VerseSelector from './VerseSelector'

class BibleSelector extends React.Component {
  render() {
    return (
      <div>
        <BookSelector />
        <ChapterSelector />
        <VerseSelector count={50} selected={3} />
      </div>
    )
  }
}

export default BibleSelector
