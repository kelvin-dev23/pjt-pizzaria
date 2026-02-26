import { useEffect, useState } from "react";

interface Produto {
  id: number;
  nome: string;
  preco: number;
}

export function Produtos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [editandoId, setEditandoId] = useState<number | null>(null);

  useEffect(() => {
    const produtosSalvos = JSON.parse(localStorage.getItem("produtos") || "[]");
    setProdutos(produtosSalvos);
  }, []);

  function salvarProduto(e: React.FormEvent) {
    e.preventDefault();

    if (!nome || !preco) return;

    if (editandoId) {
      const atualizados = produtos.map((produto) =>
        produto.id === editandoId
          ? { ...produto, nome, preco: Number(preco) }
          : produto
      );

      setProdutos(atualizados);
      localStorage.setItem("produtos", JSON.stringify(atualizados));
      setEditandoId(null);
    } else {
      const novoProduto = {
        id: Date.now(),
        nome,
        preco: Number(preco),
      };

      const atualizados = [...produtos, novoProduto];
      setProdutos(atualizados);
      localStorage.setItem("produtos", JSON.stringify(atualizados));
    }

    setNome("");
    setPreco("");
  }

  function editarProduto(produto: Produto) {
    setNome(produto.nome);
    setPreco(produto.preco.toString());
    setEditandoId(produto.id);
  }

  function excluirProduto(id: number) {
    const atualizados = produtos.filter((produto) => produto.id !== id);
    setProdutos(atualizados);
    localStorage.setItem("produtos", JSON.stringify(atualizados));
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Produtos</h1>

      <form
        onSubmit={salvarProduto}
        className="bg-white p-6 rounded-xl shadow mb-8"
      >
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Nome do produto"
            className="flex-1 p-3 border rounded-lg"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <input
            type="number"
            placeholder="Preço"
            className="w-40 p-3 border rounded-lg"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
          />

          <button
            type="submit"
            className="bg-primary text-white px-6 rounded-lg font-bold"
          >
            {editandoId ? "Atualizar" : "Cadastrar"}
          </button>
        </div>
      </form>

      <div className="flex flex-col gap-4">
        {produtos.map((produto) => (
          <div
            key={produto.id}
            className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold">{produto.nome}</h2>
              <p>R$ {produto.preco.toFixed(2)}</p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => editarProduto(produto)}
                className="text-blue-600 font-semibold"
              >
                Editar
              </button>

              <button
                onClick={() => excluirProduto(produto.id)}
                className="text-red-600 font-semibold"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}