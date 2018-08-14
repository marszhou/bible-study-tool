import React, { Component } from 'react'
import Main from '../components/Main'
import GlobalComputedCss from '../components/GlobalComputedCss'

export default class HomePage extends Component {
  state = {}

  componentDidMount() {
    const cssLoaded = e => this.setState({ cssLoaded: true })

    Promise.all(
      Array.prototype.slice
        .call(document.querySelectorAll('link[rel="stylesheet"]'))
        .map(
          el =>
            new Promise((resolve, reject) => {
              el.addEventListener('load', () => {
                resolve()
              })
            })
        )
    )
      .then(cssLoaded)
      .catch(cssLoaded)
  }

  render() {
    const { cssLoaded } = this.state
    return cssLoaded ? (
      <div>
        <GlobalComputedCss />
        <Main />
      </div>
    ) : null
  }
}
