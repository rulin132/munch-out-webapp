import React, { Component } from "react";
import {Label, Input, InputGroup, InputGroupAddon} from 'reactstrap';

class CookingTime extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hours: props.hours ? props.hours : 0,
            minutes: props.minutes ? props.minutes : 0,
        };
    
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            hours: nextProps.value ? nextProps.value.hours : 0,
            minutes: nextProps.value ? nextProps.value.minutes : 0,
        });
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });

        this.props.onCookingTimeChange({
            ...this.state,
            [name]: value
          });
    }

    render() {
        return (
            <div>
                <Label for="recipeName">Prep Time</Label>

                <InputGroup>
                    <Input name="hours" value={this.state.hours} onChange={this.handleChange} />
                    <InputGroupAddon addonType="append">hours</InputGroupAddon>
                    
                    <Input name="minutes" value={this.state.minutes}  onChange={this.handleChange} />
                    <InputGroupAddon addonType="append">minutes</InputGroupAddon>
                </InputGroup>
            </div>
        );
    }
}

export default CookingTime;