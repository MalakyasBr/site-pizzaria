import Button from './Button'

export default function CardPizza({ pizza, aoAdicionar }) {
  return (
    <div style={styles.card}>
      <div style={styles.icone}>{pizza.icone}</div>
      <h3 style={styles.nome}>{pizza.nome}</h3>
      <p style={styles.descricao}>{pizza.descricao}</p>
      <p style={styles.preco}>R$ {pizza.preco.toFixed(2).replace('.', ',')}</p>
      <Button onClick={() => aoAdicionar(pizza)}>
        ADICIONAR AO PEDIDO
      </Button>
    </div>
  )
}

const styles = {
  card: {
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '10px',
    padding: '30px',
    textAlign: 'center',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  icone: {
    fontSize: '60px',
    marginBottom: '20px',
  },
  nome: {
    fontSize: '20px',
    color: '#f97316',
    marginBottom: '10px',
  },
  descricao: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '15px',
  },
  preco: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#f97316',
    marginBottom: '15px',
  },
}