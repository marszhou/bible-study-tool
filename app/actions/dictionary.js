import * as db from '../utils/databases'

export const Types = {
  DICT_QUERY_SUCCESS: 'DICT_QUERY_SUCCESS',
}

export const dictionaryQuery = (lang, type, no) => dispatch => {
  if ((type === 'code' && lang === 'WH') || lang === 'WG') {
    return db.dictionary.get((lang === 'WH' ? 'H' : 'G') + no).then(response => dispatch({
      type: Types.DICT_QUERY_SUCCESS,
      response
    }))
  } else {
    return Promise.resolve()
  }
}
