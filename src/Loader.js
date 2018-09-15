import ReactLoading from 'react-loading';
import React from 'react';
import {Container, Row, Col} from 'reactstrap';

const Loader = () => {
    return (
        <Container className="h-100">
            <Row className="h-100 justify-content-center align-items-center">
                <Col className="col-12 ">
                    <ReactLoading className="text-center mx-auto" type="cubes" color="rgb(171, 171, 171)" />
                </Col>
            </Row>
        </Container>
    );
}

export default  Loader;
