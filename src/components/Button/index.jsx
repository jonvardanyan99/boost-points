import classNames from 'classnames';
import { Loader } from 'components/Loader';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';

import styles from './styles.module.scss';

export const Button = ({ className, title, onClick, icon, secondary, loading, disabled }) => {
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

Button.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.string,
  secondary: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
};
