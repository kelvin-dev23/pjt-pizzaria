import { useEffect, useState } from "react";
import { estaAberto } from "../utils/horario";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function Header() {
  const [aberto, setAberto] = useState(estaAberto());
  const [authUser, setAuthUser] = useState<{ email: string } | null>(null);
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
    navigate("/");
    window.location.reload();
  }
  return (
    <header className="bg-primary text-light shadow-md">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold">🍕 Casa da Pizza</h1>
        <div className="flex items-center gap-4">
          {authUser ? (
            <>
              <span className="text-sm">👤 {authUser.email}</span>

              <button
                onClick={handleLogout}
                className="bg-secondary text-light px-4 py-2 rounded-lg font-bold"
              >
                Sair
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-secondary text-light px-4 py-2 rounded-lg font-bold"
            >
              Entrar
            </button>
          )}
        </div>

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

      <nav className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/cardapio">Cardápio</Link>
        <Link to="/carrinho">Carrinho</Link>
      </nav>
    </header>
  );
}
