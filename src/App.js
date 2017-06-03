import {h, render} from 'preact'
import {focus, Focuser} from '@theatersoft/focus'
import {Menu} from './components/menu'
import {Pinpad} from './components/pinpad'
import {Stat} from './components/stat'
import {Projector} from './components/projector'
import {Lights} from './components/lights'
import {Snackbar} from './components/snackbar'

const items = [
    <Menu name="menu" items={{
                logo: () => focus.push('lights'),
                spinner: () => window.location.reload(),
                thermometer: () => focus.push('stat'),
                list: () => focus.push('projector')
            }}/>,
    <Projector name="projector"/>,
    <Stat name="stat"/>,
    <Lights name="lights"/>
]

export const App = () => {
    return (
        <div id="ui">
            <Focuser focused="menu" items={items}/>
            <Snackbar/>
        </div>
    )
}