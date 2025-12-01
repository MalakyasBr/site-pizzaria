'use server'

import mongoose from 'mongoose';

const PizzaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    trim: true
  },
  ingredientes: [{
    type: String,
    required: true
  }],
  preco: {
    type: Number,
    required: true,
    min: 0
  },
  imagem: {
    type: String,
    default: ''
  },
  categoria: {
    type: String,
    default: 'especial'
  }
}, {
  timestamps: true
});

const Pizza = mongoose.models.Pizza || mongoose.model('Pizza', PizzaSchema);

export { Pizza };