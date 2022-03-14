import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://api.themoviedb.org/3/';
const createRequest = (url) => {
    if(!(/^.*\?.*$/.test(url))) url = url + '?';

    if(/.*&.*/.test(url)) url = url + '&'

    return {
        url: url + "api_key=" + process.env.REACT_APP_API_KEY
    }
};

export const IMAGE_URL = 'https://image.tmdb.org/t/p';

export const getImage = (path, size) => {
    if(!(/^\//.test(path))) path = '/' + path;

    if(isNaN(size)) {
        size = '/original'
    } else {
        size  = '/w' + size
    }

    return IMAGE_URL + size + path;
}

export const TRENDING_TYPE = {
    media_type: [
        'all', 'movie', 'tv', 'person'
    ],
    time_window: [
        'day', 'week'
    ],
}

export const movieApi = createApi({
    reducerPath: 'movieApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getTrending: builder.query({
            query: (
                time_window = TRENDING_TYPE.time_window[0],
                media_type = TRENDING_TYPE.media_type[0]
            ) => createRequest(`trending/${media_type}/${time_window}`)
        }),
        getSearch: builder.query({
            query: ({type = 'movie', keyword, page = 1}) => createRequest(`search/${type}?page=${page}&query=${keyword}`)
        }),
    })
});

export const {
    useGetTrendingQuery,
    useGetSearchQuery,
} = movieApi;
