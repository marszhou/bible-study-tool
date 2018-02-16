import { React, PropTypes, cx } from 'app/bootstrap' // eslint-disable-line
import styles from './styles.css'
import { stripCode } from './utils'

export const Line_PropType = PropTypes.shape({
  index: PropTypes.number,
  content: PropTypes.string,
  version: PropTypes.string
})

function NormalDisplay({ line, onClick }) {
  return (
    <li className={styles.line} onClick={() => onClick(line.index)} role='button'>
      <span
        className={cx({ [styles.verseVersion]: true, show: true })}
        data-version={line.version}
      />
      <span className={styles.verseIndex} data-index={line.index} />
      {stripCode(line.content)}
    </li>
  )
}

NormalDisplay.propTypes = {
  line: Line_PropType.isRequired,
  onClick: PropTypes.func.isRequired
}

function WithCodeDisplay({ line }) {
  return <li className={styles.lineWithCode}>{line.content}</li>
}

WithCodeDisplay.propTypes = {
  line: Line_PropType.isRequired
}

const Line = ({ line, displayCode = false, onClick }) => {
  return !displayCode ? (
    <NormalDisplay line={line} onClick={onClick} />
  ) : (
    <WithCodeDisplay line={line} />
  )
}

Line.propTypes = {
  onClick: PropTypes.func,
  line: Line_PropType.isRequired,
  displayCode: PropTypes.bool.isRequired // 是否显示原文编号
}

Line.defaultProps = {
  onClick: verseIndex => {}
}

export default Line
