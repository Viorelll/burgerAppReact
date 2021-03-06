import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const purchaseInit = (state) => {
    return updateObject(state, {purchased: false});
}

const purchaseBurgerStart = (state) => {
    return updateObject(state, {loading: true});
}

const purchaseBurgerSucces = (state, action) => {
    const newOrder = updateObject(action.orderData, {id: action.orderId});
    return updateObject(state, { 
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
    });
}

const purchaseBurgerFail = (state) => {
    return updateObject(state, { loading: false});
}

const fetchOrdersStart = (state) => {
    return updateObject(state, { loading: true});
}

const fetchOrdersSuccess = (state, action) => {
    return updateObject(state, { orders: action.orders, loading: false});
}

const fetchOrdersFailed = (state) => {
    return updateObject(state, { loading: false});
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT: 
            return purchaseInit(state);
        case actionTypes.PURCHASE_BURGER_START: 
            return purchaseBurgerStart(state);
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return purchaseBurgerSucces(state, action);
        case actionTypes.PURCHASE_BURGER_FAILED:
            return purchaseBurgerFail(state);
        case actionTypes.FETCH_ORDERS_START:
            return fetchOrdersStart(state);
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return fetchOrdersSuccess(state, action);
        case actionTypes.FETCH_ORDERS_FAILED:
            return fetchOrdersFailed(state);
        default:
            return state;
    }
}

export default reducer;