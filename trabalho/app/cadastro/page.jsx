'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Container from '@/components/Container';
import SectionTitle from '@/components/SectionTitle';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { actionCadastrarUsuario } from '../actions';

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleCadastro = async () => {
    await actionCadastrarUsuario({ nome, email, telefone });
    setMensagem('Usuário cadastrado com sucesso!');
    setNome('');
    setEmail('');
    setTelefone('');
    setTimeout(() => setMensagem(''), 3000);
  };

  return (
    <>
      <Navbar />
      
      <section className="featured">
        <Container>
          <SectionTitle>Cadastro de Usuário</SectionTitle>
          
          {mensagem && <div className="status-message show">{mensagem}</div>}
          
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
            <Input 
              label="Telefone" 
              valor={telefone} 
              onChange={setTelefone} 
              placeholder="(51) 99999-9999"
            />
            <Button onClick={handleCadastro}>CADASTRAR</Button>
          </div>
        </Container>
      </section>
      
      <Footer />
    </>
  );
}
