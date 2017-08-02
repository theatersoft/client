import {h, render} from 'preact'
import {focus, Focuser} from '@theatersoft/focus'
import {Menu, Settings, Status, Stat, Favorites, Snackbar, FocusableSheet, Devices} from './components'

const
    sheet = (Component, name, type) => h(FocusableSheet({type})(Component), {name}),
    _sheet = (Component, name, type) => h(Component(FocusableSheet({type})()), {name}),
    items = [
        <Menu name="menu" items={{
                spinner: () => focus.push('status'),
                logo: () => focus.push('favorites'),
                thermometer: () => focus.push('stat'),
                list: () => focus.push('settings')
            }}/>,
        sheet(Status, 'status', 'top'),
        _sheet(Devices, 'favorites', 'right'),
        sheet(Stat, 'stat', 'bottom'),
        sheet(Settings, 'settings', 'left')
    ]

export const App = () =>
    <div id="ui">
        <Focuser focused="menu" items={items}/>
        <Snackbar/>
    </div>
