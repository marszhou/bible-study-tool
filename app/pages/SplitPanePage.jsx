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
      >
        <Tabs selectedId={this.state.selectedId}>
          <TabHead>
            <TabControlList type="front">
              <TabControl onClick={() => console.log('aaa')}>A</TabControl>
              <TabControl>B</TabControl>
            </TabControlList>
            <TabTitleList>
              {[...Array(10)].map((v, index) => (
                <TabTitle id={index + ''} key={index}>
                  {index}
                </TabTitle>
              ))}
            </TabTitleList>
            <TabControlList type="rear">
              <TabControl onClick={() => console.log('aaa')}>A</TabControl>
              <TabControl>B</TabControl>
            </TabControlList>
          </TabHead>
          <TabPanelList>
            {[...Array(10)].map((v, index) => (
              <TabPanel id={index + ''} key={index}>
                {index}
              </TabPanel>
            ))}
          </TabPanelList>
        </Tabs>
        <div />
      </SplitPane>
    );
  }
}

export default SplitPanePage;
