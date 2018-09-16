import { bibleSelectors } from 'app/reducers'
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

const getCopyVerseText = (selectedVerses, versions, state) => {
  return '123'
}

export const doCopyVerses = tabId => (dispatch, getState) => {
  const state = getState()
  const selectedVerses = bibleSelectors.getSelectedVersesByTabId(state, tabId)
  const versions = bibleSelectors.getVersionsByTabId(state, tabId)

  const text = getCopyVerseText(selectedVerses, versions, state)

  ToastStore.success('复制成功！')
  clipboard.writeText(text)
}
