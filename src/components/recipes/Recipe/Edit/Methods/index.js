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
    componentWillReceiveProps(nextProps) {
        console.log(nextProps);

      this.setState({
        items: nextProps.items,  
      });
      
    }

    onChange = (e) => {
        this.setState({text: e.target.value});
    }

    changeItem(key, e) {
        const index = this.state.items.findIndex((item) => {
            return item.id === key
        });

        const item = Object.assign({}, this.state.items[index]);

        item.text = e.target.value;

        const items =this.state.items;

        items[index] = item;

        this.setState({items:items});
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
                        <Method num={methodNum++} key={i} item={item} onChange={this.changeItem.bind(this, item.id)} removeItem={this.removeItem.bind(this, i) }  />
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