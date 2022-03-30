import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const baseUrl = "https://api.themoviedb.org/3/"
const createRequest = (url) => {
  if (!/^.*\?.*$/.test(url)) {
    url = url + "?"
  } else {
    url = url + "&"
  }

  return {
    url: url + "api_key=" + process.env.REACT_APP_API_KEY,
  }
}

export const IMAGE_URL = "https://image.tmdb.org/t/p"

export const getImage = (path, size) => {
  if (!/^\//.test(path)) path = "/" + path

  if (isNaN(size)) {
    size = "/original"
  } else {
    size = "/w" + size
  }
  return IMAGE_URL + size + path
}

export const TRENDING_TYPE = {
  media_type: ["all", "movie", "tv", "person"],
  time_window: ["day", "week"],
}

export const MEDIA_TYPE = [
  "",
  "Premiere", 
  "Theatrical (limited)", 
  "Theatrical", 
  "Digital", 
  "Physical", 
  "TV"
]

export const obToParam = (ob) => {
  let result = ""
  Object.keys(ob).forEach((key) => {
    result += `${key}=${ob[key]}&`
  })
  result = result.replace(/&$/, "")
  return result
}

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getTrending: builder.query({
      query: (
        time_window = TRENDING_TYPE.time_window[0],
        media_type = TRENDING_TYPE.media_type[0]
      ) => createRequest(`trending/${media_type}/${time_window}`),
    }),
    getSearch: builder.query({
      query: ({ type = "movie", keyword, page = 1 }) =>
        createRequest(`search/${type}?page=${page}&query=${keyword}`),
    }),
    getDiscover: builder.query({
      query: ({ type = "movie", filter, page = 1 }) => {
        let params = obToParam(filter)
        return createRequest(`discover/${type}?page=${page}&${params}`)
      },
    }),
    getGenres: builder.query({
      query: () => createRequest(`/genre/movie/list`),
    }),
    getPerson: builder.query({
      query: ({ type = "popular", page = 1 }) =>
        createRequest(`/person/${type}?page=${page}`),
    }),
    getPersonDetail: builder.query({
      query: ({ id, type, page }) => {
        let path = `/person/${id}`
        if (type) path += `/${type}`
        if (page) path += `?page=${page}`
        return createRequest(path)
      },
    }),
    getMovies: builder.query({
      query: ({ id, type, query }) => {
        let path = `/movie`
        
        if(id) {
          path += `/${id}`
        }
        
        if (type) path += `/${type}`

        if (query) {
          path += "?" + obToParam(query)
        }

        return createRequest(path)
      },
    }),
    getTvShow: builder.query({
      query: ({ id, type, query }) => {
        let path = `/tv`

        if(id) {
          path += `/${id}`
        }

        if (type) path += `/${type}`

        if (query) {
          path += "?" + obToParam(query)
        }

        return createRequest(path)
      },
    }),
  }),
})

export const {
  useGetTrendingQuery,
  useGetSearchQuery,
  useGetDiscoverQuery,
  useGetGenresQuery,
  useGetPersonQuery,
  useGetPersonDetailQuery,
  useGetMoviesQuery,
  useGetTvShowQuery,
} = movieApi
