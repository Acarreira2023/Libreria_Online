import { ArrowRight, BookHeart, Brain, Code2, Ghost, Heart, Sparkles, Timer } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const categories = [
  { name: 'Tecnico', icon: Code2, description: 'Programacion, herramientas y desarrollo web.' },
  { name: 'Terror', icon: Ghost, description: 'Historias oscuras, misterio y tension.' },
  { name: 'Romantico', icon: Heart, description: 'Novelas de amor, encuentros y emociones.' },
  { name: 'Suspenso', icon: Timer, description: 'Thrillers, crimenes e investigaciones.' },
  { name: 'Metafisico', icon: Brain, description: 'Mente, energia y crecimiento personal.' },
  { name: 'Espiritual', icon: Sparkles, description: 'Calma, proposito y bienestar interior.' },
];

function Home() {
  return (
    <section className={styles.home}>
      <div className={styles.hero}>
        <div className={styles.heroText}>
          <span className={styles.kicker}>Novedades y seleccion editorial</span>
          <h1>Libreria Online</h1>
          <p>
            Encontrá libros técnicos, novelas, suspenso, terror y lecturas de
            bienestar en un catálogo simple para elegir, comprar y seguir leyendo.
          </p>
          <Link className={styles.cta} to="/productos">
            Explorar catalogo
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className={styles.sectionHeading}>
        <BookHeart size={26} aria-hidden="true" />
        <div>
          <span>Categorias destacadas</span>
          <h2>Elegí tu próxima lectura</h2>
        </div>
      </div>

      <div className={styles.categories}>
        {categories.map((category) => {
          const Icon = category.icon;

          return (
            <Link
              className={styles.categoryCard}
              to={`/productos?categoria=${category.name}`}
              key={category.name}
            >
              <Icon size={26} aria-hidden="true" />
              <h3>{category.name}</h3>
              <p>{category.description}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default Home;
