'use client'

import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CardPizza from '../components/CardPizza'
import Logo from '../components/Logo'

export default function HomePage() {
  const [usuario] = useState('João Silva') // Apenas demonstração
  const [contagemCarrinho] = useState(3) // Apenas demonstração

  // Pizzas fixas para demonstração
  const pizzas = [
    { id: 1, nome: 'Pizza Vegetariana Floral', descricao: 'Tomates cherry, rúcula, abobrinha e queijo de cabra', preco: 35.90, icone: '🥬🌸' },
    { id: 2, nome: 'Margherita Flor', descricao: 'Molho de tomate, mussarela e manjericão fresco', preco: 32.90, icone: '🍅🌸' },
    { id: 3, nome: 'Berry Delight Floral', descricao: 'Frutas vermelhas, queijo brie, nozes e mel', preco: 42.90, icone: '🫐🌸' },
    { id: 4, nome: 'Pepperoni Flower', descricao: 'Pepperoni crocante e mussarela derretida', preco: 38.90, icone: '🍖🌸' },
    { id: 5, nome: 'Quattro Formaggi Floral', descricao: 'Gorgonzola, parmesão, mussarela e provolone', preco: 44.90, icone: '🧀🌸' },
    { id: 6, nome: 'Frango Catupiry Flower', descricao: 'Frango desfiado com catupiry, milho e azeitonas', preco: 36.90, icone: '🍗🌸' },
  ]

  const aoAdicionarPizza = (pizza) => {
    alert(`${pizza.nome} adicionada ao carrinho!`)
  }

  return (
    <div style={styles.container}>
      <Header usuario={usuario} contagemCarrinho={contagemCarrinho} />

      {/* Hero */}
      <section style={styles.hero}>
        <div style={styles.heroConteudo}>
          <h1 style={styles.heroTitulo}>FLOWER PIZZAS</h1>
          <p style={styles.heroTexto}>
            Pizzas especiais em formato de flor que encantam seus olhos e conquistam seu paladar
          </p>
          <div style={{ fontSize: '80px', marginTop: '30px' }}>🌸🍕</div>
        </div>
      </section>

      {/* Cardápio */}
      <section style={styles.menu}>
        <div style={styles.menuConteudo}>
          <h2 style={styles.menuTitulo}>Pizzas em Destaque</h2>
          <div style={styles.grade}>
            {pizzas.map(pizza => (
              <CardPizza 
                key={pizza.id} 
                pizza={pizza} 
                aoAdicionar={aoAdicionarPizza}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#fff',
  },
  hero: {
    backgroundColor: '#f97316',
    color: 'white',
    padding: '80px 20px',
    textAlign: 'center',
  },
  heroConteudo: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  heroTitulo: {
    fontSize: '48px',
    marginBottom: '20px',
    marginTop: '20px',
  },
  heroTexto: {
    fontSize: '20px',
    opacity: 0.9,
  },
  menu: {
    padding: '60px 20px',
    backgroundColor: '#fff',
  },
  menuConteudo: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  menuTitulo: {
    fontSize: '36px',
    textAlign: 'center',
    color: '#f97316',
    marginBottom: '50px',
  },
  grade: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
  },
}