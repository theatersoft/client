import {h, Component} from 'preact'
import {List, NestedList, ListItem} from '@theatersoft/components'
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
            settings = {Automation, ZWave}[service.export]
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
