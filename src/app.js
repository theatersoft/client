import bus, {proxy, mixinEventEmitter, EventEmitter} from '@theatersoft/bus'
import {auth} from './auth'
bus.start({parent: {auth}})

import video from './video'
import focus from './focus'
import './resize'

import {h, render, Component} from './ui'
import {Focuser} from './focus'
import {Video} from './video'
import Bar from './bar'
import Pinpad from './pinpad'
import Stat from './stat'
import Projector from './projector'
import Lights from './lights'

//import {Provider} from 'preact-redux'
import api from 'preact-redux'
const {Provider} = api
import store from './store'
console.log(store.getState())

import {setConfig, setDevices} from './actions'

const dispatchSetDevices = state => {
    store.dispatch(setDevices(state))
}
bus.registerListener('Device.state', dispatchSetDevices)

const timeout = (p, ms) => Promise.race([p, new Promise((_, j) => setTimeout(j, ms))])

focus.init()
timeout(bus.started(), 2000)
    .then(() =>
        proxy('Config').get()
            .then(config => {
                console.log('Config get', config)
                store.dispatch(setConfig(config))
                video.init(config.cameras)
                proxy('Device').getState().then(dispatchSetDevices)
                render(<App/>)
            }))
    .catch(() => {
        focus.push('pinpad')
        render(<Pinpad/>)
    })

const App = () => {
    const items = [
        <Video name="video"/>,
        <Bar name="bar" items={{
                logo: () => focus.push('lights'),
                spinner: () => window.location.reload(),
                cross: () => focus.pop(),
                thermometer: () => focus.push('stat'),
                list: () => focus.push('projector')
            }}/>,
        <Projector name="projector"/>,
        <Stat name="stat"/>,
        <Lights name="lights"/>
    ]
    return (
        <Provider store={store}>
            <Focuser focused="video" items={items}/>
        </Provider>
    )
}
