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
    <div className="max-w-4xl mx-auto p-6">
      <img
        src={pizza.imagem}
        alt={pizza.nome}
        className="w-full h-96 object-cover rounded-lg"
      />

      <h1 className="text-3xl font-bold mt-4">{pizza.nome}</h1>

      <p className="text-gray-600 mt-2">{pizza.descricao}</p>

      <p className="text-2xl font-semibold text-green-600 mt-4">
        R$ {pizza.preco.toFixed(2)}
      </p>

      <button
        onClick={() => adicionarAoCarrinho(pizza)}
        className="mt-6 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition"
      >
        Adicionar ao Carrinho
      </button>
    </div>
  )
}