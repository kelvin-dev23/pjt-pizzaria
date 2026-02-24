import { useCart } from "../context/useCart"

export function Carrinho() {
  
  const { carrinho, removerDoCarrinho } = useCart()
  const total = carrinho.reduce((acc, item) => {
  return acc + item.preco * item.quantidade
}, 0)

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Seu Carrinho</h1>

      {carrinho.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <div className="space-y-4">
          {carrinho.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-white p-4 shadow rounded-lg"
            >
              <div className="mt-6 text-right">
  <h2 className="text-xl font-bold">
    Total: R$ {total.toFixed(2)}
  </h2>
</div>
              <div>
                <h2 className="font-bold">{item.nome}</h2>
                <p className="text-sm text-gray-600">
                  Quantidade: {item.quantidade}
                </p>
              </div>

              <span className="font-semibold">
                R$ {(item.preco * item.quantidade).toFixed(2)}
              </span>
              <button
  onClick={() => removerDoCarrinho(item.id)}
  className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
>
  Remover
</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
