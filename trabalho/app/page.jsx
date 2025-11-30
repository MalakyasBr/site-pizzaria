'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Container from '@/components/Container';
import SectionTitle from '@/components/SectionTitle';
import PizzaCard from '@/components/PizzaCard';
import { buscarPizzas } from '@/lib/pizzaDB';
import { adicionarAoCarrinho } from '@/lib/carrinhoDB';

export default function Home() {
  const [pizzas, setPizzas] = useState([]);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    if (!carregado) {
      buscarPizzas().then((data) => {
        setPizzas(data);
        setCarregado(true);
      });
    }
  }, [carregado]);

  const handleAdicionarAoCarrinho = async (pizza) => {
    const sucesso = await adicionarAoCarrinho(pizza);
    if (sucesso) {
      alert(`${pizza.nome} adicionada ao carrinho!`);
    } else {
      alert('Erro ao adicionar ao carrinho');
    }
  };

  return (
    <>
      <Navbar />
      <Hero
        titulo="FLOWER PIZZAS"
        subtitulo="Pizzas especiais em formato de flor"
      />
      
      <section className="featured">
        <Container>
          <SectionTitle>Nosso Cardápio</SectionTitle>
          <div className="pizza-grid">
            {pizzas.map((pizza) => (
              <PizzaCard
                key={pizza.id}
                pizza={pizza}
                onAdicionar={() => handleAdicionarAoCarrinho(pizza)}
              />
            ))}
          </div>
        </Container>
      </section>
      <Footer />
    </>
  );
}