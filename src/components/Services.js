import {h, Component} from 'preact'
import {List, NestedList, ListItem, Switch, Subheader} from '@theatersoft/components'
import {connect} from '../redux'
import {ServiceSettings} from './'

const
    mapState = ({config: {hosts}}) => ({hosts})

export const Services = (Composed, {label}) => ({next}) => connect(mapState)(class extends Component {
    services = this.props.hosts.reduce((a, h) => (h.services && h.services.forEach(s => a.push({host: h.name, ...s})), a), [])

    onClick = e => {
        const service = this.services[e.currentTarget.dataset.index]
        next(props => h(ServiceSettings('subsection', {service})))
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

