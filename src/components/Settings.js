import {h, Component} from 'preact'
import {List} from '@theatersoft/components'
import {Devices} from './'

export class Settings extends Component {
    render () {
        return h(
            Devices(List) // TODO Devices(NestedList, {label: "Devices"})
        )
    }
}

