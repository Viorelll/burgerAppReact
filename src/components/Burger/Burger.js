import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';
import  { withRouter } from 'react-router-dom';

const burger = ( props ) => {
    let transformedIngredients = Object.keys(props.ingredients)
            .map((igrendientKey) => {
                return [...Array(props.ingredients[igrendientKey])].map((_, i) => {
                    return <BurgerIngredient key={igrendientKey + i} type={igrendientKey}/>
                })
            })
            .reduce((arr, el) => {
                return arr.concat(el);
            }, []);

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingrediens!</p>
    }

    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>   
    );
};

export default withRouter(burger);