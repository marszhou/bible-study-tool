// @flow
import React, { Component } from "react";
// import { Link } from 'react-router-dom';
import { DatePicker, Button, Modal } from "antd";
import styles from "./Home.css";
import NavPane from "./NavPane";

export default class Home extends Component {
  props: {};
  state: {visible: boolean};
  constructor(props: {}) {
    super(props);
    this.state = {
      visible: false
    }
  }

  showModal = () => {
    this.setState({visible: true})
    // console.log(1)
  };

  handleOk = () => {
    this.setState({visible: false})
  };

  handleCancel = () => {
    this.setState({visible: false})
  };

  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <NavPane />
          <DatePicker />
          <Button type="primary" onClick={this.showModal}>
            Open
          </Button>
          <Modal
            title="Basic Modal"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>
        </div>
      </div>
    );
  }
}
