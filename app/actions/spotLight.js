export const Types = {
  SPOT_LIGHT_SHOW: 'SPOT_LIGHT_SHOW',
  SPOT_LIGHT_HIDE: 'SPOT_LIGHT_HIDE'
}

export const spotLightShow = () => ({
  type: Types.SPOT_LIGHT_SHOW
})

export const spotLightHide = () => ({
  type: Types.SPOT_LIGHT_HIDE
})
