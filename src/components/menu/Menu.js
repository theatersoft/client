import {h, Component} from 'preact'
import {Button, TapMenu, mousePosition, touchPosition} from '@theatersoft/components'
import {Video} from '../video'
import {mixinFocusable} from '@theatersoft/focus'
import style from './menu.styl'
import {log} from '@theatersoft/bus'
import {focus} from '@theatersoft/focus'

export default class Menu extends mixinFocusable(Component) {
    render ({items, ...props}) {
        log('Menu')
        return (
            <TapMenu
                class={style.menu}
                actions={Object.entries(items).map(([icon, onClick]) => ({icon, onClick}))}
                {...props}
            />
        )
    }

    onGesture (e) {
        Video.onGesture(e)
        log(e)
    }

    onKeydown (e) {
        log(e)
        Video.onKeydown(e)
    }
}
