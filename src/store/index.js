import {combineReducers, createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {SET_CONFIG, SET_DEVICES, SET_TIME, SET_SETTINGS, SET_LOCALS} from '../actions'

const
    config = (state = false, {type, config}) => type === SET_CONFIG ? config : state,
    devices = (state = {}, {type, devices}) => type === SET_DEVICES ? devices : state,
    Time = (state = '', {type, Time}) => type === SET_TIME ? Time : state,
    offset = (state = 0, {type, offset}) => type === SET_TIME ? offset : state,
    settings = (state = {}, {type, settings}) => type === SET_SETTINGS ? settings : state,
    locals = (state = {}, {type, locals}) => type === SET_LOCALS ? locals : state,
    reducer = combineReducers({
        config,
        devices,
        Time,
        offset,
        settings,
        locals
    }),
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default createStore(reducer, composeEnhancers(applyMiddleware(thunk)))