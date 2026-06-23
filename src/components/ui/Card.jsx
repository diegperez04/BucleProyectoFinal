import "./Card.css";

export default function Card(props) {
  if (props.type === "producto") return <CardProducto {...props} />;
  if (props.type === "voluntariado") return <CardVoluntariado {...props} />;
  if (props.type === "tienda") return <CardTienda {...props} />;
}

function CardProducto({
  emoji,
  title,
  category,
  bucles,
  bgColor = "verde",
  ecoTag,
  onCanjear,
}) {
  return (
    <div className="card">
      <div className={`card-img ${bgColor}`}>
        <span>{emoji}</span>
        {ecoTag && <span className="tag green">Eco</span>}
        <span className="tag brown">{bucles} bucles</span>
      </div>

      <div className="card-body">
        {category && <p className="category">{category}</p>}
        <h3 className="title">{title}</h3>
        <div className="price-row">
          <span className="price">$0</span>
          <span className="bucles">{bucles} ●</span>
        </div>
        <button className="btn" onClick={onCanjear}>
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}

function CardVoluntariado({
  emoji,
  title,
  description,
  date,
  bucles,
  onAnotarse,
}) {
  return (
    <div className="card">
      <div className="card-img vol">
        <span>{emoji}</span>
      </div>

      <div className="card-body">
        <h3 className="title">{title}</h3>
        {description && <p className="description">{description}</p>}
        <div className="price-row">
          <span className="date">📅 {date}</span>
          <span className="bucles">+{bucles} ●</span>
        </div>
        <button className="btn outline" onClick={onAnotarse}>
          Anotarme
        </button>
      </div>
    </div>
  );
}

function CardTienda({ emoji, title, description, price, onCanjear }) {
  return (
    <div className="cardtienda">
      <div className="cardtienda-img">
        <span>{emoji}</span>
      </div>

      <div className="cardtienda-body">
        <h3 className="title">{title}</h3>
        {description && <p className="description">{description}</p>}
        <p className="price">{price}</p>
        <button className="btn" onClick={onCanjear}>
          Cajear
        </button>
      </div>
    </div>
  );
}
