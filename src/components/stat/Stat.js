import {h, Component} from 'preact'
import {grid, Icon, Row, Col, row, rows, cols} from '@theatersoft/components'
import {focus} from '@theatersoft/focus'
import style from './stat.styl'

export const Stat = ({value = {}, Time, onClose}) => {
    const
        {OAT = 0, MODE = '', HUMID = '', Z1FAN = '', Z1RT = 0, Z1RH = 0, Z1HTSP = 0, Z1CLSP = 0} = value,
        _time = new Date(Time),
        date = _time.toLocaleDateString('en-US', {weekday: "short", month: "short", day: "numeric"}),
        time = _time.toLocaleTimeString('en-US', {hour: "numeric", minute: "numeric"}).toLowerCase(),
        T = (t, a) => <div id={style[a]}>{t}</div>
    return (
        <div class="container" id={style.stat}>
            <Col class="col">
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
                    <div class={style['col-1-2']}>
                        {T(Z1HTSP, 'htsp')}
                        <Row>
                            <div class={style['col-1-4']}><Icon icon="arrow-down"/></div>
                            <div class={style['col-1-4']}><Icon icon="arrow-up"/></div>
                        </Row>
                    </div>
                    <div class={style['col-1-2']}>
                        {T(Z1CLSP, 'clsp')}
                        <Row>
                            <div class={style['col-1-4']}><Icon icon="arrow-down"/></div>
                            <div class={style['col-1-4']}><Icon icon="arrow-up"/></div>
                        </Row>
                    </div>
                </Row>
            </Col>
        </div>
    )
}

import {connect} from '../../redux'

const mapStateToProps = ({devices: {Hvac: {value} = {}}, Time}) => ({value, Time})

export default connect(mapStateToProps)(class StatContainer extends Component {
    render (props) {
        return <Stat {...props} onClose={() => focus.pop()}/>
    }
})
