import { createSlice } from '@reduxjs/toolkit'

/**This will set the current clinic /support group working with */
export const supportGroupApiStore = createSlice({
  name: 'SupportGroupApiStore',

  initialState: {
    currentClinic: null,
    name: null,
    chosen: false,
  },

  reducers: {
    setClinic: (state, action) => {
      state.currentClinic = action.payload.id
      state.name = action.payload.name
      state.chosen = true
    },
  },
})

export const { setClinic } = supportGroupApiStore.actions

export default supportGroupApiStore.reducer
