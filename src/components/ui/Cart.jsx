import { useAuth } from "../../context/useAuth";

function Cart({ carrito, onEliminar, onCerrar, onCanjear, canjeando }) {
  const { usuario } = useAuth();

  const total = carrito.reduce((acc, c) => acc + c.bucles, 0);
  const saldo = usuario?.bucles ?? 0;
  const saldoInsuficiente = saldo < total;

  return (
    <div className="vol-modal-overlay" onClick={onCerrar}>
      <div className="vol-modal" onClick={(e) => e.stopPropagation()}>
        <div className="vol-modal-header">
          <h2>🛒 Tu carrito</h2>
          <button className="vol-close-btn" onClick={onCerrar}>
            ✕
          </button>
        </div>

        {carrito.length === 0 ? (
          <p style={{ padding: "1rem 0", color: "#888" }}>
            El carrito está vacío.
          </p>
        ) : (
          <div className="carrito-lista">
            {carrito.map((item) => (
              <div key={item.id} className="carrito-item">
                <span className="carrito-item-emoji">{item.emoji}</span>
                <div className="carrito-item-info">
                  <strong>{item.titulo}</strong>
                  {item.esEjemplo && (
                    <span className="carrito-ejemplo-tag"> · ejemplo</span>
                  )}
                </div>
                <span className="carrito-item-bucles">
                  {item.bucles} bucles
                </span>
                <button
                  className="carrito-item-remove"
                  onClick={() => onEliminar(item.id)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="carrito-total">
          <span>Total</span>
          <span>
            <strong>{total}</strong> bucles
          </span>
        </div>

        {usuario && (
          <div
            className={`carrito-saldo${saldoInsuficiente ? " insuficiente" : ""}`}
          >
            <span>Tu saldo</span>
            <span>{saldo} bucles</span>
          </div>
        )}

        <div className="vol-modal-actions">
          <button className="vol-btn-cancel" onClick={onCerrar}>
            Seguir viendo
          </button>
          <button
            className="vol-btn-confirmar"
            onClick={onCanjear}
            disabled={
              carrito.length === 0 || canjeando || !usuario || saldoInsuficiente
            }
          >
            {canjeando ? "Canjeando..." : "Confirmar canje"}
          </button>
        </div>

        {!usuario && (
          <p className="vol-form-error" style={{ marginTop: "0.5rem" }}>
            Iniciá sesión para confirmar el canje.
          </p>
        )}
        {usuario && saldoInsuficiente && carrito.length > 0 && (
          <p className="vol-form-error" style={{ marginTop: "0.5rem" }}>
            No tenés suficientes bucles para este canje.
          </p>
        )}
      </div>
    </div>
  );
}

export default Cart;
