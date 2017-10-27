import { React, PropTypes, cx } from 'app/bootstrap'; // eslint-disable-line
import { Button } from 'antd';
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
    return <div>选择章</div>;
  }

  renderItems() {
    return [...Array(this.props.count)].map((_, index) => (
      <Button
        key={index}
        type={this.props.selected === index + 1 ? 'primary' : 'default'}
        onClick={this.handleClick.bind(this, index + 1)}
      >
        {index + 1}
      </Button>
    ));
  }

  render() {
    const {classNames } = this.props

    return this.props.visible ? (
      <div
        className={cx({
          [styles.column]: true,
          [styles.bookSelector]: true,
          ...classNames,
        })}
      >
        {this.renderTitle()}
        {this.renderItems()}
      </div>
    ) : null;
  }
}

export default ChapterSelector;
