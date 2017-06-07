import {h, render} from 'preact'
import {focus, Focuser} from '@theatersoft/focus'
import {Menu, Pinpad, Stat, Projector, Lights, Snackbar} from './components'

const items = [
    <Menu name="menu" items={{
                spinner: () => window.location.reload(),
                logo: () => focus.push('lights'),
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