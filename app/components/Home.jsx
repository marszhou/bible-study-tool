import { React, PropTypes, cx, Component, Route, Link } from 'app/bootstrap' // eslint-disable-line
import styles from './Home.css'
import GlobalComputedCss from './GlobalComputedCss'
import SideBar from './side-bar/SideBar'
import Samples from './Samples'

export default class Home extends Component {
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
    return (
      <div>
        <div className={styles.container} data-tid="container">
          {this.renderSideBar()}
          <div className="content">
            <Samples />
          </div>
          <GlobalComputedCss />
        </div>
      </div>
    )
  }
}
