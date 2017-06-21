import {h, Component} from 'preact'
import {List, NestedList, ListItem, Switch, Indicator} from '@theatersoft/components'
import {connect} from '../../redux'
import {deviceAction, switchAction} from '../../actions'
import {Type, Interface, interfaceOfType} from '@theatersoft/device'

const
    mapStateToProps = ({devices = {}, Time, offset}) => ({
        devices,
        Time,
        offset
    }),
    mapDispatchToProps = dispatch => ({dispatchDeviceAction: action => dispatch(deviceAction(action))})

export default connect(mapStateToProps, mapDispatchToProps)(class extends Component {
    onClick = e => {
        const
            id = e.currentTarget.dataset.id,
            value = this.props.devices[id].value
        this.props.dispatchDeviceAction(switchAction(value, id))
    }

    onChange = (value, e) => this.onClick(e)

    render ({devices}) {
        const
            isSwitch = type => interfaceOfType(type) === Interface.SWITCH_BINARY || interfaceOfType(type) === Interface.SWITCH_MULTILEVEL,
            isIndicator = type => interfaceOfType(type) === Interface.SENSOR_BINARY,
            devicesByType = Object.values(devices).reduce((o, v) => (v.type && (o[v.type] || (o[v.type] = [])).push(v), o), {}),
            deviceItem = ({name, id, value, type}) =>
                <ListItem label={name} data-id={id} onClick={this.onClick}>
                    {isSwitch(type) && <Switch checked={value} data-id={id} onChange={this.onChange}/>}
                    {isIndicator(type) && <Indicator {...{normal: value === false, warning: value === true}} />}
                </ListItem>,
            typeItem = type =>
                <NestedList label={type}>
                    {devicesByType[type].map(deviceItem)}
                </NestedList>
        return (
            <List>
                {Object.keys(devicesByType).map(typeItem)}
            </List>
        )
    }
})

// TODO
//<NestedList label="Devices">
//    {Object.keys(devicesByType).map(typeItem)}
//</NestedList>
