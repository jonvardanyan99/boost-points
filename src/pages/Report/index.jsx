import approveCircle from 'assets/icons/approve-circle.svg';
import disapproveCircle from 'assets/icons/disapprove-circle.svg';
import emptyCircle from 'assets/icons/empty-circle.svg';
import { Loader } from 'components/Loader';
import { Progressbar } from 'components/Progressbar';
import { Text } from 'components/Text';
import format from 'date-fns/format';
import { useQuery } from 'hooks/useQuery';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { API } from 'services/api';
import { selectAccount } from 'store/slices/user/selectors';
import { capitalize } from 'utils/helpers';

import { IssueCategory } from './components/IssueCategory';
import styles from './styles.module.scss';

const issueCategories = [
  'Identity issues',
  'Credit enquires',
  'Adverse on file',
  'Defaults',
  'Insolvencies & Actions',
];

export const Report = () => {
  const account = useSelector(selectAccount);
  const params = useParams();
  const { agency } = params;

  const { data: reportData, loading: reportLoading } = useQuery({
    requestFn: () => API.getReport(agency),
  });
  const { data: issuesData, loading: issuesLoading } = useQuery({ requestFn: API.getIssues });

  return (
    <div className={styles.report}>
      {reportLoading || issuesLoading ? (
        <Loader forPage />
      ) : (
        <>
          <div className={styles['report__content-header']}>
            <Text type="p1" fontWeight={600}>
              {`${capitalize(agency)} report`}
            </Text>
            <div className={styles['report__date-wrapper']}>
              <Text type="p5" className={styles['report__date-text']}>
                {account.data.fullName}
              </Text>
              <Text type="p5" className={styles['report__date-text']}>
                •
              </Text>
              <Text type="p5" className={styles['report__date-text']}>
                {reportData?.creditEnquiries
                  ? `From ${format(
                      new Date(reportData.creditEnquiries[0].enquiryDate),
                      'dd MMM y',
                    )}`
                  : 'No date'}
              </Text>
            </div>
          </div>
          <div className={styles.report__content}>
            <div className={styles.report__overview}>
              <Text type="h6">Overview</Text>
              <div className={styles['report__progressbar-container']}>
                <Progressbar
                  width="148px"
                  height="148px"
                  value={Number(reportData?.scores?.oneScore) || 0}
                  maxValue={1200}
                />
              </div>
              <div className={styles['report__credit-info']}>
                <div>
                  <div className={styles['report__circle-wrapper']}>
                    <img src={approveCircle} alt="approve-circle" />
                    <img src={approveCircle} alt="approve-circle" />
                    <img src={emptyCircle} alt="empty-circle" />
                  </div>
                  <Text type="p4" fontWeight={600} className={styles['report__credit-info-title']}>
                    Account Repayment History
                  </Text>
                  <Text type="p4" className={styles['report__credit-info-text']}>
                    Repayment history information can have an impact on risk.
                  </Text>
                </div>
                <div>
                  <div className={styles['report__circle-wrapper']}>
                    <img src={approveCircle} alt="approve-circle" />
                    <img src={emptyCircle} alt="empty-circle" />
                    <img src={emptyCircle} alt="empty-circle" />
                  </div>
                  <Text type="p4" fontWeight={600} className={styles['report__credit-info-title']}>
                    Lack of Consumer Adverse Information
                  </Text>
                  <Text type="p4" className={styles['report__credit-info-text']}>
                    Having no consumer adverse information can have an impact on risk.
                  </Text>
                </div>
                <div>
                  <div className={styles['report__circle-wrapper']}>
                    <img src={disapproveCircle} alt="disapprove-circle" />
                    <img src={disapproveCircle} alt="disapprove-circle" />
                    <img src={emptyCircle} alt="empty-circle" />
                  </div>
                  <Text type="p4" fontWeight={600} className={styles['report__credit-info-title']}>
                    Historical Consumer Credit Application Information
                  </Text>
                  <Text type="p4" className={styles['report__credit-info-text']}>
                    The type and frequency of historical credit applications can be an indicator of
                    risk.
                  </Text>
                </div>
                <div>
                  <div className={styles['report__circle-wrapper']}>
                    <img src={disapproveCircle} alt="disapprove-circle" />
                    <img src={emptyCircle} alt="empty-circle" />
                    <img src={emptyCircle} alt="empty-circle" />
                  </div>
                  <Text type="p4" fontWeight={600} className={styles['report__credit-info-title']}>
                    Recent Consumer Credit Application Information
                  </Text>
                  <Text type="p4" className={styles['report__credit-info-text']}>
                    Recent credit applications made can have an impact on risk.
                  </Text>
                </div>
              </div>
            </div>
            <div className={styles['report__issues-review']}>
              <Text type="h6">Identified errors</Text>
              <Text type="p4" className={styles['report__issues-instruction']}>
                Review the issues we found and request a dispute if any of this information needs to
                be changed
              </Text>
              <div className={styles['report__issues-container']}>
                {issueCategories.map(category => (
                  <IssueCategory
                    key={category}
                    name={category}
                    issues={issuesData?.data || []}
                    agency={agency}
                  />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
