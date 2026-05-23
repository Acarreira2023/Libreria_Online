import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

function NotFound() {
  return (
    <section className={styles.notFound}>
      <h1>Pagina no encontrada</h1>
      <p>La ruta solicitada no existe en la libreria.</p>
      <Link to="/">Volver al inicio</Link>
    </section>
  );
}

export default NotFound;
