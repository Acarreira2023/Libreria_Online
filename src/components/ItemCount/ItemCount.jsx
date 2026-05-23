import { Minus, Plus } from 'lucide-react';
import styles from './ItemCount.module.css';

function ItemCount({ quantity, stock, onAdd, onSubtract, disabled }) {
  return (
    <div className={styles.counter} aria-label="Selector de cantidad">
      <button
        type="button"
        onClick={onSubtract}
        disabled={disabled || quantity <= 1}
        aria-label="Restar unidad"
      >
        <Minus size={16} aria-hidden="true" />
      </button>
      <span>{quantity}</span>
      <button
        type="button"
        onClick={onAdd}
        disabled={disabled || quantity >= stock}
        aria-label="Sumar unidad"
      >
        <Plus size={16} aria-hidden="true" />
      </button>
    </div>
  );
}

export default ItemCount;
