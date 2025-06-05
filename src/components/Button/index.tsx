import classNames from 'classnames';
import React, { useMemo } from 'react';

import { Loader } from '~/components/Loader';

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
          <img alt="icon" src={icon} />
          {title}
        </>
      );
    }

    return title;
  }, [title, icon]);

  return (
    <button
      className={classNames(
        styles.button,
        {
          [styles['button--secondary']]: secondary,
          [styles['button--disabled']]: disabled,
          [styles['button--loading']]: loading,
        },
        className,
      )}
      disabled={disabled || loading}
      type="button"
      onClick={onClick}
    >
      {loading ? <Loader secondary={secondary} /> : buttonContent}
    </button>
  );
};
