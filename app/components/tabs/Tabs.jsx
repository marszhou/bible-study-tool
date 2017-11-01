import { React, PropTypes, cx } from 'app/bootstrap'; // eslint-disable-line
import styles from './styles.css';
import {
  TabControl,
  TabControlList,
  TabHead,
  TabPanel,
  TabPanelList,
  TabTitle,
  TabTitleList
} from './index';

class Tabs extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    selectedId: PropTypes.string,
  };

  static defaultProps = {
    children: null,
    selectedId: null,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { children, selectedId } = this.props;

    return (
      <div className={styles.Tabs}>
        111
      </div>
    );

    // return (
    //   <div className={styles.Tabs}>
    //     {React.Children.toArray(children).map(child => {
    //       switch (true) {
    //         case child.type.displayName === 'TabControls':
    //           return React.cloneElement(child);
    //         case child.type.displayName === 'TabList':
    //           return React.cloneElement(
    //             child,
    //             {
    //               ...child.props,
    //               selectedId,
    //             }
    //           );
    //         default:
    //           return null;
    //       }
    //     })}
    //   </div>
    // );
  }
}

export default Tabs;
