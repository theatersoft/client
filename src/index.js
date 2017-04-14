import bus, {proxy, mixinEventEmitter, EventEmitter} from '@theatersoft/bus'
import {auth} from './auth'
import './resize'
import {h} from 'preact'
import {render, focus, Focuser} from '@theatersoft/components'
import {default as video, Video} from './components/video'
import Bar from './components/bar'
import Pinpad from './components/pinpad'
import Stat from './components/stat'
import Projector from './components/projector'
import Lights from './components/lights'
import {Provider} from './redux'
import store from './store'
import {setConfig, setDevices} from './actions'
import '@theatersoft/components/components.css'
import './index.styl'

bus.start({parent: {auth}})

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
