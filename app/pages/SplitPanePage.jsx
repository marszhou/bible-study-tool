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
  TabTitleList,
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
        <Tabs selectedId="world">
          <TabHead>
            <TabControlList type="front">
              <TabControl>A</TabControl>
              <TabControl>B</TabControl>
            </TabControlList>
            <TabTitleList>
              <TabTitle id="hello">111</TabTitle>
              <TabTitle id="world">222</TabTitle>
            </TabTitleList>
            <TabControlList type="rear" />
          </TabHead>
          <TabPanelList>
            <TabPanel id="hello">AAA</TabPanel>
            <TabPanel id="world">BBB</TabPanel>
          </TabPanelList>
        </Tabs>
        <div />
      </SplitPane>
    );
  }
}

export default SplitPanePage;
