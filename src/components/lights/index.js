import {h, Component, RowCols, Icon, Text, Switch, focus} from '@theatersoft/components'

export const Lights = ({dispatchDeviceAction, devices = [], onClose, values}, {}) => {
    return (
        <div class="inset container">
            <Icon icon="cross" cb={onClose}/> {
            devices.map(({name, id, value}) =>
                <RowCols>
                    <Text text={name}/>
                    <Switch
                        checked={value}
                        onChange={() => dispatchDeviceAction(switchAction(value, id))}
                    />
                </RowCols>)}
        </div>
    )
}

import {connect} from '../../redux'

import {deviceAction, switchAction} from '../../actions'

const
    mapStateToProps = ({devices = {}}) => ({
        devices: Object.entries(devices)
            .filter(([k, v]) => ['Switch', 'Dimmer'].includes(v.type))
            .map(([k, v]) => v)
    }),
    mapDispatchToProps = dispatch => ({
        dispatchDeviceAction: action => dispatch(deviceAction(action))
    })
export default connect(mapStateToProps, mapDispatchToProps)
(class LightsContainer extends Component {
    render (props) {
        return <Lights {...props} onClose={() => focus.pop()}/>
    }
})