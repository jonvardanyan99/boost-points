import React, { useCallback } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';

import exclamationMarkFilled from '~/assets/icons/exclamation-mark-filled.svg';
import { Button } from '~/components/Button';
import { Text } from '~/components/Text';
import { ROUTES } from '~/constants/routes';
import { AgencyIssue } from '~/types/models';

import styles from './styles.module.scss';

interface Props {
  data: AgencyIssue;
  agency: string;
}

export const Issue: React.FC<Props> = ({ data, agency }) => {
  const navigate = useNavigate();

  const navigateToDispute = useCallback(() => {
    navigate(generatePath(ROUTES.DISPUTE, { uuid: data.uuid }), { state: { agency } });
  }, [navigate, data.uuid, agency]);

  return (
    <div className={styles.issue}>
      <div className={styles['issue__heading-wrapper']}>
        <img alt="exclamation-mark-filled" src={exclamationMarkFilled} />
        <Text fontWeight={600} type="p4">
          {data.name}
        </Text>
      </div>
      <Text className={styles.issue__description} type="p4">
        {data.description}
      </Text>
      <Button className={styles.issue__button} title="Dispute" onClick={navigateToDispute} />
    </div>
  );
};
