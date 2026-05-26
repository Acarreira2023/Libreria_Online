// src/components/Footer/Footer.jsx
import styles from './Footer.module.css';

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
      </div>
    </footer>
  );
}

export default Footer;