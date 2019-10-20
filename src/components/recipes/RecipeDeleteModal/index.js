import React from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap';
class RecipeDeleteModalContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        
        this.state = {
            isOpen: false
        }
    }
    
    render() {
        return (
        <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} >
            <ModalHeader toggle={this.props.toggle}>Delete Recipe</ModalHeader>
            <ModalBody>
                Are you sure you want to delete this recipe?
            </ModalBody>
            <ModalFooter>
                <Button  color="primary" onClick={() => this.props.handleDelete(this.props.recipeId)}>Delete Recipe</Button>{' '}
                <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>);
    }

}

export default RecipeDeleteModalContainer;