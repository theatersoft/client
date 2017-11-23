import {h, Component} from 'preact'
import {List, NestedList, ListItem, Switch, Subheader} from '@theatersoft/components'
import {connect} from '../redux'
import {ServiceSettings} from './'

const
    mapState = ({services}) => ({services: Object.values(services)})

export const Services = (Composed, {label}) => ({next}) => connect(mapState)(class extends Component {
    onClick = e => {
        const service = this.props.services[e.currentTarget.dataset.index]
        next(props => h(ServiceSettings('subsection', {service})))
    }

    render ({services}) {
        return (
            <Composed label={`${label} (${services.length})`}>
                {services.map(({id}, index) =>
                    <ListItem label={id} data-index={index} onClick={this.onClick}/>)}
            </Composed>
        )
    }
})
