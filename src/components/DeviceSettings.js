import {h, Component} from 'preact'
import {ListItem, NestedList, Switch, Subheader} from '@theatersoft/components'
import {proxy} from '@theatersoft/bus'
import {serviceId} from '@theatersoft/device'
import {connect} from '../redux'
import {dateTimeString} from '../util'
import {DeviceSettings as X10} from '@theatersoft/x10'
import {DeviceSettings as ZWave} from '@theatersoft/zwave'

const
    Settings = proxy('Settings'),
    getSettings = ({module, export: _export}) => ({
        '@theatersoft/x10.X10': X10,
        '@theatersoft/zwave.ZWave': ZWave
    }[`${module}.${_export}`])

const
    mapState = id => ({devices: {[id]: device}, settings, services}) => ({device, settings, services}),
    mapDispatch = dispatch => ({setSettingsState: state => Settings.setState(state)})

export const DeviceSettings = (Composed, {device: {id}}) => connect(mapState(id), mapDispatch)(class extends Component {
    constructor (props, context) {
        super(props, context)
        const
            {device, services} = props,
            [service, id] = serviceId(device.id),
            comp = getSettings(services[service])
        this.Settings = comp && comp(NestedList, {service, id, device})
    }

    onDisabled = value => this.props.setSettingsState({[`${id}.disabled`]: value})

    render ({device, settings}) {
        const
            {name, value, time, type} = device,
            [service, _id] = serviceId(id)
        return (
            <Composed>
                <NestedList label="Device Settings" active>
                    <Subheader label="Name"/>
                    <ListItem label={name}/>
                    <Subheader label="Value"/>
                    <ListItem label={String(typeof value === 'object' ? JSON.stringify(value) : value)}/>
                    {time && <Subheader label="Time"/>}
                    {time && <ListItem label={dateTimeString(time)}/>}
                    <Subheader label="Type"/>
                    <ListItem label={type}/>
                    <Subheader label="Service"/>
                    <ListItem label={service}/>
                    <Subheader label="ID"/>
                    <ListItem label={_id}/>
                    <ListItem label="Disabled"><Switch checked={settings[`${id}.disabled`]} onChange={this.onDisabled}/></ListItem>
                </NestedList>
                {this.Settings && <this.Settings label={`${service} Settings`} active/>}
            </Composed>
        )
    }
})
