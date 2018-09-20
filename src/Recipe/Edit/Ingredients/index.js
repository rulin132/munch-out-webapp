import React from 'react';
import {Input, Button, InputGroup, InputGroupAddon, ListGroup} from 'reactstrap';

import Ingredient from './Ingredient';

class Ingredients extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            items: this.props.items,
            text: ''
        };
    }

    onChange = (e) => {
        this.setState({text: e.target.value});
        
    }
    
    removeItem = (key) => {
        let items = this.state.items;

        const index = items.findIndex(item => item.id === key);

        this.setState({
            'items': items.splice(index, 1)
        });
    }

    changeItem = (key, e) => {
        const index = this.state.items.findIndex((item) => {
            return item.id === key
        });

        const item = Object.assign({}, this.state.items[index]);

        item.text = e.target.value;

        const items =this.state.items;

        items[index] = item;

        this.setState({items:items});
    }
    handleClick = (e) => {
        e.preventDefault();
        if (this.state.text && this.state.text.trim().length !== 0) {
            this.setState({
                text: ''
            });
        }

        this.props.onAddMethod(this.state.text);
    }

    render = () => (
        <div>
            <h2>Ingredients</h2>

            <ListGroup mt="3">
                {this.props.items.map((item, i) => 
                    <Ingredient 
                    key={item.id} item={item} onChange={this.props.onChange.bind(this, i)} removeItem={this.props.onRemove.bind(this, i) }  />
                )}
            </ListGroup>

            <InputGroup>
                <Input type="text" onChange={ this.onChange } 
                        value={ this.state.text } />
                <InputGroupAddon addonType="append">
                    <Button onClick={this.handleClick}>Add</Button>
                </InputGroupAddon>
            </InputGroup>
        </div>
    );
}

export default Ingredients;