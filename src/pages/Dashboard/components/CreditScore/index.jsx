import checkMark from 'assets/icons/check-mark.svg';
import exclamationMark from 'assets/icons/exclamation-mark.svg';
import classNames from 'classnames';
import { Button } from 'components/Button';
import { Progressbar } from 'components/Progressbar';
import { Text } from 'components/Text';
import { ROUTES } from 'constants/routes';
import { useErrorHandler } from 'hooks/useErrorHandler';
import { useMutation } from 'hooks/useMutation';
import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { API } from 'services/api';

import styles from './styles.module.scss';

export const CreditScore = ({ className, agency, logo, maxScore, disabled }) => {
  const navigate = useNavigate();
  const [creditScore, setCreditScore] = useState(null);
  const [issuesCount, setIssuesCount] = useState(null);
  const { handleApiError, snackbar } = useErrorHandler();

  const sendReportRequest = async () => {
    try {
      await API.getReport(agency);
      const scoresResponse = await API.getCreditScores();
      const issuesResponse = await API.getIssues();

      setCreditScore(scoresResponse.data[agency] || 0);
      setIssuesCount(issuesResponse.data.data[0].qt);
    } catch (error) {
      handleApiError(error);
    }
  };

  const [requestReport, { loading }] = useMutation(sendReportRequest);

  const ratingText = useMemo(() => {
    if (creditScore >= 1000) {
      return 'Perfect';
    }

    if (creditScore < 1000 && creditScore >= 500) {
      return 'Good';
    }

    return 'Bad';
  }, [creditScore]);

  const viewReport = () => {
    navigate(generatePath(ROUTES.REPORT, { agency }));
  };

  return (
    <div className={classNames(styles['credit-score'], className)}>
      <div className={styles['credit-score__header']}>
        <img src={logo} alt={agency} />
        {creditScore !== null && (
          <div className={styles['credit-score__rating-wrapper']}>
            <Text type="p6" className={styles['credit-score__rating']}>
              {ratingText}
            </Text>
          </div>
        )}
      </div>
      {creditScore === null ? (
        <Button
          className={styles['credit-score__report-button']}
          title="Request report"
          onClick={requestReport}
          loading={loading}
          disabled={disabled}
        />
      ) : (
        <>
          <Progressbar
            className={styles['credit-score__progressbar']}
            value={creditScore}
            maxValue={maxScore}
          />
          <div className={styles['credit-score__issue-wrapper']}>
            <img
              src={issuesCount ? exclamationMark : checkMark}
              alt={issuesCount ? 'exclamation-mark' : 'check-mark'}
            />
            <Text
              type="p5"
              className={classNames(styles['credit-score__issue-text'], {
                [styles['credit-score__issue-text--warning']]: issuesCount,
              })}
            >
              {issuesCount ? `${issuesCount} issues found` : 'No issues'}
            </Text>
          </div>
          <Button
            className={styles['credit-score__view-button']}
            title="View"
            onClick={viewReport}
            secondary
          />
        </>
      )}
      {snackbar}
    </div>
  );
};

CreditScore.propTypes = {
  className: PropTypes.string,
  agency: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  maxScore: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
};
