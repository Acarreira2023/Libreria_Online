import { BookOpen } from 'lucide-react';
import NavBar from '../NavBar/NavBar.jsx';
import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <div className={styles.brand}>
          <BookOpen size={30} strokeWidth={2.2} aria-hidden="true" />
          <div>
            <span className={styles.brandName}>Libreria Online</span>
            <span className={styles.brandTagline}>Lecturas para cada momento</span>
          </div>
        </div>
        <NavBar />
      </div>
    </header>
  );
}

export default Header;
