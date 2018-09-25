import React, { Component } from 'react'
import Main from '../components/Main'
import GlobalComputedCss from '../components/GlobalComputedCss'
import { ToastContainer, ToastStore } from 'react-toasts'
import SpotLight from 'app/components/spotlight/SpotLight'
import { remote, ipcRenderer } from 'electron'
import { connect } from 'react-redux'
import * as spotLightActions from '../actions/spotLight'

class HomePage extends Component {
  state = {}

  componentDidMount() {
    ipcRenderer.on('spotLight', this.handleSpotLight)

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

  componentWillUnmount() {
    ipcRenderer.removeAllListeners('spotLight')
  }

  handleSpotLight = () => {
    this.props.spotLightShow()
  }

  render() {
    const { cssLoaded } = this.state
    return cssLoaded ? (
      <div>
        <ToastContainer store={ToastStore} />
        <Main />
        <GlobalComputedCss />
        <SpotLight />
      </div>
    ) : null
  }
}

export default connect(
  null,
  { ...spotLightActions }
)(HomePage)
