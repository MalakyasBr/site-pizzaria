export const metadata = {
  title: 'Pizza Flowers',
  description: 'Pizzas em formato de flores',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, fontFamily: 'Arial, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}