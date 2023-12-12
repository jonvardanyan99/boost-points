import classNames from 'classnames';
import styles from 'components/Button/styles.module.scss';
import { Loader } from 'components/Loader';
import PropTypes from 'prop-types';
import React from 'react';

export const Button = ({ className, title, onClick, loading, disabled }) => {
  return (
    <button
      type="button"
      className={classNames(className, styles.button, {
        [styles['button--disabled']]: disabled,
        [styles['button--loading']]: loading,
      })}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? <Loader /> : title}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
};
