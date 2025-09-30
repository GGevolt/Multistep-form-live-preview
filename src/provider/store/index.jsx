import { combineReducers, configureStore } from "@reduxjs/toolkit";
import step1Slide from "@provider/reducer/Step1Slice"
import step2Slide from "@provider/reducer/Step2Slice"
import step3Slide from "@provider/reducer/Step3Slice"
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    step1: step1Slide,
    step2: step2Slide,
    step3: step3Slide
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
