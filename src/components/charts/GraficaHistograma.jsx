import { useEffect, useRef } from "react";
import * as d3 from "d3";

// Histograma para datos cuantitativos (ej: edades)
function GraficaHistograma({ datos, color = "#1a7a60" }) {
  const ref = useRef(null);

  useEffect(() => {
    const ancho = 460;
    const alto = 300;
    const margen = { top: 20, right: 20, bottom: 45, left: 45 };

    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();
    svg
      .attr("viewBox", `0 0 ${ancho} ${alto}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    const x = d3
      .scaleLinear()
      .domain([d3.min(datos) - 2, d3.max(datos) + 2])
      .range([margen.left, ancho - margen.right]);

    // Generar bins (rangos de edad)
    const bins = d3
      .bin()
      .domain(x.domain())
      .thresholds(x.ticks(8))(datos);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(bins, (b) => b.length)])
      .nice()
      .range([alto - margen.bottom, margen.top]);

    // Barras del histograma
    svg
      .selectAll("rect")
      .data(bins)
      .join("rect")
      .attr("x", (b) => x(b.x0) + 1)
      .attr("width", (b) => Math.max(0, x(b.x1) - x(b.x0) - 2))
      .attr("y", alto - margen.bottom)
      .attr("height", 0)
      .attr("rx", 4)
      .attr("fill", color)
      .transition()
      .duration(800)
      .attr("y", (b) => y(b.length))
      .attr("height", (b) => alto - margen.bottom - y(b.length));

    // Eje X
    svg
      .append("g")
      .attr("transform", `translate(0,${alto - margen.bottom})`)
      .call(d3.axisBottom(x).ticks(8).tickFormat(d3.format("d")))
      .attr("font-size", "11px")
      .attr("color", "#4a6b5e");

    // Eje Y
    svg
      .append("g")
      .attr("transform", `translate(${margen.left},0)`)
      .call(d3.axisLeft(y).ticks(5))
      .attr("font-size", "11px")
      .attr("color", "#4a6b5e");

    // Etiqueta eje X
    svg
      .append("text")
      .attr("x", ancho / 2)
      .attr("y", alto - 6)
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("fill", "#1c2b26")
      .text("Edad (años)");

    // Etiqueta eje Y
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -alto / 2)
      .attr("y", 14)
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("fill", "#1c2b26")
      .text("Cantidad de personas");
  }, [datos, color]);

  return <svg ref={ref} style={{ width: "100%", height: "auto" }} />;
}

export default GraficaHistograma;
