import React, { Component } from 'react'
import { Popup, Ref, Loader } from 'semantic-ui-react'
import { connect } from 'react-redux'
import * as dictionaryActions from '../../actions/dictionary'
import { dictionarySelectors } from 'app/reducers'
import { isDescendant } from 'app/utils/dom'

class DictionaryPopup extends Component {
  componentWillMount() {
    document.documentElement.addEventListener('click', this.handleGlobalClick)
  }

  componentWillUnmount() {
    document.documentElement.removeEventListener(
      'click',
      this.handleGlobalClick
    )
  }

  handleGlobalClick = e => {
    if (!isDescendant(this.popup, e.target)) {
      const { dictionaryPopdown } = this.props
      dictionaryPopdown()
    }
  }

  render() {
    const { contextNode, def } = this.props
    return contextNode ? (
      <Ref innerRef={ref => (this.popup = ref)}>
        {!def ? (
          <Popup key='loading' context={contextNode} open wide>
            <Loader active inline size="mini" />
          </Popup>
        ) : (
          <Popup key='def' context={contextNode} open wide>
            <div style={{ width: 400 }}>
              星哭杀杂式似周过量岁特餐唱继转海公？度工汉灯突病食任成视刻击规试块到致？肉活棋念台藏还哥关伯依索东像供演取业穿。杰牛少预鞋解问唱钱超样份尽江？杂泪较姑北卡买！战地授情应！从客冲者层致负再！惊情久设居遍师闻关经背热众。疑雷息无果专洋顺烟达士。由甚守介德景象？克为袋授写琴的世黄不河高苦队海短。势例德鲁帝险坏复！线句贵琴编规古酒？节善务主明合从乱！秋梦界留还！迷究精曾听诗据连其则百及处动群宣。养权副达。
            </div>
          </Popup>
        )}
      </Ref>
    ) : null
  }
}

DictionaryPopup = connect(
  state => ({
    contextNode: dictionarySelectors.getPopupNode(state),
    def: dictionarySelectors.getPopupDef(state)
  }),
  { ...dictionaryActions }
)(DictionaryPopup)

export default DictionaryPopup
