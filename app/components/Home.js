// @flow
import React, { Component } from "react";
// import { Link } from 'react-router-dom';
// import { DatePicker, Button, Modal } from "antd";
import styles from "./Home.css";
// import NavPane from "./NavPane";
import GlobalComputedCss from "./GlobalComputedCss";
import SideBar from "./SideBar";
import BibleSelector from "./bible-selector/BibleSelector"

export default class Home extends Component {
  props: {};
  state: { visible: boolean };
  constructor(props: {}) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <SideBar
            style={{ width: 48 }}
            onItemClick={(type, index) => console.log(type, index)}
            primaryItems={[
              {
                text: "圣经",
                icon: "book",
                key: "book",
              },
              {
                text: "搜索",
                icon: "search",
                key: "search",
              },
              {
                text: "我的收藏",
                icon: "star",
                key: "favorite",
              },
              {
                text: "原文字典",
                icon: "font",
                key: "origin",
              },
            ]}
            toolItems={[
              {
                text: "GitHub",
                icon: "github",
                key: "github",
              },
              {
                text: "设置",
                icon: "cog",
                key: "preference",
              },
            ]}
          />
          <div className='content'>
            <BibleSelector />
          </div>
          <GlobalComputedCss />
        </div>
      </div>
    );
  }
}
