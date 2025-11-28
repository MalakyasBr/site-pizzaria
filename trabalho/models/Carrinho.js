import mongoose from 'mongoose';

const CarrinhoSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    pizzaId: { type: String, required: true },
    nome: { type: String, required: true },
    preco: { type: Number, required: true },
    icone: { type: String, required: true },
    quantidade: { type: Number, required: true },
    criadoEm: { type: Date, required: true },
  },
  {
    collection: 'carrinho',
  }
);

const CarrinhoModel =
  mongoose.models.Carrinho || mongoose.model('Carrinho', CarrinhoSchema);

export default CarrinhoModel;