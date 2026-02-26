import { useEffect, useState } from "react"
import { estaAberto } from "../utils/horario"
import { Link } from "react-router-dom"

export function Header() {
  const [aberto, setAberto] = useState(estaAberto())

  useEffect(() => {
    const intervalo = setInterval(() => {
      setAberto(estaAberto())
    }, 60000) // atualiza a cada 1 minuto

    return () => clearInterval(intervalo)
  }, [])
  return (
    <header className="bg-primary text-light shadow-md">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold">🍕 Casa da Pizza</h1>

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
  )
}