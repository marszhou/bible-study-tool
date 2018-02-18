import { React, PropTypes, cx } from 'app/bootstrap' // eslint-disable-line
import styles from './styles.css'
import { stripCode, splitCode } from './utils'

export const Line_PropType = PropTypes.shape({
  index: PropTypes.number,
  content: PropTypes.string,
  version: PropTypes.string
})

const NormalDisplay = ({ line, onClick }) => {
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
      <span className={styles.lineContent}>{stripCode(line.content)}</span>
    </li>
  )
}

NormalDisplay.propTypes = {
  line: Line_PropType.isRequired,
  onClick: PropTypes.func.isRequired
}

// --
const Code = ({ data, onClick, onHover }) => (
  <a
    role="button"
    href="###"
    onClick={e => {
      e.preventDefault()
      onClick(e, data)
    }}
    onMouseOver={e => {
      onHover(e, data)
    }}
    className={styles.code}
    data-value={data.value}
    data-lang={data.lang}
  />
)
Code.propTypes = {
  data: PropTypes.any.isRequired,
  onClick: PropTypes.func.isRequired,
  onHover: PropTypes.func.isRequired
}

const Word = ({ data }) => <span className={styles.word}>{data.value}</span>
Word.propTypes = {
  data: PropTypes.any.isRequired
}

const WithCodeDisplay = ({ line, onClick, onCodeClick, onCodeHover }) => {
  const codes = splitCode(line.content)
  return (
    <li
      className={styles.lineWithCode}
      onClick={e => onClick(e, line.index)}
      role="button"
    >
      <span className={styles.verseIndex} data-index={line.index} />
      <span className={styles.lineContent}>
        {codes.map(
          (code, index) =>
            code.type === 'word' ? (
              <Word data={code} key={index} />
            ) : (
              <Code
                data={code}
                key={index}
                onClick={onCodeClick}
                onHover={onCodeHover}
              />
            )
        )}
      </span>
    </li>
  )
}

WithCodeDisplay.propTypes = {
  line: Line_PropType.isRequired,
  onClick: PropTypes.func.isRequired,
  onCodeClick: PropTypes.func,
  onCodeHover: PropTypes.func
}

WithCodeDisplay.defaultProps = {
  onCodeClick: (e, data) => {},
  onCodeHover: (e, data) => {}
}

// --
const Line = ({
  line,
  displayCode = false,
  onClick,
  onCodeClick,
  onCodeHover
}) => {
  return !displayCode ? (
    <NormalDisplay line={line} onClick={onClick} />
  ) : (
    <WithCodeDisplay
      line={line}
      onClick={onClick}
      onCodeClick={onCodeClick}
      onCodeHover={onCodeHover}
    />
  )
}

Line.propTypes = {
  onClick: PropTypes.func,
  line: Line_PropType.isRequired,
  displayCode: PropTypes.bool.isRequired, // 是否显示原文编号
  onCodeClick: PropTypes.func,
  onCodeHover: PropTypes.func
}

Line.defaultProps = {
  onClick: verseIndex => {},
  onCodeClick: (e, data) => {},
  onCodeHover: (e, data) => {}
}

export default Line
