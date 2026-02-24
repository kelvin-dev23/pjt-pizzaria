import type { Pizza } from "../types/Pizza"
import { useCart } from "../context/useCart"

interface PizzaCardProps {
  pizza: Pizza
}

export function PizzaCard({ pizza }: PizzaCardProps) {
  const { adicionarAoCarrinho } = useCart()
  return (
    <div className="bg-white shadow-md rounded-xl p-4 w-72">
      <img
        src={pizza.imagem}
        alt={pizza.nome}
        className="w-full h-40 object-cover rounded-lg"
      />

      <h2 className="text-xl font-bold mt-2">{pizza.nome}</h2>

      <p className="text-gray-600 text-sm">{pizza.descricao}</p>

      <div className="flex justify-between items-center mt-3">
        <span className="text-lg font-semibold text-green-600">
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
  )
}