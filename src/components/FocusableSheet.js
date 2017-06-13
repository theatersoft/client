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

    render ({...props}, {active}) {
        console.log(this.props)
        return (
            <Sheet type={type} active={active} onClick={this.onClose}>
                <Content {...props}/>
            </Sheet>
        )
    }
}