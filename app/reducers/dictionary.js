import { combineReducers } from 'redux'
import { Types } from '../actions/dictionary'

const byId = (state = {}, action) => {
  if (!action.def) return state
  switch (action.type) {
    case Types.DICT_QUERY_SUCCESS:
      return {
        ...state,
        [action.def.str_no]: action.def
      }
    default:
      return state
  }
}

export default combineReducers({
  byId
})

//

export const getDefById = (state, id) => state.byId[id]
