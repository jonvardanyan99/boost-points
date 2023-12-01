import PropTypes from 'prop-types';
import React from 'react';

import styles from './styles.module.scss';

export const Text = ({ type, children, className = '' }) => {
  if (type === 'h1') {
    return <h1 className={`${styles.h1} ${className}`}>{children}</h1>;
  }

  if (type === 'h2') {
    return <h2 className={`${styles.h2} ${className}`}>{children}</h2>;
  }

  if (type === 'h3') {
    return <h3 className={`${styles.h3} ${className}`}>{children}</h3>;
  }

  if (type === 'h4') {
    return <h4 className={`${styles.h4} ${className}`}>{children}</h4>;
  }

  if (type === 'h5') {
    return <h5 className={`${styles.h5} ${className}`}>{children}</h5>;
  }

  if (type === 'h6') {
    return <h6 className={`${styles.h6} ${className}`}>{children}</h6>;
  }

  if (type === 'p1') {
    return <p className={`${styles.p1} ${className}`}>{children}</p>;
  }

  if (type === 'p2') {
    return <p className={`${styles.p2} ${className}`}>{children}</p>;
  }

  if (type === 'p3') {
    return <p className={`${styles.p3} ${className}`}>{children}</p>;
  }

  if (type === 'p4') {
    return <p className={`${styles.p4} ${className}`}>{children}</p>;
  }

  if (type === 'p5') {
    return <p className={`${styles.p5} ${className}`}>{children}</p>;
  }

  if (type === 'p6') {
    return <p className={`${styles.p6} ${className}`}>{children}</p>;
  }

  return null;
};

Text.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
};
