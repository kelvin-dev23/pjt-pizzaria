import { pizzas } from "../data/pizzas"
import  { PizzaCard } from "../components/PizzaCards"

export function Cardapio() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Nosso Cardápio</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pizzas.map((pizza) => (
          <PizzaCard key={pizza.id} pizza={pizza} />
        ))}
      </div>
    </div>
  )
}