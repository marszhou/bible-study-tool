import * as db from '../utils/databases'
import { dictionarySelectors } from 'app/reducers'

export const Types = {
  DICT_QUERY_SUCCESS: 'DICT_QUERY_SUCCESS',
  DICT_POPUP_SHOW: 'DICT_POPUP_SHOW',
  DICT_POPUP_HIDE: 'DICT_POPUP_HIDE'
}

const getId = (lang, no) => (lang === 'WH' ? 'H' : 'G') + no

export const dictionaryQuery = (lang, type, no) => dispatch => {
  if ((type === 'code' && lang === 'WH') || lang === 'WG') {
    return db.dictionary.get(getId(lang, no)).then(def => {
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

export const dictionaryPopup = (lang, type, no) => (dispatch, getState) => {
  const def = dictionarySelectors.getDefById(getState(), getId(lang, no))
  if (def) {
    dispatch({
      type: Types.DICT_POPUP_SHOW,
      def
    })
  } else {
    return dispatch(dictionaryQuery(lang, type, no)).then(def => {
      console(def)
    })
  }
}
