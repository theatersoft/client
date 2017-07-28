import {h, Component} from 'preact'
import {List, ListItem, Switch, Row, Button} from '@theatersoft/components'
import {connect} from '../../redux'
import {settingsAction, localsAction} from '../../actions'
import {notificationsAction} from '../../push'

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
            [, service, id] = /^(\w+)\.(\w+)$/.exec(e.currentTarget.dataset.id),
            value = this.props[service][id]
        this.props.dispatch[service]({[id]: !value})
    }

    onChange = (value, e) => this.onClick(e)

    render ({Time, devices, offset, settings, locals, notifications}) {
        const
            {'Automation.feed': feed} = devices,
            _time = new Date(Time),
            date = _time.toLocaleDateString('en-US', {weekday: "short", month: "short", day: "numeric"}),
            time = _time.toLocaleTimeString('en-US', {hour: "numeric", minute: "numeric"}).toLowerCase(),
            when = (time, offset) => {
                const
                    minutes = Math.floor((Number(new Date()) + offset - time) / 60000),
                    hours = Math.floor(minutes / 60)
                return minutes < 1 ? 'now' : minutes < 60 ? `${minutes} min ago` : `${hours} hr ${minutes % 60} min ago`
            },
            summary = ({name, status, time}, offset) =>
                <Row>
                    {`${name} ${status} ${when(time, offset)}`}
                </Row>,
            item = (label, value, id) =>
                <ListItem label={label}>
                    <Switch checked={value} data-id={id} onChange={this.onChange}/>
                </ListItem>
        return (
            <div style={{height: '100%', display: 'flex', 'flex-direction': 'column'}}>
                <Row between>
                    <span>{time}</span>
                    <span>{date}</span>
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
