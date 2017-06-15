import {h, Component} from 'preact'
import {Row, Button} from '@theatersoft/components'

export default class extends Component {
    render () {
        return (
            <Row>
                <Button round inverse icon="spinner" onClick={() => window.location.reload()}/>
            </Row>
        )
    }
}