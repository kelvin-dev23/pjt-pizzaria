import { useState } from "react";

export function Produtos() {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");

  function adicionarPizza() {
    const pizzasSalvas = localStorage.getItem("pizzas");

    let lista = [];

    if (pizzasSalvas) {
      lista = JSON.parse(pizzasSalvas);
    }

    const novaPizza = {
      id: Date.now(),
      nome,
      preco: Number(preco),
    };

    lista.push(novaPizza);

    localStorage.setItem("pizzas", JSON.stringify(lista));

    setNome("");
    setPreco("");

    alert("Pizza adicionada!");
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">
        Gerenciar Produtos
      </h1>

      <div className="space-y-4 max-w-md">

        <input
          placeholder="Nome da pizza"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          placeholder="Preço"
          type="number"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <button
          onClick={adicionarPizza}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Adicionar Pizza
        </button>

      </div>
    </div>
  );
}