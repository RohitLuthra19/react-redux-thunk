import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./rootReducer";
import { categoriesWatcherSaga } from "./categories/sagas-all-categories";
import { singleCategoryWatcherSaga } from "./categories/sagas-single-category";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(categoriesWatcherSaga);
sagaMiddleware.run(singleCategoryWatcherSaga);

export default store;