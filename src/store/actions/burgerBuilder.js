import * as actionType from './actionsTypes';
import axiosInstance from '../../axios-orders';

export const addIngredient = (name) => {
    return {
        type: actionType.ADD_INGREDIENT,
        ingredientName: name
    }
}

export const removeIngredient = (name) => {
    return {
        type: actionType.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

export const setIngredient = (ingredients) => {
    return {
        type: actionType.SET_INGREDIENTS,
        ingredients: ingredients
    }
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionType.FETCH_INGREDIENTS_FAILED
    };
}

export const initIngredients = () => {
    return dispatch => {
        axiosInstance
            .get('https://react-my-burger-3aeb2.firebaseio.com/ingredients.json')
            .then(response => {
                dispatch(setIngredient(response.data));
            })
            .catch(error => {
                dispatch(fetchIngredientsFailed());
            });
    }
}