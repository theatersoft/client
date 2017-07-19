import {h, Component} from 'preact'
import {List, NestedList} from '@theatersoft/components'

export class Settings extends Component {
    render () {
        const typeItems = (type, items) =>
            <NestedList label={type}>
                {items}
            </NestedList>
        return (
            <List>
                {
                    typeItems('Devices', [])  // TODO Devices(NestedList, {label: "Devices"})
                }
                {typeItems('Services', [])}
                {typeItems('Sessions', [])}
            </List>
        )
    }
}
