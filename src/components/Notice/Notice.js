import { useMemo } from 'react';
import styles from './styles.module.css';

export const Notice = ({ mode, onClose, message }) => {
  const classes = useMemo(
    () => [styles.notice, styles[mode]].join(''),
    [mode],
  );

  return (
    <div onClick={onClose} className={classes}>
      <div className={styles.message}>{message}</div>
    </div>
  );
};
