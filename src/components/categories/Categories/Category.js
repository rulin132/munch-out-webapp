import React, { Component } from "react";

import { ListGroupItem } from 'reactstrap';
class Category extends Component {
    render() {
      const {item} = this.props;
console.log(item);
      return <ListGroupItem>
    <a href={"/categories/recipeByCategory/" + item.id}>{ item.text }</a>
      
      
    </ListGroupItem>;
    }
}

export default Category;