import {h, render} from 'preact'
import {focus, Focuser} from '@theatersoft/focus'
import {Menu, Pinpad, Stat, Projector, Lights, Snackbar, FocusableSheet} from './components'

const
    sheet = (Component, name, type) => h(FocusableSheet({type})(Component), {name}),
    items = [
        <Menu name="menu" items={{
                spinner: () => window.location.reload(),
                logo: () => focus.push('lights'),
                thermometer: () => focus.push('stat'),
                list: () => focus.push('projector')
            }}/>,
        sheet(Projector, 'projector', 'left'),
        sheet(Stat, 'stat', 'bottom'),
        sheet(Lights, 'lights', 'right')
    ]

export const App = () => {
    return (
        <div id="ui">
            <Focuser focused="menu" items={items}/>
            <Snackbar/>
        </div>
    )
}