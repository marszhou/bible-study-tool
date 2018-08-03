import React, { Component } from 'react';
import {connect} from 'react-redux'

const getConnectedBibleView = (tabId) => {
  class BibleView extends Component {
    render() {
      return (
        <div>
          aaa1
        </div>
      );
    }
  }

  return connect()(BibleView)
}

export default getConnectedBibleView



