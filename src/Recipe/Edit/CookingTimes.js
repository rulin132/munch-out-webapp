import React, { Component } from "react";
import {Container, Form, FormGroup, Label, Input, Row, Col, Button, InputGroup, InputGroupAddon} from 'reactstrap';

class CookingTimes extends Component {
    constructor(props) {
        super(props);
console.log(this.props.cookTimes);
        this.changePrepTimeHours = this.changePrepTimeHours.bind(this);
        this.changePrepTimeMinutes = this.changePrepTimeMinutes.bind(this);
        this.changeCookTimeHours = this.changeCookTimeHours.bind(this);
        this.changeCookTimeMinutes = this.changeCookTimeMinutes.bind(this);
        this.state =  {
            prepTime: {
                hours: '',
                minutes: '',
            },
            cookTime: {
                hours: '',
                minutes: '',
            },
            totalTime: {
                hours: '',
                minutes: '',
            }
        };

       
    }
    changePrepTimeHours(e) {
        this.state.prepTime.hours = e.target.value;
        this.calculateTotalTime();
        this.setState({prepTime:this.state.prepTime});

        this.props.onCookingTimesChange(this.state);
}
changePrepTimeMinutes(e) {
        this.state.prepTime.minutes =  e.target.value;
        this.calculateTotalTime();
        this.setState({prepTime:this.state.prepTime});
        this.props.onCookingTimesChange(this.state);
}

changeCookTimeHours(e) {
    this.state.cookTime.hours = e.target.value;
    this.calculateTotalTime();
    this.setState({cookTime:this.state.cookTime});
    this.props.onCookingTimesChange(this.state);
}

changeCookTimeMinutes(e) {
    this.state.cookTime.minutes = e.target.value;
    this.calculateTotalTime();
    this.setState({cookTime:this.state.cookTime});
    this.props.onCookingTimesChange(this.state);
}


calculateTotalTime() {
    var cookTimeHours = parseInt(this.state.cookTime.hours) || 0;
    var cookTimeMinutes = parseInt(this.state.cookTime.minutes) || 0;
    var prepTimeHours = parseInt(this.state.prepTime.hours) || 0;
    var prepTimeMinutes = parseInt(this.state.prepTime.minutes) || 0;

    const cookTimeTotalMinutes = (cookTimeHours * 60 + cookTimeMinutes);
    const prepTimeTotalMinutes = (prepTimeHours * 60 + prepTimeMinutes);

    const hoursWithRemainer = (cookTimeTotalMinutes + prepTimeTotalMinutes) / 60;
    this.state.totalTime.hours = Math.floor(hoursWithRemainer);

    this.state.totalTime.minutes = Math.round(hoursWithRemainer % 1 * 60);

}
    render() {
        return (
            <Row  className="mt-5">
                <Col className="col-8 col-lg-4">
                    <Label for="recipeName">Prep Time</Label>

                    <InputGroup>
                        <Input placeholder="" value={this.state.prepTime.hours} onChange={this.changePrepTimeHours} />
                        <InputGroupAddon addonType="append">hours</InputGroupAddon>
                        <Input placeholder="" value={this.state.prepTime.minutes} onChange={this.changePrepTimeMinutes} />
                        <InputGroupAddon addonType="append">minutes</InputGroupAddon>
                    </InputGroup>
                </Col><Col className="col-lg-4 col-8">

                <Label for="recipeName">Cook Time</Label>

                <InputGroup>
                <Input placeholder="" value={this.state.cookTime.hours} onChange={this.changeCookTimeHours} />
                <InputGroupAddon addonType="append">hours</InputGroupAddon>
                <Input value={this.state.cookTime.minutes} onChange={this.changeCookTimeMinutes} />
                <InputGroupAddon addonType="append">minutes</InputGroupAddon>
                </InputGroup>
                </Col><Col className="col-lg-4 col-8">

                        <Label for="recipeName">Total Time</Label>

                        <InputGroup>
                        <Input value={this.state.totalTime.hours} />
                        <InputGroupAddon addonType="append">hours</InputGroupAddon>
                        <Input placeholder="" value={this.state.totalTime.minutes} />
                        <InputGroupAddon addonType="append">minutes</InputGroupAddon>
                    </InputGroup>
                    </Col>
                </Row>
        );
    }
}

export default CookingTimes;