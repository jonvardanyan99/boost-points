import classNames from 'classnames';
import PropTypes from 'prop-types';
import { React } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';

import styles from './styles.module.scss';

export const Loader = ({
  className,
  secondary,
  forPage,
  color = secondary || forPage ? 'rgb(var(--accent-color))' : 'rgb(var(--white-color))',
  size = forPage ? 25 : 10,
  speedMultiplier,
}) => {
  return (
    <BeatLoader
      className={classNames(styles.loader, { [styles['loader--for-page']]: forPage }, className)}
      color={color}
      size={size}
      speedMultiplier={speedMultiplier}
    />
  );
};

Loader.propTypes = {
  className: PropTypes.string,
  secondary: PropTypes.bool,
  forPage: PropTypes.bool,
  color: PropTypes.string,
  size: PropTypes.number,
  speedMultiplier: PropTypes.number,
};
