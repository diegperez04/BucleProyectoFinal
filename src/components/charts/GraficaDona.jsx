import { useEffect, useRef } from "react";
import * as d3 from "d3";

// Gráfica de dona para datos cualitativos
function GraficaDona({ datos }) {
  const ref = useRef(null);

  useEffect(() => {
    const ancho = 460;
    const alto = 320;
    const radio = Math.min(ancho, alto) / 2 - 10;

    const paleta = ["#0d5b47", "#1a7a60", "#3da588", "#a8d4c5", "#925625"];

    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();
    svg
      .attr("viewBox", `0 0 ${ancho} ${alto}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    const g = svg
      .append("g")
      .attr("transform", `translate(${ancho / 2.6},${alto / 2})`);

    const pie = d3
      .pie()
      .value((d) => d.value)
      .sort(null);

    const arco = d3
      .arc()
      .innerRadius(radio * 0.55)
      .outerRadius(radio);

    const arcos = pie(datos);

    // Segmentos
    g.selectAll("path")
      .data(arcos)
      .join("path")
      .attr("fill", (d, i) => paleta[i % paleta.length])
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .transition()
      .duration(800)
      .attrTween("d", function (d) {
        const i = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
        return (t) => arco(i(t));
      });

    // Total al centro
    g.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "-0.1em")
      .attr("font-size", "26px")
      .attr("font-weight", "700")
      .attr("fill", "#0d5b47")
      .text(d3.sum(datos, (d) => d.value));

    g.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "1.4em")
      .attr("font-size", "11px")
      .attr("fill", "#4a6b5e")
      .text("respuestas");

    // Leyenda
    const leyenda = svg
      .append("g")
      .attr("transform", `translate(${ancho * 0.56}, 40)`);

    datos.forEach((d, i) => {
      const fila = leyenda
        .append("g")
        .attr("transform", `translate(0, ${i * 30})`);
      fila
        .append("rect")
        .attr("width", 14)
        .attr("height", 14)
        .attr("rx", 3)
        .attr("fill", paleta[i % paleta.length]);
      fila
        .append("text")
        .attr("x", 20)
        .attr("y", 11)
        .attr("font-size", "11px")
        .attr("fill", "#1c2b26")
        .text(`${d.label} (${d.value})`);
    });
  }, [datos]);

  return <svg ref={ref} style={{ width: "100%", height: "auto" }} />;
}

export default GraficaDona;
