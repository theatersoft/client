import {h, Component} from 'preact'
import {Row, Col, Button} from '@theatersoft/components'
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

    onEnter = () => rpc('Session.Login', [this.state.pin.replace(/\s/g, '')]).then(r => r && window.location.reload())
    
    render ({}, {pin}) {
        const key = n =>
            <Button floating primary label={String(n)} onClick={() => this.onkey(n)}/>
        return (
            <Col class={style.pinpad}>
                <Row center class={style.text}>{pin}</Row>
                <Row>{key(1)} {key(2)} {key(3)} <Button round accent icon="cross" onClick={this.onClear}/></Row>
                <Row>{key(4)} {key(5)} {key(6)} {key(0)}</Row>
                <Row>{key(7)} {key(8)} {key(9)} <Button round accent icon="lock" onClick={this.onEnter}/></Row>
            </Col>
        )
    }
}

