import { MongoClient } from 'mongodb'

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017'
const NOME_BANCO = process.env.NOME_BANCO || 'pizza_flowers'

let cliente
let promessaCliente

if (!MONGO_URL) {
  throw new Error('Por favor, adicione a URL do MongoDB no arquivo .env.local')
}

if (process.env.NODE_ENV === 'development') {
  // Em desenvolvimento, usa variável global para preservar a conexão entre hot reloads
  if (!global._mongoClientePromise) {
    cliente = new MongoClient(MONGO_URL)
    global._mongoClientePromise = cliente.connect()
  }
  promessaCliente = global._mongoClientePromise
} else {
  // Em produção, cria nova conexão
  cliente = new MongoClient(MONGO_URL)
  promessaCliente = cliente.connect()
}

// Função para obter o banco de dados
export async function obterBancoDeDados() {
  const cliente = await promessaCliente
  return cliente.db(NOME_BANCO)
}

export default promessaCliente