import React from 'react';

export default class extends React.Component {
  componentWillMount() {
    console.log(window);
    window.addEventListener('resize', this.handleSizeChange)
  }

  componentWillUnmount() {

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
          `
        }
      </style>
    )
  }
}
