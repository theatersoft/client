import {h, Component} from 'preact'
import {List, NestedList, ListItem, Switch, Subheader} from '@theatersoft/components'
import {connect} from '../redux'
import {ServiceSettings} from './'
import {serviceAction} from '../actions'
import {switchActions} from '@theatersoft/device'

const
    mapState = ({services}) => ({services: Object.values(services)}),
    mapDispatch = dispatch => ({
        switchToggle: (value, id) => dispatch(serviceAction(switchActions.toggle(value, id)))
    })

export const Services = (Composed, {label}) => ({next}) => connect(mapState, mapDispatch)(class extends Component {
    onClick = e => {
        const service = this.props.services[e.currentTarget.dataset.index]
        next(props => h(ServiceSettings('subsection', {service})))
    }

    onSwitch = (value, {currentTarget: {dataset: {id}}}) => this.props.switchToggle(!value, id)

    render ({services}) {
        return (
            <Composed label={`${label} (${services.length})`}>
                {services.map(({id, value}, index) =>
                    <ListItem label={id} data-index={index} onClick={this.onClick}>
                        <Switch checked={value} data-id={id} onChange={this.onSwitch}/>
                    </ListItem>)}
            </Composed>
        )
    }
})
