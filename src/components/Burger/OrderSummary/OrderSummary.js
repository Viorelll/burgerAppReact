import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    render() {
        const ingredientsSummary = Object.keys(this.props.ingredients)
        .map((ingredientKey) => {
            return (<li key={ingredientKey}>
                <span style={{textTransform: 'capitalize'}}>{ingredientKey}</span>: {this.props.ingredients[ingredientKey]}
            </li>);
        });

        return (
            <Aux>
                <h3>You Order</h3>
                <p>A delicious burger with the following ingredients: </p>
                <ul>
                    {ingredientsSummary}
                </ul>
                <p><strong>Total price: {this.props.totalPrice.toFixed(2)}$</strong></p>
                <p>Continue with Checkout?</p>
                <Button btnType='Danger' clicked={this.props.purchaseCancel}>CANCEL</Button>
                <Button btnType='Success' clicked={this.props.purchaseContinue}>CONTINUE</Button>
            </Aux>
        );
    } 
};

export default OrderSummary;