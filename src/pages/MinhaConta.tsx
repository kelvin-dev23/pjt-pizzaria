import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function MinhaConta() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");

  // 🔒 Proteção de rota
  useEffect(() => {
    const authUser = localStorage.getItem("authUser");
    if (!authUser) {
      navigate("/login");
    }
  }, [navigate]);

  // 📦 Carregar dados salvos
  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile");

    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      setNome(profile.nome || "");
      setTelefone(profile.telefone || "");
      setEndereco(profile.endereco || "");
    }
  }, []);

  function salvarDados() {
    const profile = {
      nome,
      telefone,
      endereco,
    };

    localStorage.setItem("userProfile", JSON.stringify(profile));
    alert("Dados atualizados com sucesso!");
  }

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-primary">
        Minha Conta
      </h1>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Seu nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="text"
          placeholder="Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="text"
          placeholder="Endereço"
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <button
          onClick={salvarDados}
          className="w-full bg-secondary text-light py-3 rounded-lg font-bold hover:opacity-90 transition"
        >
          Salvar Alterações
        </button>
      </div>
    </div>
  );
}