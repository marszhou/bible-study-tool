import { React, PropTypes, cx } from 'app/bootstrap'; // eslint-disable-line
import BookGroup, { PropType_BookGroup } from './BookGroup';
import styles from './BibleSelector.css';

class BookSelector extends React.Component {
  static propTypes = {
    currentBookId: PropTypes.number,
    bookGroups: PropTypes.arrayOf(PropType_BookGroup),
    classNames: PropTypes.object,
    listStyle: PropTypes.oneOf(['list', 'grid']),
    onSelect: PropTypes.func,
    onListStyleToggle: PropTypes.func,
  };

  static defaultProps = {
    currentBookId: -1,
    bookGroups: [],
    classNames: [],
    listStyle: 'list',
    onSelect: () => {},
    onListStyleToggle: () => {},
  };

  render() {
    const {
      bookGroups,
      currentBookId,
      classNames,
      listStyle,
      onSelect,
      onListStyleToggle
    } = this.props;

    return (
      <div
        className={cx({
          [styles.column]: true,
          [styles.bookSelector]: true,
          ...classNames,
        })}
      >
        <div className={styles.title}>
          <div className={styles.left}>
            <span style={{ paddingLeft: 5, fontWeight: 'bold' }}>书</span>
          </div>
          <div className={styles.right}>
            <i
              className={`fa fa-${listStyle !=='list' ? 'list' : 'th'}`}
              aria-hidden="true"
              style={{ paddingRight: 5 }}
              onClick={onListStyleToggle}
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
        <div className="list-content">
          {bookGroups.map(group => (
            <BookGroup
              key={group.id}
              listStyle={listStyle}
              group={group}
              currentBookId={currentBookId}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default BookSelector;
