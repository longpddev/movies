import React from 'react'
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import StyleGuide from './pages/StyleGuide';
import Category from './pages/Category';
import Detail from './pages/Detail';
import Search from './pages/Search';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/movie" element={ <Category /> } />
        <Route path="/movie/:slug" element={ <Home /> } />
        <Route path="/tv" element={ <Category /> } />
        <Route path="/tv/:slug" element={ <Home /> } />
        <Route path="/detail" element={ <Detail /> } />
        <Route path="/detail/:slug" element={ <Detail /> } />
        <Route path="/about-us" element={ <Home /> } />
        <Route path="/contact-us" element={ <Home /> } />
        <Route path="/search" element={ <Search /> } />
        <Route path="/404" element={ <Home /> } />
        <Route path="/style-guide" element={ <StyleGuide /> } />
        <Route path="*" element={ <Navigate to="/404" /> } />
      </Routes>
    </Layout>
  )
}

export default App