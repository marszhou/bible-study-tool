import {combineReducers} from 'redux'
import {Types} from '../actions/toolbar'

const dontDisturb = (state = true, action) => {
  switch(action.type) {
    case Types.TOGGLE_DONT_DISTURB:
      return !state
    case Types.SET_DONT_DISTURB:
      return action.value
    default:
      return state
  }
}

const toolbar = combineReducers({
  dontDisturb
})

export default toolbar
