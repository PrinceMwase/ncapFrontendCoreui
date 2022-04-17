import { configureStore } from '@reduxjs/toolkit'
import authApiReducer, { authApi } from 'src/features/auth/authenticationSlice'
import { setupListeners } from '@reduxjs/toolkit/query'
import { getAuth } from 'src/features/auth/authQuery'

export const store = configureStore({
  reducer: {
    [authApi.name]: authApiReducer,
    [getAuth.reducerPath]: getAuth.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(getAuth.middleware),
})

setupListeners(store.dispatch)
