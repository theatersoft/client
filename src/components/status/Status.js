import {h, Component} from 'preact'
import {List, ListItem, Switch, Row, Button} from '@theatersoft/components'
import {connect} from '../../redux'
import {settingsAction} from '../../actions'

const
    when = (time, offset) => {
        const
            minutes = Math.floor((Number(new Date()) - offset - time) / 60000),
            hours = Math.floor(minutes / 60)
        return minutes < 1 ? 'now' : minutes < 60 ? `${minutes} min ago`: `${hours} hr ${minutes % 60} min ago`
    },
    summary = ({name, status, time}, offset) =>
        <Row>
            {name} {status} {when(time, offset)}
        </Row>

const
    mapStateToProps = ({devices, Time, offset, settings}) => ({devices, Time, offset, settings}),
    mapDispatchToProps = dispatch => ({dispatchSettingsAction: state => dispatch(settingsAction(state))})

export default connect(mapStateToProps, mapDispatchToProps)(class extends Component {
    onClick = e => {
        const
            id = e.currentTarget.dataset.id,
            value = this.props.settings[id]
        this.props.dispatchSettingsAction({[id]: !value})
    }

    onChange = (value, e) => this.onClick(e)

    render ({Time, devices, offset, settings}) {
        const
            {'Automation.feed': feed} = devices,
            _time = new Date(Time),
            date = _time.toLocaleDateString('en-US', {weekday: "short", month: "short", day: "numeric"}),
            time = _time.toLocaleTimeString('en-US', {hour: "numeric", minute: "numeric"}).toLowerCase()
        return (
            <List>
                <Row between>
                    <span>{time}</span>
                    <span>{date}</span>
                    <Button round inverse icon="spinner" onClick={() => window.location.reload()}/>
                </Row>
                <ListItem label="Alarm armed"><Switch checked={settings.armed} data-id="armed" onChange={this.onChange}/></ListItem>
                <ListItem label="Away mode"><Switch checked={settings.away} data-id="away" onChange={this.onChange}/></ListItem>
                {feed && summary(feed.value, offset)}
            </List>
        )
    }
})
