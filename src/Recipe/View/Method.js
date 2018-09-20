import React from "react";

const Method = ({methods}) => {
    if (typeof methods === 'undefined') {
        return '';
    }
    let i = 1;

    const methodsItems = methods.map((method) => {
        return (
            <div key={method.id}>
                <h4>Step {i++}</h4>
                <p>{method.text}</p>
            </div>
        );
    });

    return (
        <div>
            <h2>Method</h2>

           {methodsItems}
        </div>
        );
    }

export default Method;
