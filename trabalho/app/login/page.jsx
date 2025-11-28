'use client'

import { useState } from 'react'
import Link from 'next/link'
import FormularioAuth from '../../components/FormularioAuth'
import Input from '../../components/Input'
import Button from '../../components/Button'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [mensagemErro, setMensagemErro] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Apenas demonstração - não funcional
    alert('Login realizado! (Apenas demonstração)')
  }

  return (
    <FormularioAuth
      titulo="Entrar"
      subtitulo="Bem-vindo de volta à Pizza Flowers"
      mensagemErro={mensagemErro}
      onSubmit={handleSubmit}
    >
      <Input
        label="E-mail"
        type="email"
        valor={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="seu@email.com"
      />

      <Input
        label="Senha"
        type="password"
        valor={senha}
        onChange={(e) => setSenha(e.target.value)}
        placeholder="Sua senha"
      />

      <Button type="submit" variant="primary" style={{ width: '100%', marginTop: '10px' }}>
        ENTRAR
      </Button>

      <div style={styles.rodape}>
        <p style={styles.textoRodape}>
          Não tem uma conta?{' '}
          <Link href="/cadastro" style={styles.link}>Cadastre-se</Link>
        </p>
        <Link href="/" style={styles.linkVoltar}>← Voltar para o início</Link>
      </div>
    </FormularioAuth>
  )
}

const styles = {
  rodape: {
    textAlign: 'center',
    marginTop: '20px',
  },
  textoRodape: {
    marginBottom: '10px',
    color: '#666',
  },
  link: {
    color: '#f97316',
    fontWeight: 'bold',
    textDecoration: 'none',
  },
  linkVoltar: {
    color: '#999',
    textDecoration: 'none',
    fontSize: '14px',
  },
}