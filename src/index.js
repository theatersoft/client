import {bus, proxy, mixinEventEmitter, EventEmitter} from '@theatersoft/bus'
import {auth} from './auth'
import './resize'
import {h, render} from 'preact'
import {focus, Focuser} from '@theatersoft/focus'
import {video, Pinpad} from './components'
import {App} from './App'
import {Provider} from './redux'
import store from './store'
import {setConfig, setDeviceState} from './actions'
import './index.styl'
import {register} from './push'

const
    timeout = (p, ms) => Promise.race([p, new Promise((_, j) => setTimeout(j, ms))]),
    dispatchState = state => store.dispatch(setDeviceState(state))

bus.start({parent: {auth}})
bus.registerListener('Device.state', dispatchState)
timeout(bus.started(), 2000)
    .then(() =>
        proxy('Config').get()
            .then(config => {
                console.log('Config get', config)
                config.webpush && register(config.webpush)
                store.dispatch(setConfig(config))
                video.init(config.cameras)
                proxy('Device').getState().then(dispatchState)
                focus.push('menu')
                render(<Provider store={store}><App/></Provider>, document.body, document.getElementById('ui'))
            }))
    .catch(() => {
        focus.push('pinpad')
        render(<Pinpad/>, document.getElementById('ui'))
    })
