// @flow
import React, { Component } from "react";
// import { Link } from 'react-router-dom';
// import { DatePicker, Button, Modal } from "antd";
import styles from "./Home.css";
// import NavPane from "./NavPane";
import GlobalComputedCss from "./GlobalComputedCss";
import SideBar from "./SideBar";

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
            primaryItems={[
              {
                text: "1",
                icon: "book",
                key: "book",
              },
              {
                text: "2",
                icon: "search",
                key: "search"
              },
              {
                text: "3",
                icon: "star",
                key: "favorite"
              },
              {
                text: "4",
                icon: "font",
                key: "origin"
              }
            ]}
          />
          <GlobalComputedCss />
        </div>
      </div>
    );
  }
}
