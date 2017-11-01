import { React, PropTypes, cx } from 'app/bootstrap'; // eslint-disable-line
import styles from './styles.css';

export default function getComponent(
  displayName,
  defaultClassName,
  htmlTag = 'div',
) {
  const Component = ({ children, classNames, style, ...rest }) => {
    const defaultClassNames = Array.isArray(defaultClassName)
      ? defaultClassName.reduce((ret, c) => {
          ret[styles[c]] = true;
          return ret;
        }, {})
      : { [styles[defaultClassName]]: true };
    // const defaultClassNames = { [styles[defaultClassName]]: true }
    return React.createElement(
      htmlTag,
      {
        className: cx({
          ...defaultClassNames,
          ...classNames,
        }),
        style,
        ...rest
      },
      children,
    );
  };

  Component.propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    classNames: PropTypes.object,
    style: PropTypes.object,
  };

  Component.defaultProps = {
    children: null,
    classNames: {},
    style: {},
  };

  Component.displayName = displayName;

  return Component;
}
