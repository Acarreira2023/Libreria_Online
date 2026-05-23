import styles from './LoadingSpinner.module.css';

function LoadingSpinner({ label = 'Cargando...' }) {
  return (
    <div className={styles.loading} role="status">
      <span className={styles.spinner} aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

export default LoadingSpinner;
