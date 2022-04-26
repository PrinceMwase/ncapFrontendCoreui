import { configureStore } from '@reduxjs/toolkit'
import authApiReducer, { authApi } from 'src/features/auth/authenticationSlice'
import { setupListeners } from '@reduxjs/toolkit/query'
import { getAuth } from 'src/features/auth/authQuery'
import { supportGroupApi } from 'src/features/auth/supportGroup'
import SupportGroupApiStoreReducer, { supportGroupApiStore } from './slices/supportGroupSlice'
import { patientApi } from 'src/features/auth/patient'
import { patientsApiStore } from './slices/patientSlice'
import coreUiReducer, { coreUi } from 'src/store'
import { stockApi } from 'src/features/auth/stockQuery'

export const store = configureStore({
  reducer: {
    [authApi.name]: authApiReducer,
    [supportGroupApiStore.name]: SupportGroupApiStoreReducer,
    [patientsApiStore.name]: patientsApiStore.reducer,
    [getAuth.reducerPath]: getAuth.reducer,
    [supportGroupApi.reducerPath]: supportGroupApi.reducer,
    [stockApi.reducerPath]: stockApi.reducer,
    [patientApi.reducerPath]: patientApi.reducer,
    [coreUi.name]: coreUiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(getAuth.middleware)
      .concat(supportGroupApi.middleware)
      .concat(patientApi.middleware)
      .concat(stockApi.middleware),
})

setupListeners(store.dispatch)
