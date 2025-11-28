import { getDatabase } from '../mongodb'
import { v4 as uuidv4 } from 'uuid'

const COLLECTION = 'pizzas'

const defaultPizzas = [
  {
    id: 'pizza-vegetariana',
    nome: 'Pizza Vegetariana Floral',
    descricao: 'Uma explosão de sabores vegetais em formato de flor, com tomates cherry, rúcula, abobrinha e queijo de cabra.',
    preco: 35.90,
    icone: '🥬🌸',
    categoria: 'vegetariana'
  },
  {
    id: 'pizza-margherita',
    nome: 'Margherita Flor',
    descricao: 'A clássica margherita reinventada em pétalas perfeitas, com molho de tomate artesanal, mussarela e manjericão fresco.',
    preco: 32.90,
    icone: '🍅🌸',
    categoria: 'tradicional'
  },
  {
    id: 'pizza-berry',
    nome: 'Berry Delight Floral',
    descricao: 'Uma combinação única de frutas vermelhas, queijo brie, nozes e mel, criando uma flor comestível irresistível.',
    preco: 42.90,
    icone: '🫐🌸',
    categoria: 'especial'
  },
  {
    id: 'pizza-pepperoni',
    nome: 'Pepperoni Flower',
    descricao: 'Pétalas de pepperoni crocante sobre mussarela derretida e molho especial da casa.',
    preco: 38.90,
    icone: '🍖🌸',
    categoria: 'tradicional'
  },
  {
    id: 'pizza-quatro-queijos',
    nome: 'Quattro Formaggi Floral',
    descricao: 'Blend harmonioso de gorgonzola, parmesão, mussarela e provolone em formato de flor.',
    preco: 44.90,
    icone: '🧀🌸',
    categoria: 'especial'
  },
  {
    id: 'pizza-frango',
    nome: 'Frango Catupiry Flower',
    descricao: 'Frango desfiado com catupiry cremoso, milho e azeitonas em pétalas douradas.',
    preco: 36.90,
    icone: '🍗🌸',
    categoria: 'tradicional'
  }
]

export async function initializePizzas() {
  const db = await getDatabase()
  const count = await db.collection(COLLECTION).countDocuments()
  
  if (count === 0) {
    await db.collection(COLLECTION).insertMany(defaultPizzas.map(p => ({
      ...p,
      createdAt: new Date()
    })))
  }
}

export async function getAllPizzas() {
  const db = await getDatabase()
  await initializePizzas()
  const pizzas = await db.collection(COLLECTION).find({}).toArray()
  return pizzas.map(({ _id, ...rest }) => rest)
}

export async function getPizzaById(id) {
  const db = await getDatabase()
  const pizza = await db.collection(COLLECTION).findOne({ id })
  if (pizza) {
    const { _id, ...rest } = pizza
    return rest
  }
  return null
}
