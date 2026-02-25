import { useParams } from "react-router-dom"
import { pizzas } from "../data/pizzas"
import { useCart } from "../context/useCart"

export default function PizzaDetalhe() {
  const { id } = useParams()
  const { adicionarAoCarrinho } = useCart()

  const pizza = pizzas.find((p) => p.id === Number(id))

  if (!pizza) {
    return <h1>Pizza não encontrada</h1>
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">{pizza.nome}</h1>
      <p className="mb-4">{pizza.descricao}</p>
      <p className="text-xl font-semibold mb-4">
        R$ {pizza.preco.toFixed(2)}
      </p>

      <button
        onClick={() => adicionarAoCarrinho(pizza)}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Adicionar ao carrinho
      </button>
    </div>
  )
}