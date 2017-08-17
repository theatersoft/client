import {h, Component} from 'preact'
import {List, NestedList, ListItem, Switch, Subheader} from '@theatersoft/components'
import {connect} from '../redux'

const
    mapState = ({config: {hosts}}) => ({hosts})

export const Hosts = (Composed, {label}) => ({next}) => connect(mapState)(class extends Component {
    hosts = this.props.hosts

    onClick = e => {
        const
            host = this.hosts[e.currentTarget.dataset.index]
        next(props => h(HostSettings('subsection', {host})))
    }

    render () {
        return (
            <Composed label={`${label} (${this.hosts.length})`}>
                {this.hosts.map((host, index) =>
                    <ListItem label={host.name} data-index={index} onClick={this.onClick}/>)}
            </Composed>
        )
    }
})

const HostSettings = (Composed, {host}) => class extends Component {
    render () {
        const
            {name} = host
        return (
            <Composed>
                <Subheader label={`${name} Settings`}/>
            </Composed>
        )
    }
}
