import { React, PropTypes, cx } from "app/bootstrap"; // eslint-disable-line

function normalDisplay(content) {
  return React.createElement('li', {}, [content]);
}

function withCodeDisplay(content) {
  return React.createElement('li', {}, [content]);
}

const Line = ({content, displayCode =  false}) => {
  return displayCode ? normalDisplay(content) : withCodeDisplay(content);
}

Line.propTypes = {
  content: PropTypes.string.isRequired,
  displayCode: PropTypes.bool.isRequired
}

export default Line;
