import Button from './Button'

export default function ItemCarrinho({ item, aoAtualizarQuantidade, aoRemover }) {
  return (
    <div style={styles.container}>
      <div style={styles.icone}>{item.icone}</div>
      <div style={styles.info}>
        <h3 style={styles.nome}>{item.nome}</h3>
        <p style={styles.preco}>R$ {item.preco.toFixed(2).replace('.', ',')}</p>
      </div>
      <div style={styles.acoes}>
        <button onClick={() => aoAtualizarQuantidade(item.id, item.quantidade - 1)} style={styles.botaoQtd}>-</button>
        <span style={styles.quantidade}>{item.quantidade}</span>
        <button onClick={() => aoAtualizarQuantidade(item.id, item.quantidade + 1)} style={styles.botaoQtd}>+</button>
      </div>
      <div style={styles.total}>
        <p style={styles.subtotal}>R$ {(item.preco * item.quantidade).toFixed(2).replace('.', ',')}</p>
        <button onClick={() => aoRemover(item.id)} style={styles.botaoRemover}>Remover</button>
      </div>
    </div>
  )
}

const styles = {
  container: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '15px',
  },
  icone: {
    fontSize: '40px',
  },
  info: {
    flex: 1,
  },
  nome: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#f97316',
    marginBottom: '5px',
  },
  preco: {
    color: '#666',
  },
  acoes: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  botaoQtd: {
    backgroundColor: 'white',
    border: '1px solid #d1d5db',
    borderRadius: '5px',
    width: '30px',
    height: '30px',
    cursor: 'pointer',
    fontSize: '18px',
  },
  quantidade: {
    fontWeight: 'bold',
    minWidth: '30px',
    textAlign: 'center',
  },
  total: {
    textAlign: 'right',
  },
  subtotal: {
    fontWeight: 'bold',
    color: '#f97316',
    marginBottom: '5px',
  },
  botaoRemover: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#ef4444',
    cursor: 'pointer',
    fontSize: '12px',
  },
}