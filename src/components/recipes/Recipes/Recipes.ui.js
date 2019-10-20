import React, {Component} from "react";
import { Container, Row, Col, Button } from 'reactstrap';

import Recipe from './Recipe';
class Recipes extends Component {
    render() {
        const items = this.props.recipes;
        console.log(items);
        return (
            <div>
            <Container>
                <Row>
                    <Col md="6" className="mx-auto text-center">
                        <div className="header-title">
                            <h1 className="wv-heading--title">
                                RECIPES
                            </h1>
                        </div>
                    </Col>
                </Row>
                {items && items.map((item) => <Recipe key={item.id} id={item.id} name={item.recipeName}  />)}
                <Row>
                    <Col md="4" className="mx-auto mt-5">
                        <Button href="/recipe/new">Add Recipe</Button>
                    </Col>
                </Row>
            </Container>
            </div>
        );
    }
}
export default Recipes;
