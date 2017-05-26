import {h, Component} from 'preact'
import {Snackbar} from '@theatersoft/components'
import {connect} from '../../redux'

const
    mapStateToProps = ({devices}) => {
        console.log('mapStateToProps', devices)
        const
            feed = devices && devices['Automation.feed'],
            value = feed && feed.value
        return {
            active: value && value.active,
            label: value && value.message
        }
    }

export default connect(mapStateToProps)
(class extends Component {
    render (props) {
        console.log('Snackbar render')
        return <Snackbar {...props}/>
    }
})
