import {h, Component} from 'preact'
import {Sheet, List, ListItem, Switch} from '@theatersoft/components'
import {FocusableActivator} from '../FocusableActivator'
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

export default connect(mapStateToProps, mapDispatchToProps)(class extends FocusableActivator {
    render ({dispatchDeviceAction, devices = []}, {active}) {
        return (
            <Sheet type="right" active={active} onClick={this.onClose}>
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
            </Sheet>
        )
    }
})