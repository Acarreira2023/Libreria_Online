import { ArrowRight, BookMarked, Boxes, Route } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

function Home() {
  return (
    <section className={styles.home}>
      <div className={styles.hero}>
        <div className={styles.heroText}>
          <span className={styles.kicker}>Proyecto React JS</span>
          <h1>Libreria Online</h1>
          <p>
            Catalogo de libros con carga asincronica, rutas dinamicas y carrito
            global para practicar una experiencia SPA completa.
          </p>
          <Link className={styles.cta} to="/productos">
            Ver libros
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className={styles.highlights}>
        <article>
          <BookMarked size={26} aria-hidden="true" />
          <h2>Catalogo</h2>
          <p>Productos cargados desde un JSON local usando `fetch`.</p>
        </article>
        <article>
          <Route size={26} aria-hidden="true" />
          <h2>Rutas</h2>
          <p>Navegacion con React Router y detalle por parametro dinamico.</p>
        </article>
        <article>
          <Boxes size={26} aria-hidden="true" />
          <h2>Carrito</h2>
          <p>Estado global con Context API y control de stock por producto.</p>
        </article>
      </div>
    </section>
  );
}

export default Home;
