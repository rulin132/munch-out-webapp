import React from 'react';
import {Input, Button, InputGroup, InputGroupAddon, ListGroup} from 'reactstrap';
import Ingredient from './Ingredient';

class Ingredients extends React.Component {
    constructor(props) {
        super(props);
    console.log(props);
        this.state = {
            items: props.items,
            text: ''
        };

        this.handleClick = this.handleClick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.changeItem = this.changeItem.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);

      this.setState({
        items: nextProps.items,
      });
      
    }

    onChange(e) {
        this.setState({text: e.target.value});
        
    }
    
    removeItem(key) {
        let items = this.state.items;

        const index = items.findIndex(item => item.id === key);

        this.setState({
            'items': items.splice(index, 1)
        });
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
    handleClick(e) {
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
        this.props.onIngredientsChange( this.state.items);
    }
    render() {
        return (
            <div>
                <h2>Ingredients</h2>

                <ListGroup mt="3">
                    {this.state.items.map((item) => 
                        <Ingredient key={item.id} onChange={this.changeItem.bind(this, item.id)} item={item} removeItem={() => this.removeItem(item.id) }  />
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
        )
    } 
}

export default Ingredients;