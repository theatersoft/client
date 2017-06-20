import {h, render} from 'preact'
import {focus, Focuser} from '@theatersoft/focus'
import {Menu, Settings, Status, Stat, Lights, Snackbar, FocusableSheet} from './components'

const
    sheet = (Component, name, type) => h(FocusableSheet({type})(Component), {name}),
    items = [
        <Menu name="menu" items={{
                spinner: () => focus.push('status'),
                logo: () => focus.push('lights'),
                thermometer: () => focus.push('stat'),
                list: () => focus.push('settings')
            }}/>,
        sheet(Status, 'status', 'top'),
        sheet(Lights, 'lights', 'right'),
        sheet(Stat, 'stat', 'bottom'),
        sheet(Settings, 'settings', 'left')
    ]

export const App = () =>
    <div id="ui">
        <Focuser focused="menu" items={items}/>
        <Snackbar/>
    </div>
