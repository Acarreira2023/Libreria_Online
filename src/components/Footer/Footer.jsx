import styles from './Footer.module.css';

const creators = [
  {
    name: 'Ana Biblioteca',
    role: 'Catalogo y contenido',
  },
  {
    name: 'Bruno Dev',
    role: 'Frontend React',
  },
  {
    name: 'Carla UX',
    role: 'Experiencia de compra',
  },
];

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <section className={styles.info}>
          <h2>Libreria Online</h2>
          <p>
            Tienda digital de libros tecnicos y creativos. Pre-entrega React JS con
            catalogo, ruteo y carrito gestionado con Context API.
          </p>
        </section>

        <section className={styles.team} aria-label="Creadores del sitio">
          {creators.map((creator) => (
            <article className={styles.creatorCard} key={creator.name}>
              <span className={styles.avatar}>{creator.name.charAt(0)}</span>
              <div>
                <h3>{creator.name}</h3>
                <p>{creator.role}</p>
              </div>
            </article>
          ))}
        </section>
      </div>
    </footer>
  );
}

export default Footer;
