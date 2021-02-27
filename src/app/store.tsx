import {
    configureStore,
    ThunkAction,
    Action,
    getDefaultMiddleware,
    createImmutableStateInvariantMiddleware,
} from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import userReducer from '../features/User/UserStore';
export const store = configureStore({
    reducer: {
        user: userReducer,
    },
    middleware: [createImmutableStateInvariantMiddleware({ ignore: ['user'] })],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
