import { getDb } from '@/lib/mongodb';
import { v4 as uuidv4 } from 'uuid';

export async function getItensCarrinho() {
  const db = await getDb();
  const itens = await db.collection('carrinho').find({}).toArray();
  return itens;
}

export async function adicionarAoCarrinho(pizza) {
  const db = await getDb();
  const item = {
    id: uuidv4(),
    pizzaId: pizza.id,
    nome: pizza.nome,
    preco: pizza.preco,
    icone: pizza.icone,
    quantidade: 1,
    criadoEm: new Date()
  };
  await db.collection('carrinho').insertOne(item);
  return item;
}

export async function removerDoCarrinho(itemId) {
  const db = await getDb();
  await db.collection('carrinho').deleteOne({ id: itemId });
}

export async function limparCarrinho() {
  const db = await getDb();
  await db.collection('carrinho').deleteMany({});
}
