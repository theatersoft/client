import {h, Component} from 'preact'
import {ListItem, Switch, Subheader} from '@theatersoft/components'
import {proxy} from '@theatersoft/bus'
import {connect} from '../redux'

const Settings = proxy('Settings')
export const settingsAction = state => () => Settings.setState(state)

const
    mapState = p => p,
    mapDispatch = dispatch => ({
        dispatch: {
            settings: state => dispatch(settingsAction(state))
        }
    })

export const DeviceSettings = (ComposedComponent, props) => connect(mapState, mapDispatch)(class DeviceSettings extends Component {
    render ({id, devices, settings}) {
        if (!id) return null
        const
            [, service, _id] = /^([^\.]+)\.([^]+)$/.exec(id) || [, id, ''],
            device = devices[id],
            {name, value, type} = device
        return (
            <ComposedComponent {...props}>
                <Subheader label="Service"/>
                <ListItem label={service}/>
                <Subheader label="Type"/>
                <ListItem label={type}/>
                <Subheader label="ID"/>
                <ListItem label={_id}/>
                <Subheader label="Name"/>
                <ListItem label={name}/>
                <Subheader label="Value"/>
                <ListItem label={String(typeof value === 'object' ? JSON.stringify(value) : value)}/>
            </ComposedComponent>
        )
    }
})