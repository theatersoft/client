import {h, Component} from 'preact'
import {List} from '@theatersoft/components'
import {Devices} from '../'

export default class extends Component {
    render () {
        return h(
            Devices(List) // TODO Devices(NestedList, {label: "Devices"})
        )
    }
}

