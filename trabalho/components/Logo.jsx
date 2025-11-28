export default function Logo({ tamanho = 'normal' }) {
  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      color: 'white',
      fontWeight: 'bold',
      fontSize: tamanho === 'grande' ? '32px' : '24px',
    },
    icone: {
      fontSize: tamanho === 'grande' ? '48px' : '32px',
      marginRight: '10px',
    },
  }

  return (
    <div style={styles.container}>
      <span style={styles.icone}>🌸</span>
      <span>PIZZA FLOWERS</span>
    </div>
  )
}