import { obterBancoDeDados } from '../lib/mongodb'
import { v4 as uuidv4 } from 'uuid'
import { obterOuCriarCarrinho, limparCarrinho } from './Carrinho'

const COLECAO = 'pedidos'

// Criar novo pedido
export async function criarPedido(idUsuario, endereco) {
  const bancoDados = await obterBancoDeDados()
  const carrinho = await obterOuCriarCarrinho(idUsuario)
  
  if (carrinho.itens.length === 0) {
    throw new Error('Carrinho vazio')
  }
  
  const total = carrinho.itens.reduce((soma, item) => soma + item.subtotal, 0)
  
  const pedido = {
    id: uuidv4(),
    idUsuario,
    itens: carrinho.itens,
    total,
    endereco,
    status: 'pendente',
    criadoEm: new Date(),
    atualizadoEm: new Date()
  }
  
  await bancoDados.collection(COLECAO).insertOne(pedido)
  await limparCarrinho(idUsuario)
  
  const { _id, ...resto } = pedido
  return resto
}

// Buscar pedidos do usuário
export async function buscarPedidosDoUsuario(idUsuario) {
  const bancoDados = await obterBancoDeDados()
  const pedidos = await bancoDados.collection(COLECAO)
    .find({ idUsuario })
    .sort({ criadoEm: -1 })
    .toArray()
  
  return pedidos.map(({ _id, ...resto }) => resto)
}

// Buscar pedido por ID
export async function buscarPedidoPorId(idPedido) {
  const bancoDados = await obterBancoDeDados()
  const pedido = await bancoDados.collection(COLECAO).findOne({ id: idPedido })
  
  if (pedido) {
    const { _id, ...resto } = pedido
    return resto
  }
  return null
}

// Atualizar status do pedido
export async function atualizarStatusPedido(idPedido, status) {
  const bancoDados = await obterBancoDeDados()
  
  await bancoDados.collection(COLECAO).updateOne(
    { id: idPedido },
    { 
      $set: { 
        status,
        atualizadoEm: new Date()
      } 
    }
  )
  
  return await buscarPedidoPorId(idPedido)
}