import React, { Component } from 'react';
import BibleSelector from '../components/bible-selector/BibleSelector';

export default class BibleSelectorPage extends Component {
  props: {};
  state: { visible: boolean, bookId: number, listStyle: string };
  constructor(props: {}) {
    super(props);
    this.state = {
      visible: false,
      bookId: 0,
      listStyle: 'list',
    };
  }

  handleBibleSelectorChange = (change: {}) => {
    this.setState(change);
  };

  render() {
    const {bookId, chapter, verse, listStyle} = this.state
    return (
      <BibleSelector
        bookId={bookId}
        chapter={chapter}
        verse={verse}
        onChange={this.handleBibleSelectorChange}
        bookListStyle={listStyle}
        onBookListStyleToggle={() =>
          this.setState({
            listStyle: listStyle === 'list' ? 'grid' : 'list',
          })}
        columnClassNames={{
          'client-height': true,
        }}
      />
    );
  }
}
