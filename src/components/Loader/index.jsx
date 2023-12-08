import PropTypes from 'prop-types';
import { React } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';

export const Loader = ({
  color = 'var(--accent-color)',
  size = 30,
  cssOverride = {},
  speedMultiplier,
}) => {
  const css = { display: 'flex', justifyContent: 'center', ...cssOverride };

  return (
    <BeatLoader color={color} size={size} cssOverride={css} speedMultiplier={speedMultiplier} />
  );
};

Loader.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  cssOverride: PropTypes.shape({}),
  speedMultiplier: PropTypes.number,
};
