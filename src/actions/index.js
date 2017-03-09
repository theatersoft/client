export const SET_CONFIG = 'SET_CONFIG'
export const setConfig = config => ({type: SET_CONFIG, config})

export const SET_DEVICES = 'SET_DEVICES'
export const setDevices = state => ({type: SET_DEVICES, ...state})

export const DEVICE_ACTION = 'DEVICE_ACTION'
export const deviceAction = action => ({type: DEVICE_ACTION, action})

const ON = 'ON', OFF = 'OFF'
export const switchAction = (value, id) => ({type: value ? OFF: ON, id})
