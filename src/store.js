import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import makeRootReducer from './reducers/index';

export default initialState => {
    let middleWare = applyMiddleware(thunk);
    let composeEnhancers = compose
        // typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        //     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        //           // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        //       })
        //     : compose;

    const store = createStore(makeRootReducer(), initialState, composeEnhancers(middleWare));
    store.asyncReducers = {};
    store.injectReducer = (key, reducer) => {
        store.asyncReducers[key] = reducer;
        store.replaceReducer(makeRootReducer(store.asyncReducers));
        return store;
    };

    if (module.hot) {
        module.hot.accept('./reducers/index', () => {
            const reducers = require('./reducers/index').default;
            store.replaceReducer(reducers(store.asyncReducers));
        });
    }

    return store;
};
