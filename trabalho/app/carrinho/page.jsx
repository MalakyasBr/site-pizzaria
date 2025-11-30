'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Container from '@/components/Container';
import SectionTitle from '@/components/SectionTitle';
import CartItem from '@/components/CartItem';
import Button from '@/components/Button';
import { buscarCarrinho, limparCarrinho, removerItemCarrinho } from '@/lib/carrinhoDB';

export default function Carrinho() {
  const [itens, setItens] = useState([]);
  const [carregado, setCarregado] = useState(false);
  const [mensagem, setMensagem] = useState('');

  const carregarCarrinho = () => {
    buscarCarrinho().then((data) => {
      setItens(data);
      setCarregado(true);
    });
  };

  useEffect(() => {
    if (!carregado) {
      carregarCarrinho();
    }
  }, [carregado]);

  const handleLimparTudo = async () => {
    await limparCarrinho();
    setMensagem('Carrinho limpo!');
    setCarregado(false);
    setTimeout(() => setMensagem(''), 2000);
  };

  const handleRemoverItem = async (itemId) => {
    await removerItemCarrinho(itemId);
    setCarregado(false);
  };

  const total = itens.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);

  return (
    <>
      <Navbar />
      <section className="featured">
        <Container>
          <SectionTitle>Seu Carrinho</SectionTitle>

          {mensagem && <div className="status-message show">{mensagem}</div>}

          {itens.length === 0 ? (
            <p className="empty-cart">Seu carrinho está vazio</p>
          ) : (
            <>
              <div className="cart-list">
                {itens.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onRemover={handleRemoverItem}
                  />
                ))}
              </div>

              <div className="cart-total">
                <h3>Total: R$ {total.toFixed(2)}</h3>
                <Button onClick={handleLimparTudo} tipo="secondary">
                  Limpar Carrinho
                </Button>
              </div>
            </>
          )}
        </Container>
      </section>
      <Footer />
    </>
  );
}