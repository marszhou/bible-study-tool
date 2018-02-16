import { React, PropTypes, cx } from 'app/bootstrap' // eslint-disable-line
import styles from './styles.css'
import { stripCode, splitCode } from './utils'

export const Line_PropType = PropTypes.shape({
  index: PropTypes.number,
  content: PropTypes.string,
  version: PropTypes.string
})

function NormalDisplay({ line, onClick }) {
  return (
    <li
      className={styles.line}
      onClick={e => onClick(e, line.index)}
      role="button"
    >
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

const Code = ({ data }) => (
  <span className={styles.code} data-value={data.value} data-lang={data.lang} />
)
Code.propTypes = {
  data: PropTypes.any.isRequired
}

const Word = ({ data }) => <span className={styles.word}>{data.value}</span>
Word.propTypes = {
  data: PropTypes.any.isRequired
}

function WithCodeDisplay({ line, onClick }) {
  const codes = splitCode(line.content)
  return (
    <li
      className={styles.lineWithCode}
      onClick={e => onClick(e, line.index)}
      role="button"
    >
      <span className={styles.verseIndex} data-index={line.index} />
      {codes.map(
        (code, index) =>
          code.type === 'word' ? (
            <Word data={code} key={index} />
          ) : (
            <Code data={code} key={index} />
          )
      )}
    </li>
  )
}

WithCodeDisplay.propTypes = {
  line: Line_PropType.isRequired,
  onClick: PropTypes.func.isRequired
}

const Line = ({ line, displayCode = false, onClick }) => {
  return !displayCode ? (
    <NormalDisplay line={line} onClick={onClick} />
  ) : (
    <WithCodeDisplay line={line} onClick={onClick} />
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
