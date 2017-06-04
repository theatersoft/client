import {h, Component} from 'preact'
import {Button, TapMenu, mousePosition, touchPosition} from '@theatersoft/components'
import {Video} from '../'
import {focus, mixinFocusable} from '@theatersoft/focus'
import {log} from '@theatersoft/bus'

export default class Menu extends mixinFocusable(Component) {
    state = {active: false}

    onActive = active => this.setState({active})

    onGesture = e => {if (!this.state.active) Video.onGesture(e)}

    onKeydown = e => {if (!this.state.active) Video.onKeydown(e)}

    onMousedownCapture = e => {if (Video.testEvent(e)) e.preventDefault()}

    render ({items, ...props}) {
        return (
            <div onMousedownCapture={this.onMousedownCapture}>
                <TapMenu
                    actions={Object.entries(items).map(([icon, onClick]) => ({icon, onClick}))}
                    onActive={this.onActive}
                    {...props}
                />
            </div>
        )
    }
}
