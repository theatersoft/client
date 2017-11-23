import {h, Component} from 'preact'
import {List, NestedList, ListItem, Switch, Subheader} from '@theatersoft/components'
import {connect} from '../redux'
import {ServiceSettings as Automation} from '@theatersoft/automation'
import {ServiceSettings as ZWave} from '@theatersoft/zwave'
import {proxy} from '@theatersoft/bus'

const
    settingsMap = {Automation, ZWave}

export const ServiceSettings = (Composed, {service}) => class extends Component {
    Settings = settingsMap[service.export] && settingsMap[service.export](NestedList, {service, ...this.props})

    componentDidMount () {
    }

    onRunning = value => {}

    render (_, {running = false}) {
        const
            {id, enabled = true, host, module, export: _export, config} = service
        return (
            <Composed>
                <NestedList label="Service Settings" active>
                    <Subheader label="Host"/>
                    <ListItem label={host}/>
                    <Subheader label="Module"/>
                    <ListItem label={module}/>
                    <Subheader label="Export"/>
                    <ListItem label={_export}/>
                    <Subheader label="Config"/>
                    <ListItem label={JSON.stringify(config)}/>
                    <ListItem label="Running">
                        <Switch checked={running} onChange={this.onRunning}/>
                    </ListItem>
                    <ListItem label="Enabled">
                        <Switch checked={enabled}/>
                    </ListItem>
                </NestedList>
                {this.Settings && <this.Settings label={`${id} Settings`} active/>}
            </Composed>
        )
    }
}
