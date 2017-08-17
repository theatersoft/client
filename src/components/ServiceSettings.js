import {h, Component} from 'preact'
import {List, NestedList, ListItem, Switch, Subheader} from '@theatersoft/components'
import {connect} from '../redux'
import {ServiceSettings as Automation} from '@theatersoft/automation'
import {ServiceSettings as ZWave} from '@theatersoft/zwave'

const
    settingsMap = {Automation, ZWave}

export const ServiceSettings = (Composed, {service, ...props}) => class extends Component {
    Settings = settingsMap[service.export] && settingsMap[service.export](NestedList, {service, ...this.props})

    render () {
        const
            item = (label, value) => <ListItem label={label}><Switch checked={value}/></ListItem>,
            {name, enabled = true, host, module, export: _export, config} = service
        return (
            <Composed>
                <Subheader label={`${name} Settings`}/>
                {this.Settings && <this.Settings label={service.name} active/>}
                {item('Enabled', enabled)}
                <NestedList label="more ...">
                    <Subheader label="Host"/>
                    <ListItem label={host}/>
                    <Subheader label="Module"/>
                    <ListItem label={module}/>
                    <Subheader label="Export"/>
                    <ListItem label={_export}/>
                    <Subheader label="Config"/>
                    <ListItem label={JSON.stringify(config)}/>
                </NestedList>
            </Composed>
        )
    }
}
