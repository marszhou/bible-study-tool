import { layoutSelectors } from "app/reducers";
import { push } from 'connected-react-router'
import { v1} from 'uuid'

export const Types = {
  DISPLAY_SPLIT_PANE: 'DISPLAY_SPLIT_PANE',
  SET_SPLIT_PANE_SIZE: 'SET_SPLIT_PANE_SIZE',
  TAB_ADD: 'TAB_ADD',
  TAB_REMOVE: 'TAB_REMOVE',
  TAB_SORT: 'TAB_SORT',
  TAB_ACTIVATE: 'TAB_ACTIVATE'
}
export const displaySplitPane = (on = false) => ({
  type: Types.DISPLAY_SPLIT_PANE,
  on
})
export const setSplitPaneSize = size => ({
  type: Types.SET_SPLIT_PANE_SIZE,
  size
})
export const tabNew = () => (dispatch) => {
  dispatch(push('/bible/'+ v1()))
}
export const tabAdd = (item) => ({
  type: Types.TAB_ADD,
  item
})
export const tabRemove = id => ({
  type: Types.TAB_REMOVE,
  id
})
export const tabSort = orderList => ({
  type: Types.TAB_SORT,
  ids: orderList
})
export const tabActivate = (id) => (dispatch, getState) => {
  const state = getState()
  const tabItem = layoutSelectors.getTab(state, id)
  dispatch(push(makeTabUrl(tabItem)))
}
export const tabInit = (newItem) => (dispatch, getState) => {
  if (layoutSelectors.getTabs(getState()).length === 0) {
    dispatch(tabAdd(newItem))
  }
}

const makeTabUrl = (tabItem) => {
  let url = `/bible/${tabItem.id}`
  if (tabItem.bookId) {
    url += `${url}/${tabItem.bookId}/${tabItem.chapterIndex}}`
  }
  return url
}
