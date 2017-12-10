import {bus, proxy, mixinEventEmitter, EventEmitter, log} from '@theatersoft/bus'
import {auth} from './auth'
import './resize'
import {h, Component, render} from 'preact'
import {focus, Focuser} from '@theatersoft/focus'
import {video, Pinpad} from './components'
import {App} from './App'
import {Provider} from './redux'
import store from './store'
import {setConfig, setDevices, setSettings, setLocals, setServices, objectify} from './actions'
import './index.styl'
import {register, notificationsAction} from './push'
import {timeout} from './util'
import 'preact/devtools'

const
    dispatchDevices = state => store.dispatch(setDevices(state)),
    dispatchSettings = state => store.dispatch(setSettings(state)),
    dispatchServices = state => store.dispatch(setServices(state)),
    dispatchLocals = () => store.dispatch(setLocals(objectify(window.localStorage)))

bus.start({parent: {auth}})
bus.registerListener('Device.state', dispatchDevices)
bus.registerListener('Settings.state', dispatchSettings)
bus.registerListener('Service.state', dispatchServices)
window.addEventListener('storage', dispatchLocals)
timeout(bus.started(), 2000)
    .then(() =>
        proxy('Config').get()
            .then(config => {
                config.webpush && register(config.webpush).then(() => store.dispatch(notificationsAction()))
                store.dispatch(setConfig(config))
                video.init(config.cameras)
                proxy('Device').getState().then(dispatchDevices)
                proxy('Settings').getState().then(dispatchSettings)
                proxy('Service').getState().then(dispatchServices)
                dispatchLocals()
                focus.push('menu')
                render(<Provider store={store}><App/></Provider>, document.body, document.getElementById('ui'))
            }))
    .catch(() => {
        focus.push('pinpad')
        render(<Pinpad/>, document.getElementById('ui'))
    })
