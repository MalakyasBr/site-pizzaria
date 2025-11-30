'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Container from '@/components/Container';
import SectionTitle from '@/components/SectionTitle';
import Input from '@/components/Input';
import Button from '@/components/Button';

export default function Contato() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleEnviarMensagem = () => {
    // Simulação de envio para demonstração
    console.log({ nome, email, mensagem });
    setEnviado(true);
    setNome('');
    setEmail('');
    setMensagem('');
    setTimeout(() => setEnviado(false), 3000);
  };

  return (
    <>
      <Navbar />
      <section className="featured">
        <Container>
          <SectionTitle>Entre em Contato</SectionTitle>

          {enviado && (
            <div className="status-message show">
              Mensagem enviada com sucesso! (Demonstração)
            </div>
          )}

          <div className="form-container">
            <Input
              label="Nome"
              valor={nome}
              onChange={setNome}
              placeholder="Seu nome"
            />
            <Input
              label="Email"
              tipo="email"
              valor={email}
              onChange={setEmail}
              placeholder="seu@email.com"
            />
            <div className="input-group">
              <label>Mensagem</label>
              <textarea
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                placeholder="Sua mensagem..."
                rows="5"
                className="input-field"
              />
            </div>
            <Button onClick={handleEnviarMensagem}>ENVIAR MENSAGEM</Button>
          </div>
        </Container>
      </section>
      <Footer />
    </>
  );
}