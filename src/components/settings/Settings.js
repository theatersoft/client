import {h, Component} from 'preact'
import {List, NestedList, ListItem, Switch} from '@theatersoft/components'
import {connect} from '../../redux'
import {deviceAction, switchAction} from '../../actions'

const
    mapStateToProps = ({devices = {}, Time, offset}) => ({
        devices,
        Time,
        offset
    }),
    mapDispatchToProps = dispatch => ({dispatchDeviceAction: action => dispatch(deviceAction(action))})

export default connect(mapStateToProps, mapDispatchToProps)(class extends Component {
    onClick = e => {
        console.log(e.currentTarget.dataset.id)
        const
            id = e.currentTarget.dataset.id,
            value = this.props.devices[id].value
        this.props.dispatchDeviceAction(switchAction(value, id))
    }

    onChange = e => {
        console.log(e.currentTarget.dataset.id)
    }

    render ({devices = []}) {
        return (
            <List>
                <NestedList label="Devices">
                    {Object.values(devices).map(({name, id, value}) =>
                        <ListItem label={name} data-id={id} onClick={this.onClick}>
                            <Switch checked={value} onChange={this.onChange}/>
                        </ListItem>
                    )}
                </NestedList>
            </List>
        )
    }
})