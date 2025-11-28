import { getDatabase } from '../mongodb'
import { v4 as uuidv4 } from 'uuid'
import { getOrCreateCart, clearCart } from './Cart'

const COLLECTION = 'orders'

export async function createOrder(userId, endereco) {
  const db = await getDatabase()
  const cart = await getOrCreateCart(userId)
  
  if (cart.items.length === 0) {
    throw new Error('Carrinho vazio')
  }
  
  const total = cart.items.reduce((sum, item) => sum + item.subtotal, 0)
  
  const order = {
    id: uuidv4(),
    userId,
    items: cart.items,
    total,
    endereco,
    status: 'pendente',
    createdAt: new Date(),
    updatedAt: new Date()
  }
  
  await db.collection(COLLECTION).insertOne(order)
  await clearCart(userId)
  
  const { _id, ...rest } = order
  return rest
}

export async function getOrdersByUser(userId) {
  const db = await getDatabase()
  const orders = await db.collection(COLLECTION)
    .find({ userId })
    .sort({ createdAt: -1 })
    .toArray()
  
  return orders.map(({ _id, ...rest }) => rest)
}

export async function getOrderById(orderId) {
  const db = await getDatabase()
  const order = await db.collection(COLLECTION).findOne({ id: orderId })
  if (order) {
    const { _id, ...rest } = order
    return rest
  }
  return null
}

export async function updateOrderStatus(orderId, status) {
  const db = await getDatabase()
  await db.collection(COLLECTION).updateOne(
    { id: orderId },
    { 
      $set: { 
        status,
        updatedAt: new Date()
      } 
    }
  )
  return await getOrderById(orderId)
}
