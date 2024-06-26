import React from 'react'
import { Route, Routes } from 'react-router-dom'
import OutletConnnection from './Routes/OutletConnnection'
import Home from './pages/private/Home'
import Login from './pages/Public/Login'
import Category from './pages/private/Category'
import Franchise from './pages/private/Franchise'
import Products from './pages/private/Products'
import Stock from './pages/private/Stock'
import StockReport from './pages/private/StockReport'
import Subproducts from './pages/private/Subproducts'


function App() {

  return (
    <div>
      <Routes>
        <Route index element={<Login />} />
        <Route  path='/'element={<OutletConnnection />} >
          <Route path='/dashboard' element={<Home />} />
          <Route path='/category' element={<Category />} />
          <Route path='/franchises' element={<Franchise />} />
          <Route path='/products' element={<Products/>} />
          <Route path='/stocks' element={<Stock/>} />
          <Route path='/stocks-report' element={<StockReport/>} />
          <Route path='/sub-products' element={<Subproducts/>} />

        </Route>
      </Routes>
    </div>
  )
}

export default App