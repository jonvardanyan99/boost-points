import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { Loader } from '../Loader';
import styles from './styles.module.scss';

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
