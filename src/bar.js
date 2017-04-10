import {h, Component, Icon} from '@theatersoft/components'
import {mixinFocusable} from './focus'

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
