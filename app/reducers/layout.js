import { combineReducers } from 'redux'
import _ from 'lodash'
import pathToRegexp from 'path-to-regexp'
import { Types } from '../actions/layout'

const on = (state = false, action) => {
  if (action.type === Types.DISPLAY_SPLIT_PANE) {
    return action.on
  }
  return state
}

const size = (state = 0, action) => {
  if (action.type === Types.SET_SPLIT_PANE_SIZE) {
    return action.size
  }
  return state
}

const splitPane = combineReducers({ on, size })

const byId = (state = {}, action) => {
  const re = pathToRegexp('/bible/:tabId/:bookId?/:chapterIndex?')

  switch (action.type) {
    case '@@router/LOCATION_CHANGE':
      console.log(action.payload.location.pathname)
      return state
    case Types.TAB_ADD:
      return {
        ...state,
        [action.item.id]: action.item
      }
    case Types.TAB_REMOVE: {
    const nextState = { ...state }
      delete nextState[action.id]
      return nextState
    }
    default:
      return state
  }
}

const order = (state = [], action) => {
  switch (action.type) {
    case Types.TAB_ADD:
      return [...state, action.item.id]
    case Types.TAB_REMOVE:
      return state.filter(id => id !== action.id)
    case Types.TAB_SORT:
      return action.ids
    default:
      return state
  }
}

const activate = (beforeOrderList = []) => (state = null, action) => {
  switch (action.type) {
    case Types.TAB_ADD: {
      return action.item.id
    }
    case Types.TAB_REMOVE: {
      if (action.id === state) {
        const index = beforeOrderList.findIndex(id => id === action.id)
        return beforeOrderList[index - 1] || beforeOrderList[index + 1]
      } else {
        return state
      }
    }
    case Types.TAB_ACTIVATE:
      return action.id
    default:
      return state
  }
}

const tabs = (state = {}, action) => {
  const reducers = combineReducers({
    byId,
    order
  })
  const nextState = reducers(_.pick(state, 'byId', 'order'), action)
  nextState.activate = activate(state.order)(state.activate, action)
  return nextState
}

const layout = combineReducers({ splitPane, tabs })

export default layout

// ↓↓↓↓ selectors ↓↓↓↓
export const getSplitPaneIsDisplay = state => state.splitPane.on
export const getSplitPaneSize = state => state.splitPane.size
export const getTabs = state => state.tabs.order.map(id => state.tabs.byId[id])
export const getActiveTabIndex = state =>
  state.tabs.order.findIndex(id => id === state.tabs.activate)
export const getActived = state => state.tabs.activate
