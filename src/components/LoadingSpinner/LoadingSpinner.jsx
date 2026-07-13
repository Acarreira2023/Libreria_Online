import { Spinner } from 'react-bootstrap';
import styles from './LoadingSpinner.module.css';

function LoadingSpinner({ label = 'Cargando...' }) {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-5" role="status">
      <Spinner animation="border" variant="primary" className="mb-2" />
      <span className="text-muted small">{label}</span>
    </div>
  );
}

export default LoadingSpinner;

