import './globals.css';

export const metadata = {
  title: 'Pizza Flowers',
  description: 'Pizzas especiais em formato de flor',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
