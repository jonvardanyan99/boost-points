import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './styles.module.scss';

export const Button = ({ className, children, disabled }) => {
  return (
    <button
      type="button"
      className={classNames(className, styles.button, { [styles['button--disabled']]: disabled })}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]).isRequired,
  disabled: PropTypes.bool,
};
