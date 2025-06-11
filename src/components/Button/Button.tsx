import { type ReactNode } from 'react';

import styles from './button.module.css';

type TColors = 'gray' | 'blue' | 'lightgray';

interface ButtonProps {
  onClick?: () => void;
  children: ReactNode;
  color?: TColors;
  value?: string;
}

export const Button = ({ value, children, color = 'gray', onClick }: ButtonProps) => {
  return (
    <button value={value} onClick={onClick} className={`${styles.button} ${styles[color]}`}>
      {children}
    </button>
  );
};
