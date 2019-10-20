import React from 'react'
import {ListGroup, ListGroupItem} from 'reactstrap';

const Suggestions = (props) => {
  const options = props.results.map(r => (
    <ListGroupItem key={r.id}>
      <a href={"recipe/show/" + r.id}>{r.name}</a>
    </ListGroupItem>
  ))
  return <ListGroup>{options}</ListGroup>;
}

export default Suggestions
