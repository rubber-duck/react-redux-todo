import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { History } from "history";
import { RouterState, connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';

import * as reducers from './reducers';
import * as models from './models';

export interface Store {
    router: RouterState,
    toDoList: models.ToDoList
}

export function createReducers(history: History) {
    return combineReducers<Store>({
        router: connectRouter(history),
        toDoList: reducers.toDoListReducer
    });
}

export function createMiddleware(history: History) {
    const reduxDevToolsExtensionCompose = (<any>window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    const composeEnhancers = reduxDevToolsExtensionCompose || compose;

    return composeEnhancers(
        applyMiddleware(
            thunk,
            routerMiddleware(history)));
}

export function configureStore(history: History) {
    return createStore(createReducers(history), {}, createMiddleware(history))
}