'use client'

import { useState } from 'react'
import Link from 'next/link'
import FormularioAuth from '../../components/FormularioAuth'
import Input from '../../components/Input'
import Button from '../../components/Button'

export default function CadastroPage() {
  const [nome, setNome] = useState('')
  const [idade, setIdade] = useState('')
  const [cpf, setCpf] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [mensagemErro, setMensagemErro] = useState('')

  const formatarCPF = (valor) => {
    const numeros = valor.replace(/\D/g, '')
    if (numeros.length <= 3) return numeros
    if (numeros.length <= 6) return `${numeros.slice(0, 3)}.${numeros.slice(3)}`
    if (numeros.length <= 9) return `${numeros.slice(0, 3)}.${numeros.slice(3, 6)}.${numeros.slice(6)}`
    return `${numeros.slice(0, 3)}.${numeros.slice(3, 6)}.${numeros.slice(6, 9)}-${numeros.slice(9, 11)}`
  }

  const handleCpfChange = (e) => {
    const formatado = formatarCPF(e.target.value)
    setCpf(formatado)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Apenas demonstração - não funcional
    alert('Cadastro realizado! (Apenas demonstração)')
  }

  return (
    <FormularioAuth
      titulo="Crie sua conta"
      subtitulo="Junte-se à família Pizza Flowers"
      mensagemErro={mensagemErro}
      onSubmit={handleSubmit}
    >
      <Input
        label="Nome Completo"
        valor={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Seu nome completo"
      />

      <div style={styles.linha}>
        <div style={{ flex: 1 }}>
          <Input
            label="Idade"
            type="number"
            valor={idade}
            onChange={(e) => setIdade(e.target.value)}
            placeholder="Sua idade"
          />
        </div>
        <div style={{ flex: 1, marginLeft: '10px' }}>
          <Input
            label="CPF"
            valor={cpf}
            onChange={handleCpfChange}
            placeholder="000.000.000-00"
            maxLength={14}
          />
        </div>
      </div>

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
        placeholder="Mínimo 6 caracteres"
      />

      <Input
        label="Confirmar Senha"
        type="password"
        valor={confirmarSenha}
        onChange={(e) => setConfirmarSenha(e.target.value)}
        placeholder="Repita a senha"
      />

      <Button type="submit" variant="primary" style={{ width: '100%', marginTop: '10px' }}>
        CRIAR CONTA
      </Button>

      <div style={styles.rodape}>
        <p style={styles.textoRodape}>
          Já tem uma conta?{' '}
          <Link href="/login" style={styles.link}>Faça login</Link>
        </p>
        <Link href="/" style={styles.linkVoltar}>← Voltar para o início</Link>
      </div>
    </FormularioAuth>
  )
}

const styles = {
  linha: {
    display: 'flex',
    gap: '10px',
  },
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