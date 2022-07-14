import { createAsyncThunk, createSlice, createSelector } from "@reduxjs/toolkit";
import { client } from "../api/client";

export const getRequestToken = createAsyncThunk(
    'authen/get/request_token',
    async () => {
        const result = await client.get('/authentication/token/new');
        return result.data
    }
)

export const getGuestSession = createAsyncThunk(
    'authen/get/guest_session',
    async () => {
        const result = await client.get('/authentication/guest_session/new');

        return result.data
    }
)

export const getSessionWithLogin = createAsyncThunk(
    'authen/get/get_session_with_login',
    async ({username, password, request_token}, {getState, dispatch}) => {
        const result = await client.post('/authentication/token/validate_with_login', {
            username, password, request_token
        })

        if(result.data.success === false) {
            throw new Error('error when get_session_with_login');
        }

        await dispatch(getSession(result.data.request_token))
        return result.data
    }
)

export const getSession = createAsyncThunk(
    'authen/get/session',
    async (request_token, {getState}) => {
        const result = await client.post('/authentication/session/new', {
            request_token
        })

        return result.data
    }
)

export const deleteSession = createAsyncThunk(
    'authen/delete_session',
    async (_, {getState}) => {
        const session_id  = getState().authen.session.sessionId

        if(!session_id) {
            throw new Error('session not found')
        }


        const result = await client.delete('/authentication/session', {
            data: {
                session_id
            }
        })

        if(!result.data.success) throw new Error('cant delete session')

        return result.data
    }
) 

const initialState = {
    session: {
        sessionId: "",
        isGuestSession: false,
        expires_at: ""
    }
}

const authenSlice = createSlice({
    name: "authen",
    initialState,
    reducers: {
        addSession: (state, action) => {
            state.session.sessionId = action.payload
        }
    },
    extraReducers: builder => {
        builder
        .addCase(getGuestSession.fulfilled, (state, action) => {
            state.session = {
                sessionId: action.payload.guest_session_id,
                isGuestSession: true,
                expires_at: action.payload.expires_at
            }
        })
        .addCase(getSession.fulfilled, (state, action) => {
            
            state.session = {
                sessionId: action.payload.session_id,
                isGuestSession: false
            }
        })
        .addCase(deleteSession.fulfilled, state => {
            state.session = {}
        })
    }
})

export default authenSlice.reducer;

export const { addRequestToken, addSession } = authenSlice.actions

export const selectorSessionId = state => state.authen.session.sessionId
export const selectorSessionGuest = state => state.authen.session.isGuestSession
export const  onSessionChange = (callback) => createSelector(
    selectorSessionId,
    (session_id) => {
        callback(session_id)
        return session_id
    }
)

export const setupStore = (store) => {
    let sessionId = localStorage.getItem('session_id')
    if(sessionId) {
        store.dispatch(addSession(sessionId))
    }

    const instant = onSessionChange(session_id => {
        if(!session_id) return
        localStorage.setItem('session_id', session_id)
    })
        
    store.subscribe(() => {
        instant(store.getState())
    })
}