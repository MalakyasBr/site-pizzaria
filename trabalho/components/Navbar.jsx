import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="header">
      <nav className="nav-container">
        <Link href="/" className="logo">🌸 PIZZA FLOWERS</Link>
        <ul className="main-nav">
          <li><Link href="/">Cardápio</Link></li>
          <li><Link href="/cadastro">Cadastro</Link></li>
          <li><Link href="/carrinho">🛒 Carrinho</Link></li>
        </ul>
      </nav>
    </header>
  );
}
