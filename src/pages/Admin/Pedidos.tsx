import { useEffect, useState } from "react";

export function Pedidos() {
  const [pedidos, setPedidos] = useState<any[]>([]);

  useEffect(() => {
    const pedidosSalvos = localStorage.getItem("meusPedidos");

    if (pedidosSalvos) {
      setPedidos(JSON.parse(pedidosSalvos));
    }
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Pedidos Recebidos</h1>

      {pedidos.length === 0 ? (
        <p>Nenhum pedido ainda.</p>
      ) : (
        <div className="space-y-4">
          {pedidos.map((pedido) => (
            <div
              key={pedido.id}
              className="bg-white shadow rounded-lg p-4"
            >
              <p className="text-sm text-gray-500">
                {pedido.data}
              </p>

              <p className="font-semibold">
                Tipo: {pedido.tipoEntrega}
              </p>

              <div className="mt-2">
                {pedido.itens.map((item: any, index: number) => (
                  <p key={index}>
                    🍕 {item.nome} x{item.quantidade}
                  </p>
                ))}
              </div>

              <p className="font-bold mt-2">
                Total: R$ {pedido.total.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}