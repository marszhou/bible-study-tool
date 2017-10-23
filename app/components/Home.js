// @flow
import React, { Component } from "react";
// import { Link } from 'react-router-dom';
import { DatePicker, Button, Modal } from "antd";
import styles from "./Home.css";
import NavPane from "./NavPane";
import GlobalComputedCss from './GlobalComputedCss';

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
          <GlobalComputedCss />
          <div className="my-class">mmm</div>
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
          <i className="fa fa-address-book" aria-hidden="true" />
        </div>
      </div>
    );
  }
}
