import { useState } from "react"
import { CartContext } from "./CartContext"
import type { Pizza } from "../types/Pizza"
import type { CartItem } from "./CartContext"

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [carrinho, setCarrinho] = useState<CartItem[]>([])
  
  function removerDoCarrinho(id: number) {
  setCarrinho((prev) => prev.filter((item) => item.id !== id))
}

  function adicionarAoCarrinho(pizza: Pizza) {
    setCarrinho((prev) => {
      const itemExistente = prev.find((item) => item.id === pizza.id)

      if (itemExistente) {
        return prev.map((item) =>
          item.id === pizza.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        )
      }

      return [...prev, { ...pizza, quantidade: 1 }]
    })
  }

  return (
    <CartContext.Provider value={{ carrinho, adicionarAoCarrinho, removerDoCarrinho }}>
      {children}
    </CartContext.Provider>
  )
  
}
