import {h, Component} from 'preact'
import {List, ListItem, Switch} from '@theatersoft/components'
import {connect} from '../redux'
import {deviceAction} from '../actions'
import {switchActions} from '@theatersoft/device'

const
    mapStateToProps = ({devices = {}}) => ({
        devices: Object.entries(devices)
            .filter(([k, v]) => ['LightSwitch', 'Switch', 'Dimmer'].includes(v.type))
            .map(([k, v]) => v)
    }),
    mapDispatchToProps = dispatch => ({dispatchDeviceAction: action => dispatch(deviceAction(action))})


export const Lights = connect(mapStateToProps, mapDispatchToProps)(class extends Component {
    render ({dispatchDeviceAction, devices = []}) {
        return (
            <List>
                {devices.map(({name, id, value}) => {
                    const click = () => dispatchDeviceAction(switchActions.toggle(value, id))
                    return (
                        <ListItem label={name} onClick={click}>
                            <Switch checked={value} onChange={click}/>
                        </ListItem>
                    )
                })}
            </List>
        )
    }
})