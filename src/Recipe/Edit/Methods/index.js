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

    handleClick = (e) => {
        e.preventDefault();
        if (this.state.text && this.state.text.trim().length !== 0) {
            this.setState({
                text: ''
            });
        }

        this.props.onAddMethod(this.state.text);
    }
    
    render() {
        let methodNum = 1;

        return (
            <div>
                <h2>Method</h2>

                <ListGroup mt="3">
                    {this.props.items.map((item, i) => 
                        <Method num={methodNum++} key={i} item={item} onChange={this.props.onChange.bind(this, i)} removeItem={this.props.onRemove.bind(this, i) }  />
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