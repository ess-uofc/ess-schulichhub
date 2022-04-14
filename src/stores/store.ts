import { Action, configureStore, createImmutableStateInvariantMiddleware, ThunkAction } from '@reduxjs/toolkit';
import userReducer from './users/user.store';
export const store = configureStore({
    reducer: {
        user: userReducer,
    },
    middleware: [createImmutableStateInvariantMiddleware({ ignore: ['user'] })],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
