import {h, Component} from 'preact'
import {List, NestedList, Subheader} from '@theatersoft/components'
import {Services, Hosts, Sessions, DevicesSheet as Devices, ComposeSheets} from './'

export const Settings = ComposeSheets(class SettingsSheet extends Component {
    Devices = Devices(NestedList, {label: 'Devices', ...this.props})
    Services = Services(NestedList, {label: 'Services', ...this.props})
    Hosts = Hosts(NestedList, {label: 'Hosts', ...this.props})
    Sessions = Sessions(NestedList, {label: 'Sessions', ...this.props})

    render () {
        return (
            <subsection>
                <Subheader label="Settings"/>
                <this.Devices {...this.props}/>
                <this.Services/>
                <this.Hosts/>
                <this.Sessions/>
            </subsection>
        )
    }
})
