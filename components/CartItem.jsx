'use client';

import Button from './Button';

export default function CartItem({ item, onRemover }) {
  return (
    <div className="cart-item">
      <span className="cart-icon">{item.icone}</span>
      <div className="cart-info">
        <h4>{item.nome}</h4>
        <p>R$ {item.preco.toFixed(2)}</p>
      </div>
      <Button onClick={() => onRemover(item.id)} tipo="secondary">Remover</Button>
    </div>
  );
}
