'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, UserPlus, Eye, EyeOff } from 'lucide-react'

export default function CadastroPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    nome: '',
    idade: '',
    cpf: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const formatCPF = (value) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 3) return numbers
    if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`
    if (numbers.length <= 9) return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`
    return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`
  }

  const handleChange = (e) => {
    let { name, value } = e.target
    
    if (name === 'cpf') {
      value = formatCPF(value)
    }
    
    if (name === 'idade') {
      value = value.replace(/\D/g, '')
    }
    
    setFormData({ ...formData, [name]: value })
    setError('')
  }

  const validateForm = () => {
    if (!formData.nome.trim()) {
      setError('Nome é obrigatório')
      return false
    }
    if (!formData.idade || parseInt(formData.idade) < 1 || parseInt(formData.idade) > 120) {
      setError('Idade inválida')
      return false
    }
    if (formData.cpf.replace(/\D/g, '').length !== 11) {
      setError('CPF deve ter 11 dígitos')
      return false
    }
    if (!formData.email.includes('@')) {
      setError('E-mail inválido')
      return false
    }
    if (formData.senha.length < 6) {
      setError('Senha deve ter pelo menos 6 caracteres')
      return false
    }
    if (formData.senha !== formData.confirmarSenha) {
      setError('As senhas não coincidem')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: formData.nome,
          idade: formData.idade,
          cpf: formData.cpf,
          email: formData.email,
          senha: formData.senha
        })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Erro ao criar conta')
      }

      localStorage.setItem('pizzaFlowersUser', JSON.stringify(data.user))
      router.push('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 to-orange-400 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="text-6xl cursor-pointer hover:scale-110 transition-transform" onClick={() => router.push('/')}>
              🌸🍕
            </div>
          </div>
          <CardTitle className="text-2xl text-orange-500">Crie sua conta</CardTitle>
          <CardDescription>Junte-se à família Pizza Flowers</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="nome">Nome Completo</Label>
              <Input
                id="nome"
                name="nome"
                type="text"
                placeholder="Seu nome completo"
                value={formData.nome}
                onChange={handleChange}
                required
                className="focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="idade">Idade</Label>
                <Input
                  id="idade"
                  name="idade"
                  type="text"
                  placeholder="Sua idade"
                  value={formData.idade}
                  onChange={handleChange}
                  maxLength={3}
                  required
                  className="focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  id="cpf"
                  name="cpf"
                  type="text"
                  placeholder="000.000.000-00"
                  value={formData.cpf}
                  onChange={handleChange}
                  maxLength={14}
                  required
                  className="focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="senha">Senha</Label>
              <div className="relative">
                <Input
                  id="senha"
                  name="senha"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Mínimo 6 caracteres"
                  value={formData.senha}
                  onChange={handleChange}
                  required
                  className="focus:ring-orange-500 focus:border-orange-500 pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmarSenha">Confirmar Senha</Label>
              <Input
                id="confirmarSenha"
                name="confirmarSenha"
                type={showPassword ? 'text' : 'password'}
                placeholder="Repita a senha"
                value={formData.confirmarSenha}
                onChange={handleChange}
                required
                className="focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 font-bold rounded-full py-6"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin">⏳</span> Criando conta...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <UserPlus className="w-5 h-5" /> Criar Conta
                </span>
              )}
            </Button>
            
            <div className="text-center text-sm text-gray-600">
              Já tem uma conta?{' '}
              <button
                type="button"
                className="text-orange-500 hover:underline font-semibold"
                onClick={() => router.push('/login')}
              >
                Faça login
              </button>
            </div>

            <Button
              type="button"
              variant="ghost"
              className="text-gray-500 hover:text-gray-700"
              onClick={() => router.push('/')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para o início
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
