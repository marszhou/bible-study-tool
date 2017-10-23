// @flow
import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { DatePicker,  Modal, Button } from 'antd';
import styles from './Home.css';
import NavPane from './NavPane';

export default class Home extends Component {
  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <NavPane />
          <DatePicker />

        </div>
      </div>
    );
  }
}
