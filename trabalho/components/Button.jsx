export default function Button({ children, onClick, variant = 'primary', type = 'button' }) {
  const estiloBase = {
    padding: '10px 20px',
    borderRadius: '25px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '14px',
  }

  const variantes = {
    primary: {
      backgroundColor: '#f97316',
      color: 'white',
    },
    white: {
      backgroundColor: 'white',
      color: '#f97316',
    },
    outline: {
      backgroundColor: 'transparent',
      color: 'white',
      border: '2px solid white',
    },
    success: {
      backgroundColor: '#22c55e',
      color: 'white',
    },
    danger: {
      backgroundColor: '#ef4444',
      color: 'white',
    },
  }

  const estiloFinal = { ...estiloBase, ...variantes[variant] }

  return (
    <button type={type} onClick={onClick} style={estiloFinal}>
      {children}
    </button>
  )
}