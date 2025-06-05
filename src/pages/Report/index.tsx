import { format } from 'date-fns/format';
import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import approveCircle from '~/assets/icons/approve-circle.svg';
import disapproveCircle from '~/assets/icons/disapprove-circle.svg';
import emptyCircle from '~/assets/icons/empty-circle.svg';
import { Loader } from '~/components/Loader';
import { Progressbar } from '~/components/Progressbar';
import { Text } from '~/components/Text';
import { useQuery } from '~/hooks/useQuery';
import { API } from '~/services/api';
import { useAppSelector } from '~/store/hooks';
import { selectAccount } from '~/store/slices/user/selectors';
import { Agency, AgencyIssueCategory } from '~/types/models';
import { capitalize } from '~/utils/helpers';

import { IssueCategory } from './components/IssueCategory';
import styles from './styles.module.scss';

const issueCategories: AgencyIssueCategory[] = [
  'Identity issues',
  'Credit enquires',
  'Adverse on file',
  'Defaults',
  'Insolvencies & Actions',
];

export const Report: React.FC = () => {
  const account = useAppSelector(selectAccount);
  const params = useParams();
  const { agency } = params as { agency: Agency };

  const { data: reportData, loading: reportLoading } = useQuery({
    requestFn: () => API.getReport({ agency }),
  });
  const { data: issuesData, loading: issuesLoading } = useQuery({ requestFn: API.getIssues });

  const typedAccount = useMemo(() => {
    return account as NonNullable<typeof account>;
  }, [account]);

  return (
    <div className={styles.report}>
      {reportLoading || issuesLoading ? (
        <Loader forPage />
      ) : (
        <>
          <div className={styles['report__content-header']}>
            <Text fontWeight={600} type="p1">
              {`${capitalize(agency)} report`}
            </Text>
            <div className={styles['report__date-wrapper']}>
              <Text className={styles['report__date-text']} type="p5">
                {typedAccount.data.fullName}
              </Text>
              <Text className={styles['report__date-text']} type="p5">
                •
              </Text>
              <Text className={styles['report__date-text']} type="p5">
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
                  height="148px"
                  maxValue={1200}
                  value={Number(reportData?.scores?.oneScore) || 0}
                  width="148px"
                />
              </div>
              <div className={styles['report__credit-info']}>
                <div>
                  <div className={styles['report__circle-wrapper']}>
                    <img alt="approve-circle" src={approveCircle} />
                    <img alt="approve-circle" src={approveCircle} />
                    <img alt="empty-circle" src={emptyCircle} />
                  </div>
                  <Text className={styles['report__credit-info-title']} fontWeight={600} type="p4">
                    Account Repayment History
                  </Text>
                  <Text className={styles['report__credit-info-text']} type="p4">
                    Repayment history information can have an impact on risk.
                  </Text>
                </div>
                <div>
                  <div className={styles['report__circle-wrapper']}>
                    <img alt="approve-circle" src={approveCircle} />
                    <img alt="empty-circle" src={emptyCircle} />
                    <img alt="empty-circle" src={emptyCircle} />
                  </div>
                  <Text className={styles['report__credit-info-title']} fontWeight={600} type="p4">
                    Lack of Consumer Adverse Information
                  </Text>
                  <Text className={styles['report__credit-info-text']} type="p4">
                    Having no consumer adverse information can have an impact on risk.
                  </Text>
                </div>
                <div>
                  <div className={styles['report__circle-wrapper']}>
                    <img alt="disapprove-circle" src={disapproveCircle} />
                    <img alt="disapprove-circle" src={disapproveCircle} />
                    <img alt="empty-circle" src={emptyCircle} />
                  </div>
                  <Text className={styles['report__credit-info-title']} fontWeight={600} type="p4">
                    Historical Consumer Credit Application Information
                  </Text>
                  <Text className={styles['report__credit-info-text']} type="p4">
                    The type and frequency of historical credit applications can be an indicator of
                    risk.
                  </Text>
                </div>
                <div>
                  <div className={styles['report__circle-wrapper']}>
                    <img alt="disapprove-circle" src={disapproveCircle} />
                    <img alt="empty-circle" src={emptyCircle} />
                    <img alt="empty-circle" src={emptyCircle} />
                  </div>
                  <Text className={styles['report__credit-info-title']} fontWeight={600} type="p4">
                    Recent Consumer Credit Application Information
                  </Text>
                  <Text className={styles['report__credit-info-text']} type="p4">
                    Recent credit applications made can have an impact on risk.
                  </Text>
                </div>
              </div>
            </div>
            <div className={styles['report__issues-review']}>
              <Text type="h6">Identified errors</Text>
              <Text className={styles['report__issues-instruction']} type="p4">
                Review the issues we found and request a dispute if any of this information needs to
                be changed
              </Text>
              <div className={styles['report__issues-container']}>
                {issueCategories.map(category => (
                  <IssueCategory
                    agency={agency}
                    issues={issuesData?.data || []}
                    key={category}
                    name={category}
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
