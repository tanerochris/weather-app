import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index';

const combinedReducers = combineReducers(reducers)
const store = createStore(combinedReducers, {}, compose(applyMiddleware(thunk)));

export default store;