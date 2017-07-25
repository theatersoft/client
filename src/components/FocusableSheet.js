import {h, Component} from 'preact'
import {focus, mixinFocusable} from '@theatersoft/focus'
import {Sheet} from '@theatersoft/components'

export const FocusableSheet = ({type}) => Content => class extends mixinFocusable(Component) {
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

    render ({children, ...props}, {active}) {
        console.log('FocusableSheet', Content, children)
        return (
            <Sheet type={type} active={active} onClick={this.onClose} {...props}>
                {Content ? <Content/> : children}
            </Sheet>
        )
    }
}