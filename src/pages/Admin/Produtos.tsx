import { useEffect, useState } from "react";

export function Produtos() {
  const [pizzas, setPizzas] = useState<any[]>([]);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");

  useEffect(() => {
    const pizzasSalvas = localStorage.getItem("pizzas");

    if (pizzasSalvas) {
      setPizzas(JSON.parse(pizzasSalvas));
    }
  }, []);

  function salvarLista(lista: any[]) {
    setPizzas(lista);
    localStorage.setItem("pizzas", JSON.stringify(lista));
  }

  function adicionarPizza() {
    if (!nome || !preco) {
      alert("Preencha nome e preço.");
      return;
    }

    const novaPizza = {
      id: Date.now(),
      nome,
      preco: Number(preco),
    };

    const novaLista = [...pizzas, novaPizza];

    salvarLista(novaLista);

    setNome("");
    setPreco("");
  }

  function removerPizza(id: number) {
    const novaLista = pizzas.filter((pizza) => pizza.id !== id);
    salvarLista(novaLista);
  }

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Gerenciar Pizzas</h1>

      <div className="bg-white shadow p-4 rounded-lg mb-6 space-y-3">
        <input
          type="text"
          placeholder="Nome da pizza"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          placeholder="Preço"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <button
          onClick={adicionarPizza}
          className="bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Adicionar Pizza
        </button>
      </div>

      <div className="space-y-3">
        {pizzas.map((pizza) => (
          <div
            key={pizza.id}
            className="flex justify-between items-center bg-white p-4 shadow rounded-lg"
          >
            <div>
              <p className="font-semibold">{pizza.nome}</p>
              <p className="text-sm text-gray-600">
                R$ {pizza.preco.toFixed(2)}
              </p>
            </div>

            <button
              onClick={() => removerPizza(pizza.id)}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Remover
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}