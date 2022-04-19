import { createSlice } from '@reduxjs/toolkit'

export const patientsApiStore = createSlice({
  name: 'PatientsGroupApiStore',

  initialState: {
    patients: null,
    filterd: false,
  },

  reducers: {
    setPatients: (state, action) => {
      state.patients = action.payload
    },
    setGroupFilter: (state) => {
      state.filterd = true
    },
  },
})

export const { setPatients, setGroupFilter } = patientsApiStore.actions

export default patientsApiStore.reducer
