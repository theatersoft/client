import {h, Component} from 'preact'
import {List, NestedList} from '@theatersoft/components'
import  {Services} from './'
import {ComposeSheets} from './ComposeSheets'

const SettingsSheet = ({next}) =>
    <subsection>
        <NestedList label="Devices"/>
        {h(Services(NestedList, {label: 'Services', next}))}
        <NestedList label="Sessions"/>
    </subsection>

export const Settings = ComposeSheets(SettingsSheet)
