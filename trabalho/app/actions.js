'use server';

import { getPizzas, seedPizzas } from '@/models/Pizza';
import { getItensCarrinho, adicionarAoCarrinho, removerDoCarrinho, limparCarrinho } from '@/models/Carrinho';
import { criarUsuario } from '@/models/Usuario';
import { revalidatePath } from 'next/cache';

export async function buscarPizzas() {
  await seedPizzas();
  const pizzas = await getPizzas();
  return JSON.parse(JSON.stringify(pizzas));
}

export async function buscarCarrinho() {
  const itens = await getItensCarrinho();
  return JSON.parse(JSON.stringify(itens));
}

export async function actionAdicionarCarrinho(pizza) {
  const item = await adicionarAoCarrinho(pizza);
  revalidatePath('/carrinho');
  return JSON.parse(JSON.stringify(item));
}

export async function actionRemoverCarrinho(itemId) {
  await removerDoCarrinho(itemId);
  revalidatePath('/carrinho');
}

export async function actionLimparCarrinho() {
  await limparCarrinho();
  revalidatePath('/carrinho');
}

export async function actionCadastrarUsuario(dados) {
  const usuario = await criarUsuario(dados);
  return JSON.parse(JSON.stringify(usuario));
}
