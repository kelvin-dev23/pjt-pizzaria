import { useEffect, useState } from "react";
import { estaAberto } from "../utils/horario";
import { Link, useNavigate } from "react-router-dom";

export function Header() {
  const [aberto, setAberto] = useState(estaAberto());
  const [authUser, setAuthUser] = useState<{ email: string } | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      setAuthUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setAberto(estaAberto());
    }, 60000);

    return () => clearInterval(intervalo);
  }, []);

  function handleLogout() {
    localStorage.removeItem("authUser");
    navigate("/login");
  }

  return (
    <header className="bg-primary text-light shadow-md p-4 relative">

      <div className="flex justify-between items-center">

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-2xl"
        >
          ☰
        </button>

        <h1 className="text-xl font-bold">🍕 Casa da Pizza</h1>

        <div className="flex items-center gap-4">
          {authUser ? (
            <>
              <span className="text-sm">👤 {authUser.email}</span>

              <button
                onClick={handleLogout}
                className="bg-secondary px-4 py-2 rounded-lg font-bold"
              >
                Sair
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-secondary px-4 py-2 rounded-lg font-bold"
            >
              Entrar
            </button>
          )}
        </div>
      </div>

      <div className="mt-3">
        {aberto ? (
          <span className="bg-green-500 px-3 py-1 rounded-full text-sm font-semibold">
            🟢 Estamos Abertos
          </span>
        ) : (
          <span className="bg-red-500 px-3 py-1 rounded-full text-sm font-semibold">
            🔴 Estamos Fechados
          </span>
        )}
      </div>

      {menuOpen && (
        <div className="fixed top-0 left-0 w-64 h-full bg-primary text-light p-6 z-50 shadow-lg">
          <button
            onClick={() => setMenuOpen(false)}
            className="mb-6 text-xl"
          >
            ✕
          </button>

          <nav className="flex flex-col gap-4 text-lg font-semibold">
            <Link to="/cardapio">Cardápio</Link>
            <Link to="/promocoes">Promoções</Link>
            <Link to="/carrinho">Meu Carrinho</Link>
            <Link to="/pedidos">Meus Pedidos</Link>
            <Link to="/conta">Minha Conta</Link>
            <Link to="/localizacao">Localização</Link>
          </nav>
        </div>
      )}

    </header>
  );
}