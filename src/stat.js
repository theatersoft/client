import {h, Component, grid, Icon, Text, Row, Col, row, rows, cols} from './ui'

export const Stat = ({value = {}, Time, onClose}) => {
    const
        {OAT = 0, MODE = '', HUMID = '', Z1FAN = '', Z1RT = 0, Z1RH = 0, Z1HTSP = 0, Z1CLSP = 0} = value,
        _time = new Date(Time),
        date = _time.toLocaleDateString('en-US', {weekday: "short", month: "short", day: "numeric"}),
        time = _time.toLocaleTimeString('en-US', {hour: "numeric", minute: "numeric"}).toLowerCase(),
        T = (t, a) => <Text text={t} id={a}/>
    return (
        <div class="container" id="stat">
            <Col>
                {T(date)}
                {T(time, 'time')}
                {T('OUTDOOR')}
                {T(OAT + '°', 'ot')}
                {T('STATUS')}
                {T(MODE + ' / ' + Z1FAN)}
                <Icon icon="cross" cb={onClose}/>
            </Col>
            <Col>
                {T(Z1RT + '°', 'rt')}
                {T(`${Z1RH}% Humidity ${HUMID}`, 'hum')}
                <Row>
                    <div class="col-1-2">
                        {T(Z1HTSP, 'htsp')}
                        <Row>
                            <div class="col-1-4"><Icon icon="arrow-down"/></div>
                            <div class="col-1-4"><Icon icon="arrow-up"/></div>
                        </Row>
                    </div>
                    <div class="col-1-2">
                        {T(Z1CLSP, 'clsp')}
                        <Row>
                            <div class="col-1-4"><Icon icon="arrow-down"/></div>
                            <div class="col-1-4"><Icon icon="arrow-up"/></div>
                        </Row>
                    </div>
                </Row>
            </Col>
        </div>
    )
}

import focus from './focus'
import api from 'preact-redux'
const {connect} = api

const mapStateToProps = ({devices: {Hvac: {value}}, Time}) => ({value, Time})

export default connect(mapStateToProps)(class StatContainer extends Component {
    render (props) {
        return <Stat {...props} onClose={() => focus.pop()}/>
    }
})
