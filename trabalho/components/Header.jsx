import Link from 'next/link'
import Logo from './Logo'
import Button from './Button'

export default function Header({ usuario, contagemCarrinho }) {
  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <Link href="/" style={styles.logoLink}>
          <Logo />
        </Link>
        
        <div style={styles.acoes}>
          {usuario ? (
            <>
              <span style={styles.bemVindo}>Olá, {usuario}</span>
              <Link href="/carrinho">
                <Button variant="white">
                  🛒 Carrinho ({contagemCarrinho})
                </Button>
              </Link>
              <Button variant="outline">Sair</Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="outline">Entrar</Button>
              </Link>
              <Link href="/cadastro">
                <Button variant="white">Cadastrar</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

const styles = {
  header: {
    backgroundColor: '#f97316',
    color: 'white',
    padding: '20px 0',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoLink: {
    textDecoration: 'none',
  },
  acoes: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  bemVindo: {
    marginRight: '10px',
  },
}