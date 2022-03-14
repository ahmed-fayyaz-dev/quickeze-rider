import {createStore, applyMiddleware, compose} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import {composeWithDevTools} from '@redux-devtools/extension';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';
import rootReducers from './reducer';

import {ServiceMiddleware} from './middleware/serviceMiddleWare.js';
import {saveOnLogin} from './middleware/otherMiddleWare';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['quarterReducer', 'fYearReducer'],
};
const persistedReducer = persistReducer(persistConfig, rootReducers);
let middleware = [thunk, ServiceMiddleware, saveOnLogin];

export default function configureStore() {
  let store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(...middleware)),
  );
  let persistor = persistStore(store);
  return {store, persistor};
}
