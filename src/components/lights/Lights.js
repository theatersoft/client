import {h, Component} from 'preact'
import {Icon, List, ListItem, Switch} from '@theatersoft/components'
import {focus, mixinFocusable} from '@theatersoft/focus'

export const Lights = ({dispatchDeviceAction, devices = [], onClose, values}, {}) => {
    return (
        <div class="inset container">
            <Icon icon="cross" cb={onClose}/>
            <List>
                {devices.map(({name, id, value}) => {
                    const click = () => dispatchDeviceAction(switchAction(value, id))
                    return (
                        <ListItem label={name} onClick={click}>
                            <Switch checked={value} onChange={click}/>
                        </ListItem>
                    )
                })}
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
(class LightsContainer extends mixinFocusable(Component) {
    render (props) {
        return <Lights {...props} onClose={() => focus.pop()}/>
    }
})