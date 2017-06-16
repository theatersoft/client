export const
    SET_CONFIG = 'SET_CONFIG',
    setConfig = config => ({type: SET_CONFIG, config}),

    SET_DEVICES = 'SET_DEVICES',
    SET_TIME = 'SET_TIME',
    setDevices = ({devices, Time}) => dispatch => {
        dispatch({type: SET_DEVICES, devices})
        const offset = new Date() - new Date(Time)
        dispatch({type: SET_TIME, Time, offset})
    }

import {proxy} from '@theatersoft/bus'
const Device = proxy('Device')
export const deviceAction = action => () => Device.dispatch(action)

const ON = 'ON', OFF = 'OFF'
export const switchAction = (value, id) => ({type: value ? OFF: ON, id})
