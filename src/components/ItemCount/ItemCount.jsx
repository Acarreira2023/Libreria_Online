import { FaMinus, FaPlus } from 'react-icons/fa';
import styles from './ItemCount.module.css';

function ItemCount({ quantity, stock, onAdd, onSubtract, disabled }) {
  return (
    <div className={styles.counter} aria-label="Selector de cantidad">
      <button
        type="button"
        onClick={onSubtract}
        disabled={disabled || quantity <= 1}
        aria-label="Restar unidad"
        className="btn btn-outline-secondary btn-sm d-flex align-items-center justify-content-center"
        style={{ width: '32px', height: '32px', padding: '0' }}
      >
        <FaMinus size={12} aria-hidden="true" />
      </button>
      <span className="mx-3 fw-bold">{quantity}</span>
      <button
        type="button"
        onClick={onAdd}
        disabled={disabled || quantity >= stock}
        aria-label="Sumar unidad"
        className="btn btn-outline-secondary btn-sm d-flex align-items-center justify-content-center"
        style={{ width: '32px', height: '32px', padding: '0' }}
      >
        <FaPlus size={12} aria-hidden="true" />
      </button>
    </div>
  );
}

export default ItemCount;

