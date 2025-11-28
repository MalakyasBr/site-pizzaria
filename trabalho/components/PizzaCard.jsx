'use client';

import Button from './Button';

export default function PizzaCard({ pizza, onAdicionar }) {
  return (
    <div className="pizza-card">
      <span className="pizza-icon">{pizza.icone}</span>
      <h3>{pizza.nome}</h3>
      <p>{pizza.descricao}</p>
      <div className="price">R$ {pizza.preco.toFixed(2)}</div>
      <Button onClick={() => onAdicionar(pizza)}>ADICIONAR</Button>
    </div>
  );
}
