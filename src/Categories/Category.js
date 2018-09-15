import React, { Component } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { ListGroupItem } from 'reactstrap';
class Category extends Component {
  constructor(props) {
    super(props);

    this.removeItem = this.props.removeItem.bind(this);
  }

    render() {
      const {item} = this.props;
console.log(item);
      return <ListGroupItem>
    <a href={"recipeByCategory/" + item[".key"]}>{ item.text }</a> <span className="float-right button-group"><a className="pull-right" onClick={ this.props.removeItem }
            style={{ color: 'red', marginLeft: '10px', cursor: 'pointer' }}>
        <FontAwesomeIcon icon={faTimesCircle} />
        </a></span>
      
      
    </ListGroupItem>;
    }
}

export default Category;