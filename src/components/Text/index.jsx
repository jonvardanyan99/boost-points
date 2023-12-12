import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './styles.module.scss';

export const Text = ({ type, children, className, fontWeight }) => {
  if (type === 'h1') {
    return <h1 className={classNames(styles.h1, className)}>{children}</h1>;
  }

  if (type === 'h2') {
    return <h2 className={classNames(styles.h2, className)}>{children}</h2>;
  }

  if (type === 'h3') {
    return <h3 className={classNames(styles.h3, className)}>{children}</h3>;
  }

  if (type === 'h4') {
    return <h4 className={classNames(styles.h4, className)}>{children}</h4>;
  }

  if (type === 'h5') {
    return <h5 className={classNames(styles.h5, className)}>{children}</h5>;
  }

  if (type === 'h6') {
    return <h6 className={classNames(styles.h6, className)}>{children}</h6>;
  }

  if (type === 'p1') {
    return (
      <p className={classNames(styles.p1, className, styles[`p1--weight-${fontWeight}`])}>
        {children}
      </p>
    );
  }

  if (type === 'p2') {
    return (
      <p className={classNames(styles.p2, className, styles[`p2--weight-${fontWeight}`])}>
        {children}
      </p>
    );
  }

  if (type === 'p3') {
    return (
      <p className={classNames(styles.p3, className, styles[`p3--weight-${fontWeight}`])}>
        {children}
      </p>
    );
  }

  if (type === 'p4') {
    return (
      <p className={classNames(styles.p4, className, styles[`p4--weight-${fontWeight}`])}>
        {children}
      </p>
    );
  }

  if (type === 'p5') {
    return (
      <p className={classNames(styles.p5, className, styles[`p5--weight-${fontWeight}`])}>
        {children}
      </p>
    );
  }

  if (type === 'p6') {
    return (
      <p className={classNames(styles.p6, className, styles[`p6--weight-${fontWeight}`])}>
        {children}
      </p>
    );
  }

  return null;
};

Text.propTypes = {
  type: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p1', 'p2', 'p3', 'p4', 'p5', 'p6'])
    .isRequired,
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  fontWeight: PropTypes.oneOf([400, 500, 600, 700]),
};
