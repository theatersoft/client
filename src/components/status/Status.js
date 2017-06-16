import {h, Component} from 'preact'
import {List, ListItem, Switch, Row, Button} from '@theatersoft/components'
import {connect} from '../../redux'

const
    when = () => 'ago',
    summary = ({name, status, id}) => (
        <Row>
            {name}, last {status} {when(id)}
        </Row>
    )

const mapStateToProps = ({Time, devices}) => ({Time, devices})

export default connect(mapStateToProps)(class extends Component {
    render ({Time, devices}) {
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
                { feed && summary(feed.value)}
            </List>
        )
    }
})