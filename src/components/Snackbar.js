import {h, Component} from 'preact'
import {Snackbar} from '@theatersoft/components'
import {connect} from '../redux'

const mapStateToProps = ({devices}) => {
    const
        feed = devices && devices['Automation.feed'],
        value = feed && feed.value
    return value ? {
        active: value.active,
        label: value.name,
        action: value.status,
        type: value.severity === 0 ? 'error' : value.severity === 1 ? 'warning' : 'normal'
    } : {active: false}
}

const _Snackbar = connect(mapStateToProps)(props => <Snackbar {...props}/>)
export {_Snackbar as Snackbar}
