import { Link, Outlet } from "react-router-dom";
import { useCart } from "../context/useCart";

export default function MainLayout() {
  const { carrinho } = useCart();

  const totalItens = carrinho.reduce((acc, item) => {
    return acc + item.quantidade;
  }, 0);
  return (
   <div className="min-h-screen bg-primary text-light">
      {/* HEADER */}
      <header className="bg-primary text-light shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">🍕 Casa da Pizza</h1>

          <nav className="flex gap-6 font-medium">
            <Link to="/">Home</Link>
            <Link to="/cardapio">Cardápio</Link>
            <Link to="/carrinho">Carrinho ({totalItens})</Link>
            <span className="ml-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
              {totalItens}
            </span>
          </nav>
        </div>
      </header>

      {/* CONTEÚDO */}
      <main className="flex-1 p-4">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white text-center py-4">
        © 2026 Casa da Pizza - Todos os direitos reservados
      </footer>
    </div>
  );
}
