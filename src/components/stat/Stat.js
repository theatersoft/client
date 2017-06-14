import {h, Component} from 'preact'
import {Button, classes} from '@theatersoft/components'
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
            <div class={classes(style.stat, style.row)}>
                <div class={style.col1}>
                    {T(date)}
                    {T(time, 'time')}
                    {T('OUTDOOR')}
                    {T(OAT + '°', 'ot')}
                    {T('STATUS')}
                    {T(MODE + ' / ' + Z1FAN)}
                </div>
                <div class={style.col2}>
                    {T(Z1RT + '°', 'rt')}
                    {T(`${Z1RH}% Humidity ${HUMID}`, 'hum')}
                    <div class={style.row}>
                        <div class={style.col}>
                            {T(Z1HTSP, 'htsp')}
                            <div class={style.row}>
                                <div class={style.col}><Button round inverse icon="arrow-down"/></div>
                                <div class={style.col}><Button round inverse icon="arrow-up"/></div>
                            </div>
                        </div>
                        <div class={style.col}>
                            {T(Z1CLSP, 'clsp')}
                            <div class={style.row}>
                                <div class={style.col}><Button round inverse icon="arrow-down"/></div>
                                <div class={style.col}><Button round inverse icon="arrow-up"/></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})
