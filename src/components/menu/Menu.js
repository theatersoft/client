import {h, Component} from 'preact'
import {Button, TapMenu, mousePosition, touchPosition} from '@theatersoft/components'
import {Video} from '../video'
import {mixinFocusable} from '@theatersoft/focus'
import style from './menu.styl'
import {log} from '@theatersoft/bus'
import {focus} from '@theatersoft/focus'

export default class Menu extends mixinFocusable(Component) {
    state = {active: false}

    ref = menu => {this.menu = menu}

    onActive = active => this.setState({active})

    onGesture = e => {
        if (!this.state.active) Video.onGesture(e)
    }

    onKeydown = e => {
        if (!this.state.active) Video.onKeydown(e)
    }

    render ({items, ...props}) {
        return (
            <TapMenu
                class={style.menu}
                actions={Object.entries(items).map(([icon, onClick]) => ({icon, onClick}))}
                ref={this.ref}
                onActive={this.onActive}
                {...props}
            />
        )
    }
}
