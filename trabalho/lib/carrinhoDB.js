import connectDB from '@/lib/connectDB';
import CarrinhoModel from '@/models/Carrinho';
import { v4 as uuidv4 } from 'uuid';

export async function getItensCarrinho() {
  await connectDB();
  const itens = await CarrinhoModel.find().lean();
  return itens;
}

export async function adicionarAoCarrinho(pizza) {
  if (!pizza) {
    throw new Error('Pizza não foi enviada para adicionarAoCarrinho');
  }

  await connectDB();

  const { id: pizzaId, nome, preco, icone } = pizza;

  const item = new CarrinhoModel({
    id: uuidv4(),
    pizzaId: pizzaId ?? uuidv4(), // se por acaso não tiver id, gera um
    nome,
    preco,
    icone,
    quantidade: 1,
    criadoEm: new Date(),
  });

  await item.save();

  return item.toObject();
}

export async function removerDoCarrinho(itemId) {
  await connectDB();
  await CarrinhoModel.deleteOne({ id: itemId });
}

export async function limparCarrinho() {
  await connectDB();
  await CarrinhoModel.deleteMany({});
}