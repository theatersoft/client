import {h, Component} from 'preact'
import {List, NestedList, ListItem} from '@theatersoft/components'
import {connect} from '../redux'

const
    mapStateToProps = ({config: {hosts}}) => ({hosts})

export const Services = (ComposedComponent, props) => connect(mapStateToProps)(class extends Component {
    render ({hosts}) {
        const
            services = hosts.reduce((a, h) => (h.services && h.services.forEach(s => a.push(s)), a), []),
            serviceItem = ({name}) =>
                <ListItem label={name}>
                </ListItem>
        return (
            <ComposedComponent {...props}>
                {services.map(serviceItem)}
            </ComposedComponent>
        )
    }
})

