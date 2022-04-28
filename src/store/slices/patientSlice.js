import { createSlice } from '@reduxjs/toolkit'

export const patientsApiStore = createSlice({
  name: 'PatientsGroupApiStore',

  initialState: {
    patients: null,
    filterd: false,
    next: null,
    previous: null,
  },

  reducers: {
    setPatients: (state, action) => {
      state.patients = action.payload
    },
    setGroupFilter: (state) => {
      state.filterd = true
    },
    setPagination: (state, action) => {
      state.next = action.payload.next
      state.previous = action.payload.previous
    },
  },
})

export const { setPatients, setGroupFilter, setPagination } = patientsApiStore.actions

export default patientsApiStore.reducer
