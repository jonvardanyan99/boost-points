import classNames from 'classnames';
import React from 'react';
import { generatePath, useNavigate } from 'react-router-dom';

import rightArrowGray from '~/assets/icons/right-arrow-gray-4.svg';
import equifax from '~/assets/images/equifax.svg';
import { Badge } from '~/components/Badge';
import { Loader } from '~/components/Loader';
import { Text } from '~/components/Text';
import { ROUTES } from '~/constants/routes';
import { useQuery } from '~/hooks/useQuery';
import { API } from '~/services/api';

import styles from './styles.module.scss';

export const Disputes: React.FC = () => {
  const navigate = useNavigate();

  const { data, loading } = useQuery({ requestFn: API.getDisputes });

  const navigateToDetails = (uuid: string) => {
    navigate(generatePath(ROUTES.DISPUTE_DETAILS, { uuid }));
  };

  return (
    <div className={styles.disputes}>
      {loading ? (
        <Loader forPage />
      ) : (
        <div
          className={classNames(styles.disputes__container, {
            [styles['disputes__container--empty']]: !data?.total,
          })}
        >
          {data?.total ? (
            <>
              <Text type="h6">Disputes</Text>
              <div className={styles['disputes__text-wrapper']}>
                <Text className={styles.disputes__text} type="p4">{`${data?.active} active`}</Text>
                <Text className={styles.disputes__text} type="p4">
                  •
                </Text>
                <Text className={styles.disputes__text} type="p4">
                  {`${data?.total} in total`}
                </Text>
              </div>
              <div className={styles['disputes__agency-container']}>
                <img alt="equifax" src={equifax} />
                <div className={styles['disputes__disputes-container']}>
                  {data?.data?.map(dispute => (
                    <button
                      className={styles.disputes__dispute}
                      key={dispute.uuid}
                      type="button"
                      onClick={() => navigateToDetails(dispute.uuid)}
                    >
                      <div>
                        <Text fontWeight={600} type="p3">
                          {dispute.name}
                        </Text>
                        <Badge
                          className={
                            dispute.status === 'Resolved'
                              ? styles['disputes__resolved-badge']
                              : styles['disputes__in-progress-badge']
                          }
                          text={dispute.status}
                        />
                      </div>
                      <img alt="right-arrow-gray" src={rightArrowGray} />
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <Text className={styles['disputes__empty-text']} type="p4">
              Your past and current disputes will be here
            </Text>
          )}
        </div>
      )}
    </div>
  );
};
