import exclamationMarkFilled from 'assets/icons/exclamation-mark-filled.svg';
import { Button } from 'components/Button';
import { Text } from 'components/Text';
import { ROUTES } from 'constants/routes';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';

import styles from './styles.module.scss';

export const Issue = ({ data, agency }) => {
  const navigate = useNavigate();

  const navigateToDispute = useCallback(() => {
    navigate(generatePath(ROUTES.DISPUTE, { uuid: data.uuid }), { state: { agency } });
  }, [navigate, data.uuid, agency]);

  return (
    <div className={styles.issue}>
      <div className={styles['issue__heading-wrapper']}>
        <img src={exclamationMarkFilled} alt="exclamation-mark-filled" />
        <Text type="p4" fontWeight={600}>
          {data.name}
        </Text>
      </div>
      <Text type="p4" className={styles.issue__description}>
        {data.description}
      </Text>
      <Button className={styles.issue__button} title="Dispute" onClick={navigateToDispute} />
    </div>
  );
};

Issue.propTypes = {
  data: PropTypes.shape({}).isRequired,
  agency: PropTypes.string.isRequired,
};
