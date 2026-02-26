import { useEffect, useState } from "react";

interface Pedido {
  id: number;
  nome: string;
  endereco: string;
  telefone: string;
  total: number;
  status: string;
}

export function Pedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  useEffect(() => {
    const pedidosSalvos = JSON.parse(localStorage.getItem("pedidos") || "[]");
    setPedidos(pedidosSalvos);
  }, []);

  function atualizarStatus(id: number, novoStatus: string) {
    const pedidosAtualizados = pedidos.map((pedido) =>
      pedido.id === id ? { ...pedido, status: novoStatus } : pedido,
    );

    setPedidos(pedidosAtualizados);
    localStorage.setItem("pedidos", JSON.stringify(pedidosAtualizados));
  }
  function getStatusStyle(status: string) {
    switch (status) {
      case "Pendente":
        return "bg-yellow-100 text-yellow-800";
      case "Em preparo":
        return "bg-blue-100 text-blue-800";
      case "Saiu para entrega":
        return "bg-purple-100 text-purple-800";
      case "Entregue":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Pedidos</h1>

      {pedidos.length === 0 && <p>Nenhum pedido encontrado.</p>}

      <div className="flex flex-col gap-6">
        {pedidos.map((pedido) => (
          <div key={pedido.id} className="bg-white p-6 rounded-xl shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg">Pedido #{pedido.id}</h2>
              <span className="font-semibold">
                R$ {pedido.total.toFixed(2)}
              </span>
            </div>

            <p>
              <strong>Cliente:</strong> {pedido.nome}
            </p>
            <p>
              <strong>Endereço:</strong> {pedido.endereco}
            </p>
            <p>
              <strong>Telefone:</strong> {pedido.telefone}
            </p>

            <div className="mt-4 flex items-center gap-4">
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusStyle(
                  pedido.status,
                )}`}
              >
                {pedido.status}
              </span>

              <select
                value={pedido.status}
                onChange={(e) => atualizarStatus(pedido.id, e.target.value)}
                className="p-2 border rounded-lg"
              >
                <option value="Pendente">Pendente</option>
                <option value="Em preparo">Em preparo</option>
                <option value="Saiu para entrega">Saiu para entrega</option>
                <option value="Entregue">Entregue</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
