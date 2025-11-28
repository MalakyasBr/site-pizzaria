'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '../../components/Header'
import ItemCarrinho from '../../components/ItemCarrinho'
import Button from '../../components/Button'

export default function CarrinhoPage() {
  const [usuario] = useState('João Silva') // Apenas demonstração
  const [endereco, setEndereco] = useState('')
  const [mostrarCheckout, setMostrarCheckout] = useState(false)

  // Itens fixos para demonstração
  const itens = [
    { id: 1, nome: 'Pizza Vegetariana Floral', preco: 35.90, icone: '🥬🌸', quantidade: 2 },
    { id: 2, nome: 'Margherita Flor', preco: 32.90, icone: '🍅🌸', quantidade: 1 },
    { id: 3, nome: 'Pepperoni Flower', preco: 38.90, icone: '🍖🌸', quantidade: 1 },
  ]

  const total = itens.reduce((soma, item) => soma + (item.preco * item.quantidade), 0)

  const aoAtualizarQuantidade = (idItem, novaQuantidade) => {
    alert(`Quantidade atualizada! (Apenas demonstração)`)
  }

  const aoRemoverItem = (idItem) => {
    alert(`Item removido! (Apenas demonstração)`)
  }

  const aoFinalizarPedido = () => {
    alert(`Pedido finalizado! (Apenas demonstração)`)
  }

  return (
    <div style={styles.container}>
      <Header usuario={usuario} contagemCarrinho={itens.length} />

      <div style={styles.conteudo}>
        <Link href="/" style={styles.botaoVoltar}>← Voltar ao cardápio</Link>
        
        <h1 style={styles.titulo}>🛒 Seu Carrinho</h1>

        <div style={styles.containerCarrinho}>
          {/* Itens */}
          <div style={styles.secaoItens}>
            {itens.map(item => (
              <ItemCarrinho
                key={item.id}
                item={item}
                aoAtualizarQuantidade={aoAtualizarQuantidade}
                aoRemover={aoRemoverItem}
              />
            ))}
            <Button variant="danger" onClick={() => alert('Carrinho limpo!')}>Limpar Carrinho</Button>
          </div>

          {/* Resumo */}
          <div style={styles.secaoResumo}>
            <div style={styles.cardResumo}>
              <h3 style={styles.tituloResumo}>Resumo do Pedido</h3>
              
              <div style={styles.linhaResumo}>
                <span>Subtotal ({itens.length} itens)</span>
                <span>R$ {total.toFixed(2).replace('.', ',')}</span>
              </div>
              
              <div style={styles.linhaResumo}>
                <span>Entrega</span>
                <span style={{ color: '#22c55e' }}>Grátis</span>
              </div>
              
              <hr style={styles.divisor} />
              
              <div style={{...styles.linhaResumo, fontSize: '20px', fontWeight: 'bold', color: '#f97316'}}>
                <span>Total</span>
                <span>R$ {total.toFixed(2).replace('.', ',')}</span>
              </div>

              {!mostrarCheckout ? (
                <Button 
                  variant="primary" 
                  onClick={() => setMostrarCheckout(true)}
                  style={{ width: '100%', marginTop: '20px' }}
                >
                  💳 Finalizar Pedido
                </Button>
              ) : (
                <div style={styles.formularioCheckout}>
                  <label style={styles.label}>Endereço de Entrega</label>
                  <textarea
                    value={endereco}
                    onChange={(e) => setEndereco(e.target.value)}
                    style={styles.textarea}
                    placeholder="Rua, número, bairro, cidade..."
                    rows={4}
                  />
                  <Button 
                    variant="success" 
                    onClick={aoFinalizarPedido}
                    style={{ width: '100%', marginBottom: '10px' }}
                  >
                    ✓ Confirmar Pedido
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setMostrarCheckout(false)}
                    style={{ width: '100%' }}
                  >
                    Cancelar
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#fff5f0',
  },
  conteudo: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '40px 20px',
  },
  botaoVoltar: {
    color: '#666',
    textDecoration: 'none',
    marginBottom: '20px',
    display: 'inline-block',
  },
  titulo: {
    fontSize: '32px',
    color: '#f97316',
    marginBottom: '30px',
  },
  containerCarrinho: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '30px',
  },
  secaoItens: {
    display: 'flex',
    flexDirection: 'column',
  },
  secaoResumo: {
    position: 'sticky',
    top: '20px',
    height: 'fit-content',
  },
  cardResumo: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '25px',
  },
  tituloResumo: {
    fontSize: '20px',
    color: '#f97316',
    marginBottom: '20px',
  },
  linhaResumo: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '15px',
    color: '#666',
  },
  divisor: {
    border: 'none',
    borderTop: '1px solid #e5e7eb',
    margin: '20px 0',
  },
  formularioCheckout: {
    marginTop: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '10px',
    fontWeight: 'bold',
    color: '#333',
  },
  textarea: {
    width: '100%',
    padding: '12px',
    border: '1px solid #d1d5db',
    borderRadius: '5px',
    fontSize: '14px',
    fontFamily: 'Arial, sans-serif',
    marginBottom: '15px',
    boxSizing: 'border-box',
  },
}