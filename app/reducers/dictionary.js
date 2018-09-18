import { combineReducers } from 'redux'
import { Types } from '../actions/dictionary'

const byId = (state = {}, action) => {
  if (!action.response) return state
  switch (action.type) {
    case Types.DICT_QUERY_SUCCESS:
      return {
        ...state,
        [action.response.str_no]: action.response
      }
    default:
      return state
  }
}

export default combineReducers({
  byId
})
