import { React, PropTypes, cx } from "app/bootstrap"; // eslint-disable-line
import uuid from 'uuid/v1';

const TabList = ({children, selectedId}) => {
  const keys = React.Children
    .toArray(children)
    .map(child => (child.key && child.key.substr(2)) || uuid());
  return (
    <div>
      {React.Children
        .toArray(children)
        .map((child, index) => (
          <child.type
            {...child.props}
            key={keys[index]}
            selected={(selectedId || keys[0]) === keys[index]}
          />
        ))}
    </div>
  );
};

const TabListChildCheckTypeFunc = (isRequired, props, propName, componentName, location) => {
  const prop = props[propName];
  if (!prop && isRequired) {
    return new Error(
      ("Required " + location + " `" + propName + "` was not specified in ") +
      ("`" + componentName + "`.")
    );
  }
  return (
    React.Children
      .toArray(prop)
      .find(child => child.type.displayName !== 'TabItem') &&
    new Error(`${componentName} only accepts "<TabItem />" elements`)
  );
}

TabListChildCheckTypeFunc.isRequired = TabListChildCheckTypeFunc.bind(null, true)

TabList.propTypes = {
  children: TabListChildCheckTypeFunc.isRequired,
  selectedId: PropTypes.string
}

TabList.defaultProps = {
  selectedId: null
}

export default TabList;
