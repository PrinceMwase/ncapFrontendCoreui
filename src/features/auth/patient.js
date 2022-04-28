import { createApi } from '@reduxjs/toolkit/query/react'

import { setPatients, setPagination } from 'src/store/slices/patientSlice'
import Paginator from 'src/utils/paginator'
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
            setPatientsAndPagination(dispatch, response)
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
            setPatientsAndPagination(dispatch, response)
          })
        },
      }),
      getNextPatients: build.mutation({
        query: (query) => ({
          url: query,
          method: 'get',
        }),
        async onCacheEntryAdded(arg, { dispatch, cacheDataLoaded }) {
          cacheDataLoaded.then((response) => {
            setPatientsAndPagination(dispatch, response)
          })
        },
      }),
      getPreviousPatients: build.mutation({
        query: (query) => ({
          url: query,
          method: 'get',
        }),
        async onCacheEntryAdded(arg, { dispatch, cacheDataLoaded }) {
          cacheDataLoaded.then((response) => {
            setPatientsAndPagination(dispatch, response)
          })
        },
      }),
    }

    /** Adds pagination to global patients store
     * @param dispatch - disptach method for the store
     * @param response - response data with previous and next keys
     */
    function setPatientsAndPagination(dispatch, response) {
      dispatch(setPatients(response.data))

      dispatch(setPagination(Paginator(response.data)))
    }
  },
})

export const {
  useGetPatientsQuery,
  useGetPatientBySupportGroupMutation,
  useGetNextPatientsMutation,
  useGetPreviousPatientsMutation,
} = patientApi
