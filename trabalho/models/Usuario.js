import { getDb } from '@/lib/mongodb';
import { v4 as uuidv4 } from 'uuid';

export async function criarUsuario(dados) {
  const db = await getDb();
  const usuario = {
    id: uuidv4(),
    nome: dados.nome,
    email: dados.email,
    telefone: dados.telefone,
    criadoEm: new Date()
  };
  await db.collection('usuarios').insertOne(usuario);
  return usuario;
}

export async function getUsuarios() {
  const db = await getDb();
  const usuarios = await db.collection('usuarios').find({}).toArray();
  return usuarios;
}
