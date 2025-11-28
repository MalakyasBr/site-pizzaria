'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ShoppingCart, User, LogIn, Menu, X, Phone, Mail, MapPin, Instagram, Facebook, MessageCircle } from 'lucide-react'

export default function HomePage() {
  const router = useRouter()
  const [pizzas, setPizzas] = useState([])
  const [user, setUser] = useState(null)
  const [cartCount, setCartCount] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [statusMessage, setStatusMessage] = useState({ show: false, text: '', type: 'success' })



  const fetchPizzas = async () => {
    try {
      const res = await fetch('/api/pizzas')
      const data = await res.json()
      setPizzas(data)
    } catch (error) {
      console.error('Erro ao carregar pizzas:', error)
    }
  }

  const checkUser = () => {
    const savedUser = localStorage.getItem('pizzaFlowersUser')
    if (savedUser) {
      const userData = JSON.parse(savedUser)
      setUser(userData)
      fetchCart(userData.id)
    }
  }

  const fetchCart = async (userId) => {
    try {
      const res = await fetch(`/api/cart/${userId}`)
      const cart = await res.json()
      setCartCount(cart.items?.length || 0)
    } catch (error) {
      console.error('Erro ao carregar carrinho:', error)
    }
  }

  const showStatus = (text, type = 'success') => {
    setStatusMessage({ show: true, text, type })
    setTimeout(() => setStatusMessage({ show: false, text: '', type: 'success' }), 3000)
  }

  const addToCart = async (pizza) => {
    if (!user) {
      showStatus('Faça login para adicionar itens ao carrinho', 'error')
      router.push('/login')
      return
    }

    try {
      const res = await fetch(`/api/cart/${user.id}/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pizzaId: pizza.id, quantidade: 1 })
      })
      const cart = await res.json()
      setCartCount(cart.items?.length || 0)
      showStatus(`${pizza.nome} adicionada ao carrinho!`)
    } catch (error) {
      showStatus('Erro ao adicionar ao carrinho', 'error')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('pizzaFlowersUser')
    setUser(null)
    setCartCount(0)
    showStatus('Logout realizado com sucesso!')
  }

  return (
    <div className="min-h-screen">
      {/* Status Message */}
      {statusMessage.show && (
        <div className={`fixed top-5 right-5 z-50 px-6 py-3 rounded-lg shadow-lg text-white transition-all duration-300 ${
          statusMessage.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`}>
          {statusMessage.text}
        </div>
      )}

      {/* Header */}
      <header className="bg-gradient-to-r from-orange-500 to-orange-400 text-white py-4 sticky top-0 z-40 shadow-lg">
        <nav className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="text-2xl font-bold flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform" onClick={() => router.push('/')}>
            <span className="text-3xl">🌸</span>
            PIZZA FLOWERS
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex gap-6 items-center">
            <li><a href="#home" className="hover:bg-white/20 px-4 py-2 rounded-full transition-all">Início</a></li>
            <li><a href="#menu" className="hover:bg-white/20 px-4 py-2 rounded-full transition-all">Cardápio</a></li>
            <li><a href="#about" className="hover:bg-white/20 px-4 py-2 rounded-full transition-all">Sobre</a></li>
            <li><a href="#contact" className="hover:bg-white/20 px-4 py-2 rounded-full transition-all">Contato</a></li>
          </ul>

          {/* User Actions */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <span className="text-sm">Olá, {user.nome.split(' ')[0]}</span>
                <Button variant="ghost" className="text-white hover:bg-white/20" onClick={() => router.push('/carrinho')}>
                  <ShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="ml-1 bg-white text-orange-500 rounded-full px-2 py-0.5 text-xs font-bold">{cartCount}</span>
                  )}
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-orange-500" onClick={handleLogout}>
                  Sair
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" className="text-white hover:bg-white/20" onClick={() => router.push('/login')}>
                  <LogIn className="w-5 h-5 mr-2" /> Entrar
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-orange-500" onClick={() => router.push('/cadastro')}>
                  <User className="w-5 h-5 mr-2" /> Cadastrar
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-orange-500/95 px-4 py-4 space-y-3">
            <a href="#home" className="block py-2">Início</a>
            <a href="#menu" className="block py-2">Cardápio</a>
            <a href="#about" className="block py-2">Sobre</a>
            <a href="#contact" className="block py-2">Contato</a>
            <hr className="border-white/30" />
            {user ? (
              <>
                <p className="py-2">Olá, {user.nome}</p>
                <Button className="w-full bg-white text-orange-500" onClick={() => router.push('/carrinho')}>
                  Carrinho ({cartCount})
                </Button>
                <Button variant="outline" className="w-full border-white text-white" onClick={handleLogout}>
                  Sair
                </Button>
              </>
            ) : (
              <>
                <Button className="w-full bg-white text-orange-500" onClick={() => router.push('/login')}>
                  Entrar
                </Button>
                <Button variant="outline" className="w-full border-white text-white" onClick={() => router.push('/cadastro')}>
                  Cadastrar
                </Button>
              </>
            )}
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-br from-orange-500 to-orange-400 text-white py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="text-9xl animate-pulse">🌼🌸🌺</div>
        </div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg animate-fade-in">
            FLOWER PIZZAS
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Pizzas especiais em formato de flor que encantam seus olhos e conquistam seu paladar
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-orange-500 hover:bg-orange-100 font-bold px-8 py-6 text-lg rounded-full shadow-xl hover:scale-105 transition-all">
              <a href="#menu">VER CARDÁPIO</a>
            </Button>
            {user && (
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-orange-500 font-bold px-8 py-6 text-lg rounded-full" onClick={() => router.push('/carrinho')}>
                PEDIR AGORA
              </Button>
            )}
          </div>
          <div className="mt-12">
            <div className="w-64 h-64 mx-auto bg-white rounded-full flex items-center justify-center text-8xl shadow-2xl animate-spin-slow">
              🌸🍕
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-orange-500 mb-12 relative">
            Pizzas em Destaque
            <span className="block w-24 h-1 bg-orange-500 mx-auto mt-3"></span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pizzas.map((pizza) => (
              <Card key={pizza.id} className="hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer border-0 shadow-lg">
                <CardHeader className="text-center">
                  <div className="text-6xl mb-4">{pizza.icone}</div>
                  <CardTitle className="text-orange-500 text-xl">{pizza.nome}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-center leading-relaxed">
                    {pizza.descricao}
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                  <p className="text-2xl font-bold text-orange-500">
                    R$ {pizza.preco.toFixed(2).replace('.', ',')}
                  </p>
                  <Button 
                    className="w-full bg-orange-500 hover:bg-orange-600 rounded-full font-bold"
                    onClick={() => addToCart(pizza)}
                  >
                    ADICIONAR AO PEDIDO
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Related Content */}
      <section className="py-16 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-orange-500 mb-12">
            Conteúdos Relacionados
            <span className="block w-24 h-1 bg-orange-500 mx-auto mt-3"></span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🌿', title: 'Ingredientes Orgânicos', desc: 'Saiba mais sobre nossa seleção de ingredientes frescos e orgânicos.' },
              { icon: '👨‍🍳', title: 'Nossos Chefs', desc: 'Conheça os mestres pizzaiolos por trás das nossas criações florais.' },
              { icon: '📍', title: 'Localizações', desc: 'Encontre a unidade Pizza Flowers mais próxima de você.' },
              { icon: '🎉', title: 'Eventos Especiais', desc: 'Pizzas florais para casamentos, aniversários e celebrações.' }
            ].map((item, i) => (
              <Card key={i} className="hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-orange-500 flex items-center gap-2">
                    <span className="text-2xl">{item.icon}</span> {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-16 bg-gradient-to-r from-orange-400 to-orange-500 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Faça Seu Pedido Online</h2>
          <p className="text-lg mb-8 opacity-90">
            Desfrute da comodidade de pedir suas pizzas florais favoritas diretamente pelo nosso site. Entrega rápida e segura!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Button size="lg" className="bg-white text-orange-500 hover:bg-orange-100 font-bold rounded-full px-8" onClick={() => router.push('/carrinho')}>
                IR PARA O CARRINHO
              </Button>
            ) : (
              <Button size="lg" className="bg-white text-orange-500 hover:bg-orange-100 font-bold rounded-full px-8" onClick={() => router.push('/login')}>
                FAZER LOGIN PARA PEDIR
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-orange-500 mb-12">
            Sobre a Pizza Flowers
            <span className="block w-24 h-1 bg-orange-500 mx-auto mt-3"></span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🌱', title: 'Nossa História', desc: 'Nascemos da paixão pela gastronomia e pela arte, criando pizzas que são verdadeiras flores comestíveis.' },
              { icon: '🎨', title: 'Arte Culinária', desc: 'Cada pizza é cuidadosamente moldada para parecer uma flor, combinando sabor e beleza visual única.' },
              { icon: '🌍', title: 'Sustentabilidade', desc: 'Compromisso com ingredientes locais, embalagens eco-friendly e práticas sustentáveis.' },
              { icon: '⭐', title: 'Qualidade Premium', desc: 'Ingredientes selecionados, massa artesanal e preparo sob medida para cada pedido.' }
            ].map((item, i) => (
              <Card key={i} className="text-center hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="text-4xl mb-2">{item.icon}</div>
                  <CardTitle className="text-orange-500">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-orange-500 font-bold text-lg mb-4">Contato</h3>
              <p className="flex items-center gap-2 mb-2"><Phone className="w-4 h-4" /> +55 (51) 3333-4567</p>
              <p className="flex items-center gap-2 mb-2"><Mail className="w-4 h-4" /> contato@pizzaflowers.com</p>
              <p className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Rua das Flores, 123 - Osório/RS</p>
            </div>
            <div>
              <h3 className="text-orange-500 font-bold text-lg mb-4">Horário de Funcionamento</h3>
              <p className="mb-2">Seg - Qui: 17:00 - 23:00</p>
              <p className="mb-2">Sex - Sáb: 17:00 - 00:00</p>
              <p>Dom: 18:00 - 22:00</p>
            </div>
            <div>
              <h3 className="text-orange-500 font-bold text-lg mb-4">Siga-nos</h3>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-600 pt-6 text-center text-gray-400">
            <p>© 2025 Pizza Flowers. Todos os direitos reservados. Desenvolvido com 🌸 em Osório/RS</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
