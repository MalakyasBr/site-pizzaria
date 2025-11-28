import { obterBancoDeDados } from '../lib/mongodb'
import { v4 as uuidv4 } from 'uuid'

const COLECAO = 'carrinhos'

// Buscar ou criar carrinho do usuário
export async function obterOuCriarCarrinho(idUsuario) {
  const bancoDados = await obterBancoDeDados()
  let carrinho = await bancoDados.collection(COLECAO).findOne({ 
    idUsuario, 
    status: 'ativo' 
  })
  
  if (!carrinho) {
    carrinho = {
      id: uuidv4(),
      idUsuario,
      itens: [],
      status: 'ativo',
      criadoEm: new Date(),
      atualizadoEm: new Date()
    }
    await bancoDados.collection(COLECAO).insertOne(carrinho)
  }
  
  const { _id, ...resto } = carrinho
  return resto
}

// Adicionar item ao carrinho
export async function adicionarItemAoCarrinho(idUsuario, pizza, quantidade = 1) {
  const bancoDados = await obterBancoDeDados()
  const carrinho = await obterOuCriarCarrinho(idUsuario)
  
  const indiceItemExistente = carrinho.itens.findIndex(item => item.idPizza === pizza.id)
  
  if (indiceItemExistente >= 0) {
    // Atualiza quantidade se item já existe
    carrinho.itens[indiceItemExistente].quantidade += quantidade
    carrinho.itens[indiceItemExistente].subtotal = 
      carrinho.itens[indiceItemExistente].quantidade * pizza.preco
  } else {
    // Adiciona novo item
    carrinho.itens.push({
      id: uuidv4(),
      idPizza: pizza.id,
      nome: pizza.nome,
      preco: pizza.preco,
      icone: pizza.icone,
      quantidade,
      subtotal: pizza.preco * quantidade
    })
  }
  
  await bancoDados.collection(COLECAO).updateOne(
    { id: carrinho.id },
    { 
      $set: { 
        itens: carrinho.itens,
        atualizadoEm: new Date()
      } 
    }
  )
  
  return carrinho
}

// Atualizar quantidade de item
export async function atualizarQuantidadeItem(idUsuario, idItem, quantidade) {
  const bancoDados = await obterBancoDeDados()
  const carrinho = await obterOuCriarCarrinho(idUsuario)
  
  const indiceItem = carrinho.itens.findIndex(item => item.id === idItem)
  
  if (indiceItem >= 0) {
    if (quantidade <= 0) {
      // Remove item se quantidade for zero ou negativa
      carrinho.itens.splice(indiceItem, 1)
    } else {
      // Atualiza quantidade e subtotal
      carrinho.itens[indiceItem].quantidade = quantidade
      carrinho.itens[indiceItem].subtotal = 
        carrinho.itens[indiceItem].quantidade * carrinho.itens[indiceItem].preco
    }
    
    await bancoDados.collection(COLECAO).updateOne(
      { id: carrinho.id },
      { 
        $set: { 
          itens: carrinho.itens,
          atualizadoEm: new Date()
        } 
      }
    )
  }
  
  return carrinho
}

// Remover item do carrinho
export async function removerItemDoCarrinho(idUsuario, idItem) {
  return atualizarQuantidadeItem(idUsuario, idItem, 0)
}

// Limpar carrinho
export async function limparCarrinho(idUsuario) {
  const bancoDados = await obterBancoDeDados()
  
  await bancoDados.collection(COLECAO).updateOne(
    { idUsuario, status: 'ativo' },
    { 
      $set: { 
        itens: [],
        atualizadoEm: new Date()
      } 
    }
  )
  
  return await obterOuCriarCarrinho(idUsuario)
}

// Calcular total do carrinho
export async function calcularTotalCarrinho(idUsuario) {
  const carrinho = await obterOuCriarCarrinho(idUsuario)
  return carrinho.itens.reduce((total, item) => total + item.subtotal, 0)
}