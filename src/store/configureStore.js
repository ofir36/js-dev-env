// @flow
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import type { State } from '../types';

export const history = createHistory();

function configureStoreDev(initialState?: State) {
    const reactRouterMiddleware = routerMiddleware(history);
    const middlewares = [
        // Redux middleware that spits an error on you when you try to mutate your state either inside a dispatch or between dispatches.
        reduxImmutableStateInvariant(),
        thunk,
        reactRouterMiddleware
    ];

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(...middlewares))
    );

    return store;
}

function configureStoreProd(initialState?: State) {
    const reactRouterMiddleware = routerMiddleware(history);
    const middlewares = [thunk, reactRouterMiddleware];

    const store = createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(...middlewares))
    );

    return store;
}

const configureStore =
    process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;

export default configureStore;
