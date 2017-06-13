import {h, Component} from 'preact'
import {ListItem, Switch} from '@theatersoft/components'
import {connect} from '../../redux'
import {deviceAction, switchAction} from '../../actions'

const
    mapStateToProps = state => state.devices.Projector,
    mapDispatchToProps = dispatch => ({dispatchDeviceAction: action => dispatch(deviceAction(action))})

export default connect(mapStateToProps, mapDispatchToProps)(class extends Component {
    render ({dispatchDeviceAction, value, id}, {active}) {
        const click = () => dispatchDeviceAction(switchAction(value, id))
        return (
            <ListItem label="Projector" onClick={click}>
                <Switch checked={value} onChange={click}/>
            </ListItem>
        )
    }
})