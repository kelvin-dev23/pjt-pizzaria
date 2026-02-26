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
import { AdminLayout } from "./pages/Admin/AdminLayout";
import { Dashboard } from "./pages/Admin/Dashboard";
import { Pedidos } from "./pages/Admin/Pedidos";
import { Produtos } from "./pages/Admin/Produtos";
import { Promocoes } from "./pages/Admin/Promocoes";
import { AdminLogin } from "./pages/Admin/AdminLogin";
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
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="pedidos" element={<Pedidos />} />
          <Route path="produtos" element={<Produtos />} />
          <Route path="promocoes" element={<Promocoes />} />
         
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
