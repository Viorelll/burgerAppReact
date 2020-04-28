import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import burgerBulilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import authReduce from './store/reducers/auth';

const NODE_ENV = process.env.NODE_ENV;
const composeEnhancers = NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__: null || compose; 

const rootReducer = combineReducers({
  burgerBuilder: burgerBulilderReducer,
  order: orderReducer,
  auth: authReduce
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
  ));

const app = (
  <Provider store={store}>
    <React.StrictMode>  
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider> 
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
