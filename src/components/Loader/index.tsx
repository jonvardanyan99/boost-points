import classNames from 'classnames';
import React from 'react';
import BeatLoader from 'react-spinners/BeatLoader';

import styles from './styles.module.scss';

interface Props {
  className?: string;
  secondary?: boolean;
  forPage?: boolean;
  color?: 'rgb(var(--accent-color))' | 'rgb(var(--white-color))';
  size?: number;
  speedMultiplier?: number;
}

export const Loader: React.FC<Props> = ({
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
