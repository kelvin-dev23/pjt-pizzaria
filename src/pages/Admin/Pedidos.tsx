import { useEffect, useState } from "react";

type StatusPedido = "novo" | "preparando" | "saiu" | "entregue";

type Pedido = {
  id: number;
  data: string;
  itens: { nome: string; quantidade: number }[];
  total: number;
  tipoEntrega: "delivery" | "retirada";
  status?: StatusPedido;
};

export function Pedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  useEffect(() => {
    const pedidosSalvos = localStorage.getItem("meusPedidos");
    if (pedidosSalvos) {
      const lista = JSON.parse(pedidosSalvos) as Pedido[];

      // garante status padrão
      const comStatus = lista.map((p) => ({
        ...p,
        status: p.status ?? "novo",
      }));

      setPedidos(comStatus);
    }
  }, []);

  function salvarPedidos(lista: Pedido[]) {
    setPedidos(lista);
    localStorage.setItem("meusPedidos", JSON.stringify(lista));
  }

  function alterarStatus(id: number, status: StatusPedido) {
    const atualizados = pedidos.map((p) =>
      p.id === id ? { ...p, status } : p
    );
    salvarPedidos(atualizados);
  }

  function limparHistorico() {
    if (confirm("Tem certeza que deseja limpar todos os pedidos?")) {
      localStorage.removeItem("meusPedidos");
      setPedidos([]);
    }
  }

  const faturamento = pedidos.reduce((acc, p) => acc + (p.total || 0), 0);

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold">Pedidos</h1>

        <div className="flex items-center gap-4">
          <span className="font-semibold">
            Faturamento: R$ {faturamento.toFixed(2)}
          </span>

          <button
            onClick={limparHistorico}
            className="bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Limpar pedidos
          </button>
        </div>
      </div>

      {pedidos.length === 0 ? (
        <p>Nenhum pedido recebido ainda.</p>
      ) : (
        <div className="space-y-4">
          {pedidos.map((pedido) => (
            <div
              key={pedido.id}
              className="bg-white shadow rounded-lg p-4 flex flex-col gap-3"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <p className="text-sm text-gray-500">{pedido.data}</p>

                <span className="font-semibold">
                  Tipo: {pedido.tipoEntrega}
                </span>
              </div>

              <div>
                <p className="font-semibold">Itens:</p>

                {pedido.itens.map((item, index) => (
                  <p key={index}>
                    🍕 {item.nome} x{item.quantidade}
                  </p>
                ))}
              </div>

              <p className="font-bold">
                Total: R$ {pedido.total.toFixed(2)}
              </p>

              <div className="flex flex-wrap gap-2 mt-2">
                <button
                  onClick={() => alterarStatus(pedido.id, "preparando")}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Preparando
                </button>

                <button
                  onClick={() => alterarStatus(pedido.id, "saiu")}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Saiu
                </button>

                <button
                  onClick={() => alterarStatus(pedido.id, "entregue")}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Entregue
                </button>
              </div>

              <p className="text-sm mt-2">
                Status:{" "}
                <span className="font-semibold capitalize">
                  {pedido.status}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}