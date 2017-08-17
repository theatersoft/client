import {h, Component} from 'preact'
import {List, NestedList, ListItem, Switch, Indicator} from '@theatersoft/components'
import {connect} from '../redux'
import {deviceAction} from '../actions'
import {Type, Interface, interfaceOfType, switchActions} from '@theatersoft/device'
import {ComposeSheets, DeviceSettings} from './'

const
    isSwitch = type => interfaceOfType(type) === Interface.SWITCH_BINARY || interfaceOfType(type) === Interface.SWITCH_MULTILEVEL,
    isIndicator = type => interfaceOfType(type) === Interface.SENSOR_BINARY,
    switchable = type => isSwitch(type) && type !== Type.Siren

const
    mapStateToProps = ({devices = {}, Time, offset}) => ({devices, Time, offset}),
    mapDispatchToProps = dispatch => ({dispatchDeviceAction: action => dispatch(deviceAction(action))})

export const DevicesSheet = (Composed, {label, ...props}) => ({next}) => connect(mapStateToProps, mapDispatchToProps)(class extends Component {
    onClick = e => {
        const device = this.props.devices[e.currentTarget.dataset.id]
        next(props => h(DeviceSettings('subsection', {device}), {props}))
    }

    onSwitch = (_, e) => {
        const
            id = e.currentTarget.dataset.id,
            {value, type} = this.props.devices[id]
        if (switchable(type)) this.props.dispatchDeviceAction(switchActions.toggle(value, id))
    }

    render ({devices}, {index, id}) {
        const
            devicesByType = Object.values(devices).reduce((o, v) => (v.type && (o[v.type] || (o[v.type] = [])).push(v), o), {}),
            deviceItem = ({name, id, value, type}) =>
                <ListItem label={name} data-id={id} onClick={this.onClick}>
                    {switchable(type) && <Switch checked={value} data-id={id} onChange={this.onSwitch}/>}
                    {isIndicator(type) && <Indicator {...{normal: value === false, warning: value === true}} />}
                </ListItem>,
            typeItem = type =>
                <NestedList label={type}>
                    {devicesByType[type].map(deviceItem)}
                </NestedList>
        return (
            <Composed {...props} label={`${label} (${Object.values(devices).length})`}>
                {Object.keys(devicesByType).map(typeItem)}
            </Composed>
        )
    }
})

export const Devices = ComposeSheets(DevicesSheet('subsection', {}))
