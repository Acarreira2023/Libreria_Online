import { Star } from 'lucide-react';
import styles from './Footer.module.css';

const reviews = [
  {
    name: 'Ana Martinez',
    comment: 'Compre una novela de suspenso y llego rapido, muy bien cuidada.',
    avatar: '/images/cliente-ana.svg',
  },
  {
    name: 'Bruno Gomez',
    comment: 'El catalogo por categorias me ayudo a encontrar libros tecnicos enseguida.',
    avatar: '/images/cliente-bruno.svg',
  },
  {
    name: 'Carla Ruiz',
    comment: 'Muy buena seleccion de libros espirituales y proceso de compra simple.',
    avatar: '/images/cliente-carla.svg',
  },
];

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <section className={styles.info}>
          <h2>Libreria Online</h2>
          <p>
            Somos una libreria online dedicada a acercarte lecturas tecnicas,
            creativas y profesionales con una compra simple, rapida y segura.
          </p>
        </section>

        <section className={styles.reviews} aria-label="Opiniones de clientes">
          {reviews.map((review) => (
            <article className={styles.reviewCard} key={review.name}>
              <img className={styles.avatar} src={review.avatar} alt={`Foto de ${review.name}`} />
              <div>
                <h3>{review.name}</h3>
                <div className={styles.stars} aria-label="Calificacion de 5 estrellas">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star size={15} fill="currentColor" strokeWidth={0} key={star} />
                  ))}
                </div>
                <p>{review.comment}</p>
              </div>
            </article>
          ))}
        </section>
      </div>
    </footer>
  );
}

export default Footer;
