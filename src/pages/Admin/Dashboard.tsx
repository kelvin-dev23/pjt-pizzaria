import { useEffect, useState } from "react";

type Item = {
  nome: string;
  quantidade: number;
};

type Pedido = {
  id: number;
  data: string;
  itens: Item[];
  total: number;
};

export function Dashboard() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  useEffect(() => {
    const pedidosSalvos = localStorage.getItem("meusPedidos");

    if (pedidosSalvos) {
      setPedidos(JSON.parse(pedidosSalvos));
    }
  }, []);

  const totalPedidos = pedidos.length;

  const faturamento = pedidos.reduce((acc, pedido) => {
    return acc + (pedido.total || 0);
  }, 0);

  // calcular pizza mais vendida
  const contador: Record<string, number> = {};

  pedidos.forEach((pedido) => {
    pedido.itens.forEach((item) => {
      contador[item.nome] =
        (contador[item.nome] || 0) + item.quantidade;
    });
  });

  let pizzaMaisVendida = "Nenhuma";

  if (Object.keys(contador).length > 0) {
    pizzaMaisVendida = Object.entries(contador).sort(
      (a, b) => b[1] - a[1]
    )[0][0];
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold">
            Pedidos recebidos
          </h2>
          <p className="text-3xl font-bold mt-2">
            {totalPedidos}
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold">
            Faturamento
          </h2>
          <p className="text-3xl font-bold mt-2">
            R$ {faturamento.toFixed(2)}
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold">
            Pizza mais vendida
          </h2>
          <p className="text-xl font-bold mt-2">
            🍕 {pizzaMaisVendida}
          </p>
        </div>
      </div>
    </div>
  );
}