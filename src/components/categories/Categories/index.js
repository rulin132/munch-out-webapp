import React, { Component } from "react";
import { Container, ListGroup } from 'reactstrap';

import { connect} from 'react-redux'
import Category from './Category';
import { createCategory } from '../../../store/actions/categoryActions';
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
class CategoriesContainer extends Component {
    state = {
        items: [],
        text: ''
    };
    
    onChange = (e) => {
        this.setState({text: e.target.value});
    }
    
    removeItem = (key) => {
        
    }

    onColUpdate = (snapshot) => {
        const items = snapshot.items.map((docSnapshot) => ({
            id: docSnapshot.id,
            data: docSnapshot.data()
        }));
    
        this.setState({
            items: items,
            fetching: false
        });
    };
    
    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.text && this.state.text.trim().length !== 0) {
           this.props.createCategory(this.state.text);
        }
    }
    
    render() {
        const { categories} = this.props;

        console.log(categories);
        return (
            <div>
                <Container>
                    <div className="col-md-6 mx-auto text-center">
                        <div className="header-title">
                            <h1 className="wv-heading--title">
                                RECIPE CATEGORIES
                            </h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 mx-auto">
                            <ListGroup mt="3">
                            {categories && categories.map((item) => <Category key={item.id} item={item}   />)}
                            
                            </ListGroup>
                            {/* <Form onSubmit={ this.handleSubmit } className="mt-2">
                                <InputGroup>
                                <Input type="text" id="addCategory" onChange={ this.onChange } value={ this.state.text } />
                                    <InputGroupAddon addonType="append"><Button>Add</Button></InputGroupAddon>
                                </InputGroup>
                            </Form> */}
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        categories: state.firestore.ordered.categories
    }
}
const mapdispatchToProps = (dispatch) => {
    return {
        createCategory: (categoryText) => dispatch(createCategory(categoryText))
    }
}
export default compose(
    connect(mapStateToProps, mapdispatchToProps),
    firestoreConnect([
        { collection: 'categories' }
    ])
)(CategoriesContainer);