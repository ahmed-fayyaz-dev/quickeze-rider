import AsyncStorage from '@react-native-async-storage/async-storage';
import { composeWithDevTools } from '@redux-devtools/extension';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import { saveOnLogin, clearOnLogout } from './middleware/otherMiddleWare';
import { ServiceMiddleware } from './middleware/serviceMiddleWare.js';
import rootReducers from './reducer';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    // blacklist: ['quarterReducer', 'fYearReducer'],
    whitelist: ['submitLoginReducer', 'languageReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducers);
const middleware = [thunk, ServiceMiddleware, saveOnLogin, clearOnLogout];
const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(...middleware)),
);
const persistor = persistStore(store);

export { store, persistor };
