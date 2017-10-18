import {h, Component} from 'preact'
import {List, NestedList, ListItem, Switch, Slider, Indicator} from '@theatersoft/components'
import {connect} from '../redux'
import {deviceAction} from '../actions'
import {Type, Interface, interfaceOfType, switchActions, dimmerActions} from '@theatersoft/device'
import {ComposeSheets, DeviceSettings, mixinFocusableListener} from './'

const
    isSwitch = type => interfaceOfType(type) === Interface.SWITCH_BINARY && type !== Type.Siren,
    isDimmer = type => interfaceOfType(type) === Interface.SWITCH_MULTILEVEL,
    isIndicator = type => interfaceOfType(type) === Interface.SENSOR_BINARY

const
    mapState = ({devices = {}, Time, offset}) => ({devices, Time, offset}),
    mapDispatch = dispatch => ({dispatchDeviceAction: action => dispatch(deviceAction(action))})

export const DevicesSheet = (Composed, {label}) => ({next}) => connect(mapState, mapDispatch)(mixinFocusableListener(class extends Component {
    settings = device => next(props => h(DeviceSettings('subsection', {device})))

    onGesture ({id}, {type}) {
        if (id && type === 'hold') this.settings(this.props.devices[id])
    }

    onClick = e => {
        const
            {currentTarget: {dataset: {id}}} = e,
            {value, type} = this.props.devices[id]
        if (isSwitch(type)) this.onSwitch(!value, e)
        else if (isDimmer(type)) this.onDimmer(value ? 0 : 255, id)
    }

    onSwitch = (value, {currentTarget: {dataset: {id}}}) => this.props.dispatchDeviceAction(switchActions.toggle(!value, id))

    onDimmer = (value, id) => this.props.dispatchDeviceAction(dimmerActions.set(value, id))
    
    render ({devices}, {index, id}) {
        const
            devicesByType = Object.values(devices).reduce((o, v) => (v.type && (o[v.type] || (o[v.type] = [])).push(v), o), {}),
            deviceItem = ({name, id, value, type}) =>
                <ListItem label={name} data-id={id} onClick={this.onClick}>{
                    isSwitch(type) ? <Switch checked={value} data-id={id} onChange={this.onSwitch}/>
                        : isDimmer(type) ? <Slider value={value} max={99} onChange={v => this.onDimmer(v, id)}/>
                        : isIndicator(type) ? <Indicator {...{normal: value === false, warning: value === true}} />
                        : null
                }</ListItem>,
            typeItem = type =>
                <NestedList label={type}>
                    {devicesByType[type].map(deviceItem)}
                </NestedList>
        return (
            <Composed label={`${label} (${Object.values(devices).length})`}>
                {Object.keys(devicesByType).map(typeItem)}
            </Composed>
        )
    }
}))

export const Devices = ComposeSheets(DevicesSheet('subsection', {}))
