import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

import { persistStore, persistReducer, createTransform } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native

export const encode = toDeshydrate => JSON.stringify(toDeshydrate, replacer);
export const decode = toRehydrate => JSON.parse(toRehydrate, reviver);

const initialState = {};
const enhancers = [];
const middleware = [thunk];

const replacer = (key, value) =>
  value instanceof Date ? value.toISOString() : value;
const reviver = (key, value) =>
  typeof value === "string" &&
  value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)
    ? new Date(value)
    : value;

const persistConfig = {
  key: "root",
  storage,
  transforms: [createTransform(encode, decode)],
  stateReconciler: autoMergeLevel2
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

if (process.env.NODE_ENV === "development") {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === "function") {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

let store = createStore(persistedReducer, initialState, composedEnhancers);
let persistor = persistStore(store);

export default { store, persistor };
