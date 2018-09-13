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
