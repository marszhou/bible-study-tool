import { React, PropTypes, cx } from 'app/bootstrap'; // eslint-disable-line
import LineDisplay from './LineDisplay';

class VerseDisplay extends React.Component {
  static propTypes = {
    verse: PropTypes.shape({
      versions: PropTypes.array,
      lines: PropTypes.array,
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

  renderer() {
    const { verse, selected, displayCode } = this.props;
    if (!verse) return null;
    const { versions, lines } = verse;

    return React.createElement(
      'ul',
      {
        className: cx({ selected }),
      },
      [...Array(versions.length)].map((_, index) => (
        <LineDisplay
          key={index}
          content={lines[index]}
          version={versions[index]}
          displayCode={displayCode}
        />
      )),
    );
  }
}

export default VerseDisplay;
