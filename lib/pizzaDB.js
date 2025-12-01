'use server'
import connectDB  from './connectDB';
import { Pizza } from '@/models/Pizza';

const pizzasMock = [
  {
    _id: '1',
    nome: 'Pizza Margherita',
    ingredientes: ['Molho de tomate', 'Mussarela', 'Manjericão'],
    preco: 35.90,
    imagem: '/pizzas/margherita.jpg',
    categoria: 'tradicional'
  },
  {
    _id: '2',
    nome: 'Pizza Pepperoni',
    ingredientes: ['Molho de tomate', 'Mussarela', 'Pepperoni'],
    preco: 42.50,
    imagem: '/pizzas/pepperoni.jpg',
    categoria: 'tradicional'
  },
  {
    _id: '3',
    nome: 'Pizza Quatro Queijos',
    ingredientes: ['Mussarela', 'Provolone', 'Parmesão', 'Gorgonzola'],
    preco: 45.90,
    imagem: '/pizzas/quatro-queijos.jpg',
    categoria: 'especial'
  }
];

async function buscarPizzas() {
  try {
    await connectDB();
    const pizzasExistentes = await Pizza.find({}).lean();
    
    if (pizzasExistentes.length === 0) {
      await Pizza.insertMany(pizzasMock);
      return pizzasMock.map(pizza => ({
        ...pizza,
        id: pizza._id.toString()
      }));
    }
    
    return pizzasExistentes.map(pizza => ({
      ...pizza,
      id: pizza._id.toString(),
      _id: undefined
    }));
  } catch (error) {
    console.error('Erro ao buscar pizzas:', error);
    return pizzasMock.map(pizza => ({
      ...pizza,
      id: pizza._id.toString()
    }));
  }
}

async function buscarPizzaPorId(id) {
  try {
    await connectDB();
    const pizza = await Pizza.findById(id).lean();
    if (!pizza) return null;
    
    return {
      ...pizza,
      id: pizza._id.toString(),
      _id: undefined
    };
  } catch (error) {
    console.error('Erro ao buscar pizza:', error);
    return null;
  }
}

export { buscarPizzas, buscarPizzaPorId };