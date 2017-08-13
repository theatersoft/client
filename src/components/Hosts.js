import {h, Component} from 'preact'
import {List, NestedList, ListItem, Switch, Subheader} from '@theatersoft/components'
import {connect} from '../redux'

const
    mapState = ({config: {hosts}}) => ({hosts})

export const Hosts = (Composed, {label, next}) => connect(mapState)(class extends Component {
    hosts = this.props.hosts

    onClick = e => {
        const
            host = this.hosts[e.currentTarget.dataset.index]
        next(props => h(HostSettings('subsection', {host}), props))
    }

    render ({hosts}) {
        return (
            <Composed label={`${label} (${this.hosts.length})`}>
                {this.hosts.map((host, index) =>
                    <ListItem label={host.name} data-index={index} onClick={this.onClick}/>)}
            </Composed>
        )
    }
})

const HostSettings = (Composed, {host}) => connect(p => p)(class HostSettings extends Component {
    render ({settings}) {
        const
            item = (label, value) => <ListItem label={label}><Switch checked={value}/></ListItem>,
            {name} = host
        return (
            <Composed>
                <Subheader label={`${name} Settings`}/>
            </Composed>
        )
    }
})
