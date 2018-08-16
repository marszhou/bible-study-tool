import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styles from './styles.css'

class BibleView extends Component {
  static propTypes = {}

  static defaultProps = {}

  render() {
    return (
        <div
          className={'bible-view-height ' + styles.bibleView}
          ref={el => (this.el = el)}
        >
          content
        </div>
    )
  }
}

export default BibleView
