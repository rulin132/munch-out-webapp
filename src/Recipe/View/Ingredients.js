import React  from "react";

const Ingredients = ({ingredients}) => {
   
    if (typeof ingredients === 'undefined') {
        return '';
    }

    const ingredientsItems = ingredients.map((ingredient) => <li className="list-group-item" key={ingredient.id}>{ingredient.text}</li>);
    
    return (
    <div>
    <h2>Ingredients</h2>

        <ul className="list-group">
        {(ingredientsItems)}
         
        </ul>
        </div>
        );
    }

    export default Ingredients;