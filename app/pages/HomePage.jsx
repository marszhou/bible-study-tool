import React, { Component } from 'react'
import Main from '../components/Main'
import GlobalComputedCss from '../components/GlobalComputedCss'
import {ToastContainer, ToastStore} from 'react-toasts';

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
        <ToastContainer store={ToastStore} />
        <Main />
        <GlobalComputedCss />
      </div>
    ) : null
  }
}
