import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./app/store"
import App from "./App"
import { getRequestToken, setupStore } from "./services/authen"
import { setupStore as setupStoreAccount } from "./services/account"
import "./global.css"

setupStore(store)
setupStoreAccount(store)

ReactDOM.render(
  <React.StrictMode>
    <Router basename={process.env.NODE_ENV === 'development' ? '/' : "/movies"}>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
)
