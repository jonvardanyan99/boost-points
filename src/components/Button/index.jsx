import classNames from 'classnames';
import { Loader } from 'components/Loader';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './styles.module.scss';

export const Button = ({ className, title, onClick, secondary, loading, disabled }) => {
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
      {loading ? <Loader color={secondary && 'rgb(var(--accent-color))'} /> : title}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  secondary: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
};
