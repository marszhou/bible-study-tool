// @flow
import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import { DatePicker, Button, Modal } from "antd";
import styles from './Home.css';
// import NavPane from "./NavPane";
import GlobalComputedCss from './GlobalComputedCss';
import SideBar from './SideBar';
import BibleSelector from './bible-selector/BibleSelector';

import Modal from './common/Modal';

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
                text: '圣经',
                icon: 'book',
                key: 'book',
              },
              {
                text: '搜索',
                icon: 'search',
                key: 'search',
              },
              {
                text: '我的收藏',
                icon: 'star',
                key: 'favorite',
              },
              {
                text: '原文字典',
                icon: 'font',
                key: 'origin',
              },
            ]}
            toolItems={[
              {
                text: 'GitHub',
                icon: 'github',
                key: 'github',
              },
              {
                text: '设置',
                icon: 'cog',
                key: 'preference',
              },
            ]}
          />
          <div className="content">
            <BibleSelector
              bookGroups={[
                {
                  id: 1,
                  name: '旧约',
                  books: [
                    {
                      id: 1,
                      name: '创世纪',
                      chapterCount: 50,
                    },
                    {
                      id: 2,
                      name: '出埃及记',
                      chapterCount: 40,
                    },
                    {
                      id: 3,
                      name: '利未记',
                      chapterCount: 27,
                    },
                  ],
                },
                {
                  id: 2,
                  name: '新约',
                  books: [
                    {
                      id: 100,
                      name: '马太福音',
                      chapterCount: 28,
                    },
                    {
                      id: 101,
                      name: '马可福音',
                      chapterCount: 16,
                    },
                    {
                      id: 102,
                      name: '路加福音',
                      chapterCount: 24,
                    },
                    {
                      id: 103,
                      name: '约翰福音',
                      chapterCount: 21,
                    },
                  ],
                },
              ]}
            />
          </div>
          <GlobalComputedCss />
        </div>
      </div>
    );
  }
}
