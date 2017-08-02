import {h, Component} from 'preact'
import {List, NestedList, ListItem} from '@theatersoft/components'
import {connect} from '../redux'
import {ServiceSettings as Automation} from '@theatersoft/automation'
import {ServiceSettings as ZWave} from '@theatersoft/zwave'

const
    mapState = ({config: {hosts}}) => ({hosts})

export const Services = (ComposedComponent, props) => connect(mapState)(class extends Component {
    render ({hosts}) {
        const
            services = hosts.reduce((a, h) => (h.services && h.services.forEach(s => a.push(s)), a), []),
            serviceItem = ({name, export: _e}) => {
                const item = {Automation, ZWave}[_e]
                return item ? h(item(NestedList, {label: name, name})) : <ListItem label={name}/>
            }
        return (
            <ComposedComponent {...props}>
                {services.map(serviceItem)}
            </ComposedComponent>
        )
    }
})

