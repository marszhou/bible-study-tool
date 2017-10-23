// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.css';
import NavPane from './NavPane';
import { DatePicker } from 'antd';

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
