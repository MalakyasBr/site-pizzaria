export default function Input({ label, type = 'text', valor, onChange, placeholder, maxLength }) {
  return (
    <div style={styles.container}>
      {label && <label style={styles.label}>{label}</label>}
      <input
        type={type}
        value={valor}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        style={styles.input}
      />
    </div>
  )
}

const styles = {
  container: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '12px',
    border: '1px solid #d1d5db',
    borderRadius: '5px',
    fontSize: '16px',
    boxSizing: 'border-box',
  },
}