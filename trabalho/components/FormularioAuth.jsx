export default function FormularioAuth({ children, onSubmit, titulo, subtitulo, mensagemErro }) {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.logo}>🌸🍕</div>
        <h1 style={styles.titulo}>{titulo}</h1>
        <p style={styles.subtitulo}>{subtitulo}</p>
        
        {mensagemErro && (
          <div style={styles.erro}>{mensagemErro}</div>
        )}
        
        <form onSubmit={onSubmit} style={styles.form}>
          {children}
        </form>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '40px',
    width: '100%',
    maxWidth: '500px',
    boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
  },
  logo: {
    fontSize: '60px',
    textAlign: 'center',
    marginBottom: '20px',
  },
  titulo: {
    fontSize: '28px',
    textAlign: 'center',
    color: '#f97316',
    marginBottom: '10px',
  },
  subtitulo: {
    textAlign: 'center',
    color: '#666',
    marginBottom: '30px',
  },
  erro: {
    backgroundColor: '#fee2e2',
    border: '1px solid #fca5a5',
    color: '#991b1b',
    padding: '12px',
    borderRadius: '5px',
    marginBottom: '20px',
    fontSize: '14px',
  },
  form: {
    marginBottom: '20px',
  },
}