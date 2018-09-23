import React from 'react'
import {
  Button,
  Dimmer,
  Header,
  Icon,
  Grid,
  Segment,

} from 'semantic-ui-react'
import { connect } from 'react-redux'
import * as dictionaryActions from '../../actions/dictionary'
import { dictionarySelectors } from 'app/reducers'
import DictionaryDef from 'app/components/dictionary/DictionaryDef'

const DictionaryMore = ({ def, dictionaryCloseMore }) => {
  return (
    <Dimmer active={!!def} onClickOutside={dictionaryCloseMore} page>
      {def ? (
        <div className='max-client-height' style={{textAlign: 'left', overflowY: 'auto', overflowX: 'hidden'}}>
          <Header inverted>
            <Grid columns={3}>
              <Grid.Row>
                <Grid.Column>{def.str_no}</Grid.Column>
                <Grid.Column>{def.bible_word}</Grid.Column>
                <Grid.Column textAlign="right">
                  <Button icon="share" size="mini" />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Header>
          <DictionaryDef def={def} />
        </div>
      ) : null}
    </Dimmer>
  )
}

export default connect(
  state => ({
    def: dictionarySelectors.getPopupMore(state)
  }),
  {
    ...dictionaryActions
  }
)(DictionaryMore)
