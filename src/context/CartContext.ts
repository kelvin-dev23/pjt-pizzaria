import { createContext } from "react"
import type { Pizza } from "../types/Pizza"

export interface CartItem extends Pizza {
  quantidade: number
}

export interface CartContextData {
  carrinho: CartItem[]
  adicionarAoCarrinho: (pizza: Pizza) => void
  removerDoCarrinho: (id: number) => void
  alterarQuantidade: (id: number, tipo: "aumentar" | "diminuir") => void
}

export const CartContext = createContext<CartContextData | undefined>(undefined)
