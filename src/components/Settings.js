import {h, Component} from 'preact'
import {List, NestedList, Subheader} from '@theatersoft/components'
import {Services, Hosts, Sessions, ComposeSheets} from './'

export const Settings = ComposeSheets(class SettingsSheet extends Component {
    Services = Services(NestedList, {label: 'Services', ...this.props})
    Hosts = Hosts(NestedList, {label: 'Hosts', ...this.props})
    Sessions = Sessions(NestedList, {label: 'Sessions', ...this.props})

    render () {
        return (
            <subsection>
                <Subheader label="Settings"/>
                <NestedList label="Devices"/>
                <this.Services/>
                <this.Hosts/>
                <this.Sessions/>
            </subsection>
        )
    }
})
