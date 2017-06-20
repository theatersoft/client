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
        const
            id = e.currentTarget.dataset.id,
            value = this.props.devices[id].value
        this.props.dispatchDeviceAction(switchAction(value, id))
    }

    onChange = (value, e) => this.onClick(e)

    render ({devices}) {
        const
            devicesByType = Object.values(devices).reduce((o, v) => ((o[v.type] || (o[v.type] = [])).push(v), o), {}),
            deviceItem = ({name, id, value}) =>
                <ListItem label={name} data-id={id} onClick={this.onClick}>
                    <Switch checked={value} data-id={id} onChange={this.onChange}/>
                </ListItem>,
            typeItem = type =>
                <NestedList label={type === 'undefined' ? 'Other' : type}>
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
