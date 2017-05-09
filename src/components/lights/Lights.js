import {h, Component} from 'preact'
import {Icon, List, ListItem, Switch, focus} from '@theatersoft/components'

export const Lights = ({dispatchDeviceAction, devices = [], onClose, values}, {}) => {
    return (
        <div class="inset container">
            <Icon icon="cross" cb={onClose}/>
            <List>
                {devices.map(({name, id, value}) =>
                    <ListItem label={name}>
                        <Switch checked={value} onChange={() => dispatchDeviceAction(switchAction(value, id))}/>
                    </ListItem>
                )}
            </List>
        </div>
    )
}

import {connect} from '../../redux'

import {deviceAction, switchAction} from '../../actions'

const
    mapStateToProps = ({devices = {}}) => ({
        devices: Object.entries(devices)
            .filter(([k, v]) => ['Switch', 'Dimmer'].includes(v.type))
            .map(([k, v]) => v)
    }),
    mapDispatchToProps = dispatch => ({
        dispatchDeviceAction: action => dispatch(deviceAction(action))
    })
export default connect(mapStateToProps, mapDispatchToProps)
(class LightsContainer extends Component {
    render (props) {
        return <Lights {...props} onClose={() => focus.pop()}/>
    }
})