import {h, Component, Icon, Text, Switch} from '@theatersoft/components'
import focus from './focus'

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

import api from 'preact-redux'
const {connect} = api
import {deviceAction, switchAction} from './actions'

const mapStateToProps = state => state.devices.Projector
const mapDispatchToProps = dispatch => ({dispatchDeviceAction: action => dispatch(deviceAction(action))})
export default connect(mapStateToProps, mapDispatchToProps)
(class ProjectorContainer extends Component {
    render (props) {
        return <Projector {...props} onClose={() => focus.pop()}/>
    }
})