import {createStore, applyMiddleware} from 'redux';
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
const middleware = [thunk, ServiceMiddleware, saveOnLogin];
const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middleware)),
);
let persistor = persistStore(store);

export {store, persistor};
