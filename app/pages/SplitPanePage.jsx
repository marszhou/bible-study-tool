import { React, PropTypes, cx } from 'app/bootstrap'; // eslint-disable-line
import SplitPane from 'react-split-pane';
import { Tabs, TabItem, TabTitle, TabPanel, TabList, TabControls } from '../components/tabs';

class SplitPanePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SplitPane
        split="vertical"
        defaultSize={200}
        minSize="100"
        primary="second"
      >
        <Tabs>
          <TabControls />
          <TabList>
            <TabItem key='xxxxx'>
              <TabTitle>test</TabTitle>
              <TabPanel>test</TabPanel>
            </TabItem>
            <TabItem>
              <TabTitle>test2</TabTitle>
              <TabPanel>test2</TabPanel>
            </TabItem>
          </TabList>
        </Tabs>
        <div />
      </SplitPane>
    );
  }
}

export default SplitPanePage;
