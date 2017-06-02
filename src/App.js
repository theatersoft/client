import {h, render} from 'preact'
import {focus, Focuser} from '@theatersoft/focus'
import {video, Video} from './components/video'
import {Bar} from './components/bar'
import {Pinpad} from './components/pinpad'
import {Stat} from './components/stat'
import {Projector} from './components/projector'
import {Lights} from './components/lights'
import {Snackbar} from './components/snackbar'

export const App = () => {
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
        <div>
            <Focuser focused="video" items={items}/>
            <Snackbar/>
        </div>
    )
}