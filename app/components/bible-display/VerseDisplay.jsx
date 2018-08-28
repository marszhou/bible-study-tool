import { React, PropTypes, cx } from 'app/bootstrap' // eslint-disable-line
import LineDisplay, { Line_PropType } from './LineDisplay'
import styles from './styles.css'

class VerseDisplay extends React.Component {
  static propTypes = {
    verse: PropTypes.shape({
      index: PropTypes.number,
      versions: PropTypes.arrayOf(PropTypes.object)
    }),
    versions: PropTypes.arrayOf(PropTypes.string),
    selected: PropTypes.bool,
    displayCode: PropTypes.bool,
    onVerseClick: PropTypes.func,
    onCodeClick: PropTypes.func,
    onCodeHover: PropTypes.func
  }

  static defaultProps = {
    verse: null,
    versions: [],
    selected: false,
    displayCode: false,
    onVerseClick: (e, verseIndex) => {},
    onCodeClick: (e, data) => {},
    onCodeHover: (e, data) => {}
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {
      verse,
      selected,
      displayCode,
      versions,
      onVerseClick,
      onCodeClick,
      onCodeHover
    } = this.props
    if (!verse) return null
    const { versions: lines } = verse

    return React.createElement(
      'ul',
      {
        className: cx({ [styles.selected]: selected, [styles.verse]: true })
      },
      lines.map((line, index) => (
        <LineDisplay
          key={line.version}
          index={verse.index}
          version={line.version}
          displayVersion={versions.length > 1}
          line={line}
          displayCode={displayCode}
          onClick={onVerseClick}
          onCodeClick={onCodeClick}
          onCodeHover={onCodeHover}
        />
      ))
    )
  }
}

export default VerseDisplay
