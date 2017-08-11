import {h, Component} from 'preact'
import {List, NestedList, ListItem} from '@theatersoft/components'
import {connect} from '../redux'
import {ServiceSettings as Automation} from '@theatersoft/automation'
import {ServiceSettings as ZWave} from '@theatersoft/zwave'

const
    mapState = ({config: {hosts}}) => ({hosts})

export const Services = (Composed, {label, next}) => connect(mapState)(class extends Component {
    onClick = e => {
        const
            {id, ex} = e.currentTarget.dataset,
            settings = {Automation, ZWave}[ex]
        if (settings) next(props => h(settings('subsection'), {id, ...props}))
    }

    render ({hosts}) {
        const
            services = hosts.reduce((a, h) => (h.services && h.services.forEach(s => a.push(s)), a), []),
            serviceItem = ({name: id, export: ex}) =>
                <ListItem label={id} data-id={id} data-ex={ex} onClick={this.onClick}/>
        return (
            <Composed label={label}>
                {services.map(serviceItem)}
            </Composed>
        )
    }
})
