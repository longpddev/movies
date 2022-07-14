import { configureStore } from "@reduxjs/toolkit"
import { movieApi } from "../services/movieApi"
import authenReducer from '../services/authen'
import accountReducer from '../services/account'

export default configureStore({
  reducer: {
    [movieApi.reducerPath]: movieApi.reducer,
    authen: authenReducer,
    account: accountReducer
  },
})
