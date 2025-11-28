import connectDB from '@/lib/connectDB';
import UsuarioModel from '@/models/Usuario';
import { v4 as uuidv4 } from 'uuid';

export async function criarUsuario(dados) {
  await connectDB();
  const usuario = await UsuarioModel.create({
    id: uuidv4(),
    nome: dados.nome,
    email: dados.email,
    telefone: dados.telefone,
    criadoEm: new Date(),
  });

  return usuario.toObject();
}

export async function getUsuarios() {
  await connectDB();
  const usuarios = await UsuarioModel.find().lean();
  return usuarios;
}