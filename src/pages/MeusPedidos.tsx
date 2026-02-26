import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function MeusPedidos() {
  const [pedidos, setPedidos] = useState<any[]>([]);
  const navigate = useNavigate();

  // 🔒 Proteção de rota
  useEffect(() => {
    const authUser = localStorage.getItem("authUser");
    if (!authUser) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const pedidosSalvos = localStorage.getItem("meusPedidos");

    if (pedidosSalvos) {
      setPedidos(JSON.parse(pedidosSalvos).reverse());
    }
  }, []);

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-primary">
        Meus Pedidos
      </h1>

      {pedidos.length === 0 ? (
        <p>Você ainda não fez nenhum pedido.</p>
      ) : (
        <div className="space-y-6">
          {pedidos.map((pedido) => (
            <div
              key={pedido.id}
              className="bg-white shadow-md p-6 rounded-lg"
            >
              <p className="font-semibold mb-2">
                📅 {pedido.data}
              </p>

              <p className="mb-2">
                🚚 Tipo: {pedido.tipoEntrega}
              </p>

              <ul className="mb-2">
                {pedido.itens.map((item: any, index: number) => (
                  <li key={index}>
                    • {item.nome} x{item.quantidade}
                  </li>
                ))}
              </ul>

              <p className="font-bold">
                💰 Total: R$ {pedido.total.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}