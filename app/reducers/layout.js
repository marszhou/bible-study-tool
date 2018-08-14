import { combineReducers } from 'redux'
import _ from 'lodash'
import { Types } from '../actions/layout'
import { parseUrlParams } from '../utils/url'

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

const parseUrl = action =>
  parseUrlParams(
    '/bible/:tabId/:bookId?/:chapterIndex?',
    action.payload.location.pathname
  )

const byId = (state = {}, action) => {
  switch (action.type) {
    case '@@router/LOCATION_CHANGE': {
      const match = parseUrl(action)
      if (match.tabId) {
        return {
          ...state,
          [match.tabId]: {
            id: match.tabId,
            bookId: match.bookId,
            chapterIndex: +match.chapterIndex
          }
        }
      }
      return state
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
    case '@@router/LOCATION_CHANGE': {
      const match = parseUrl(action)
      if (match.tabId && state.indexOf(match.tabId) === -1) {
        return [...state, match.tabId]
      }
      return state
    }
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
    case '@@router/LOCATION_CHANGE': {
      const match = parseUrl(action)
      return match.tabId || state
    }
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
export const getTab = (state, id) => state.tabs.byId[id]
