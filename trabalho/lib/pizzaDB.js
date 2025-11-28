import connectDB from '@/lib/connectDB';
import PizzaModel from '@/models/Pizza';
import { v4 as uuidv4 } from 'uuid';

export async function getPizzas() {
  await connectDB();
  const pizzas = await PizzaModel.find().lean();
  return pizzas;
}

export async function seedPizzas() {
  await connectDB();
  const count = await PizzaModel.countDocuments();

  if (count === 0) {
    const pizzasIniciais = [
      {
        id: uuidv4(),
        nome: 'Pizza Vegetariana Floral',
        descricao: 'Tomates cherry, rúcula, abobrinha e queijo de cabra',
        preco: 35.90,
        icone: '🥬🌸'
      },
      {
        id: uuidv4(),
        nome: 'Margherita Flor',
        descricao: 'Molho de tomate artesanal, mussarela e manjericão fresco',
        preco: 32.90,
        icone: '🍅🌸'
      },
      {
        id: uuidv4(),
        nome: 'Berry Delight Floral',
        descricao: 'Frutas vermelhas, queijo brie, nozes e mel',
        preco: 42.90,
        icone: '🫐🌸'
      },
      {
        id: uuidv4(),
        nome: 'Pepperoni Bloom',
        descricao: 'Pepperoni, mussarela e molho especial',
        preco: 38.90,
        icone: '🍕🌸'
      }
    ];

    await PizzaModel.insertMany(pizzasIniciais);
  }
}