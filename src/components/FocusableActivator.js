import {h, Component} from 'preact'
import {focus, mixinFocusable} from '@theatersoft/focus'

export class FocusableActivator extends mixinFocusable(Component) {
    state = {active: false}

    onKeydown = e => {
        if (e.key === 'Escape') this.onClose()
    }

    onClose = () => {
        if (this.state.active) {
            this.setState({active: false})
            setTimeout(() => focus.pop(), 250)
        }
    }

    componentDidMount()
    {
        this.setState({active: true})
        super.componentDidMount()
    }
}