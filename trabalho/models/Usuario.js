import { obterBancoDeDados } from '../lib/mongodb'
import { v4 as uuidv4 } from 'uuid'

const COLECAO = 'usuarios'

// Criar novo usuário
export async function criarUsuario(dadosUsuario) {
  const bancoDados = await obterBancoDeDados()
  
  const usuario = {
    id: uuidv4(),
    nome: dadosUsuario.nome,
    idade: parseInt(dadosUsuario.idade),
    cpf: dadosUsuario.cpf,
    email: dadosUsuario.email,
    senha: dadosUsuario.senha,
    criadoEm: new Date(),
    atualizadoEm: new Date()
  }
  
  await bancoDados.collection(COLECAO).insertOne(usuario)
  
  // Retorna usuário sem senha e sem _id do MongoDB
  const { senha, _id, ...usuarioSemSenha } = usuario
  return usuarioSemSenha
}

// Buscar usuário por email
export async function buscarUsuarioPorEmail(email) {
  const bancoDados = await obterBancoDeDados()
  return await bancoDados.collection(COLECAO).findOne({ email })
}

// Buscar usuário por CPF
export async function buscarUsuarioPorCpf(cpf) {
  const bancoDados = await obterBancoDeDados()
  return await bancoDados.collection(COLECAO).findOne({ cpf })
}

// Buscar usuário por ID
export async function buscarUsuarioPorId(id) {
  const bancoDados = await obterBancoDeDados()
  const usuario = await bancoDados.collection(COLECAO).findOne({ id })
  
  if (usuario) {
    const { senha, _id, ...usuarioSemSenha } = usuario
    return usuarioSemSenha
  }
  return null
}

// Validar login
export async function validarLoginUsuario(email, senha) {
  const bancoDados = await obterBancoDeDados()
  const usuario = await bancoDados.collection(COLECAO).findOne({ email, senha })
  
  if (usuario) {
    const { senha, _id, ...usuarioSemSenha } = usuario
    return usuarioSemSenha
  }
  return null
}