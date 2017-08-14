import {h, Component} from 'preact'
import {List, NestedList, ListItem, Switch, Subheader} from '@theatersoft/components'
import {connect} from '../redux'
import {ServiceSettings as Automation} from '@theatersoft/automation'
import {ServiceSettings as ZWave} from '@theatersoft/zwave'

const
    settingsMap = {Automation, ZWave},
    mapState = ({config: {hosts}}) => ({hosts})

export const Services = (Composed, {label, next}) => connect(mapState)(class extends Component {
    services = this.props.hosts.reduce((a, h) => (h.services && h.services.forEach(s => a.push({host: h.name, ...s})), a), [])

    onClick = e => {
        const service = this.services[e.currentTarget.dataset.index]
        next(props => h(ServiceSettings('subsection', {service}), props))
    }

    render () {
        return (
            <Composed label={`${label} (${this.services.length})`}>
                {this.services.map((service, index) =>
                    <ListItem label={service.name} data-index={index} onClick={this.onClick}/>)}
            </Composed>
        )
    }
})

const ServiceSettings = (Composed, {service, ...props}) => connect(p => p)(class ServiceSettings extends Component {
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
})
