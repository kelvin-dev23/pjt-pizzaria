import { useEffect, useState } from "react";

export function Dashboard() {
  const [totalPedidos, setTotalPedidos] = useState(0);
  const [totalVendas, setTotalVendas] = useState(0);
  const [totalProdutos, setTotalProdutos] = useState(0);
  const [totalPromocoes, setTotalPromocoes] = useState(0);

  useEffect(() => {
    const pedidos = JSON.parse(localStorage.getItem("pedidos") || "[]");
    const produtos = JSON.parse(localStorage.getItem("produtos") || "[]");
    const promocoes = JSON.parse(localStorage.getItem("promocoes") || "[]");

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
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Pedidos</h2>
          <p className="text-3xl font-bold mt-2">{totalPedidos}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Total em Vendas</h2>
          <p className="text-3xl font-bold mt-2">
            R$ {totalVendas.toFixed(2)}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Produtos</h2>
          <p className="text-3xl font-bold mt-2">{totalProdutos}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Promoções</h2>
          <p className="text-3xl font-bold mt-2">{totalPromocoes}</p>
        </div>

      </div>
    </div>
  );
}