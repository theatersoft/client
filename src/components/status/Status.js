import {h, Component} from 'preact'
import {List, ListItem, Switch, Row, Button} from '@theatersoft/components'
import {serviceId} from '@theatersoft/device'
import {connect} from '../../redux'
import {settingsAction, localsAction} from '../../actions'
import {notificationsAction} from '../../push'
import {dateString, timeString, agoString} from '../../util'

const
    mapState = p => p,
    mapDispatch = dispatch => ({
        dispatch: {
            settings: state => dispatch(settingsAction(state)),
            locals: state => dispatch(localsAction(state)),
            notifications: state => dispatch(notificationsAction(state))
        }
    })

export default connect(mapState, mapDispatch)(class extends Component {
    onClick = e => {
        const
            [service, id] = serviceId(e.currentTarget.dataset.id),
            value = this.props[service][id]
        this.props.dispatch[service]({[id]: !value})
    }

    onChange = (value, e) => this.onClick(e)

    render ({Time, devices, offset, settings, locals, notifications}) {
        const
            {'Automation.feed': feed} = devices,
            summary = ({name, status, time}, offset) =>
                <Row>
                    {`${name} ${status} ${agoString(time, offset)}`}
                </Row>,
            item = (label, value, id) =>
                <ListItem label={label}>
                    <Switch checked={value} data-id={id} onChange={this.onChange}/>
                </ListItem>
        return (
            <div style={{height: '100%', display: 'flex', 'flex-direction': 'column'}}>
                <Row between>
                    <span>{timeString(Time)}</span>
                    <span>{dateString(Time)}</span>
                    <Button small round inverse icon="spinner" onClick={() => window.location.reload()}/>
                </Row>
                <div style={{flex: 1, 'overflow-y': 'auto'}}>
                    <List>
                        {feed && summary(feed.value, offset)}
                        {item('Enable notifications', notifications.enabled, 'notifications.enabled')}
                        {item('Enable pairing', settings.pairing, 'settings.pairing')}
                    </List>
                </div>
            </div>
        )
    }
})
