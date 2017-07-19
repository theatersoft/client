import {h, Component} from 'preact'
import {List} from '@theatersoft/components'
import {Devices} from './'

export class Favorites extends Component {
    render () {
        return h(
            Devices(List)
        )
    }
}
