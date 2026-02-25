import type { Pizza } from "../types/Pizza";

export const pizzas: Pizza[] = [
  {
    id: 1,
    nome: "Margherita",
    descricao: "Molho de tomate, mussarela e manjericão",
    preco: 39.9,
    imagem: "https://via.placeholder.com/300",
    categoria: "Tradicional",
  },
  {
    id: 2,
    nome: "Calabresa",
    descricao: "Molho de tomate, mussarela e calabresa",
    preco: 42.9,
    imagem: "https://via.placeholder.com/300",
    categoria: "Tradicional",
  },
  {
    id: 3,
    nome: "Chocolate",
    descricao: "Chocolate ao leite e morango",
    preco: 45.9,
    imagem: "https://via.placeholder.com/300",
    categoria: "Doce",
  },
];
