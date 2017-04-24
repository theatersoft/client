import {h, Component} from 'preact'
import {Icon, mixinFocusable} from '@theatersoft/components'
import style from './index.styl'

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
