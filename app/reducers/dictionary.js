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

const popupNode = (state = null, action) => {
  switch (action.type) {
    case Types.DICT_POPUP_HIDE:
      return null
    case Types.DICT_POPUP_SHOW:
      return action.node
    default:
      return state
  }
}

const popupId = (state = null, action) => {
  switch (action.type) {
    case Types.DICT_POPUP_HIDE:
      return null
    case Types.DICT_POPUP_SHOW:
      return action.id
    default:
      return state
  }
}

const popupMore = (state=null, action) => {
  switch (action.type) {
    case Types.DICT_POPUP_MORE:
      return action.def
    case Types.DICT_POPUP_MORE_OFF:
      return null
    default:
      return state
  }
}

export default combineReducers({
  byId,
  popupNode,
  popupId,
  popupMore
})

//

export const getDefById = (state, id) => state.byId[id]
export const getPopupNode = state => state.popupNode
export const getPopupDef = state => getDefById(state, state.popupId)
export const getPopupMore = state => state.popupMore
