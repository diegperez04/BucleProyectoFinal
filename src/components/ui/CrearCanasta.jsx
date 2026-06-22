import { useState } from "react";

function CrearCanasta({ agregarCanasta }) {
  const [canasta, setCanasta] = useState({
    material: "",
    descripcion: "",
    ubicacion: "",
    cantidad: "",
    foto: "",
  });

  const handleChange = (e) => {
    setCanasta({
      ...canasta,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    agregarCanasta({
      id: Date.now(),
      ...canasta,
    });

    setCanasta({
      material: "",
      descripcion: "",
      ubicacion: "",
      cantidad: "",
      foto: "",
    });
  };

  return (
    <form className="form-canasta" onSubmit={handleSubmit}>
      <h3>Crear Canasta</h3>

      <input
        type="text"
        name="material"
        placeholder="Material"
        value={canasta.material}
        onChange={handleChange}
      />

      <input
        type="text"
        name="ubicacion"
        placeholder="Ubicación"
        value={canasta.ubicacion}
        onChange={handleChange}
      />

      <input
        type="number"
        name="cantidad"
        placeholder="Cantidad"
        value={canasta.cantidad}
        onChange={handleChange}
      />

      <input
        type="text"
        name="foto"
        placeholder="URL de imagen"
        value={canasta.foto}
        onChange={handleChange}
      />

      <textarea
        name="descripcion"
        placeholder="Descripción"
        value={canasta.descripcion}
        onChange={handleChange}
      />

      <button type="submit">Publicar Canasta</button>
    </form>
  );
}

export default CrearCanasta;
