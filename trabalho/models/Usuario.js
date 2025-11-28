import mongoose from 'mongoose';

const UsuarioSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    nome: { type: String, required: true },
    email: { type: String, required: true },
    telefone: { type: String, required: true },
    criadoEm: { type: Date, required: true },
  },
  {
    collection: 'usuarios',
  }
);

const UsuarioModel =
  mongoose.models.Usuario || mongoose.model('Usuario', UsuarioSchema);

export default UsuarioModel;