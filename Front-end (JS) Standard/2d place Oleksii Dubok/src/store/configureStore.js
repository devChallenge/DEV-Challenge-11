import { applyMiddleware, createStore, compose } from 'redux';
import thunkMiddleware                           from 'redux-thunk';
import { loadState }                             from '../utils/localStorageUtils.js';
import rootReducer                               from '../reducers';

export default function configureStore() {
    const preloadedState = loadState() || {};
    const composeEnhancers = process.env.NODE_ENV !== 'production' ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose: // eslint-disable-line
        compose;

    const store = createStore(
            rootReducer,
            preloadedState,
            composeEnhancers(
                applyMiddleware(thunkMiddleware)
        )
    );

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers/index').default;

            store.replaceReducer(nextRootReducer);
        });
    }


    return store;
}
