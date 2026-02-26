import { useState } from "react";
import { useCart } from "../context/useCart";

export function Carrinho() {
  const { carrinho, removerDoCarrinho, alterarQuantidade, limparCarrinho } =
    useCart();
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [tipoEntrega, setTipoEntrega] = useState<"delivery" | "retirada">(
    "delivery",
  );
  function gerarMensagem() {
    let mensagem = "🍕 *Novo Pedido* 🍕\n\n";

    mensagem += `👤 *Cliente:* ${nome}\n`;
    mensagem += `📞 *Telefone:* ${telefone}\n`;
    mensagem += `🛵 *Tipo:* ${tipoEntrega}\n`;

    if (tipoEntrega === "delivery") {
      mensagem += `📍 *Endereço:* ${endereco}\n`;
    }

    mensagem += "\n📦 *Itens do Pedido:*\n\n";

    carrinho.forEach((item) => {
      mensagem += `• ${item.nome} x${item.quantidade}\n`;

      if (item.observacao) {
        mensagem += `   📝 Obs: ${item.observacao}\n`;
      }

      mensagem += "\n";
    });

    const total = carrinho.reduce(
      (acc, item) => acc + item.preco * item.quantidade,
      0,
    );

    mensagem += `💰 *Total: R$ ${total.toFixed(2)}*`;

    return encodeURIComponent(mensagem);
  }
  const numeroPizzaria = "5517992668630";

  function enviarWhatsApp() {
    if (!estaAberto()) {
      alert("Estamos fechados no momento. Funcionamos das 19h às 23h.");
      return;
    }

    if (!nome || !telefone) {
      alert("Por favor, preencha nome e telefone.");
      return;
    }

    if (tipoEntrega === "delivery" && !endereco) {
      alert("Por favor, informe o endereço para delivery.");
      return;
    }

    const mensagem = gerarMensagem();
    const url = `https://wa.me/${numeroPizzaria}?text=${mensagem}`;

    window.open(url, "_blank");
    limparCarrinho();
  }

  const total = carrinho.reduce((acc, item) => {
    return acc + item.preco * item.quantidade;
  }, 0);

  function estaAberto() {
    const agora = new Date();

    const diaSemana = agora.getDay();

    const hora = agora.getHours();

    const diasFuncionamento = [0, 4, 5, 6]; // Dom, Qui, Sex, Sab
    const horaAbertura = 19;
    const horaFechamento = 23;

    const diaValido = diasFuncionamento.includes(diaSemana);
    const horarioValido = hora >= horaAbertura && hora < horaFechamento;

    return diaValido && horarioValido;
  }
  if (!estaAberto()) {
    alert(
      "Estamos fechados no momento.\nFuncionamos de Quinta a Domingo, das 19h às 23h.",
    );
    return;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Seu Carrinho</h1>

      {carrinho.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          <div className="space-y-4">
            {carrinho.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="flex justify-between items-center bg-white p-4 shadow rounded-lg"
              >
                <div>
                  <h2 className="font-bold">{item.nome}</h2>

                  {item.observacao && (
                    <p className="text-sm text-gray-500">
                      Obs: {item.observacao}
                    </p>
                  )}

                  <p className="text-sm text-gray-600">
                    Quantidade: {item.quantidade}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => alterarQuantidade(item.id, "diminuir")}
                    className="bg-gray-200 px-2 rounded"
                  >
                    -
                  </button>

                  <span>{item.quantidade}</span>

                  <button
                    onClick={() => alterarQuantidade(item.id, "aumentar")}
                    className="bg-gray-200 px-2 rounded"
                  >
                    +
                  </button>
                </div>

                <span className="font-semibold">
                  R$ {(item.preco * item.quantidade).toFixed(2)}
                </span>

                <button
                  onClick={() => removerDoCarrinho(item.id)}
                  className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                >
                  Remover
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 text-right">
            <h2 className="text-xl font-bold">Total: R$ {total.toFixed(2)}</h2>
            <div className="mt-6 space-y-4">
              <input
                type="text"
                placeholder="Seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full border p-2 rounded"
              />

              <input
                type="text"
                placeholder="Telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                className="w-full border p-2 rounded"
              />

              <select
                value={tipoEntrega}
                onChange={(e) =>
                  setTipoEntrega(e.target.value as "delivery" | "retirada")
                }
                className="w-full border p-2 rounded"
              >
                <option value="delivery">Delivery</option>
                <option value="retirada">Retirada no local</option>
              </select>

              {tipoEntrega === "delivery" && (
                <input
                  type="text"
                  placeholder="Endereço completo"
                  value={endereco}
                  onChange={(e) => setEndereco(e.target.value)}
                  className="w-full border p-2 rounded"
                />
              )}
            </div>
            <button
              onClick={enviarWhatsApp}
              disabled={!estaAberto()}
              className={`mt-4 w-full py-3 rounded-lg transition ${
                estaAberto()
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-gray-400 text-white cursor-not-allowed"
              }`}
            >
              {estaAberto()
                ? "Finalizar Pedido no WhatsApp"
                : "Estamos Fechados no Momento"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
