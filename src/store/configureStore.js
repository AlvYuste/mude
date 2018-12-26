import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { rootReducer } from './rootReducer';
import { config } from '../config';

export const configureStore =
  config.env === 'production'
    ? preloadedState =>
        createStore(rootReducer, preloadedState, applyMiddleware(thunk))
    : preloadedState => {
        const store = createStore(
          rootReducer,
          preloadedState,
          composeWithDevTools(applyMiddleware(thunk, createLogger())),
        );
        return store;
      };
