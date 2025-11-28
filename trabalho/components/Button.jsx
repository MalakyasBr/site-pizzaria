'use client';

export default function Button({ children, onClick, tipo = 'primary' }) {
  const classe = tipo === 'primary' ? 'btn btn-primary' : 'btn btn-secondary';
  return (
    <button className={classe} onClick={onClick}>
      {children}
    </button>
  );
}
