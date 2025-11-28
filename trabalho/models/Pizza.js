import mongoose from 'mongoose';

const PizzaSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    nome: { type: String, required: true },
    descricao: { type: String, required: true },
    preco: { type: Number, required: true },
    icone: { type: String, required: true },
  },
  {
    collection: 'pizzas',
  }
);

const PizzaModel = mongoose.models.Pizza || mongoose.model('Pizza', PizzaSchema);

export default PizzaModel;