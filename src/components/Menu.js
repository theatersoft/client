import {h, Component} from 'preact'
import {Button, TapMenu, mousePosition, touchPosition} from '@theatersoft/components'
import {Video} from './'
import {focus, mixinFocusable} from '@theatersoft/focus'
import {log, mixinEventEmitter} from '@theatersoft/bus'

export class Menu extends mixinFocusable(mixinEventEmitter(Component)){
    state = {active: false}

    getChildContext () {return {focus: this}}

    onActive = active => this.setState({active})

    onGesture = e => {
        if (!e.srcEvent.defaultPrevented) {
            if (!this.state.active) Video.onGesture(e)
            this.emit('gesture', e)
        }
    }

    onKeydown = e => {
        if (this.state.active || e.key === 'NumpadEnter' || e.key === 'Enter')
            this.tapmenu && this.tapmenu.onKeydown(e)
        else
            Video.onKeydown(e)
    }

    render ({items, ...props}) {
        return (
            <div>
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
