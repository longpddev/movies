import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { client } from "../api/client";
import { onSessionChange, selectorSessionGuest, selectorSessionId } from "./authen";

const checkValid = (accountId, session_id) => {
    if(!accountId) {
        console.error("account not found")
        throw new Error('account not found')
    }
    if(!session_id) {
        console.error("session not found")
        throw new Error('session not found')
    }
}

const checkValidSession = (session_id) => {
    if(!session_id) {
        console.error("session not found")
        throw new Error('session not found')
    }
}
export const getAccount = createAsyncThunk(
    'account/getAccount',
    async (_, {getState}) => {
        const session_id = selectorSessionId(getState())
        const result = await client.get('/account',{
            params: {
                session_id
            }
        })

        return result.data
    }
)

export const getFavoriteTvShow = createAsyncThunk(
    'account/getFavoriteTvShow',
    async (_, {getState}) => {
        const account_id = selectAccountId(getState())
        const session_id = selectorSessionId(getState())
        checkValid(account_id, session_id)
       
        const result = await client.get(`/account/${account_id}/favorite/tv`, {
            params: {
                session_id
            }
        })

        return result.data
    }
)

export const getFavoriteMovies = createAsyncThunk(
    'account/getFavoriteMovies',
    async (_, {getState}) => {
        const account_id = selectAccountId(getState())
        const session_id = selectorSessionId(getState())
        checkValid(account_id, session_id)
       
        const result = await client.get(`/account/${account_id}/favorite/movies`, {
            params: {
                session_id
            }
        })

        return result.data
    }
)

export const getWatchlistTvShow = createAsyncThunk(
    'account/getWatchlistTvShow',
    async (_, {getState}) => {
        const account_id = selectAccountId(getState())
        const session_id = selectorSessionId(getState())
        checkValid(account_id, session_id)
       
        const result = await client.get(`/account/${account_id}/watchlist/tv`, {
            params: {
                session_id
            }
        })
        return result.data
    }
)

export const getWatchlistMovies = createAsyncThunk(
    'account/getWatchlistMovies',
    async (_, {getState}) => {
        const account_id = selectAccountId(getState())
        const session_id = selectorSessionId(getState())
        checkValid(account_id, session_id)
       
        const result = await client.get(`/account/${account_id}/watchlist/movies`, {
            params: {
                session_id
            }
        })

        return result.data
    }
)

// add favorite
export const addOrRemoveFavorite = createAsyncThunk(
    'account/addOrRemoveFavorite',
    async ({favorite, media_id, media_type}, {getState, dispatch}) => {
        const account_id = selectAccountId(getState())
        const session_id = selectorSessionId(getState())
        checkValid(account_id, session_id)
        let result = await client.post(`/account/${account_id}/favorite`, {
            media_type, media_id, favorite
        }, {
            params: {
                session_id
            }
        })

        if(!result.data.success) {
            console.error('addOrRemoveFavorite error')
            throw new Error('addOrRemoveFavorite error')
        }
        
        if(media_type === 'movie') {
            await dispatch(getFavoriteMovies())
        } else {
            await dispatch(getFavoriteTvShow())
        }
        return result.data
    }
)
// end add favorite

// add watchlist
export const addOrRemoveWatchlist = createAsyncThunk(
    'account/addOrRemoveWatchlist',
    async ({watchlist, media_id, media_type}, {getState, dispatch}) => {
        const account_id = selectAccountId(getState())
        const session_id = selectorSessionId(getState())
        checkValid(account_id, session_id)
        let result = await client.post(`/account/${account_id}/watchlist`, {
            media_type, media_id, watchlist
        }, {
            params: {
                session_id
            }
        })

        if(!result.data.success) {
            console.error('addOrRemoveWatchlist error')
            throw new Error('addOrRemoveWatchlist error')
        }
        
        if(media_type === 'movie') {
            await dispatch(getWatchlistMovies())
        } else {
            await dispatch(getWatchlistTvShow())
        }
        return result.data
    }
)
// end add watchlist

// add media 
export const getTvShowRates = createAsyncThunk(
    'account/getTvShowRates',
    async (_, { getState, dispatch }) => {
        const account_id = selectAccountId(getState())
        const session_id = selectorSessionId(getState())
        checkValid(account_id, session_id)
        let result = await client.get(`/account/${account_id}/rated/tv`, {
            params: {
                session_id
            }
        })

        return result.data
    }
)

export const getMoviesRates = createAsyncThunk(
    'account/getMoviesRates',
    async (_, { getState, dispatch }) => {
        const account_id = selectAccountId(getState())
        const session_id = selectorSessionId(getState())
        checkValid(account_id, session_id)
        let result = await client.get(`/account/${account_id}/rated/movies`, {
            params: {
                session_id
            }
        })
        
        return result.data
    }
)

export const addRateMovie = createAsyncThunk(
    'account/addRateMovie',
    async ({ media_id, rate }, { getState, dispatch }) => {
        const session_id = selectorSessionId(getState())
        const isGuestSession = selectorSessionGuest(getState())
        checkValidSession(session_id)

        const result = await client.get(`/movie/${media_id}/rating`, {
            value: rate
        },
        {
            params: {
                [isGuestSession ? "guest_session_id" : "session_id"]: session_id
            }
        })

        if(result.data.success) {
            dispatch(getMoviesRates())
        } else {
            console.error('update error')
            throw new Error('update error')
        }

        return result.data
    }
)

export const removeRateMovie = createAsyncThunk(
    'account/removeRateMovie',
    async (media_id, { getState, dispatch }) => {
        const session_id = selectorSessionId(getState())
        const isGuestSession = selectorSessionGuest(getState())
        checkValidSession(session_id)

        const result = await client.delete(`/movie/${media_id}/rating`, {
            params: {
                [isGuestSession ? "guest_session_id" : "session_id"]: session_id
            }
        })

        if(result.data.success) {
            dispatch(getMoviesRates())
        } else {
            console.error('update error')
            throw new Error('update error')
        }

        return result.data
    }
)

export const addRateTvShow = createAsyncThunk(
    'account/addRateTvShow',
    async ({ media_id , rate}, { getState, dispatch }) => {
        const session_id = selectorSessionId(getState())
        const isGuestSession = selectorSessionGuest(getState())
        checkValidSession(session_id)

        const result = await client.post(`/tv/${media_id}/rating`, {
            value: rate
        }, {
            params: {
                [isGuestSession ? "guest_session_id" : "session_id"]: session_id
            }
        })

        if(result.data.success) {
            dispatch(getTvShowRates())
        } else {
            console.error('update error')
            throw new Error('update error')
        }

        return result.data
    }
)

export const removeRateTvShow = createAsyncThunk(
    'account/removeRateTvShow',
    async (media_id, { getState, dispatch }) => {
        const session_id = selectorSessionId(getState())
        const isGuestSession = selectorSessionGuest(getState())
        checkValidSession(session_id)

        const result = await client.delete(`/tv/${media_id}/rating`, {
            params: {
                [isGuestSession ? "guest_session_id" : "session_id"]: session_id
            }
        })

        if(result.data.success) {
            dispatch(getTvShowRates())
        } else {
            console.error('update error')
            throw new Error('update error')
        }

        return result.data
    }
)

export const getAccStatesTvShow = createAsyncThunk(
    'account/getAccStatesTvShow',
    async ({tv_show_id}, {getState}) => {
        const session_id = selectorSessionId(getState())
        const isGuestSession = selectorSessionGuest(getState())
        checkValidSession(session_id)

        const result = await client.get(`/tv/${tv_show_id}/account_states`, {
            params: {
                [isGuestSession ? "guest_session_id" : "session_id"]: session_id
            }
        })

        return result.data
    }
)

export const getAccStatesMovies = createAsyncThunk(
    'account/getAccStatesMovies',
    async ({movie_id}, {getState}) => {
        const session_id = selectorSessionId(getState())
        const isGuestSession = selectorSessionGuest(getState())
        checkValidSession(session_id)

        const result = await client.get(`/movies/${movie_id}/account_states`, {
            params: {
                [isGuestSession ? "guest_session_id" : "session_id"]: session_id
            }
        })

        return result.data
    }
)
// end rate media

const initialState = {
    data: {},
    favorite: {
        tv_show: {
            ids: [],
            entities: {}
        },
        movies: {
            ids: [],
            entities: {}
        }
    },
    watchlist: {
        tv_show: {
            ids: [],
            entities: {}
        },
        movies: {
            ids: [],
            entities: {}
        }
    },
    rate: {
        tv_show: {
            ids: [],
            entities: {}
        },
        movies: {
            ids: [],
            entities: {}
        }
    }
}

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(getAccount.fulfilled, (state, { payload }) => {
            state.data = {
                ...payload
            }
        })
        .addCase(getFavoriteTvShow.fulfilled, (state, { payload }) => {
            const entities = payload.results.reduce((acc, item) => {
                acc[item.id] = item
                return acc
            }, {})
            state.favorite.tv_show.entities = entities
            state.favorite.tv_show.ids = Object.keys(entities)
        })
        .addCase(getFavoriteMovies.fulfilled, (state, { payload }) => {
            const entities = payload.results.reduce((acc, item) => {
                acc[item.id] = item
                return acc
            }, {})
            state.favorite.movies.entities = entities
            state.favorite.movies.ids = Object.keys(entities)
        })
        .addCase(getWatchlistTvShow.fulfilled, (state, { payload }) => {
            const entities = payload.results.reduce((acc, item) => {
                acc[item.id] = item
                return acc
            }, {})
            state.watchlist.tv_show.entities = entities
            state.watchlist.tv_show.ids = Object.keys(entities)
        })
        .addCase(getWatchlistMovies.fulfilled, (state, { payload }) => {
            const entities = payload.results.reduce((acc, item) => {
                acc[item.id] = item
                return acc
            }, {})
            state.watchlist.movies.entities = entities
            state.watchlist.movies.ids = Object.keys(entities)
        })
        .addCase(getTvShowRates.fulfilled, (state, { payload }) => {
            const entities = payload.results.reduce((acc, item) => {
                acc[item.id] = item
                return acc
            }, {})

            state.rate.tv_show.entities = entities;
            state.rate.tv_show.ids = Object.keys(entities);
        })
        .addCase(getMoviesRates.fulfilled, (state, { payload }) => {
            const entities = payload.results.reduce((acc, item) => {
                acc[item.id] = item
                return acc
            }, {})

            state.rate.movies.entities = entities;
            state.rate.movies.ids = Object.keys(entities);
        })
    }
})

export const selectAccountId = state => state.account.data.id || undefined

export default accountSlice.reducer

export const setupStore = store => {
    const instant = onSessionChange(session_id => {
        if(!session_id) return 
        setTimeout(() => {
            store.dispatch(getAccount()).then(() => {
                store.dispatch(getTvShowRates())
                store.dispatch(getMoviesRates())
                store.dispatch(getFavoriteTvShow())
                store.dispatch(getFavoriteMovies())
                store.dispatch(getWatchlistTvShow())
                store.dispatch(getWatchlistMovies())
            })
        }, 0)
    })
    store.subscribe(() => {
        instant(store.getState())
    })
}

export const useRateMedia = (type) => {
    const rate = useSelector(state => state.account.rate)
    return {
        isRating(id) {
            if(rate && type in rate && id in rate[type].entities) {
                return true;
            }

            return false
        },
        getMyRate(id) {
            if(rate && type in rate && id in rate[type].entities) {
                return rate[type].entities[id].rating;
            }

            return null
        }
    }
}

export const useFavorite = (type) => {
    const favorite = useSelector(state => state.account.favorite)
    return {
        isFavorite(id) {
            if(favorite && type in favorite && id in favorite[type].entities) {
                return true;
            }

            return false
        }
    }
}

export const useWatchlist = (type) => {
    const watchlist = useSelector(state => state.account.watchlist)
    return {
        isWatchlist(id) {
            if(watchlist && type in watchlist && id in watchlist[type].entities) {
                return true;
            }

            return false
        }
    }
}