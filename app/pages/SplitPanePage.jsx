import { React, PropTypes, cx } from 'app/bootstrap'; // eslint-disable-line
import SplitPane from 'react-split-pane';
import TabPane from '../components/TabPane'

class SplitPanePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: null,
    };
  }

  handleTabClick(id) {
    this.setState({
      selectedId: id,
    });
  }

  render() {
    return (
      <SplitPane
        split="vertical"
        defaultSize={200}
        minSize="100"
        primary="second"
        onChange={() => this.tabPane.handleResize()}
      >
        <TabPane ref={tabPane => this.tabPane = tabPane} />
        <div />
      </SplitPane>
    );
  }
}

export default SplitPanePage;
