import {h, Component} from 'preact'
import {ListItem, Switch, Subheader} from '@theatersoft/components'
import {proxy} from '@theatersoft/bus'
import {connect} from '../redux'
import {DeviceSettings as X10} from '@theatersoft/x10'
import {DeviceSettings as ZWave} from '@theatersoft/zwave'

const Settings = proxy('Settings')

const
    mapState = ({id}) => ({devices: {[id]: device}, settings}) => ({device, settings}),
    mapDispatch = dispatch => ({setSettingsState: state => Settings.setState(state)})

export const DeviceSettings = (Composed, {device, ...props}) => connect(mapState(device), mapDispatch)(class extends Component {
    onChange = value => this.props.setSettingsState({[`${device.id}.disabled`]: value})

    render ({device, settings}) {
        const
            {name, value, type, id} = device,
            [, service, _id] = /^([^\.]+)\.([^]+)$/.exec(id) || [, id, ''],
            item = (label, value, id) =>
                <ListItem label={label}><Switch checked={value} onChange={this.onChange}/></ListItem>
        return (
            <Composed {...props}>
                <Subheader label="Device Settings"/>
                <Subheader label="Name"/>
                <ListItem label={name}/>
                <Subheader label="Value"/>
                <ListItem label={String(typeof value === 'object' ? JSON.stringify(value) : value)}/>
                <Subheader label="Type"/>
                <ListItem label={type}/>
                <Subheader label="Service"/>
                <ListItem label={service}/>
                <Subheader label="ID"/>
                <ListItem label={_id}/>
                {item('Disabled', settings[`${id}.disabled`])}
            </Composed>
        )
    }
})
