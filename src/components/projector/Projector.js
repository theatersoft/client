import {h, Component} from 'preact'
import {Icon, ListItem, Switch} from '@theatersoft/components'
import {focus} from '@theatersoft/focus'

export const Projector = ({dispatchDeviceAction, value, id, onClose}) => {
    const click = () => dispatchDeviceAction(switchAction(value, id))
    return (
        <div class="inset container">
            <Icon icon="cross" cb={onClose}/>
            <ListItem label="Projector" onClick={click}>
                <Switch checked={value} onChange={click}/>
            </ListItem>
        </div>
    )
}
import {connect} from '../../redux'
import {deviceAction, switchAction} from '../../actions'

const mapStateToProps = state => state.devices.Projector
const mapDispatchToProps = dispatch => ({dispatchDeviceAction: action => dispatch(deviceAction(action))})
export default connect(mapStateToProps, mapDispatchToProps)
(class ProjectorContainer extends Component {
    render (props) {
        return <Projector {...props} onClose={() => focus.pop()}/>
    }
})