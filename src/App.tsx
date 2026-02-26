import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { Header } from "./components/Header";

import Home from "./pages/Home";
import { Cardapio } from "./pages/Cardapio";
import { Carrinho } from "./pages/Carrinho";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import PizzaDetalhe from "./pages/PizzaDetalhe";
import { MinhaConta } from "./pages/MinhaConta";
import { MeusPedidos } from "./pages/MeusPedidos";
<>
  <Header />
  <Routes>...</Routes>
</>;

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
        <Route path="/conta" element={<MinhaConta />} />
        <Route path="/meus-pedidos" element={<MeusPedidos />} />
      </Route>
    </Routes>
  );
}

export default App;
