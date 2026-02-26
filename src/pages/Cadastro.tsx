import { useState, useEffect } from "react"
import { User } from "../types/User"

export default function Login() {
  const [user, setUser] = useState<User>({
    nome: "",
    telefone: "",
    endereco: "",
    complemento: ""
  })

  // Quando a página abrir, verificar se já existe usuário salvo
  useEffect(() => {
    const savedUser = localStorage.getItem("user")

    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    localStorage.setItem("user", JSON.stringify(user))

    alert("Dados salvos com sucesso!")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary text-light">
      <form 
        onSubmit={handleSubmit}
        className="bg-light text-black p-6 rounded-xl shadow-lg w-80 space-y-4"
      >
        <h2 className="text-xl font-bold text-center">
          Seus Dados
        </h2>

        <input
          type="text"
          name="nome"
          placeholder="Seu nome"
          value={user.nome}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="telefone"
          placeholder="Telefone"
          value={user.telefone}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="endereco"
          placeholder="Endereço"
          value={user.endereco}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="complemento"
          placeholder="Complemento"
          value={user.complemento}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <button 
          type="submit"
          className="w-full bg-secondary text-light py-2 rounded-lg font-bold"
        >
          Salvar
        </button>
      </form>
    </div>
  )
}