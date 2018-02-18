import { React, PropTypes, cx } from 'app/bootstrap'; // eslint-disable-line
import LineDisplay, {Line_PropType} from './LineDisplay';
import styles from './styles.css'

class VerseDisplay extends React.Component {
  static propTypes = {
    verse: PropTypes.shape({
      index: PropTypes.number,
      versions: PropTypes.arrayOf(Line_PropType)
    }),
    selected: PropTypes.bool,
    displayCode: PropTypes.bool,
  };

  static defaultProps = {
    verse: null,
    selected: false,
    displayCode: false,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { verse, selected, displayCode } = this.props;
    if (!verse) return null;
    const { versions } = verse;

    return React.createElement(
      'ul',
      {
        className: cx({ [styles.selected]: selected, [styles.verse]: true }),
      },
      versions.map((line, index) => (
        <LineDisplay
          key={index}
          line={line}
          displayCode={displayCode}
        />
      )),
    );
  }
}

export default VerseDisplay;
