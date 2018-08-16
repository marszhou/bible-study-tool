import React from 'react';
import {connect} from 'react-redux'

class GlobalComputedCss extends React.Component {
  componentWillMount() {
    window.addEventListener('resize', this.handleSizeChange)
  }

  handleSizeChange = () => {
    this.forceUpdate()
  }

  render() {
    const bibleView = document.querySelector('.bible-view-height')
    const rect = bibleView && bibleView.getBoundingClientRect()
    console.log(rect)
    return (
      <style>
        {
          `
          .client-height {
            height: ${window.document.documentElement.clientHeight}px;
          }
          .client-width {
            width: ${window.document.documentElement.clientWidth}px;
          }
          .bible-selector-height {
            height: 400px;
          }
          .bible-view-height {
            height: ${window.document.documentElement.clientHeight - 113}px;
          }
          `
        }
      </style>
    )
  }
}

export default connect()(GlobalComputedCss)
