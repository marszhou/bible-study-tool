import {Types} from '../actions/spotLight'
import {combineReducers} from 'redux'

const show = (state = false, action) => {
  switch (action.type) {
    case Types.SPOT_LIGHT_SHOW:
      return true
    case Types.SPOT_LIGHT_HIDE:
      return false
    default:
      return state
  }
}

const reducers = combineReducers({
  show
})

export default reducers

//

export const getSpotLightShow = state => state.show
