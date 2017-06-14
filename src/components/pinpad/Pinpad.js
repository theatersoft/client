import {h, Component} from 'preact'
import {Button} from '@theatersoft/components'
import {focus, mixinFocusable} from '@theatersoft/focus'
import rpc from '../../rpc'
import {refresh} from '../../auth'
import style from './pinpad.styl'

export default class Pinpad extends mixinFocusable(Component) {
    constructor (props) {
        super(props)
        this.state = {pin: '0 0 0 0'}
    }

    onkey = key => this.setState({pin: `${this.state.pin.slice(2)} ${key}`})

    onClear = () => this.setState({pin: '0 0 0 0'})

    onEnter = () => {
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
            <Button floating primary label={String(n)} onClick={() => this.onkey(n)}/>
        return (
            <div class={style.pinpad}>
                <div class={style.text}>{pin}</div>
                <div class={style.row}>
                    {key(1)} {key(2)} {key(3)} <Button round accent icon="cross" onClick={this.onClear}/>
                </div>
                <div class={style.row}>
                    {key(4)} {key(5)} {key(6)} {key(0)}
                </div>
                <div class={style.row}>
                    {key(7)} {key(8)} {key(9)} <Button round accent icon="lock" onClick={this.onEnter}/>
                </div>
            </div>
        )
    }
}

