import classNames from 'classnames';
import React, { useCallback, useMemo, useState } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';

import checkMark from '~/assets/icons/check-mark.svg';
import exclamationMark from '~/assets/icons/exclamation-mark.svg';
import { Badge } from '~/components/Badge';
import { Button } from '~/components/Button';
import { Progressbar } from '~/components/Progressbar';
import { Text } from '~/components/Text';
import { ROUTES } from '~/constants/routes';
import { useQuery } from '~/hooks/useQuery';
import { API } from '~/services/api';
import { Agency } from '~/types/models';

import styles from './styles.module.scss';

interface Props {
  className?: string;
  agency: Agency;
  logo: string;
  maxScore: number;
  disabled?: boolean;
}

export const CreditScore: React.FC<Props> = ({ className, agency, logo, maxScore, disabled }) => {
  const navigate = useNavigate();
  const [shouldSendRequests, setShouldSendRequests] = useState(false);

  const { data: reportData, loading: reportLoading } = useQuery({
    requestFn: () => API.getReport({ agency }),
    skip: !shouldSendRequests,
  });
  const { data: creditScoresData, loading: creditScoresLoading } = useQuery({
    requestFn: API.getCreditScores,
    skip: !shouldSendRequests,
  });
  const { data: issuesData, loading: issuesLoading } = useQuery({
    requestFn: API.getIssues,
    skip: !shouldSendRequests,
  });

  const score = useMemo(() => {
    if (creditScoresData) {
      return creditScoresData[agency] || 0;
    }

    return null;
  }, [creditScoresData, agency]);

  const issuesQuantity = useMemo(() => {
    if (issuesData?.data) {
      return issuesData.data[0].qt;
    }

    return null;
  }, [issuesData]);

  const ratingText = useMemo(() => {
    if (score !== null && score >= 1000) {
      return 'Perfect';
    }

    if (score !== null && score < 1000 && score >= 500) {
      return 'Good';
    }

    return 'Bad';
  }, [score]);

  const triggerRequests = useCallback(() => {
    setShouldSendRequests(true);
  }, []);

  const viewReport = useCallback(() => {
    navigate(generatePath(ROUTES.REPORT, { agency }));
  }, [navigate, agency]);

  return (
    <div className={classNames(styles['credit-score'], className)}>
      <div className={styles['credit-score__header']}>
        <img alt={agency} src={logo} />
        {!reportData || !creditScoresData || !issuesData
          ? null
          : score !== null && <Badge text={ratingText} />}
      </div>
      {!reportData || !creditScoresData || !issuesData ? (
        <Button
          className={styles['credit-score__report-button']}
          disabled={disabled}
          loading={reportLoading || creditScoresLoading || issuesLoading}
          title="Request report"
          onClick={triggerRequests}
        />
      ) : (
        <>
          <Progressbar
            className={styles['credit-score__progressbar']}
            maxValue={maxScore}
            value={score || 0}
          />
          <div className={styles['credit-score__issue-wrapper']}>
            <img
              alt={issuesQuantity ? 'exclamation-mark' : 'check-mark'}
              src={issuesQuantity ? exclamationMark : checkMark}
            />
            <Text
              className={classNames(styles['credit-score__issue-text'], {
                [styles['credit-score__issue-text--warning']]: issuesQuantity,
              })}
              type="p5"
            >
              {issuesQuantity ? `${issuesQuantity} issues found` : 'No issues'}
            </Text>
          </div>
          <Button
            secondary
            className={styles['credit-score__view-button']}
            title="View"
            onClick={viewReport}
          />
        </>
      )}
    </div>
  );
};
