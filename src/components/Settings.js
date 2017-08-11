import {h, Component} from 'preact'
import {List, NestedList} from '@theatersoft/components'
import {Services, ComposeSheets} from './'

export const Settings = ComposeSheets(class SettingsSheet extends Component {
    Services = Services(NestedList, {label: 'Services', next: this.props.next})

    render () {
        return (
            <subsection>
                <NestedList label="Devices"/>
                <this.Services/>
                <NestedList label="Sessions"/>
            </subsection>
        )
    }
})
