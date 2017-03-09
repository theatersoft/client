import {
    h, render, Component,
    Icon,
    Text,
    Row, Col,
    RowCols,
    col, cols, row,
    Button,
    Switch
} from '../src/ui'
import '../src/resize'
import '../../build/client/test/theatersoft.css'

const tests = {}, test = (n, v) => tests[n] = v

import Pinpad from '../src/pinpad'
test('pinpad', <Pinpad/>)

import Bar from '../src/bar'
test('bar',
    <Bar {...{items: [{icon: 'logo'}, {icon: 'spinner'}, {icon: 'cross'}, {icon: 'thermometer'}, {icon: 'list'}]}}/>)

import {Stat} from '../src/stat'
test('stat', <Stat
    value={{OAT: 0, MODE: '', Z1FAN: '', Z1RT: 0, Z1RH: 0, Z1HTSP: 0, Z1CLSP: 0, date: 'date', xtime: 'time'}}
    Time={new Date()}
/>)

import Projector from '../src/projector'
test('projector', <Projector/>)

test('button',
    <div class="container">
        <RowCols>
            <Button text="Button"/>
            <Text text="1"/>
        </RowCols>
    </div>)

test('rows',
    <div class="container">
        <RowCols>
            <Text text="Projector"/>
        </RowCols>
        <RowCols>
            <Text text="On"/>
            <Icon {...{icon: "arrow-up"}}/>
        </RowCols>
        <RowCols>
            <Button text="test"/>
        </RowCols>
    </div>)

class List extends Component {
    constructor (props) {
        super(props)
        Promise.resolve(props.items).then(items =>
            this.setState({items})
        )
    }

    render ({}, {items = []}) {
        return (
            <div class="container">
                {items.map(i =>
                    <RowCols>
                        <Text text={i.text}/>
                        <Icon {...{icon: "arrow-up"}}/>
                        <Icon {...{icon: "arrow-down"}}/>
                    </RowCols>
                )}
            </div>
        )
    }
}
test('list',
    <List {...{
    items: [
        {text: 'Studio', address: 'A1'},
        {text: 'Front', address: 'A2'},
        {text: 'Garage', address: 'A3'},
        {text: 'Path', address: 'A4'},
        {text: 'Deck', address: 'A5'},
        {text: 'Theater', address: 'A6', 'dim': 'true'},
        {text: 'Garage', address: 'A7', 'device': 'PR511'},
        {text: 'Office motion', address: 'A8', 'device': 'MS14A'}
    ]
}}/>)

class Switches extends Component {
    state = {
        sw: false
    }

    onChange = value => {
        console.log('Switches.onChange', value)
        this.setState({sw: value})
    }

    render ({}, {sw}) {
        console.log('Switches.render', this.state)
        return (
            <Switch
                checked={sw}
                label="test switch"
                onChange={this.onChange}
            />
        )
    }
}
test('switches', <Switches/>)

render(tests.
    //pinpad
    //bar
    //projector
    //stat
    //button
    rows
    //list
    //switches
)
