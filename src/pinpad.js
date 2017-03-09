import {h, Component, grid, Icon, Text} from './ui'
import focus, {mixinFocusable} from './focus'
import rpc from './rpc'
import {refresh} from './auth'

export default class Pinpad extends mixinFocusable(Component) {
    constructor (props) {
        super(props)
        this.state = {pin: '0 0 0 0'}
    }

    onkey (key) {
        this.setState({pin: `${this.state.pin.slice(2)} ${key}`})
    }

    onenter () {
        console.log('onenter')
        rpc('Session.Login', [this.state.pin.replace(/\s/g, '')])
            .then(r => {
                console.log(r)
                if (r) {
                    window.location.reload()
                }
            })
            .catch(e => {
                console.log(e)
            })
    }

    render ({}, {pin}) {
        const key = n =>
            <div class="key" onClick={() => this.onkey(n)}>{n}</div>
        return <div class="container" id="pinpad">
            {grid([
                [<Text text={pin}/>],
                [key(1), key(2), key(3), <Icon icon="cross" cb={() => focus.pop()}/>],
                [key(4), key(5), key(6), key(0)],
                [key(7), key(8), key(9), <Icon icon="lock" cb={() => this.onenter()}/>]
            ])}
        </div>
    }
}

