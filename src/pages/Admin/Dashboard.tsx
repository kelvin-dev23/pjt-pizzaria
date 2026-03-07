import { useEffect, useState } from "react";

export function Dashboard() {
  const [totalPedidos, setTotalPedidos] = useState(0);
  const [totalVendas, setTotalVendas] = useState(0);
  const [totalProdutos, setTotalProdutos] = useState(0);
  const [totalPromocoes, setTotalPromocoes] = useState(0);
  const [pedidosRecentes, setPedidosRecentes] = useState<any[]>([]);

  useEffect(() => {
    const pedidos = JSON.parse(localStorage.getItem("pedidos") || "[]");
    const produtos = JSON.parse(localStorage.getItem("produtos") || "[]");
    const promocoes = JSON.parse(localStorage.getItem("promocoes") || "[]");
    const ultimosPedidos = pedidos.slice(-5).reverse();
setPedidosRecentes(ultimosPedidos);
    

    setTotalPedidos(pedidos.length);

    const somaVendas = pedidos.reduce(
      (acc: number, pedido: any) => acc + (pedido.total || 0),
      0
    );

    setTotalVendas(somaVendas);
    setTotalProdutos(produtos.length);
    setTotalPromocoes(promocoes.length);
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-10">📊 Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="mt-12 bg-white p-6 rounded-2xl shadow-lg">
  <h2 className="text-2xl font-bold mb-6">Pedidos Recentes</h2>

  {pedidosRecentes.length === 0 ? (
    <p className="text-gray-500">Nenhum pedido ainda.</p>
  ) : (
    <div className="space-y-4">
      {pedidosRecentes.map((pedido, index) => (
        <div
          key={index}
          className="flex justify-between items-center border-b pb-2"
        >
          <div>
            <p className="font-semibold">Pedido #{index + 1}</p>
            <p className="text-sm text-gray-500">
              {pedido.cliente || "Cliente"}
            </p>
          </div>

          <div className="text-right">
            <p className="font-bold">R$ {pedido.total?.toFixed(2)}</p>
            <p className="text-sm text-gray-500">{pedido.status}</p>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

        {/* PEDIDOS */}
        <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-lg font-medium opacity-80">Pedidos</h2>
          <p className="text-4xl font-bold mt-2">{totalPedidos}</p>
        </div>

        {/* VENDAS */}
        <div className="bg-green-600 text-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-lg font-medium opacity-80">Faturamento</h2>
          <p className="text-4xl font-bold mt-2">
            R$ {totalVendas.toFixed(2)}
          </p>
        </div>

        {/* PRODUTOS */}
        <div className="bg-purple-600 text-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-lg font-medium opacity-80">Produtos</h2>
          <p className="text-4xl font-bold mt-2">{totalProdutos}</p>
        </div>

        {/* PROMOÇÕES */}
        <div className="bg-orange-500 text-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-lg font-medium opacity-80">Promoções</h2>
          <p className="text-4xl font-bold mt-2">{totalPromocoes}</p>
        </div>

      </div>
    </div>
  );
}