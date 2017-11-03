import { React, PropTypes, cx, update } from 'app/bootstrap'; // eslint-disable-line
import SplitPane from 'react-split-pane';
import uuid from 'uuid/v1'
import { TabPane } from '../components/tabs';

class SplitPanePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: null,
      items: [
        {
          id: '1',
          title: 'aaa',
          props: {
            content: 'test',
          },
        },
      ],
    };
  }

  genNewItem() {
    return {
      id: uuid(),
      title: uuid(),
      props: {
        content: 'test ' + uuid()
      }
    }
  }

  handleTabClick(id) {
    this.setState({
      selectedId: id,
    });
  }

  handleAddClick = () => {
    console.log('add')

    this.setState(update(this.state, {
      items: {
        $push: [this.genNewItem()]
      }
    }), this.tabPane.handleResize);
  }

  render() {
    const { items } = this.state;

    return (
      <SplitPane
        split="vertical"
        defaultSize={200}
        minSize="100"
        primary="second"
        onChange={() => this.tabPane.handleResize()}
      >
        <div>
          <TabPane
            ref={tabPane => (this.tabPane = tabPane)}
            items={items}
            bodyRendererComponent={({ content }) => <div>{content}</div>}
          />
          <button onClick={this.handleAddClick}>add</button>
        </div>
        <div />
      </SplitPane>
    );
  }
}

export default SplitPanePage;
