import { useEffect, useRef } from "react";
import * as d3 from "d3";

// Gráfica de barras horizontales para datos cualitativos
function GraficaBarras({ datos, color = "#0d5b47" }) {
  const ref = useRef(null);

  useEffect(() => {
    const ancho = 460;
    const alto = datos.length * 52 + 20;
    const margen = { top: 10, right: 50, bottom: 10, left: 180 };

    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();
    svg
      .attr("viewBox", `0 0 ${ancho} ${alto}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    const maxValor = d3.max(datos, (d) => d.value);

    const x = d3
      .scaleLinear()
      .domain([0, maxValor])
      .range([margen.left, ancho - margen.right]);

    const y = d3
      .scaleBand()
      .domain(datos.map((d) => d.label))
      .range([margen.top, alto - margen.bottom])
      .padding(0.25);

    // Barras
    svg
      .selectAll("rect")
      .data(datos)
      .join("rect")
      .attr("x", margen.left)
      .attr("y", (d) => y(d.label))
      .attr("height", y.bandwidth())
      .attr("rx", 6)
      .attr("fill", color)
      .attr("width", 0)
      .transition()
      .duration(800)
      .attr("width", (d) => x(d.value) - margen.left);

    // Etiquetas (label)
    svg
      .selectAll(".etiqueta")
      .data(datos)
      .join("text")
      .attr("class", "etiqueta")
      .attr("x", margen.left - 10)
      .attr("y", (d) => y(d.label) + y.bandwidth() / 2)
      .attr("text-anchor", "end")
      .attr("dominant-baseline", "middle")
      .attr("font-size", "12px")
      .attr("fill", "#1c2b26")
      .text((d) => d.label);

    // Valores al final de cada barra
    svg
      .selectAll(".valor")
      .data(datos)
      .join("text")
      .attr("class", "valor")
      .attr("y", (d) => y(d.label) + y.bandwidth() / 2)
      .attr("dominant-baseline", "middle")
      .attr("font-size", "13px")
      .attr("font-weight", "600")
      .attr("fill", "#0d5b47")
      .attr("x", margen.left)
      .attr("opacity", 0)
      .text((d) => d.value)
      .transition()
      .delay(800)
      .duration(400)
      .attr("opacity", 1)
      .attr("x", (d) => x(d.value) + 8);
  }, [datos, color]);

  return <svg ref={ref} style={{ width: "100%", height: "auto" }} />;
}

export default GraficaBarras;
