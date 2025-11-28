import { getDatabase } from '../mongodb'
import { v4 as uuidv4 } from 'uuid'

const COLLECTION = 'carts'

export async function getOrCreateCart(userId) {
  const db = await getDatabase()
  let cart = await db.collection(COLLECTION).findOne({ userId, status: 'active' })
  
  if (!cart) {
    cart = {
      id: uuidv4(),
      userId,
      items: [],
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    await db.collection(COLLECTION).insertOne(cart)
  }
  
  const { _id, ...rest } = cart
  return rest
}

export async function addItemToCart(userId, pizza, quantidade = 1) {
  const db = await getDatabase()
  const cart = await getOrCreateCart(userId)
  
  const existingItemIndex = cart.items.findIndex(item => item.pizzaId === pizza.id)
  
  if (existingItemIndex >= 0) {
    cart.items[existingItemIndex].quantidade += quantidade
    cart.items[existingItemIndex].subtotal = cart.items[existingItemIndex].quantidade * pizza.preco
  } else {
    cart.items.push({
      id: uuidv4(),
      pizzaId: pizza.id,
      nome: pizza.nome,
      preco: pizza.preco,
      icone: pizza.icone,
      quantidade,
      subtotal: pizza.preco * quantidade
    })
  }
  
  await db.collection(COLLECTION).updateOne(
    { id: cart.id },
    { 
      $set: { 
        items: cart.items,
        updatedAt: new Date()
      } 
    }
  )
  
  return cart
}

export async function updateCartItemQuantity(userId, itemId, quantidade) {
  const db = await getDatabase()
  const cart = await getOrCreateCart(userId)
  
  const itemIndex = cart.items.findIndex(item => item.id === itemId)
  
  if (itemIndex >= 0) {
    if (quantidade <= 0) {
      cart.items.splice(itemIndex, 1)
    } else {
      cart.items[itemIndex].quantidade = quantidade
      cart.items[itemIndex].subtotal = cart.items[itemIndex].quantidade * cart.items[itemIndex].preco
    }
    
    await db.collection(COLLECTION).updateOne(
      { id: cart.id },
      { 
        $set: { 
          items: cart.items,
          updatedAt: new Date()
        } 
      }
    )
  }
  
  return cart
}

export async function removeItemFromCart(userId, itemId) {
  return updateCartItemQuantity(userId, itemId, 0)
}

export async function clearCart(userId) {
  const db = await getDatabase()
  await db.collection(COLLECTION).updateOne(
    { userId, status: 'active' },
    { 
      $set: { 
        items: [],
        updatedAt: new Date()
      } 
    }
  )
  return await getOrCreateCart(userId)
}

export async function getCartTotal(userId) {
  const cart = await getOrCreateCart(userId)
  return cart.items.reduce((total, item) => total + item.subtotal, 0)
}
