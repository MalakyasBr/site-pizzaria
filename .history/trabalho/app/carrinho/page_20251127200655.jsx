'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, ShoppingCart, Plus, Minus, Trash2, CreditCard, CheckCircle } from 'lucide-react'

export default function CarrinhoPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [cart, setCart] = useState({ items: [] })
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [endereco, setEndereco] = useState('')

  useEffect(() => {
    const savedUser = localStorage.getItem('pizzaFlowersUser')
    if (!savedUser) {
      router.push('/login')
      return
    }
    const userData = JSON.parse(savedUser)
    setUser(userData)
    fetchCart(userData.id)
  }, [])

  const fetchCart = async (userId) => {
    try {
      const res = await fetch(`/api/cart/${userId}`)
      const data = await res.json()
      setCart(data)
    } catch (error) {
      console.error('Erro ao carregar carrinho:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateQuantity = async (itemId, newQuantity) => {
    if (!user) return
    setUpdating(true)
    
    try {
      if (newQuantity <= 0) {
        const res = await fetch(`/api/cart/${user.id}/remove`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ itemId })
        })
        const data = await res.json()
        setCart(data)
      } else {
        const res = await fetch(`/api/cart/${user.id}/update`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ itemId, quantidade: newQuantity })
        })
        const data = await res.json()
        setCart(data)
      }
    } catch (error) {
      console.error('Erro ao atualizar carrinho:', error)
    } finally {
      setUpdating(false)
    }
  }

  const removeItem = async (itemId) => {
    await updateQuantity(itemId, 0)
  }

  const clearCart = async () => {
    if (!user) return
    setUpdating(true)
    
    try {
      const res = await fetch(`/api/cart/${user.id}/clear`, {
        method: 'DELETE'
      })
      const data = await res.json()
      setCart(data)
    } catch (error) {
      console.error('Erro ao limpar carrinho:', error)
    } finally {
      setUpdating(false)
    }
  }

  const handleCheckout = async () => {
    if (!endereco.trim()) {
      alert('Por favor, informe o endereço de entrega')
      return
    }

    setUpdating(true)
    
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, endereco })
      })

      const data = await res.json()

      if (res.ok) {
        setOrderSuccess(true)
        setCart({ items: [] })
      } else {
        alert(data.error || 'Erro ao finalizar pedido')
      }
    } catch (error) {
      console.error('Erro ao finalizar pedido:', error)
      alert('Erro ao finalizar pedido')
    } finally {
      setUpdating(false)
    }
  }

  const total = cart.items?.reduce((sum, item) => sum + item.subtotal, 0) || 0

  if (loading) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl animate-bounce">🌸🍕</div>
          <p className="mt-4 text-gray-600">Carregando carrinho...</p>
        </div>
      </div>
    )
  }

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-500 to-orange-400 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center shadow-2xl">
          <CardHeader>
            <div className="text-8xl mb-4">🎉</div>
            <CardTitle className="text-2xl text-green-600 flex items-center justify-center gap-2">
              <CheckCircle className="w-8 h-8" /> Pedido Confirmado!
            </CardTitle>
            <CardDescription className="text-lg mt-4">
              Seu pedido foi realizado com sucesso!
              <br />
              Em breve suas pizzas florais chegarão fresquinhas.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex flex-col gap-4">
            <Button
              className="w-full bg-orange-500 hover:bg-orange-600 font-bold rounded-full py-6"
              onClick={() => router.push('/')}
            >
              Voltar ao Cardápio
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-orange-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-500 to-orange-400 text-white py-4 sticky top-0 z-40 shadow-lg">
        <nav className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="text-2xl font-bold flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
            <span className="text-3xl">🌸</span>
            PIZZA FLOWERS
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm">Olá, {user?.nome?.split(' ')[0]}</span>
          </div>
        </nav>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6 text-gray-600 hover:text-gray-800"
          onClick={() => router.push('/')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Voltar ao cardápio
        </Button>

        <h1 className="text-3xl font-bold text-orange-500 mb-8 flex items-center gap-3">
          <ShoppingCart className="w-8 h-8" /> Seu Carrinho
        </h1>

        {cart.items?.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-6xl mb-4">🛒</div>
              <h2 className="text-2xl font-bold text-gray-600 mb-4">Carrinho vazio</h2>
              <p className="text-gray-500 mb-6">Adicione algumas pizzas florais deliciosas!</p>
              <Button
                className="bg-orange-500 hover:bg-orange-600 rounded-full"
                onClick={() => router.push('/')}
              >
                Ver Cardápio
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-4">
              {cart.items?.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="flex items-center p-4">
                    <div className="text-4xl mr-4">{item.icone}</div>
                    <div className="flex-1">
                      <h3 className="font-bold text-orange-500">{item.nome}</h3>
                      <p className="text-gray-600">R$ {item.preco.toFixed(2).replace('.', ',')}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantidade - 1)}
                        disabled={updating}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-8 text-center font-bold">{item.quantidade}</span>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantidade + 1)}
                        disabled={updating}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="ml-4 text-right">
                      <p className="font-bold text-orange-500">
                        R$ {item.subtotal.toFixed(2).replace('.', ',')}
                      </p>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-500 hover:text-red-700 p-0 h-auto"
                        onClick={() => removeItem(item.id)}
                        disabled={updating}
                      >
                        <Trash2 className="w-4 h-4 mr-1" /> Remover
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}

              <Button
                variant="outline"
                className="w-full text-red-500 border-red-300 hover:bg-red-50"
                onClick={clearCart}
                disabled={updating}
              >
                <Trash2 className="w-4 h-4 mr-2" /> Limpar Carrinho
              </Button>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="text-orange-500">Resumo do Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cart.items?.length} itens)</span>
                    <span>R$ {total.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Entrega</span>
                    <span className="text-green-600">Grátis</span>
                  </div>
                  <hr />
                  <div className="flex justify-between text-xl font-bold text-orange-500">
                    <span>Total</span>
                    <span>R$ {total.toFixed(2).replace('.', ',')}</span>
                  </div>

                  {!showCheckout ? (
                    <Button
                      className="w-full bg-orange-500 hover:bg-orange-600 font-bold rounded-full py-6 mt-4"
                      onClick={() => setShowCheckout(true)}
                    >
                      <CreditCard className="w-5 h-5 mr-2" /> Finalizar Pedido
                    </Button>
                  ) : (
                    <div className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="endereco">Endereço de Entrega</Label>
                        <Textarea
                          id="endereco"
                          placeholder="Rua, número, bairro, cidade..."
                          value={endereco}
                          onChange={(e) => setEndereco(e.target.value)}
                          className="min-h-[100px]"
                        />
                      </div>
                      <Button
                        className="w-full bg-green-600 hover:bg-green-700 font-bold rounded-full py-6"
                        onClick={handleCheckout}
                        disabled={updating}
                      >
                        {updating ? (
                          <span className="flex items-center gap-2">
                            <span className="animate-spin">⏳</span> Processando...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5" /> Confirmar Pedido
                          </span>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setShowCheckout(false)}
                      >
                        Cancelar
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
