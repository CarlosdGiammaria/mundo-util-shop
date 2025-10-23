import "../css/Home.css";
import logo from "../assets/mejorca.png"; // ✅ importa la imagen
const Home = () => {
  return (
    <div className="home-container">
      <div className="prin">
        <img src={logo} alt="logo" className="home-logo " />
        <h1 className="home-title">Mundo Útil</h1>
      </div>
      <p className="home-subtitle">
        ¡Crea, diseña y construye tu mundo en un solo lugar</p>    <section className="home-section">
        <h2 className="section-title">Misión de Mundo Útil</h2>
        <p className="section-text">
          En <strong>Mundo Útil</strong> nos dedicamos a ofrecer una amplia variedad de productos de papelería,
          útiles escolares, artículos de oficina y materiales de arte, garantizando siempre la mejor calidad y precios accesibles.
          Nuestra misión es brindar a cada cliente una atención amable, rápida y personalizada, asegurando que encuentre
          todo lo que necesita para sus estudios, su trabajo o su empresa en un solo lugar.
          <br /><br />
          Buscamos facilitar las actividades educativas y laborales de nuestra comunidad, apoyando el aprendizaje,
          la organización y la productividad a través de productos útiles, confiables y actuales.
          Nos comprometemos a mantener un ambiente de servicio basado en el respeto, la honestidad y la satisfacción total del cliente.
        </p>
      </section>

      <section className="home-section">
        <h2 className="section-title">Visión de Mundo Útil</h2>
        <p className="section-text">
          Nuestra visión es consolidarnos como una papelería líder en el mercado local y regional, reconocida por su compromiso
          con la calidad, la innovación y la excelencia en el servicio. Queremos ser la primera opción para estudiantes, docentes,
          empresas y profesionales que buscan confianza y variedad en artículos de papelería y oficina.
          <br /><br />
          A futuro, aspiramos a expandir nuestra presencia con nuevas sucursales y servicios digitales, adaptándonos a las necesidades
          modernas del consumidor y contribuyendo al desarrollo educativo, social y económico de nuestra comunidad.
        </p>
      </section>

      <a href="/productos" className="home-button">Ver Productos <i className='bx bx-store'></i></a>
    </div>
  );
};

export default Home;
