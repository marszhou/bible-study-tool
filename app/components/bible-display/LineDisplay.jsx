import { React, PropTypes, cx } from 'app/bootstrap' // eslint-disable-line
import styles from './styles.css'
import { stripCode, splitCode } from './utils'
import { getVersion } from 'app/consts/versions'

// --
const Code = ({ data, onClick, onHover, onOut }) => (
  <a
    role="button"
    href="###"
    onClick={e => {
      e.preventDefault()
      e.stopPropagation()
      onClick(e, data)
    }}
    onMouseOver={e => {
      e.stopPropagation()
      onHover(e, data)
    }}
    onMouseOut={
      e => {
        e.stopPropagation()
        onOut(e)
      }
    }
    className={styles.code}
    data-value={data.value}
    data-lang={data.lang}
  />
)
Code.propTypes = {
  data: PropTypes.any.isRequired,
  onClick: PropTypes.func.isRequired,
  onHover: PropTypes.func.isRequired,
  onOut: PropTypes.func.isRequired
}

const Word = ({ data }) => <span className={styles.word}>{data.value}</span>
Word.propTypes = {
  data: PropTypes.any.isRequired
}

const WithCodeDisplay = ({ line, onClick, onCodeClick, onCodeHover, onCodeOut }) => {
  const codes = splitCode(line)
  return codes.map(
    (code, index) =>
      code.type === 'word' ? (
        <Word data={code} key={index} />
      ) : (
        <Code
          data={code}
          key={index}
          onClick={onCodeClick}
          onHover={onCodeHover}
          onOut={onCodeOut}
        />
      )
  )
}

WithCodeDisplay.propTypes = {
  line: PropTypes.string.isRequired,
  onCodeClick: PropTypes.func,
  onCodeHover: PropTypes.func,
  onCodeOut: PropTypes.func
}

WithCodeDisplay.defaultProps = {
  onCodeClick: (e, data) => {},
  onCodeHover: (e, data) => {},
  onCodeOut: (e, data) => {}
}

// --
const Line = ({
  index,
  line,
  version,
  displayCode = false,
  displayVersion,
  onClick,
  onCodeClick,
  onCodeHover,
  onCodeOut
}) => {
  return (
    <li className={styles.line} role="button">
      <div
        className={cx({
          [styles.lineContent]: true,
          [styles.hasVersion]: displayVersion
        })}
        onClick={function(e) {
          onClick(e, index, line.verseId, version)
        }}
        role="link"
        tabIndex="0"
      >
        {displayVersion ? (
          <div
            className={cx({ [styles.verseVersion]: true, show: true })}
            data-version={getVersion(version).abbr}
          />
        ) : null}
        <div className={styles.verseIndex} data-index={index} />
        <div className={styles.content}>
          {!displayCode ? (
            stripCode(line.text)
          ) : (
            <WithCodeDisplay
              line={line.text}
              onCodeClick={onCodeClick}
              onCodeHover={onCodeHover}
              onCodeOut={onCodeOut}
            />
          )}
        </div>
      </div>
    </li>
  )
}

Line.propTypes = {
  index: PropTypes.number.isRequired,
  line: PropTypes.shape({
    verseId: PropTypes.any,
    text: PropTypes.string
  }).isRequired,
  version: PropTypes.string,
  displayCode: PropTypes.bool.isRequired, // 是否显示原文编号
  displayVersion: PropTypes.bool,
  onClick: PropTypes.func,
  onCodeClick: PropTypes.func,
  onCodeHover: PropTypes.func,
  onCodeOut: PropTypes.func
}

Line.defaultProps = {
  onClick: verseIndex => {},
  onCodeClick: (e, data) => {},
  onCodeHover: (e, data) => {},
  onCodeOut: (e, data) => {},
  version: null,
  displayVersion: true
}

export default Line
