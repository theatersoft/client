import {h, Component} from 'preact'

export const ComposeSheets = Sheet => Composed => class extends Component {
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

    props = {next: this.next, prev: this.prev}

    Sheet = Sheet(this.props)

    render ({}, {index, sheets}) {
        return (
            <Composed index={index} onBack={this.onBack}>
                <this.Sheet/>
                {sheets.map(Sheet => Sheet(this.props))}
                <subsection/>
            </Composed>
        )
    }
}
