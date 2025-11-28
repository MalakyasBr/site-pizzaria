import { getDatabase } from '../mongodb'
import { v4 as uuidv4 } from 'uuid'

const COLLECTION = 'users'

export async function createUser(userData) {
  const db = await getDatabase()
  const user = {
    id: uuidv4(),
    nome: userData.nome,
    idade: parseInt(userData.idade),
    cpf: userData.cpf,
    email: userData.email,
    senha: userData.senha,
    createdAt: new Date(),
    updatedAt: new Date()
  }
  
  await db.collection(COLLECTION).insertOne(user)
  const { senha, _id, ...userWithoutPassword } = user
  return userWithoutPassword
}

export async function findUserByEmail(email) {
  const db = await getDatabase()
  return await db.collection(COLLECTION).findOne({ email })
}

export async function findUserByCpf(cpf) {
  const db = await getDatabase()
  return await db.collection(COLLECTION).findOne({ cpf })
}

export async function findUserById(id) {
  const db = await getDatabase()
  const user = await db.collection(COLLECTION).findOne({ id })
  if (user) {
    const { senha, _id, ...userWithoutPassword } = user
    return userWithoutPassword
  }
  return null
}

export async function validateUserLogin(email, senha) {
  const db = await getDatabase()
  const user = await db.collection(COLLECTION).findOne({ email, senha })
  if (user) {
    const { senha, _id, ...userWithoutPassword } = user
    return userWithoutPassword
  }
  return null
}
