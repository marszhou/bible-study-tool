import { React, PropTypes, cx, R } from 'app/bootstrap'; // eslint-disable-line
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
    onFilterChange: PropTypes.func,
  };

  static defaultProps = {
    currentBookId: -1,
    bookGroups: [],
    classNames: [],
    listStyle: 'list',
    onSelect: () => {},
    onListStyleToggle: () => {},
    onFilterChange: () => {},
  };

  constructor(props) {
    super(props);
    this.state = { filter: '' };
  }

  handleFilterChange = e => {
    const filter = e.target.value.trim();
    this.setState({
      filter,
    });
    this.props.onFilterChange(filter);
  };

  renderTitle() {
    const { onListStyleToggle, listStyle } = this.props;

    return (
      <div className={styles.title}>
        <div className={styles.left}>
          <span style={{ paddingLeft: 5, fontWeight: 'bold' }}>书</span>
        </div>
        <div className={styles.right}>
          <i
            className={`fa fa-${listStyle !== 'list' ? 'list' : 'th'}`}
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
            <input
              type="text"
              placeholder="过滤..."
              onChange={this.handleFilterChange}
            />
          </div>
        </div>
      </div>
    );
  }

  renderList() {
    const { bookGroups, currentBookId, listStyle, onSelect } = this.props;

    return (
      <div className="list-content">
        {bookGroups.map(group => (
          <BookGroup
            key={group.id}
            listStyle={listStyle}
            group={group}
            currentBookId={currentBookId}
            filter={this.state.filter}
            onSelect={onSelect}
          />
        ))}
      </div>
    );
  }

  render() {
    const { classNames } = this.props;

    return (
      <div
        className={cx({
          [styles.column]: true,
          [styles.bookSelector]: true,
          ...classNames,
        })}
      >
        {this.renderTitle()}
        {this.renderList()}
      </div>
    );
  }
}

export default BookSelector;
