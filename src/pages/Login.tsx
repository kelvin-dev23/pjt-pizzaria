import { useState } from "react"
import { AuthUser } from "../types/AuthUser"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const navigate = useNavigate()

  const [user, setUser] = useState<AuthUser>({
    email: "",
    senha: ""
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    localStorage.setItem("authUser", JSON.stringify(user))

    alert("Login realizado com sucesso!")

    navigate("/") // volta para home
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary text-light">
      <form 
        onSubmit={handleSubmit}
        className="bg-light text-black p-6 rounded-xl shadow-lg w-80 space-y-4"
      >
        <h2 className="text-xl font-bold text-center">
          Entrar ou Cadastrar
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Seu email"
          value={user.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="password"
          name="senha"
          placeholder="Senha"
          value={user.senha}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <button 
          type="submit"
          className="w-full bg-secondary text-light py-2 rounded-lg font-bold"
        >
          Entrar
        </button>
      </form>
    </div>
  )
}