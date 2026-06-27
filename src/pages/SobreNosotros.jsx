import "./SobreNosotros.css";
import GraficaBarras from "../components/charts/GraficaBarras";
import GraficaHistograma from "../components/charts/GraficaHistograma";
import GraficaDona from "../components/charts/GraficaDona";

// ─── Datos reales recolectados en la encuesta (37 respuestas) ───
const edades = [
  15, 16, 17, 19, 19, 21, 21, 21, 21, 22, 23, 26, 27, 27, 27, 28, 29, 29, 30,
  31, 32, 32, 32, 37, 38, 38, 39, 40, 43, 44, 45, 54, 57, 66, 66, 76, 90,
];

// Cualitativo 1: razón por la que no separan residuos
const razonNoSepara = [
  { label: "Falta espacio físico", value: 19 },
  { label: "Camión junta todo igual", value: 12 },
  { label: "Ya reciclo", value: 9 },
  { label: "No sé qué/dónde reciclar", value: 4 },
  { label: "Me quita tiempo", value: 3 },
];

// Cualitativo 2: qué tendría que ofrecer la app
const queOfreceria = [
  { label: "Ver impacto real", value: 22 },
  { label: "Retiro a domicilio", value: 15 },
  { label: "Guía interactiva", value: 14 },
  { label: "Descuentos", value: 9 },
];

function SobreNosotros() {
  const equipo = [
    {
      nombre: "Marianela Sosa",
      rol: "Maga del Frontend Reciclado ✨",
      foto: "/img/equipo/marianela.jpeg",
      emoji: null,
      descripcion:
        "Transforma líneas de código en experiencias que dan ganas de reciclar. Si una pantalla brilla, probablemente pasó por sus manos. Trabaja en equipo o en modo ninja solitario según la misión, y nunca se le acaban las ganas de aprender algo nuevo. Su superpoder: convertir ideas en botones que funcionan (y se ven hermosos).",
    },
    {
      nombre: "Diego Pérez",
      rol: "Murguista & Cultivador de Ideas 🌱",
      foto: "/img/equipo/diego.jpeg",
      emoji: "🌱",
      descripcion:
        "Murguista de oficio y jardinero de proyectos: agarra una semillita de idea y la hace florecer en algo grande. Le pone ritmo, alma y mucha creatividad a BUCLE. Donde otros ven basura, Diego ve un escenario listo para una segunda función. El corazón murguero del equipo.",
    },
    {
      nombre: "Ezequiel Techera",
      rol: "Cyber Bio-Entusiasta 🤖",
      foto: "/img/equipo/ezequiel.jpeg",
      emoji: null,
      descripcion:
        "Mitad científico, mitad artista, mitad cable de red (sí, son tres mitades). Fundador de la comunidad Aillumina, vive enamorado de la física, la programación y los secretos de la información. Conecta el mundo digital con el natural y sueña con un futuro donde la tecnología cuide el planeta. Adaptable como buen reciclador.",
    },
  ];

  return (
    <div className="sobre-nosotros">
      {/* Hero */}
      <div className="sobre-hero">
        <h1>Sobre Nosotros 🌱</h1>
        <p>
          Un proyecto institucional de Anima FINEST 2026 que integra todo lo
          trabajado y aprendido en nuestro camino en una sola misión: una vida
          más digna
        </p>
      </div>

      {/* Visión */}
      <section className="sobre-seccion vision-seccion">
        <div className="vision-contenido">
          <h2>¿Qué es BUCLE?</h2>
          <p>
            BUCLE es una plataforma de reciclaje y voluntariado que busca unir a
            las personas que reciclan con quienes restauran y crean objetos a
            partir de materiales que fueron considerados basura. El nombre
            "BUCLE" representa el ciclo continuo: lo que una persona deja de
            utilizar puede ser aprovechado por otra, extendiendo su vida útil.
          </p>
          <p>
            Este proyecto nace en el marco del Proyecto Final "Vida Digna" y
            atraviesa cada materia del programa: desde el análisis estadístico
            del problema hasta el desarrollo de la plataforma.
          </p>
        </div>
      </section>

      {/* Vida Digna */}
      <section className="sobre-seccion vida-seccion">
        <h2>BUCLE y la Vida Digna</h2>
        <p className="vida-intro">
          Solemos pensar que una vida digna depende solo de lo económico o
          material. Pero creemos que el lugar donde vivimos como sociedad —sus
          calles, plazas y playas— también es parte fundamental de la calidad de
          vida de las personas. Un entorno limpio influye directamente en
          nuestra salud y en nuestro ánimo.
        </p>

        <blockquote className="vida-cita">
          "Las personas tienen dignidad, y no un precio. Una vida digna es
          aquella en la que los seres humanos son tratados como fines en sí
          mismos, y no como simples medios o mercancías."
          <cite>— Adela Cortina, filósofa</cite>
        </blockquote>

        <p className="vida-texto">
          Para nosotros, una vida digna es poder vivir con respeto, bienestar y
          libertad, con las necesidades básicas cubiertas y la posibilidad de
          desarrollarse plenamente. Eso incluye un ambiente sano. Por eso
          elegimos abordar la basura, la contaminación y el mal reciclaje: una
          problemática cotidiana que afecta la salud, el entorno y la calidad de
          vida de las personas y los ecosistemas.
        </p>

        <h3 className="vida-pilares-titulo">
          Cómo BUCLE aporta a una vida más digna
        </h3>
        <div className="vida-pilares">
          <div className="vida-pilar">
            <span className="vida-pilar-emoji">🩺</span>
            <h4>Salud y entorno</h4>
            <p>
              Menos residuos en las calles significa barrios más limpios,
              saludables y agradables para vivir.
            </p>
          </div>
          <div className="vida-pilar">
            <span className="vida-pilar-emoji">🤝</span>
            <h4>Compromiso social</h4>
            <p>
              El voluntariado y la comunidad fomentan el encuentro, la
              colaboración y el sentido de pertenencia.
            </p>
          </div>
          <div className="vida-pilar">
            <span className="vida-pilar-emoji">🎁</span>
            <h4>Beneficios concretos</h4>
            <p>
              Quien recicla o colabora suma "bucles" y los canjea por descuentos
              reales, aplicables al día a día.
            </p>
          </div>
          <div className="vida-pilar">
            <span className="vida-pilar-emoji">🔁</span>
            <h4>Segunda vida útil</h4>
            <p>
              Lo que para alguien es basura, para otro es materia prima. Nada se
              descarta: todo sigue en circulación.
            </p>
          </div>
        </div>

        <p className="vida-cierre">
          Creemos que los grandes cambios empiezan por pequeñas acciones: reciclar,
          reutilizar y poner nuestro granito de arena para que esa basura no
          termine en el medio ambiente. 🌍
        </p>
      </section>

      {/* El problema */}
      <section className="sobre-seccion problema-seccion">
        <h2>El problema que abordamos</h2>
        <p className="problema-intro">
          En Montevideo se generan unas 1.200 toneladas de basura domiciliaria
          por día, es decir más de 600.000 toneladas al año. Gran parte de esos
          residuos podrían reutilizarse. BUCLE busca acortar esa brecha.
        </p>
        <div className="problema-galeria">
          <figure className="problema-foto">
            <img
              src="/img/impacto/basura-playa.png"
              alt="Basura acumulada en las playas"
            />
            <figcaption>El problema: residuos en espacios públicos</figcaption>
          </figure>
          <figure className="problema-foto">
            <img
              src="/img/impacto/playa-comparativa.jpg"
              alt="Comparativa de limpieza de playa antes y después"
            />
            <figcaption>La oportunidad: antes y después de una jornada</figcaption>
          </figure>
          <figure className="problema-foto">
            <img
              src="/img/impacto/contenedores.jpg"
              alt="Contenedores de reciclaje limpios"
            />
            <figcaption>La meta: espacios limpios y ordenados</figcaption>
          </figure>
        </div>
      </section>

      {/* Trabajo por materia */}
      <section className="sobre-seccion materias-seccion">
        <h2>El proyecto en cada materia</h2>
        <p className="materias-intro">
          BUCLE es un trabajo multidisciplinario. Así aportó cada materia de
          Anima a su construcción.
        </p>

        {/* ── Matemáticas ── */}
        <div className="materia-bloque">
          <div className="materia-encabezado">
            <span className="materia-icono">📊</span>
            <div>
              <h3>Matemáticas</h3>
              <p className="materia-subtitulo">
                Estadística aplicada · 37 respuestas recolectadas
              </p>
            </div>
          </div>
          <p className="materia-texto">
            Realizamos una encuesta a personas de entre 15 y 90 años para
            entender los hábitos de reciclaje, las razones por las que la gente
            no separa sus residuos y qué los motivaría a hacerlo. Analizamos los
            datos con herramientas estadísticas y los representamos en gráficas.
          </p>

          <div className="graficas-grid">
            {/* Cuantitativo */}
            <div className="grafica-card">
              <h4>Distribución de edades</h4>
              <span className="grafica-tipo">Dato cuantitativo</span>
              <GraficaHistograma datos={edades} />
              <p className="grafica-nota">
                La muestra abarca un rango amplio de edades, con mayor
                concentración entre los 20 y 40 años.
              </p>
            </div>

            {/* Cualitativo 1 */}
            <div className="grafica-card">
              <h4>¿Por qué no separás tus residuos?</h4>
              <span className="grafica-tipo">Dato cualitativo</span>
              <GraficaBarras datos={razonNoSepara} />
              <p className="grafica-nota">
                La falta de espacio físico y la desconfianza en la recolección
                son las barreras más mencionadas.
              </p>
            </div>

            {/* Cualitativo 2 */}
            <div className="grafica-card">
              <h4>¿Qué te haría empezar a reciclar?</h4>
              <span className="grafica-tipo">Dato cualitativo</span>
              <GraficaDona datos={queOfreceria} />
              <p className="grafica-nota">
                Ver el impacto real de lo reciclado y el retiro a domicilio son
                los incentivos más valorados.
              </p>
            </div>
          </div>
        </div>

        {/* ── Programación ── */}
        <div className="materia-bloque">
          <div className="materia-encabezado">
            <span className="materia-icono">💻</span>
            <div>
              <h3>Programación</h3>
              <p className="materia-subtitulo">
                Desarrollo web · Frontend + Backend
              </p>
            </div>
          </div>
          <p className="materia-texto">
            Construimos BUCLE como una aplicación web completa. La dividimos en
            dos partes: el <strong>frontend</strong> (lo que ve y usa la persona)
            y el <strong>backend</strong> (el servidor que guarda y procesa la
            información). Así cada parte puede crecer de forma independiente.
          </p>

          <div className="prog-grid">
            <div className="prog-card">
              <h4>🎨 Frontend</h4>
              <p>
                La interfaz está hecha con <strong>React</strong> y{" "}
                <strong>Vite</strong>. La organizamos en páginas (Inicio, Tienda,
                Voluntariado, Comunidad, Sobre Nosotros) y componentes
                reutilizables como el menú, las tarjetas y los formularios. Los
                mapas usan <strong>Leaflet</strong> y las gráficas de esta
                sección, <strong>D3.js</strong>.
              </p>
              <div className="prog-tags">
                <span>React</span>
                <span>Vite</span>
                <span>Leaflet</span>
                <span>D3.js</span>
                <span>CSS</span>
              </div>
            </div>

            <div className="prog-card">
              <h4>⚙️ Backend</h4>
              <p>
                El servidor está hecho con <strong>Node.js</strong> y{" "}
                <strong>Express</strong>, exponiendo una API REST para
                autenticación, canastas, voluntariados y usuarios. Los datos se
                guardan en una base <strong>SQLite</strong> gestionada con{" "}
                <strong>Prisma</strong>, y las contraseñas se protegen con
                encriptación.
              </p>
              <div className="prog-tags">
                <span>Node.js</span>
                <span>Express</span>
                <span>Prisma</span>
                <span>SQLite</span>
                <span>JWT</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Equipo */}
      <section className="sobre-seccion equipo-seccion">
        <h2>Nuestro Equipo</h2>
        <p className="equipo-intro">
          Tres personas con pasión por el reciclaje, la tecnología y el cambio
          social.
        </p>
        <div className="equipo-grid">
          {equipo.map((miembro, idx) => (
            <div key={idx} className="equipo-card">
              <div className="equipo-foto">
                {miembro.foto ? (
                  <img src={miembro.foto} alt={miembro.nombre} />
                ) : (
                  <span className="equipo-emoji">{miembro.emoji}</span>
                )}
              </div>
              <h3>{miembro.nombre}</h3>
              <p className="equipo-rol">{miembro.rol}</p>
              <p className="equipo-descripcion">{miembro.descripcion}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contexto Académico */}
      <section className="sobre-seccion academico-seccion">
        <h2>Contexto Académico</h2>
        <div className="academico-contenido">
          <p>
            <strong>Institución:</strong> Anima FINEST 2026
          </p>
          <p>
            <strong>Proyecto Final:</strong> Vida Digna
          </p>
          <p>
            <strong>Grupo:</strong> A - Subgrupo 4
          </p>
          <p>
            BUCLE es un proyecto multidisciplinario donde convergen desarrollo
            web, análisis estadístico, comunicación y responsabilidad social.
            Cada integrante aporta su especialidad para crear una solución
            integral que aborde un problema real de nuestra comunidad.
          </p>
        </div>
      </section>

      {/* Valores */}
      <section className="sobre-seccion valores-seccion">
        <h2>Nuestros Valores</h2>
        <div className="valores-grid">
          <div className="valor-card">
            <span className="valor-emoji">🌍</span>
            <h3>Sostenibilidad</h3>
            <p>
              Cuidamos el planeta reduciendo residuos y promoviendo el reciclaje.
            </p>
          </div>
          <div className="valor-card">
            <span className="valor-emoji">🤝</span>
            <h3>Comunidad</h3>
            <p>
              Creemos en la colaboración y el trabajo conjunto para lograr
              cambios.
            </p>
          </div>
          <div className="valor-card">
            <span className="valor-emoji">💡</span>
            <h3>Innovación</h3>
            <p>
              Usamos tecnología para resolver problemas reales de forma creativa.
            </p>
          </div>
          <div className="valor-card">
            <span className="valor-emoji">✨</span>
            <h3>Dignidad</h3>
            <p>
              Trabajamos por una vida digna para todos, en armonía con el
              entorno.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SobreNosotros;
