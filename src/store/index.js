import {combineReducers, createStore} from 'redux'
import {proxy} from '@theatersoft/bus'
import {
    SET_CONFIG,
    SET_DEVICES,
    DEVICE_ACTION
} from '../actions'

const config = (state = false, action) =>
    action.type === SET_CONFIG ? action.config : state

const Device = proxy('Device')
const devices = (state = {}, action) => {
    if (action.type === SET_DEVICES)
        return action.devices
    if (action.type === DEVICE_ACTION)
        Device.dispatch(action.action)
    return state
}

const Time = (state = '', action) => {
    if (action.type === SET_DEVICES)
        return action.Time
    return state
}

export default createStore(combineReducers({
    config,
    devices,
    Time
}), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())