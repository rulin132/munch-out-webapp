import React, { Component } from "react";
import {Label, Input, Row, Col, InputGroup, InputGroupAddon} from 'reactstrap';

class CookingTimes extends Component {
    constructor(props) {
        super(props);


        this.changePrepTimeHours = this.changePrepTimeHours.bind(this);
        this.changePrepTimeMinutes = this.changePrepTimeMinutes.bind(this);
        this.changeCookTimeHours = this.changeCookTimeHours.bind(this);
        this.changeCookTimeMinutes = this.changeCookTimeMinutes.bind(this);
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
    changePrepTimeHours(e) {
        let prepTime = this.state.prepTime;

        prepTime.hours = e.target.value;


        this.setState({prepTime: prepTime});

        this.calculateTotalTime();
        this.props.onCookingTimesChange(this.state);
}
changePrepTimeMinutes(e) {
    let prepTime = this.state.prepTime;

    prepTime.minutes =  e.target.value;


    this.setState({prepTime: prepTime});

    this.calculateTotalTime();
    this.props.onCookingTimesChange(this.state);
}

changeCookTimeHours(e) {
    let cookTime = this.state.cookTime 
    cookTime.hours = e.target.value;

    this.setState({cookTime:cookTime});
        
    this.calculateTotalTime();
    this.props.onCookingTimesChange(this.state);
}

changeCookTimeMinutes(e) {
    let cookTime = this.state.cookTime 
    cookTime.minutes = e.target.value;


    this.setState({cookTime:cookTime});

    this.calculateTotalTime();
    this.props.onCookingTimesChange(this.state);
}


calculateTotalTime() {
    var cookTimeHours = parseInt(this.state.cookTime.hours, 10) || 0;
    var cookTimeMinutes = parseInt(this.state.cookTime.minutes, 10) || 0;
    var prepTimeHours = parseInt(this.state.prepTime.hours, 10) || 0;
    var prepTimeMinutes = parseInt(this.state.prepTime.minutes, 10) || 0;

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
                        <Input value={totalTime.hours} />
                        <InputGroupAddon addonType="append">hours</InputGroupAddon>
                        <Input placeholder="" value={totalTime.minutes} />
                        <InputGroupAddon addonType="append">minutes</InputGroupAddon>
                    </InputGroup>
                    </Col>
                </Row>
        );
    }
}

export default CookingTimes;