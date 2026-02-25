import { Routes, Route } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"

import Home from "./pages/Home"
import { Cardapio } from "./pages/Cardapio"
import { Carrinho } from "./pages/Carrinho";
import Checkout from "./pages/Checkout"
import Login from "./pages/Login"
import Cadastro from "./pages/Cadastro"
import PizzaDetalhe from "./pages/PizzaDetalhe"

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/cardapio" element={<Cardapio />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/pizza/:id" element={<PizzaDetalhe />} />
      </Route>
    </Routes>
  )
}

export default App  