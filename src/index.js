import {bus, proxy, mixinEventEmitter, EventEmitter} from '@theatersoft/bus'
import {auth} from './auth'
import './resize'
import {h, render} from 'preact'
import {focus, Focuser} from '@theatersoft/focus'
import {video} from './components/video'
import {App} from './App'
import {Provider} from './redux'
import store from './store'
import {setConfig, setDevices} from './actions'
import './index.styl'

const
    timeout = (p, ms) => Promise.race([p, new Promise((_, j) => setTimeout(j, ms))]),
    dispatchSetDevices = state => store.dispatch(setDevices(state))

bus.start({parent: {auth}})
bus.registerListener('Device.state', dispatchSetDevices)
timeout(bus.started(), 2000)
    .then(() =>
        proxy('Config').get()
            .then(config => {
                console.log('Config get', config)
                store.dispatch(setConfig(config))
                video.init(config.cameras)
                proxy('Device').getState().then(dispatchSetDevices)
                render(<Provider store={store}><App/></Provider>, document.getElementById('ui'))
            }))
    .catch(() => {
        focus.push('pinpad')
        render(<Pinpad/>, document.getElementById('ui'))
    })
