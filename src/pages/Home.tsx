export default function Home() {
  return (
    <div className="bg-light min-h-screen">

      {/* HERO */}
      <section className="bg-primary text-light py-20 text-center px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
          A melhor pizza de Ubarana e região🍕
        </h1>

        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Sabor, qualidade e aquele toque especial que só a Casa da Pizza tem.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-4">
          <a
            href="/cardapio"
            className="bg-secondary text-light px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition"
          >
            Ver Cardápio
          </a>

          <a
            href="https://wa.me/5517992668630?text=Olá%20Casa%20da%20Pizza%2C%20gostaria%20de%20fazer%20um%20pedido!"
            target="_blank"
            className="border-2 border-light px-8 py-4 rounded-xl font-bold text-lg hover:bg-light hover:text-primary transition"
          >
            Falar no WhatsApp
          </a>
        </div>
      </section>

      {/* SOBRE */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-primary mb-6">
          Sobre a Casa da Pizza
        </h2>

        <p className="max-w-3xl mx-auto text-gray-700 text-lg">
          Trabalhamos com ingredientes selecionados, massa artesanal e muito carinho
          em cada pedido. Nosso objetivo é levar até você a melhor experiência em pizza.
        </p>
      </section>

      {/* CHAMADA FINAL */}
      <section className="bg-secondary text-light py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Está com fome? 😋
        </h2>

        <a
          href="/cardapio"
          className="bg-light text-primary px-10 py-4 rounded-xl font-bold text-lg hover:scale-105 transition"
        >
          Peça Agora
        </a>
      </section>

    </div>
  );
}