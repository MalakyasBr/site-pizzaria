'use client';

export default function Input({ label, tipo = 'text', valor, onChange, placeholder }) {
  return (
    <div className="input-group">
      <label>{label}</label>
      <input
        type={tipo}
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}
