import {h, Component} from 'preact'
import {List, NestedList, ListItem, Switch, Subheader} from '@theatersoft/components'
import {connect} from '../redux'
import {ServiceSettings as Automation} from '@theatersoft/automation'
import {ServiceSettings as ZWave} from '@theatersoft/zwave'

const
    mapState = ({config: {hosts}}) => ({hosts})

export const Services = (Composed, {label, next}) => connect(mapState)(class extends Component {
    services = this.props.hosts.reduce((a, h) => (h.services && h.services.forEach(s => a.push({host: h.name, ...s})), a), [])

    onClick = e => {
        const
            service = this.services[e.currentTarget.dataset.index],
            settings = {Automation, ZWave}[service.export] || ServiceSettings
        if (settings) next(props => h(settings('subsection', {service}), props))
    }

    render ({hosts}) {
        return (
            <Composed label={label}>
                {this.services.map((service, index) =>
                    <ListItem label={service.name} data-index={index} onClick={this.onClick}/>)}
            </Composed>
        )
    }
})

const ServiceSettings = (Composed, {service}) => connect(p => p)(class ServiceSettings extends Component {
    render ({settings}) {
        const
            item = (label, value) => <ListItem label={label}><Switch checked={value}/></ListItem>,
            {name, enabled = true, host, module, export: _export, config} = service
        return (
            <Composed>
                <Subheader label={`${name} Settings`}/>
                {item('Enabled', enabled)}
                <NestedList label="Service" active>
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
