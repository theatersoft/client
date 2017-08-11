import {h, Component} from 'preact'
import {ListItem, Switch, Subheader} from '@theatersoft/components'
import {proxy} from '@theatersoft/bus'
import {connect} from '../redux'

const Settings = proxy('Settings')

const
    mapState = p => p,
    mapDispatch = dispatch => ({setSettingsState: state => Settings.setState(state)})

export const DeviceSettings = (Composed, props) => connect(mapState, mapDispatch)(class DeviceSettings extends Component {
    onChange = value => {
        this.props.setSettingsState({[`${this.props.id}.disabled`]: value})
    }

    render ({id, devices, settings}) {
        if (!id) return null
        const
            [, service, _id] = /^([^\.]+)\.([^]+)$/.exec(id) || [, id, ''],
            device = devices[id] || {},
            {name, value, type} = device,
            item = (label, value, id) => <ListItem label={label}><Switch checked={value} onChange={this.onChange}/></ListItem>
        return (
            <Composed {...props}>
                <Subheader label="DEVICE SETTINGS"/>
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