import type { Pizza } from "../types/Pizza";
import { useCart } from "../context/useCart";
import { Link } from "react-router-dom";

interface PizzaCardProps {
  pizza: Pizza;
}

export function PizzaCard({ pizza }: PizzaCardProps) {
  const { adicionarAoCarrinho } = useCart();
  return (
    <div className="bg-light text-black rounded-xl shadow-lg p-4">
      <img
        src={pizza.imagem}
        alt={pizza.nome}
        className="w-full h-40 object-cover rounded-lg"
      />
      <Link to={`/pizza/${pizza.id}`}>
        <h2 className="text-xl font-bold hover:text-red-500">{pizza.nome}</h2>
      </Link>
      

      <p className="text-gray-600 text-sm">{pizza.descricao}</p>

      <div className="flex justify-between items-center mt-3">
        <span className="text-secondary font-bold text-lg">
          R$ {pizza.preco.toFixed(2)}
        </span>

        <button
          onClick={() => adicionarAoCarrinho(pizza)}
          className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
        >
          Adicionar
        </button>
      </div>
    </div>
  );
}
