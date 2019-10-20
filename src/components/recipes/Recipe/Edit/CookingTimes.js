import React, { Component } from "react";
import {Label, Input, Row, Col, InputGroup, InputGroupAddon} from 'reactstrap';

class CookingTimes extends Component {
    constructor(props) {
        super(props);
        this.state =  {
            prepTime: props.cookingTimes.prepTime,
            cookTime: props.cookingTimes.cookTime,
            totalTime: {
                hours: '',
                minutes: '',
            }
        };
    }

    componentWillMount(){
        if (typeof this.props.cookingTimes !== 'undefined') {
            this.setState({
                prepTime: this.props.cookingTimes.prepTime
            });
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
            
        this.calculateTotalTime();
        this.props.onCookingTimesChange(this.state);
    }

    calculateTotalTime() {
        var cookTimeHours = parseInt(this.state.cookTimeHours, 10) || 0;
        var cookTimeMinutes = parseInt(this.state.cookTimeMinutes, 10) || 0;
        var prepTimeHours = parseInt(this.state.prepTimeHours, 10) || 0;
        var prepTimeMinutes = parseInt(this.state.prepTimeMinutes, 10) || 0;

        const cookTimeTotalMinutes = (cookTimeHours * 60 + cookTimeMinutes);
        const prepTimeTotalMinutes = (prepTimeHours * 60 + prepTimeMinutes);

        const hoursWithRemainer = (cookTimeTotalMinutes + prepTimeTotalMinutes) / 60;
        return {
                hours:      Math.floor(hoursWithRemainer),
                minutes:    Math.round(hoursWithRemainer % 1 * 60)
            };
    }

    render() {
        const totalTime = this.calculateTotalTime();
        return (
            <Row  className="mt-5">
                <Col className="col-8 col-lg-4">
                    <Label for="recipeName">Prep Time</Label>

                    <InputGroup>
                        <Input placeholder="" id="prepTimeHours" value={this.state.prepTimeHours} onChange={this.handleChange} />
                        <InputGroupAddon addonType="append">hours</InputGroupAddon>
                        <Input placeholder="" id="prepTimeMinutes" value={this.state.prepTimeMinutes} onChange={this.handleChange} />
                        <InputGroupAddon addonType="append">minutes</InputGroupAddon>
                    </InputGroup>
                </Col><Col className="col-lg-4 col-8">

                <Label for="recipeName">Cook Time</Label>

                <InputGroup>
                <Input placeholder="" id="cookTimeHours" value={this.state.cookTimeHours} onChange={this.handleChange} />
                <InputGroupAddon addonType="append">hours</InputGroupAddon>
                <Input id="cookTimeMinutes" value={this.state.cookTimeMinutes} onChange={this.handleChange} />
                <InputGroupAddon addonType="append">minutes</InputGroupAddon>
                </InputGroup>
                </Col><Col className="col-lg-4 col-8">

                        <Label for="recipeName">Total Time</Label>

                        <InputGroup>
                        <Input value={totalTime.hours} readOnly={true} />
                        <InputGroupAddon addonType="append">hours</InputGroupAddon>
                        <Input placeholder="" value={totalTime.minutes} readOnly={true} />
                        <InputGroupAddon addonType="append">minutes</InputGroupAddon>
                    </InputGroup>
                    </Col>
                </Row>
        );
    }
}

export default CookingTimes;