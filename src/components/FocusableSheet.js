import {h, Component} from 'preact'
import {focus, mixinFocusable} from '@theatersoft/focus'
import {Sheet} from '@theatersoft/components'
import {mixinEventEmitter} from '@theatersoft/bus'

export const FocusableSheet = ({type}) => Content => class extends mixinFocusable(mixinEventEmitter(Component)) {
    state = {active: false}

    getChildContext () {return {focus: this}}

    onKeydown = e => {if (e.key === 'Escape') this.onClick(e)}

    onGesture = e => this.emit('gesture', e)

    onClick = e => {
        if (this.state.active) {
            if (this.props.onBack) this.props.onBack(e)
            if (!e.defaultPrevented) {
                this.setState({active: false})
                setTimeout(() => focus.pop(), 250)
            }
        }
    }

    componentDidMount()
    {
        this.setState({active: true})
        super.componentDidMount()
    }

    render ({children, ...props}, {active}) {
        return (
            <Sheet type={type} active={active} onClick={this.onClick} {...props}>
                {Content ? <Content/> : children}
            </Sheet>
        )
    }
}