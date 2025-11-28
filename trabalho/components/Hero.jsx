export default function Hero({ titulo, subtitulo }) {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>{titulo}</h1>
        <p>{subtitulo}</p>
        <div className="pizza-display">
          <div className="pizza-image">🌸🍕</div>
        </div>
      </div>
    </section>
  );
}
