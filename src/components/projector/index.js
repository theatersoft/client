import {h, Component, Icon, Text, Switch, focus} from '@theatersoft/components'

export const Projector = ({dispatchDeviceAction, value, id, onClose}) =>
    <div class="inset container">
        <div class="col">
            <Text text="Projector"/>
            <Switch
                checked={value}
                onChange={() => dispatchDeviceAction(switchAction(value, id))}
            />
        </div>
        <Icon icon="cross" cb={onClose}/>
    </div>

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