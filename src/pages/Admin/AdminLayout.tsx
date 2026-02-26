import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function AdminLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const adminAuth = localStorage.getItem("adminAuth");

    if (!adminAuth) {
      navigate("/admin/login");
    }
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem("adminAuth");
    navigate("/admin/login");
  }

  return (
    <div className="min-h-screen flex">

      {/* SIDEBAR */}
      <aside className="w-64 bg-primary text-light p-6">
        <h2 className="text-2xl font-bold mb-8">Painel Admin</h2>

        <nav className="flex flex-col gap-4 font-semibold">
          <Link to="/admin">Dashboard</Link>
          <Link to="/admin/pedidos">Pedidos</Link>
          <Link to="/admin/produtos">Produtos</Link>
          <Link to="/admin/promocoes">Promoções</Link>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-10 bg-secondary px-4 py-2 rounded-lg font-bold"
        >
          Sair
        </button>
      </aside>

      {/* CONTEÚDO */}
      <main className="flex-1 p-8 bg-light">
        <Outlet />
      </main>
    </div>
  );
}