import {h, Component} from 'preact'
import {Row, Col, Button, classes} from '@theatersoft/components'
import style from './stat.styl'
import {connect} from '../../redux'

const mapStateToProps = ({devices: {Hvac: {value} = {}}, Time}) => ({value, Time})

export default connect(mapStateToProps)(class extends Component {
    render ({value = {}, Time}) {
        const
            {OAT = 0, MODE = '', HUMID = '', Z1FAN = '', Z1RT = 0, Z1RH = 0, Z1HTSP = 0, Z1CLSP = 0} = value,
            _time = new Date(Time),
            date = _time.toLocaleDateString('en-US', {weekday: "short", month: "short", day: "numeric"}),
            time = _time.toLocaleTimeString('en-US', {hour: "numeric", minute: "numeric"}).toLowerCase(),
            T = (t, a) => <p class={style[a]}>{t}</p>
        return (
            <Row between class={style.stat}>
                <div>
                    {T(date)}
                    {T(time, 'time')}
                    {T('OUTDOOR')}
                    {T(OAT + '°', 'ot')}
                    {T('STATUS')}
                    {T(MODE + ' / ' + Z1FAN)}
                </div>
                <div>
                    {T(Z1RT + '°', 'rt')}
                    {T(`${Z1RH}% Humidity ${HUMID}`, 'hum')}
                    <Row>
                        <Col>
                            {T(Z1HTSP, 'htsp')}
                            <Row>
                                <Button round inverse icon="arrow-down"/>
                                <Button round inverse icon="arrow-up"/>
                            </Row>
                        </Col>
                        <Col>
                            {T(Z1CLSP, 'clsp')}
                            <Row>
                                <Button round inverse icon="arrow-down"/>
                                <Button round inverse icon="arrow-up"/>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </Row>
        )
    }
})
