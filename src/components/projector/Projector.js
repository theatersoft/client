import {h, Component} from 'preact'
import {Sheet, ListItem, Switch} from '@theatersoft/components'
import {FocusableActivator} from '../FocusableActivator'
import {connect} from '../../redux'
import {deviceAction, switchAction} from '../../actions'

const mapStateToProps = state => state.devices.Projector
const mapDispatchToProps = dispatch => ({dispatchDeviceAction: action => dispatch(deviceAction(action))})

export default connect(mapStateToProps, mapDispatchToProps)(class extends FocusableActivator {
    render ({dispatchDeviceAction, value, id}, {active}) {
        const click = () => dispatchDeviceAction(switchAction(value, id))
        return (
            <Sheet type="left" active={active} onClick={this.onClose}>
                <ListItem label="Projector" onClick={click}>
                    <Switch checked={value} onChange={click}/>
                </ListItem>
            </Sheet>
        )
    }
})