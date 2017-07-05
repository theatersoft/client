import {h, Component} from 'preact'
import {List, NestedList, ListItem, Switch, Indicator} from '@theatersoft/components'
import {connect} from '../../redux'
import {deviceAction} from '../../actions'
import {Type, Interface, interfaceOfType, toggle} from '@theatersoft/device'

const
    isSwitch = type => interfaceOfType(type) === Interface.SWITCH_BINARY || interfaceOfType(type) === Interface.SWITCH_MULTILEVEL,
    isIndicator = type => interfaceOfType(type) === Interface.SENSOR_BINARY,
    switchable = type => isSwitch(type) && type !== Type.Siren

const
    mapStateToProps = ({devices = {}, Time, offset}) => ({devices, Time, offset}),
    mapDispatchToProps = dispatch => ({dispatchDeviceAction: action => dispatch(deviceAction(action))})

export default connect(mapStateToProps, mapDispatchToProps)(class extends Component {
    onClick = e => {
        const
            id = e.currentTarget.dataset.id,
            {value, type} = this.props.devices[id]
        if (switchable(type)) this.props.dispatchDeviceAction(toggle(value, id))
    }

    onChange = (value, e) => this.onClick(e)

    render ({devices}) {
        const
            devicesByType = Object.values(devices).reduce((o, v) => (v.type && (o[v.type] || (o[v.type] = [])).push(v), o), {}),
            deviceItem = ({name, id, value, type}) =>
                <ListItem label={name} data-id={id} onClick={this.onClick}>
                    {switchable(type) && <Switch checked={value} data-id={id} onChange={this.onChange}/>}
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
