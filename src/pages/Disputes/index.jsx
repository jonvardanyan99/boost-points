import rightArrowGray from 'assets/icons/right-arrow-gray-4.svg';
import equifax from 'assets/images/equifax.svg';
import classNames from 'classnames';
import { Badge } from 'components/Badge';
import { Loader } from 'components/Loader';
import { Text } from 'components/Text';
import { ROUTES } from 'constants/routes';
import { useQuery } from 'hooks/useQuery';
import React from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { API } from 'services/api';

import styles from './styles.module.scss';

export const Disputes = () => {
  const navigate = useNavigate();

  const { data, loading } = useQuery({ requestFn: API.getDisputes });

  const navigateToDetails = uuid => {
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
                <Text type="p4" className={styles.disputes__text}>{`${data?.active} active`}</Text>
                <Text type="p4" className={styles.disputes__text}>
                  •
                </Text>
                <Text type="p4" className={styles.disputes__text}>
                  {`${data?.total} in total`}
                </Text>
              </div>
              <div className={styles['disputes__agency-container']}>
                <img src={equifax} alt="equifax" />
                <div className={styles['disputes__disputes-container']}>
                  {data?.data?.map(dispute => (
                    <button
                      key={dispute.uuid}
                      type="button"
                      className={styles.disputes__dispute}
                      onClick={() => navigateToDetails(dispute.uuid)}
                    >
                      <div>
                        <Text type="p3" fontWeight={600}>
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
                      <img src={rightArrowGray} alt="right-arrow-gray" />
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <Text type="p4" className={styles['disputes__empty-text']}>
              Your past and current disputes will be here
            </Text>
          )}
        </div>
      )}
    </div>
  );
};
