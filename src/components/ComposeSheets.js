import {h, Component} from 'preact'

export const ComposeSheets = Sheet => ComposedComponent => class extends Component {
    state = {index: 0, sheets: []}

    next = sheet => this.setState({
        index: this.state.index + 1,
        sheets: [...this.state.sheets, sheet]
    })

    prev = () => this.setState({
        index: this.state.index - 1,
        sheets: this.state.sheets.slice(0, -1)
    })

    onBack = e => {
        if (this.state.index) {
            e.preventDefault()
            this.prev()
        }
    }

    render ({}, {index, sheets}) {
        const props = {next: this.next, prev: this.prev}
        return (
            <ComposedComponent index={index} onBack={this.onBack}>
                {h(Sheet, props)}
                {sheets.map(sheet => sheet(props))}
                <subsection/>
            </ComposedComponent>
        )
    }
}
