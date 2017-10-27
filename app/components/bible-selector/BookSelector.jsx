import { React, PropTypes, cx } from 'app/bootstrap'; // eslint-disable-line
import BookGroup, { PropType_BookGroup } from './BookGroup';
import styles from './BibleSelector.css';

class BookSelector extends React.Component {
  static propTypes = {
    currentBookId: PropTypes.number,
    bookGroups: PropTypes.arrayOf(PropType_BookGroup),
    classNames: PropTypes.array,
    onSelect: PropTypes.func,
  };

  static defaultProps = {
    currentBookId: -1,
    bookGroups: [],
    classNames: [],
    onSelect: () => {},
  };

  render() {
    const { bookGroups, currentBookId, classNames, onSelect } = this.props;

    return (
      <div
        className={cx({
          [styles.column]: true,
          [styles.bookSelector]: true,
          ...classNames
        })}
      >
        <div className={styles.title}>
          <div className={styles.left}>
            <span style={{ paddingLeft: 5, fontWeight: "bold" }}>书</span>
          </div>
          <div className={styles.right}>
            <i
              className="fa fa-th"
              aria-hidden="true"
              style={{ paddingRight: 5 }}
            />
          </div>
          <div className={styles.content}>
            <div className={styles.search}>
              <i
                className={cx({
                  fa: true,
                  'fa-search': true,
                  [styles.searchIcon]: true,
                })}
                aria-hidden="true"
              />
              <input type="text" placeholder="过滤..." />
            </div>
          </div>
        </div>
        {bookGroups.map(group => (
          <BookGroup
            key={group.id}
            group={group}
            currentBookId={currentBookId}
            onSelect={onSelect}
          />
        ))}
      </div>
    );
  }
}

export default BookSelector;
