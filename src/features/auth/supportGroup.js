import { createApi } from '@reduxjs/toolkit/query/react'
import axiosBaseQuery from 'src/utils/useAxios'

/** implement rtkq for support groups */
export const supportGroupApi = createApi({
  reducerPath: 'supportGroupApi',
  baseQuery: axiosBaseQuery({ baseUrl: '' }),
  endpoints(build) {
    return {
      getSupportGroups: build.query({
        query: () => ({ url: '/support_group/', method: 'get' }),
        async onCacheEntryAdded({ cacheDataLoaded }) {},
      }),
    }
  },
})

export const { useGetSupportGroupsQuery } = supportGroupApi
