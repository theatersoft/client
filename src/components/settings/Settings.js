import {h, Component} from 'preact'
import {List, ListItem, Switch, Row, Button} from '@theatersoft/components'
import {connect} from '../../redux'

const mapStateToProps = ({devices, Time, offset}) => ({devices, Time, offset})

export default connect(mapStateToProps)(class extends Component {
    render ({Time, devices, offset}) {
        return (
            <List>
                <ListItem label="Devices">
                </ListItem>
            </List>
        )
    }
})