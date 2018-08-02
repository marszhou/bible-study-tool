import { React, PropTypes, cx, Component, Route, Link } from 'app/bootstrap' // eslint-disable-line
import styles from './Home.css'
import GlobalComputedCss from './GlobalComputedCss'
import SideBar from './side-bar/SideBar'
import Samples from '../pages/Samples'

export default class Home extends Component {
  state = {}

  componentDidMount() {
    const cssLoaded = e => this.setState({cssLoaded: true})

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

  renderSideBar() {
    return (
      <SideBar
        style={{ width: 48 }}
        onItemClick={(type, index) => console.log(type, index)}
        primaryItems={[
          {
            text: '圣经',
            icon: 'book',
            key: 'book'
          },
          {
            text: '搜索',
            icon: 'search',
            key: 'search'
          },
          {
            text: '我的收藏',
            icon: 'star',
            key: 'favorite'
          },
          {
            text: '原文字典',
            icon: 'font',
            key: 'origin'
          }
        ]}
        toolItems={[
          {
            text: 'GitHub',
            icon: 'github',
            key: 'github'
          },
          {
            text: '设置',
            icon: 'cog',
            key: 'preference'
          }
        ]}
      />
    )
  }

  render() {
    const { cssLoaded } = this.state
    return cssLoaded ? (
      <div>
        <div className={styles.container} data-tid="container">
          {this.renderSideBar()}
          <div className="bst-content">
            <Samples />
          </div>
          <GlobalComputedCss />
        </div>
      </div>
    ) : null
  }
}
