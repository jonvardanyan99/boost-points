import classNames from 'classnames';
import { Loader } from 'components/Loader';
import React, { useMemo } from 'react';

import styles from './styles.module.scss';

interface Props {
  className?: string;
  title: string;
  onClick: () => void;
  icon?: string;
  secondary?: boolean;
  loading?: boolean;
  disabled?: boolean;
}

export const Button: React.FC<Props> = ({
  className,
  title,
  onClick,
  icon,
  secondary,
  loading,
  disabled,
}) => {
  const buttonContent = useMemo(() => {
    if (icon) {
      return (
        <>
          <img src={icon} alt="icon" />
          {title}
        </>
      );
    }

    return title;
  }, [title, icon]);

  return (
    <button
      type="button"
      className={classNames(
        styles.button,
        {
          [styles['button--secondary']]: secondary,
          [styles['button--disabled']]: disabled,
          [styles['button--loading']]: loading,
        },
        className,
      )}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? <Loader secondary={secondary} /> : buttonContent}
    </button>
  );
};
