'use server'

import mongoose from 'mongoose';

const ItemCarrinhoSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true
  },
  pizzaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pizza',
    required: true
  },
  nome: {
    type: String,
    required: true
  },
  preco: {
    type: Number,
    required: true
  },
  quantidade: {
    type: Number,
    default: 1,
    min: 1
  }
}, {
  timestamps: true
});

ItemCarrinhoSchema.index({ sessionId: 1 });

const ItemCarrinho = mongoose.models.ItemCarrinho || mongoose.model('ItemCarrinho', ItemCarrinhoSchema);

export { ItemCarrinho };