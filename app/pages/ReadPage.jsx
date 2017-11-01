import { React, PropTypes, cx } from 'app/bootstrap'; // eslint-disable-line
// import { Tab } from 'semantic-ui-react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const panes = [
  { menuItem: 'Tab 1', pane: 'Tab 1 Content' },
  { menuItem: 'Tab 2', pane: 'Tab 2 Content' },
  { menuItem: 'Tab 3', pane: 'Tab 3 Content' },
];

class ReadPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // return <Tab panes={panes} renderActiveOnly={false} />
    return (
      <Tabs>
        <TabList>
          <Tab>Title 1</Tab>
          <Tab>Title 2</Tab>
        </TabList>

        <TabPanel>
          <h2>Any content 1</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
      </Tabs>
    );
  }
}

export default ReadPage;
