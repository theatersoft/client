import {h, Component} from 'preact'
import {focus, mixinFocusable} from '@theatersoft/focus'
import {Sheet} from '@theatersoft/components'

export const FocusableSheet = ({type}) => Content => class extends mixinFocusable(Component) {
    state = {active: false}

    onKeydown = e => {
        if (e.key === 'Escape') this.onClose()
    }

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
        console.log('FocusableSheet', Content, children)
        return (
            <Sheet type={type} active={active} onClick={this.onClick} {...props}>
                {Content ? <Content/> : children}
            </Sheet>
        )
    }
}