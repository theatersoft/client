export const
    SET_CONFIG = 'SET_CONFIG',
    setConfig = config => ({type: SET_CONFIG, config}),
    SET_TIME = 'SET_TIME',
    setTime = Time => ({type: SET_TIME, Time, offset: new Date() - new Date(Time)}),
    SET_DEVICES = 'SET_DEVICES',
    setDevices = devices => ({type: SET_DEVICES, devices}),
    setDeviceState = ({devices, Time}) => (dispatch, getState) => {
        dispatch(setDevices(devices))
        if (Time && Time !== getState().Time) dispatch(setTime(Time))
    }

import {proxy} from '@theatersoft/bus'
const Device = proxy('Device')
export const deviceAction = action => () => Device.dispatch(action)

const ON = 'ON', OFF = 'OFF'
export const switchAction = (value, id) => ({type: value ? OFF: ON, id})
