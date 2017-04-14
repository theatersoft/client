import {h, Component} from 'preact'
import {Icon, mixinFocusable} from '@theatersoft/components'
import './index.styl'

export default class Bar extends mixinFocusable(Component) {
    render ({items}) {
        return (
            <div class="container" id="bar">
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
