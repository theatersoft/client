import {combineReducers, createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {
    SET_CONFIG,
    SET_DEVICES
} from '../actions'

const config = (state = false, action) =>
    action.type === SET_CONFIG ? action.config : state

const devices = (state = {}, action) => {
    if (action.type === SET_DEVICES)
        return action.devices
    return state
}

const Time = (state = '', action) => {
    if (action.type === SET_DEVICES)
        return action.Time
    return state
}

const reducer = combineReducers({
    config,
    devices,
    Time
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default createStore(reducer, composeEnhancers(applyMiddleware(thunk)))