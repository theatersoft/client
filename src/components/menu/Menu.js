import {h, Component} from 'preact'
import {Button, TapMenu, mousePosition, touchPosition} from '@theatersoft/components'
import {Video} from '../'
import {focus, mixinFocusable} from '@theatersoft/focus'

export default class Menu extends mixinFocusable(Component) {
    state = {active: false}

    onActive = active => this.setState({active})

    onGesture = e => {
        if (!this.state.active) Video.onGesture(e)
    }

    onKeydown = e => {
        if (this.state.active || e.key === 'NumpadEnter' || e.key === 'Enter')
            this.tapmenu && this.tapmenu.onKeydown(e)
        else
            Video.onKeydown(e)
    }

    onMousedownCapture = e => {
        if (Video.testEvent(e)) e.preventDefault()
    }

    render ({items, ...props}) {
        return (
            <div onMousedownCapture={this.onMousedownCapture}>
                <TapMenu
                    actions={Object.entries(items).map(([icon, onClick]) => ({icon, onClick}))}
                    onActive={this.onActive}
                    onRef={ref => {this.tapmenu = ref}}
                    {...props}
                />
            </div>
        )
    }
}
