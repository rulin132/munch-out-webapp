import React from 'react';
import CookTime from './CookTime';
import { Row } from 'reactstrap';

class CookingTimes extends React.Component {
    render() {
        let times = this.props.times;
        return (
            <Row>
                <CookTime name="Prep" timeHours={times.prep.hours} timeMinutes={times.prep.minutes} />

                <CookTime name="Cook" timeHours={times.cooking.hours} timeMinutes={times.cooking.minutes} />

                <CookTime name="Total" timeHours={times.cooking.hours} timeMinutes={times.cooking.minutes} />
            </Row>
        );
    }
}

export default CookingTimes;