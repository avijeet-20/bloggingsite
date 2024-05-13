import { useState } from 'react'
import { Routes, BrowserRouter,Route } from 'react-router-dom'
import Signup from './pages/Signup'
import {Signin} from './pages/Signin'
import {Blog} from './pages/Blog'
import './App.css'
import { Publish } from './pages/Publish'
import { Blogs } from './pages/Blogs'

function App() {


  return (
    <> 
      <BrowserRouter>
      <Routes>
    <Route path='/signup' element={<Signup></Signup>}></Route>
    <Route path='/signin' element={<Signin></Signin>}></Route>
    <Route path='blog/:id' element={<Blog></Blog>}></Route>
    <Route path='/blogs' element = {<Blogs></Blogs>}></Route>
    <Route path='/publish' element = {<Publish></Publish>}></Route>
      </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
