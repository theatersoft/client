import {h, Component} from 'preact'
import {List, NestedList, ListItem, Switch, Subheader} from '@theatersoft/components'
import {proxy} from '@theatersoft/bus'

export const Sessions = (Composed, {label, next}) => (class extends Component {
    sessions = []

    onClick = e => {
        const
            session = this.sessions[e.currentTarget.dataset.index]
        next(props => h(SessionSettings('subsection', {session}), props))
    }

    render ({sessions}) {
        return (
            <Composed label={`${label} (${this.sessions.length})`}>
                {this.sessions.map((session, index) =>
                    <ListItem label={session.name} data-index={index} onClick={this.onClick}/>)}
            </Composed>
        )
    }
})

const SessionSettings = (Composed, {session}) => (class SessionSettings extends Component {
    render ({settings}) {
        const
            item = (label, value) => <ListItem label={label}><Switch checked={value}/></ListItem>,
            {name} = session
        return (
            <Composed>
                <Subheader label={`${name} Settings`}/>
            </Composed>
        )
    }
})
