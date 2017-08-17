import {h, Component} from 'preact'
import {List, NestedList, Subheader} from '@theatersoft/components'
import {Services, Hosts, Sessions, DevicesSheet as Devices, ComposeSheets} from './'

export const Settings = ComposeSheets(props => class SettingsSheet extends Component {
    Devices = Devices(NestedList, {label: 'Devices'})(props)
    Services = Services(NestedList, {label: 'Services'})(props)
    Hosts = Hosts(NestedList, {label: 'Hosts'})(props)
    Sessions = Sessions(NestedList, {label: 'Sessions'})(props)

    render () {
        return (
            <subsection>
                <Subheader label="Settings"/>
                <this.Devices/>
                <this.Services/>
                <this.Hosts/>
                <this.Sessions/>
            </subsection>
        )
    }
})
