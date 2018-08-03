import { React, PropTypes, cx } from 'app/bootstrap'; // eslint-disable-line
import ChapterSelector from './ChapterSelector';
import styles from './BibleSelector.css';

class VerseSelector extends ChapterSelector {
  renderTitle() {
    return (
      <div className={styles.title}>
        <div className={styles.left}>
          <span style={{ paddingLeft: 5, fontWeight: 'bold' }}>节</span>
        </div>
      </div>
    );
  }
}

export default VerseSelector;
