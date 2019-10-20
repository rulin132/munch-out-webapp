import React, {Component} from "react";
import { ListGroup, Row, Col } from 'reactstrap';


class Recipe extends Component {
    render() {
        console.log(this.props);
        return (
            <div>
                <Row>
                    <Col md="4" className="mx-auto">
                        <ListGroup mt="3">
                            <a href={"/recipe/show/"+ this.props.id} className="list-group-item list-group-item-action">{this.props.name}</a>
                        </ListGroup>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default Recipe;
