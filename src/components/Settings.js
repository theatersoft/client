import {h, Component} from 'preact'
import {List, NestedList} from '@theatersoft/components'
import {Services, Hosts, ComposeSheets} from './'

export const Settings = ComposeSheets(class SettingsSheet extends Component {
    Services = Services(NestedList, {label: 'Services', ...this.props})
    Hosts = Hosts(NestedList, {label: 'Hosts', ...this.props})

    render () {
        return (
            <subsection>
                <NestedList label="Devices"/>
                <this.Services/>
                <this.Hosts/>
                <NestedList label="Sessions"/>
            </subsection>
        )
    }
})
