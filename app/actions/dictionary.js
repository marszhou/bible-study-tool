import * as db from '../utils/databases'
import { dictionarySelectors } from 'app/reducers'
import { getDictionaryId } from 'app/utils/dictionary';

export const Types = {
  DICT_QUERY_SUCCESS: 'DICT_QUERY_SUCCESS',
  DICT_POPUP_SHOW: 'DICT_POPUP_SHOW',
  DICT_POPUP_HIDE: 'DICT_POPUP_HIDE'
}

export const dictionaryQuery = (lang, type, no) => dispatch => {
  if ((type === 'code' && lang === 'WH') || lang === 'WG') {
    return db.dictionary.get(getDictionaryId(lang, no)).then(def => {
      dispatch({
        type: Types.DICT_QUERY_SUCCESS,
        def
      })
      return def
    })
  } else {
    return Promise.resolve()
  }
}

export const dictionaryPopdown = () => ({
  type: Types.DICT_POPUP_HIDE
})

export const dictionaryPopup = (node, id) => (dispatch, getState) => {
  // dispatch(dictionaryPopdown())
  setTimeout(() => {
    dispatch({
      type: Types.DICT_POPUP_SHOW, node, id
    })
  })
}
