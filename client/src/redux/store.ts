// store.ts
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { activitiesReducer } from './reducers';

export type RootState = ReturnType<typeof activitiesReducer>;

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, activitiesReducer);

const store = createStore(persistedReducer);

const persistor = persistStore(store);

export { store, persistor };
