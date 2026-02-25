import { useState } from "react";
import { CartContext } from "./CartContext";
import type { Pizza } from "../types/Pizza";
import type { CartItem } from "./CartContext";
import { useEffect } from "react";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [carrinho, setCarrinho] = useState<CartItem[]>(() => {
    const carrinhoSalvo = localStorage.getItem("carrinho");

    if (carrinhoSalvo) {
      return JSON.parse(carrinhoSalvo);
    }

    return [];
  });
  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }, [carrinho]);

  function removerDoCarrinho(id: number) {
    setCarrinho((prev) => prev.filter((item) => item.id !== id));
  }
  function alterarQuantidade(id: number, tipo: "aumentar" | "diminuir") {
    setCarrinho((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            if (tipo === "aumentar") {
              return { ...item, quantidade: item.quantidade + 1 };
            }

            if (tipo === "diminuir") {
              return { ...item, quantidade: item.quantidade - 1 };
            }
          }

          return item;
        })
        .filter((item) => item.quantidade > 0),
    );
  }

  function adicionarAoCarrinho(pizza: Pizza) {
    setCarrinho((prev) => {
      const itemExistente = prev.find((item) => item.id === pizza.id);

      if (itemExistente) {
        return prev.map((item) =>
          item.id === pizza.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item,
        );
      }

      return [...prev, { ...pizza, quantidade: 1 }];
    });
  }

  return (
    <CartContext.Provider
      value={{
        carrinho,
        adicionarAoCarrinho,
        removerDoCarrinho,
        alterarQuantidade,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
