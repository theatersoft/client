import {h, Component} from 'preact'
import {Icon} from '@theatersoft/components'
import {mixinFocusable} from '@theatersoft/focus'
import style from './bar.styl'

export default class Bar extends mixinFocusable(Component) {
    render ({items}) {
        return (
            <div class="container" id={style.bar}>
                <div class="row">
                    {Object.entries(items).map(([icon, cb], i) =>
                        <div class={`col-${i}`}>
                            <Icon {...{icon, cb}}/>
                        </div>)
                    }
                </div>
            </div>
        )
    }
}
