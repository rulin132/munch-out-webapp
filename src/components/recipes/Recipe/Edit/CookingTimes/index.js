import React, { Component } from "react";
import {Row, Col} from 'reactstrap';
import CookingTime from "./CookingTime";

class CookingTimes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cookingTime: {
                hours:  props.cookingTime ? props.cookingTime.hours : 0,
                minutes:  props.cookingTime ? props.cookingTime.minutes: 0,
            },
            prepTime: {
                hours: props.prepTime ? props.prepTime.hours : 0,
                minutes: props.prepTime ? props.prepTime.minutes : 0,
            },
        };
    
        this.handleChangePrepTime = this.handleChangePrepTime.bind(this);
        this.handleChangeCookingTime = this.handleChangeCookingTime.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            cookingTime: nextProps.cookingTime,
            prepTime: nextProps.prepTime,
        });
    }

    handleChangePrepTime = (event) => {
        this.setState({
            prepTime: event
        });

        this.props.onCookingTimeChange({
            ...this.state,
            prepTime: event
        });
    }

    handleChangeCookingTime = (event) => {
        this.setState({
            cookingTime: event
        });

        this.props.onCookingTimeChange({
            ...this.state,
            cookingTime: event
        });
    }
    calculateTotalTime = (e) => {
        const cookTimeHours = this.state.cookingTime ? parseInt(this.state.cookingTime.hours, 10) : 0;
        const cookTimeMinutes = this.state.cookingTime ? parseInt(this.state.cookingTime.minutes, 10) : 0;
        const prepTimeHours = this.state.prepTime ? parseInt(this.state.prepTime.hours, 10) : 0;
        const prepTimeMinutes = this.state.prepTime ? parseInt(this.state.prepTime.minutes, 10) : 0;

        const cookTimeTotalMinutes = (cookTimeHours * 60 + cookTimeMinutes);
        const prepTimeTotalMinutes = (prepTimeHours * 60 + prepTimeMinutes);

        const hoursWithRemainer = (cookTimeTotalMinutes + prepTimeTotalMinutes) / 60;

        return {
            hours:      hoursWithRemainer ? Math.floor(hoursWithRemainer) : 0,
            minutes:    hoursWithRemainer ? Math.round(hoursWithRemainer % 1 * 60) : 0
        };
    }

    render() {
        const totalTime = this.calculateTotalTime();
        return (
            <Row  className="mt-5">
                <Col className="col-8 col-lg-4">
                    <CookingTime name="prepTime" value={this.state.prepTime} onCookingTimeChange={ this.handleChangePrepTime } />
                </Col><Col className="col-lg-4 col-8">
                    <CookingTime name="cookingTime" value={this.state.cookingTime}  onCookingTimeChange={ this.handleChangeCookingTime } />
                </Col><Col className="col-lg-4 col-8">
                    <CookingTime name="cookingTime" value={totalTime} />
                </Col>
            </Row>
        );
    }
}

export default CookingTimes;