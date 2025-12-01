'use server'

import connectDB from './connectDB';
import { ItemCarrinho } from '@/models/ItemCarrinho';

function getSessionId() {
  return 'demo-session';
}

async function buscarCarrinho() {
  try {
    await connectDB();
    const sessionId = getSessionId();
    const itens = await ItemCarrinho.find({ sessionId }).populate('pizzaId').lean();
    
    return itens.map(item => ({
      id: item._id.toString(),
      pizzaId: item.pizzaId?._id?.toString(),
      nome: item.nome,
      preco: item.preco,
      quantidade: item.quantidade
    }));
  } catch (error) {
    console.error('Erro ao buscar carrinho:', error);
    return [];
  }
}

async function adicionarAoCarrinho(pizza) {
  try {
    await connectDB();
    const sessionId = getSessionId();
    
    const itemExistente = await ItemCarrinho.findOne({ 
      sessionId, 
      pizzaId: pizza.id 
    });

    if (itemExistente) {
      itemExistente.quantidade += 1;
      await itemExistente.save();
    } else {
      await ItemCarrinho.create({
        sessionId,
        pizzaId: pizza.id,
        nome: pizza.nome,
        preco: pizza.preco,
        quantidade: 1
      });
    }

    return true;
  } catch (error) {
    console.error('Erro ao adicionar ao carrinho:', error);
    return false;
  }
}

async function removerItemCarrinho(itemId) {
  try {
    await connectDB();
    await ItemCarrinho.findByIdAndDelete(itemId);
    return true;
  } catch (error) {
    console.error('Erro ao remover item:', error);
    return false;
  }
}

async function limparCarrinho() {
  try {
    await connectDB();
    const sessionId = getSessionId();
    await ItemCarrinho.deleteMany({ sessionId });
    return true;
  } catch (error) {
    console.error('Erro ao limpar carrinho:', error);
    return false;
  }
}

export { buscarCarrinho, adicionarAoCarrinho, removerItemCarrinho, limparCarrinho };