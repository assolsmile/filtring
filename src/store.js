import {applyMiddleware, compose, createStore} from "redux";
import reducer from "./redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const setUpStore = () => {
  return createStore(
    reducer,
    composeEnhancer(
      applyMiddleware(
        sagaMiddleware
      ),
    ),
  );
};

const store = setUpStore();

sagaMiddleware.run(rootSaga);

export default store;

