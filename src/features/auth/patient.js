import { createApi } from '@reduxjs/toolkit/query/react'
import axios from 'axios'
import { setPatients } from 'src/store/slices/patientSlice'
import { setClinic } from 'src/store/slices/supportGroupSlice'
import axiosBaseQuery from 'src/utils/useAxios'

/** implement rtkq for patients
 *
 * get the patients eligible to work to store
 */
export const patientApi = createApi({
  reducerPath: 'patientApi',
  baseQuery: axiosBaseQuery({ baseUrl: '' }),
  endpoints(build) {
    return {
      getPatients: build.query({
        query: () => ({ url: '/patients/', method: 'get' }),
        async onCacheEntryAdded(arg, { dispatch, cacheDataLoaded }) {
          cacheDataLoaded.then((response) => {
            dispatch(setPatients(response.data))
          })
        },
      }),
      getPatientBySupportGroup: build.mutation({
        query: ({ id }) => ({
          url: `/patients/support_group/?support_group=${id}`,
          method: 'get',
        }),
        async onCacheEntryAdded(arg, { dispatch, cacheDataLoaded }) {
          cacheDataLoaded.then((response) => {
            dispatch(setPatients(response.data))
          })
        },
      }),
    }
  },
})

export const { useGetPatientsQuery, useGetPatientBySupportGroupMutation } = patientApi
