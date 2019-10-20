import React from 'react';
import { Col } from 'reactstrap';

const CookTime = ({ name, timeHours, timeMinutes }) => {
    return (<Col>
        <hr />
        <p><b>{name} Time</b></p>
        <p>{timeHours && (timeHours + ' hours ')}{timeMinutes && timeMinutes + ' mins'}</p>
        <hr />
    </Col>);
}

export default CookTime;