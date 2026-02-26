import { useEffect, useState } from "react";

interface Promocao {
  id: number;
  titulo: string;
  descricao: string;
  precoPromocional: number;
}

export function Promocoes() {
  const [promocoes, setPromocoes] = useState<Promocao[]>([]);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");

  useEffect(() => {
    const salvas = JSON.parse(localStorage.getItem("promocoes") || "[]");
    setPromocoes(salvas);
  }, []);

  function salvarPromocao(e: React.FormEvent) {
    e.preventDefault();

    if (!titulo || !descricao || !preco) return;

    const novaPromocao = {
      id: Date.now(),
      titulo,
      descricao,
      precoPromocional: Number(preco),
    };

    const atualizadas = [...promocoes, novaPromocao];

    setPromocoes(atualizadas);
    localStorage.setItem("promocoes", JSON.stringify(atualizadas));

    setTitulo("");
    setDescricao("");
    setPreco("");
  }

  function excluirPromocao(id: number) {
    const atualizadas = promocoes.filter((p) => p.id !== id);
    setPromocoes(atualizadas);
    localStorage.setItem("promocoes", JSON.stringify(atualizadas));
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Promoções</h1>

      <form
        onSubmit={salvarPromocao}
        className="bg-white p-6 rounded-xl shadow mb-8 flex flex-col gap-4"
      >
        <input
          type="text"
          placeholder="Título da promoção"
          className="p-3 border rounded-lg"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />

        <textarea
          placeholder="Descrição"
          className="p-3 border rounded-lg"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />

        <input
          type="number"
          placeholder="Preço promocional"
          className="p-3 border rounded-lg"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
        />

        <button
          type="submit"
          className="bg-primary text-white py-3 rounded-lg font-bold"
        >
          Criar Promoção
        </button>
      </form>

      <div className="flex flex-col gap-4">
        {promocoes.map((promo) => (
          <div
            key={promo.id}
            className="bg-white p-4 rounded-xl shadow flex justify-between"
          >
            <div>
              <h2 className="font-bold">{promo.titulo}</h2>
              <p>{promo.descricao}</p>
              <p className="font-semibold mt-2">
                R$ {promo.precoPromocional.toFixed(2)}
              </p>
            </div>

            <button
              onClick={() => excluirPromocao(promo.id)}
              className="text-red-600 font-bold"
            >
              Excluir
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}