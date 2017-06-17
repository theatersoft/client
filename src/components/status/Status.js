import {h, Component} from 'preact'
import {List, ListItem, Switch, Row, Button} from '@theatersoft/components'
import {connect} from '../../redux'

const mapStateToProps = ({devices, Time, offset}) => ({devices, Time, offset})

export default connect(mapStateToProps)(class extends Component {
    when = (time, offset) => {
        const minutes = (Number(new Date()) - offset - time) / 60000
        return minutes < 1 ? 'just now' : minutes < 2 ? '1 min ago' :`${Math.floor(minutes)} minutes ago`
    }

    summary = ({name, status, time}, offset) =>
        <Row>
            {name} {status} {this.when(time, offset)}
        </Row>

    render ({Time, devices, offset}) {
        const {'Automation.feed': feed} = devices
        console.log(feed)
        const
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
                {feed && this.summary(feed.value, offset)}
            </List>
        )
    }
})