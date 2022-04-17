import { createSlice } from '@reduxjs/toolkit'

import { useLogin } from './authQuery'

export const authApi = createSlice({
  name: 'authApi',

  initialState: {
    user: null,
    authenticated: false,
  },

  reducers: {
    signin: (state, action) => {
      state.user = action.payload
      state.authenticated = true
    },
  },
})

export const { signin } = authApi.actions

export default authApi.reducer
