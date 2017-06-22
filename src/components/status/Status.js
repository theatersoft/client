import {h, Component} from 'preact'
import {List, ListItem, Switch, Row, Button} from '@theatersoft/components'
import {connect} from '../../redux'

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

const mapStateToProps = ({devices, Time, offset}) => ({devices, Time, offset})

export default connect(mapStateToProps)(class extends Component {
    render ({Time, devices, offset}) {
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
                <ListItem label="Alarm armed"><Switch checked={false}/></ListItem>
                <ListItem label="Away mode"><Switch checked={false}/></ListItem>
                {feed && summary(feed.value, offset)}
            </List>
        )
    }
})