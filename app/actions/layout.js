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
export const tabAdd = (id, item) => ({
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
export const tabActivate = id => ({
  type: Types.TAB_ACTIVATE,
  id
})
