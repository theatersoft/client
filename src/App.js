import {h, render} from 'preact'
import {focus, Focuser} from '@theatersoft/focus'
import {Menu, Pinpad, Stat, Projector, Lights, Snackbar, FocusableSheet} from './components'

const items = [
    <Menu name="menu" items={{
                spinner: () => window.location.reload(),
                logo: () => focus.push('lights'),
                thermometer: () => focus.push('stat'),
                list: () => focus.push('projector')
            }}/>,
    h(FocusableSheet({type: 'left'})(Projector), {name: 'projector'}),
    h(FocusableSheet({type: 'bottom'})(Stat), {name: 'stat'}),
    h(FocusableSheet({type: 'right'})(Lights), {name: 'lights'})
]

export const App = () => {
    return (
        <div id="ui">
            <Focuser focused="menu" items={items}/>
            <Snackbar/>
        </div>
    )
}