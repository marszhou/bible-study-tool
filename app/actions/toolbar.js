import { bibleSelectors, layoutSelectors } from 'app/reducers'

const { clipboard } = require('electron')

import { ToastStore } from 'react-toasts'

export const Types = {
  TOGGLE_DONT_DISTURB: 'TOGGLE_DONT_DISTURB',
  SET_DONT_DISTURB: 'SET_DONT_DISTURB'
}

export const toggleDontDisturb = () => ({
  type: Types.TOGGLE_DONT_DISTURB
})

export const setDontDisturb = value => ({
  type: Types.SET_DONT_DISTURB,
  value
})

export const doCopyVerses = tabId => (dispatch, getState) => {
  const state = getState()
  const activatedTab = layoutSelectors.getActivatedTab(state)
  const selectedVerses = bibleSelectors.getSelectedVersesByTabId(state, tabId)
  const versions = bibleSelectors.getVersionsByTabId(state, tabId)

  if (selectedVerses.length === 0) return

  const text = bibleSelectors.getCopyVerseText(
    state,
    activatedTab.bookId,
    activatedTab.chapter,
    selectedVerses,
    versions
  )

  // console.log(text)

  ToastStore.success('复制成功！')
  clipboard.writeText(text)
}
