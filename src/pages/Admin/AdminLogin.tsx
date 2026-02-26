import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    // login fixo temporário
    if (email === "admin@pizzaria.com" && senha === "123456") {
      localStorage.setItem("adminAuth", "true");
      navigate("/admin");
    } else {
      alert("Credenciais inválidas");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-light">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          Login Admin
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 border rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="w-full mb-6 p-3 border rounded-lg"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-primary text-white py-3 rounded-lg font-bold"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}