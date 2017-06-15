import {h, Component} from 'preact'
import {Row, Button} from '@theatersoft/components'
import {connect} from '../../redux'

const mapStateToProps = ({Time}) => ({Time})

export default connect(mapStateToProps)(class extends Component {
    render ({Time}) {
        const
            _time = new Date(Time),
            date = _time.toLocaleDateString('en-US', {weekday: "short", month: "short", day: "numeric"}),
            time = _time.toLocaleTimeString('en-US', {hour: "numeric", minute: "numeric"}).toLowerCase()
        return (
            <Row between>
                <span>{time}</span>
                <span>{date}</span>
                <Button round inverse icon="spinner" onClick={() => window.location.reload()}/>
            </Row>
        )
    }
})