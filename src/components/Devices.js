import {h, Component} from 'preact'
import {List, NestedList, ListItem, Switch, Indicator} from '@theatersoft/components'
import {connect} from '../redux'
import {deviceAction} from '../actions'
import {Type, Interface, interfaceOfType, switchActions} from '@theatersoft/device'
import {DeviceSettings as X10} from '@theatersoft/x10'
import {DeviceSettings as ZWave} from '@theatersoft/zwave'

const
    isSwitch = type => interfaceOfType(type) === Interface.SWITCH_BINARY || interfaceOfType(type) === Interface.SWITCH_MULTILEVEL,
    isIndicator = type => interfaceOfType(type) === Interface.SENSOR_BINARY,
    switchable = type => isSwitch(type) && type !== Type.Siren,

    deviceSettings = id => {
        const
            [, service] = /^([^\.]+)\.([^]+)$/.exec(id) || [],
            settings = {X10, ZWave}[service]
        return settings || false
    }

const
    mapStateToProps = ({devices = {}, Time, offset}) => ({devices, Time, offset}),
    mapDispatchToProps = dispatch => ({dispatchDeviceAction: action => dispatch(deviceAction(action))})

export const Devices = (ComposedComponent, props) => connect(mapStateToProps, mapDispatchToProps)(class extends Component {
    state = {index: 0}

    onClick = e => {
        const
            id = e.currentTarget.dataset.id
        if (deviceSettings(id)) this.setState({index: 1, id})
    }

    onSwitch = (_, e) => {
        const
            id = e.currentTarget.dataset.id,
            {value, type} = this.props.devices[id]
        if (switchable(type)) this.props.dispatchDeviceAction(switchActions.toggle(value, id))
    }

    onBack = e => {
        if (this.state.index) {
            e.preventDefault()
            this.setState({index: 0})
        }
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
                </NestedList>,
            settings = id && deviceSettings(id)
        return (
            <ComposedComponent index={index} onBack={this.onBack}>
                <subsection>
                    {Object.keys(devicesByType).map(typeItem)}
                </subsection>
                {settings && h(settings('subsection'))}
            </ComposedComponent>
        )
    }
})

