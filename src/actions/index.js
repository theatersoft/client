export const
    SET_CONFIG = 'SET_CONFIG',
    setConfig = config => ({type: SET_CONFIG, config}),
    SET_TIME = 'SET_TIME',
    setTime = Time => ({type: SET_TIME, Time, offset: new Date() - new Date(Time)}),
    SET_DEVICES = 'SET_DEVICES',
    setDevices = ({devices, Time}) => (dispatch, getState) => {
        dispatch({type: SET_DEVICES, devices})
        if (Time && Time !== getState().Time) dispatch(setTime(Time))
    },
    SET_SETTINGS = 'SET_SETTINGS',
    setSettings = settings => ({type: SET_SETTINGS, settings})

import {proxy} from '@theatersoft/bus'
const Device = proxy('Device')
export const deviceAction = action => () => Device.dispatch(action)
const Settings = proxy('Settings')
export const settingsAction = state => () => Settings.setState(state)

const ON = 'ON', OFF = 'OFF'
export const switchAction = (value, id) => ({type: value ? OFF: ON, id})
