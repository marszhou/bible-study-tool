import { React, PropTypes, cx, update } from 'app/bootstrap'; // eslint-disable-line
import SplitPane from 'react-split-pane';
import uuid from 'uuid/v1';
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
        content: 'test ' + uuid(),
      },
    };
  }

  handleAddClick = () => {
    this.setState(
      update(this.state, {
        items: {
          $push: [this.genNewItem()],
        },
      }),
      this.tabPane.handleResize,
    );
  };

  handleTabClick = itemId => {
    this.setState({
      selectedId: itemId,
    });
  };

  handleTabClose = itemId => {
    const { items, selectedId } = this.state;
    const nextItems = items.filter(item => item.id !== itemId);
    let nextSelectedId = selectedId;
    if (itemId === selectedId) {
      const findIndex = items.findIndex(item => item.id === itemId);
      const prevItem =
        findIndex - 1 > -1
          ? items[findIndex - 1]
          : findIndex + 1 < items.length ? items[findIndex + 1] : null;
      nextSelectedId = (prevItem || {}).id;
    }
    this.setState(
      {
        items: nextItems,
        selectedId: nextSelectedId,
      },
      this.tabPane.handleResize,
    );
  };

  render() {
    const { items, selectedId } = this.state;

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
            selectedId={selectedId}
            bodyRendererComponent={({ content }) => <div>{content}</div>}
            onTabClick={this.handleTabClick}
            onTabClose={this.handleTabClose}
          />
          <button onClick={this.handleAddClick}>add</button>
        </div>
        <div />
      </SplitPane>
    );
  }
}

export default SplitPanePage;
