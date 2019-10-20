import React from 'react';
import {Input, Button, InputGroup, InputGroupAddon, ListGroup} from 'reactstrap';
import Method from './Method';

class Methods extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            text: ''
        };
    }

    componentWillMount(){
        this.setState({
            items: this.props.items
        })
    }

    onChange = (e) => {
        this.setState({text: e.target.value});
    }
    removeItem(key) {
        let items = [...this.state.items];

        const index = items.findIndex(item => item.id === key);
        items.splice(index, 1);

        this.setState({
            'items': items
        });
    }
    handleClick = (e) => {
        e.preventDefault();
        if (this.state.text && this.state.text.trim().length !== 0) {
            this.state.items.push({
                id: this.state.items.length,
                text: this.state.text
            });
            
            this.setState({
                text: ''
            });
        }
        this.props.onMethodsChange( this.state.items);
    }
    
    render() {
        let methodNum = 1;

        return (
            <div>
                <h2>Method</h2>

                <ListGroup mt="3">
                    {this.props.items && this.props.items.map((item, i) => 
                        <Method num={methodNum++} key={i} item={item} onChange={this.props.onMethodsChange.bind(this, i)} removeItem={this.removeItem.bind(this, i) }  />
                    )}
                </ListGroup>

                <InputGroup>
                    <Input type="textarea" onChange={ this.onChange } 
                            value={ this.state.text } />
                    <InputGroupAddon addonType="append">
                        <Button onClick={this.handleClick}>Add</Button>
                    </InputGroupAddon>
                </InputGroup>
            </div>
        )
    }
}

export default Methods;