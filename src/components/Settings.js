import {h, Component} from 'preact'
import {List, NestedList} from '@theatersoft/components'
import  {Services} from './'
import {ComposeSheets} from './ComposeSheets'

class SettingsSheet extends Component {
    render () {
        const typeItems = (type, items) =>
            <NestedList label={type}>
                {items}
            </NestedList>
        return (
            <subsection>
                {
                    typeItems('Devices', [])  // TODO Devices(NestedList, {label: "Devices"})
                }
                {h(Services(NestedList, {label: 'Services', ...this.props}))}
                {typeItems('Sessions', [])}
            </subsection>
        )
    }
}

export const Settings = ComposeSheets(SettingsSheet)
