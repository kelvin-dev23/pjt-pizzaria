import { Link, Outlet } from "react-router-dom"

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      
      {/* HEADER */}
      <header className="bg-green-700 text-white shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          
          <h1 className="text-2xl font-bold">
            🍕 Casa da Pizza
          </h1>

          <nav className="flex gap-6 font-medium">
            <Link to="/">Home</Link>
            <Link to="/cardapio">Cardápio</Link>
            <Link to="/carrinho">Carrinho 🛒</Link>
          </nav>

        </div>
      </header>

      {/* CONTEÚDO */}
      <main className="flex-1 max-w-6xl mx-auto w-full p-6">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white text-center py-4">
        © 2026 Casa da Pizza - Todos os direitos reservados
      </footer>

    </div>
  )
}