import React from 'react';

export default class extends React.Component {
  componentWillMount() {
    window.addEventListener('resize', this.handleSizeChange)
  }

  handleSizeChange = () => {
    this.forceUpdate()
  }

  render() {
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
          `
        }
      </style>
    )
  }
}
