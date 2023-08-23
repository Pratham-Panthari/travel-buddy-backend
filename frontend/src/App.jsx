import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"

import HotelDetails from "./pages/HotelDetails"
import SearchResultList from "./pages/SearchResultList"
import Login from "./pages/Login"
import Register from "./pages/Register"
import About from "./pages/About"
import Hotels from "./pages/Hotels"
import Confirmation from "./pages/Confirmation"
import Profile from "./pages/Profile"

function App() {
 

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/hotel" element={<Hotels />}></Route>
        <Route path="/hotel/:id" element={<HotelDetails />}></Route>
        <Route path="/hotels/search" element={<SearchResultList />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/confirmation" element={<Confirmation />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
    </>
  )
}

export default App
