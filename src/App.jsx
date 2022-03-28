import React from "react"
import { Routes, Route, NavLink, Navigate } from "react-router-dom"
import { ThemeProvider, createTheme } from "@mui/material/styles"

import Layout from "./components/Layout"
import Home from "./pages/Home"
import StyleGuide from "./pages/StyleGuide"
import Category from "./pages/Category"
import { 
  MovieDetail, 
  MovieCastPage, 
  MovieLogoPage, 
  MoviePostersPage, 
  MovieTrailersPage,
  MovieBackdropsPage
} from "./pages/movieDetail"
import Search from "./pages/Search"
import Person from "./pages/Person"
import { PersonDetail, PersonTranslate } from "./pages/PersonDetail"
const theme = createTheme({
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
          padding: "0",
          "& .MuiInputBase-input": {
            padding: "8px",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputLabel-root": {
            "&:not(.Mui-focused, .MuiFormLabel-filled)": {
              transform: "translate(14px, 9px) scale(1)",
            },
          },
        },
      },
    },
  },
})

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route path="movie">
            <Route
              index
              element={<Category discover="movie" />}
            />
            <Route
              path=":id"
            >
              <Route
                index
                element={<MovieDetail />}
              />
              <Route
                path="cast"
                element={<MovieCastPage />}
              />
              <Route
                path="logo"
                element={<MovieLogoPage />}
              />
              <Route
                path="backdrops"
                element={<MovieBackdropsPage />}
              />
              <Route
                path="posters"
                element={<MoviePostersPage />}
              />
              <Route
                path="trailers"
                element={<MovieTrailersPage />}
              />
            </Route>
          </Route>
          <Route path="tv">
            <Route
              index
              element={<Category discover="tv" />}
            />
            <Route
              path=":slug"
              element={<Home />}
            />
          </Route>
          <Route
            path="/about-us"
            element={<Home />}
          />
          <Route
            path="/contact-us"
            element={<Home />}
          />
          <Route
            path="/search"
            element={<Search />}
          />
          <Route path="person">
            <Route
              index
              element={<Person />}
            />
            <Route path=":id">
              <Route
                index
                element={
                  <PersonDetail />
                }
              />
              <Route
                path="translations"
                element={
                  <PersonTranslate />
                }
              />
            </Route>
          </Route>
          <Route
            path="/404"
            element={<Home />}
          />
          <Route
            path="/style-guide"
            element={<StyleGuide />}
          />
          <Route
            path="*"
            element={<Navigate to="/404" />}
          />
        </Routes>
      </Layout>
    </ThemeProvider>
  )
}

export default App
