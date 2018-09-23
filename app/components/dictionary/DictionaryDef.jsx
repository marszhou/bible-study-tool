import React from 'react'
import { Segment, Label, Image, Popup, List } from 'semantic-ui-react'
import { dictionaryDefCnEllipsis } from 'app/utils/dictionary'

const DictionaryDef = ({ def, onMoreClick }) => {
  const [cn, more] = dictionaryDefCnEllipsis(def.def_cn)
  return (
    <List>
      <List.Item>
        <Label horizontal color='red'>类型</Label>
        {def.classification}
      </List.Item>
      <List.Item>
        <Label horizontal color='purple'>拉丁文</Label>
        {def.latin_word}
      </List.Item>
      <List.Item>
        <Label horizontal color='violet'>英</Label>
        {def.def_word}
      </List.Item>
      <List.Item>
        <Label horizontal color='brown'>中</Label>
        <span
          dangerouslySetInnerHTML={{
            __html: cn
          }}
          onClick={e => {
            e.preventDefault()
            if (e.target.tagName === 'A' && e.target.classList.contains('more')) {
              onMoreClick()
            }
          }}
        />
      </List.Item>
    </List>
  )
}

export default DictionaryDef
