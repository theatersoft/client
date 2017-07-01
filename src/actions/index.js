import {proxy} from '@theatersoft/bus'

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
    setSettings = settings => ({type: SET_SETTINGS, settings}),
    SET_LOCALS = 'SET_LOCALS',
    setLocals = locals => ({type: SET_LOCALS, locals}),
    SET_NOTIFICATIONS = 'SET_NOTIFICATIONS',
    setNotifications = notifications => ({type: SET_NOTIFICATIONS, notifications})

const Device = proxy('Device')
export const deviceAction = action => () => Device.dispatch(action)

const Settings = proxy('Settings')
export const settingsAction = state => () => Settings.setState(state)

export const
    objectify = object => Object.entries(object).reduce((o, [k, v]) => (o[k] = v && JSON.parse(v), o), {}),
    localsAction = state => dispatch => {
        for (const [k,v] of Object.entries(state)) window.localStorage.setItem(k, JSON.stringify(v))
        dispatch(setLocals(objectify(window.localStorage)))
    }

const ON = 'ON', OFF = 'OFF'
export const switchAction = (value, id) => ({type: value ? OFF : ON, id})
