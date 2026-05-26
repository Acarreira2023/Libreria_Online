import Footer from '../Footer/Footer.jsx';
import Header from '../Header/Header.jsx';
import Reviews from '../Reviews/Reviews.jsx';
import styles from './Layout.module.css';

function Layout({ children }) {
  return (
    <div className={styles.appShell}>
      <Header />
      <main className={styles.mainContent}>{children}</main>
       <Reviews />
      <Footer />
    </div>
  );
}

export default Layout;
