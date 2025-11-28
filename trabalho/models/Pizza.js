import { obterBancoDeDados } from '../lib/mongodb'

const COLECAO = 'pizzas'

// Pizzas padrão do sistema
const pizzasPadrao = [
  {
    id: 'pizza-vegetariana',
    nome: 'Pizza Vegetariana Floral',
    descricao: 'Tomates cherry, rúcula, abobrinha e queijo de cabra',
    preco: 35.90,
    icone: '🥬🌸',
    categoria: 'vegetariana'
  },
  {
    id: 'pizza-margherita',
    nome: 'Margherita Flor',
    descricao: 'Molho de tomate, mussarela e manjericão fresco',
    preco: 32.90,
    icone: '🍅🌸',
    categoria: 'tradicional'
  },
  {
    id: 'pizza-berry',
    nome: 'Berry Delight Floral',
    descricao: 'Frutas vermelhas, queijo brie, nozes e mel',
    preco: 42.90,
    icone: '🫐🌸',
    categoria: 'especial'
  },
  {
    id: 'pizza-pepperoni',
    nome: 'Pepperoni Flower',
    descricao: 'Pepperoni crocante e mussarela derretida',
    preco: 38.90,
    icone: '🍖🌸',
    categoria: 'tradicional'
  },
  {
    id: 'pizza-quatro-queijos',
    nome: 'Quattro Formaggi Floral',
    descricao: 'Gorgonzola, parmesão, mussarela e provolone',
    preco: 44.90,
    icone: '🧀🌸',
    categoria: 'especial'
  },
  {
    id: 'pizza-frango',
    nome: 'Frango Catupiry Flower',
    descricao: 'Frango desfiado com catupiry, milho e azeitonas',
    preco: 36.90,
    icone: '🍗🌸',
    categoria: 'tradicional'
  }
]

// Inicializar pizzas padrão no banco
export async function inicializarPizzas() {
  const bancoDados = await obterBancoDeDados()
  const quantidade = await bancoDados.collection(COLECAO).countDocuments()
  
  if (quantidade === 0) {
    await bancoDados.collection(COLECAO).insertMany(
      pizzasPadrao.map(pizza => ({
        ...pizza,
        criadaEm: new Date()
      }))
    )
  }
}

// Buscar todas as pizzas
export async function buscarTodasPizzas() {
  const bancoDados = await obterBancoDeDados()
  await inicializarPizzas()
  
  const pizzas = await bancoDados.collection(COLECAO).find({}).toArray()
  return pizzas.map(({ _id, ...resto }) => resto)
}

// Buscar pizza por ID
export async function buscarPizzaPorId(id) {
  const bancoDados = await obterBancoDeDados()
  const pizza = await bancoDados.collection(COLECAO).findOne({ id })
  
  if (pizza) {
    const { _id, ...resto } = pizza
    return resto
  }
  return null
}