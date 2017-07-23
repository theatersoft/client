import {h, Component} from 'preact'
import {List, NestedList, ListItem} from '@theatersoft/components'
import {connect} from '../redux'

import {ServiceSettings as AutomationServiceSettings} from '@theatersoft/automation'
const settings = name => ({
    Automation: AutomationServiceSettings
}[name])

const
    mapStateToProps = ({config: {hosts}}) => ({hosts})

export const Services = (ComposedComponent, props) => connect(mapStateToProps)(class extends Component {
    render ({hosts}) {
        const
            services = hosts.reduce((a, h) => (h.services && h.services.forEach(s => a.push(s)), a), []),
            serviceItem = ({name}) => {
                const item = settings(name)
                return item ? h(item(NestedList, {label: name})) : <ListItem label={name}/>
            }
        return (
            <ComposedComponent {...props}>
                {services.map(serviceItem)}
            </ComposedComponent>
        )
    }
})

