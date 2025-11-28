'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Container from '@/components/Container';
import SectionTitle from '@/components/SectionTitle';
import PizzaCard from '@/components/PizzaCard';
import { buscarPizzas, actionAdicionarCarrinho } from './actions';

export default function Home() {
  const [pizzas, setPizzas] = useState([]);
  const [carregado, setCarregado] = useState(false);
  const [mensagem, setMensagem] = useState('');

  if (!carregado) {
    buscarPizzas().then((data) => {
      setPizzas(data);
      setCarregado(true);
    });
  }

  const adicionarAoCarrinho = async (pizza) => {
    await actionAdicionarCarrinho(pizza);
    setMensagem(`${pizza.nome} adicionada ao carrinho!`);
    setTimeout(() => setMensagem(''), 3000);
  };

  return (
    <>
      <Navbar />
      <Hero 
        titulo="FLOWER PIZZAS" 
        subtitulo="Pizzas especiais em formato de flor"
      />
      
      {mensagem && <div className="status-message show">{mensagem}</div>}
      
      <section className="featured">
        <Container>
          <SectionTitle>Nosso Cardápio</SectionTitle>
          <div className="pizza-grid">
            {pizzas.map((pizza) => (
              <PizzaCard 
                key={pizza.id} 
                pizza={pizza} 
                onAdicionar={adicionarAoCarrinho}
              />
            ))}
          </div>
        </Container>
      </section>
      
      <Footer />
    </>
  );
}
