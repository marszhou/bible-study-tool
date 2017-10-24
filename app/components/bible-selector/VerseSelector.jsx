import { React, PropTypes, cx } from "app/bootstrap"; // eslint-disable-line
import ChapterSelector from './ChapterSelector';

class VerseSelector extends ChapterSelector {
  renderTitle() {
    return (
      <div>
        选择节
      </div>
    )
  }
}

export default VerseSelector
