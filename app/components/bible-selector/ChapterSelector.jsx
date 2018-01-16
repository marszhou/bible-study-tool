import { React, PropTypes, cx } from 'app/bootstrap'; // eslint-disable-line
import styles from './BibleSelector.css';

class ChapterSelector extends React.Component {
  static propTypes = {
    count: PropTypes.number,
    selected: PropTypes.number,
    visible: PropTypes.bool,
    classNames: PropTypes.object,
    onSelect: PropTypes.func,
  };

  static defaultProps = {
    count: 0,
    selected: 0, // start from 1
    visible: true,
    classNames: [],
    onSelect: () => {},
  };

  handleClick(index) {
    this.props.onSelect(index);
  }

  renderTitle() {
    return (
      <div className={styles.title}>
        <div className={styles.left}>
          <span style={{ paddingLeft: 5, fontWeight: 'bold' }}>章</span>
        </div>
      </div>
    );
  }

  renderList() {
    return (
      <div className="list-content">
        <ul className={styles.grid}>
          {[...Array(this.props.count)].map((_, index) => (
            <li
              key={index}
              role="button"
              tabIndex="0"
              type={this.props.selected === index + 1 ? 'primary' : 'default'}
              className={this.props.selected=== index + 1? 'selected':''}
              onClick={this.handleClick.bind(this, index + 1)}
            >
              {index + 1}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  render() {
    const { classNames } = this.props;

    return this.props.visible ? (
      <div
        className={cx({
          [styles.column]: true,
          [styles.chapterSelector]: true,
          ...classNames,
        })}
      >
        {this.renderTitle()}
        {this.renderList()}
      </div>
    ) : null;
  }
}

export default ChapterSelector;
