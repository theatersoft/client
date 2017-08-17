import {h, Component} from 'preact'
import {List, NestedList, ListItem, Switch, Subheader} from '@theatersoft/components'
import {proxy} from '@theatersoft/bus'

export const Sessions = (Composed, {label}) => ({next}) => (class extends Component {
    state = {sessions: []}

    componentDidMount () {
        proxy('Session').getSessions().then(sessions => this.setState({sessions}))
    }

    onClick = e => {
        const
            session = this.state.sessions[e.currentTarget.dataset.index]
        next(props => h(SessionSettings('subsection', {session}), props))
    }

    render ({}, {sessions}) {
        console.log('Sessions render', sessions.length)
        return (
            <Composed label={`${label} (${sessions.length})`}>
                {sessions.map((session, index) =>
                    <ListItem label={session.name || session.id} data-index={index} onClick={this.onClick}/>)}
            </Composed>
        )
    }
})

const SessionSettings = (Composed, {session}) => (class SessionSettings extends Component {
    render () {
        const
            {id, name, ip, ua, time} = session
        return (
            <Composed>
                <Subheader label={`${name || '(unnamed)'} Session`}/>
                <Subheader label="ID"/>
                <ListItem label={id}/>
                <Subheader label="Name"/>
                <ListItem label={name}/>
                <Subheader label="IP"/>
                <ListItem label={ip}/>
                <Subheader label="UA"/>
                <ListItem label={ua}/>
                <Subheader label="Created"/>
                <ListItem label={time}/>
            </Composed>
        )
    }
})
