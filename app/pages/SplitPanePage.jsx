import { React, PropTypes, cx } from 'app/bootstrap'; // eslint-disable-line
import SplitPane from 'react-split-pane';
import {
  Tabs,
  TabControl,
  TabControlList,
  TabHead,
  TabPanel,
  TabPanelList,
  TabTitle,
  TabTitleList
} from '../components/tabs';

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
          <TabHead>
            <TabControlList type="front" />
            <TabTitleList>
              <TabTitle>111</TabTitle>
              <TabTitle>222</TabTitle>
            </TabTitleList>
            <TabControlList type="rear" />
          </TabHead>
          <TabPanelList>
            <TabPanel>AAA</TabPanel>
            <TabPanel>BBB</TabPanel>
          </TabPanelList>
        </Tabs>
        <div />
      </SplitPane>
    );
  }
}

export default SplitPanePage;
