import approveCircle from 'assets/icons/approve-circle.svg';
import incompleteCircle from 'assets/icons/incomplete-circle.svg';
import equifax from 'assets/images/equifax.svg';
import { Badge } from 'components/Badge';
import { Loader } from 'components/Loader';
import { PopupModal } from 'components/PopupModal';
import { Text } from 'components/Text';
import { ROUTES } from 'constants/routes';
import format from 'date-fns/format';
import { useErrorHandler } from 'hooks/useErrorHandler';
import { useMutation } from 'hooks/useMutation';
import { useQuery } from 'hooks/useQuery';
import React, { useCallback, useMemo, useState } from 'react';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { API } from 'services/api';

import { Actions } from './components/Actions';
import { ActionTaken } from './components/ActionTaken';
import styles from './styles.module.scss';

const formatDate = date => {
  return format(new Date(date), 'dd MMM y');
};

export const DisputeDetails = () => {
  const params = useParams();
  const { uuid } = params;
  const navigate = useNavigate();
  const [action, setAction] = useState('');
  const [popupModalVisible, setPopupModalVisible] = useState(false);
  const { handleApiError, snackbar } = useErrorHandler();

  const { data, loading: dataLoading } = useQuery({ requestFn: () => API.getDispute(uuid) });

  const closeDisputeRequest = useCallback(async () => {
    try {
      await API.sendDisputeAction(uuid, 'close', {
        data: {},
        files: [],
      });

      setPopupModalVisible(true);
    } catch (error) {
      handleApiError(error);
    }
  }, [uuid, handleApiError]);

  const [closeDispute, { loading: actionLoading }] = useMutation(closeDisputeRequest);

  const disputeCreatedStage = useMemo(() => {
    return data?.stages.find(stage => stage.name === 'Dispute created');
  }, [data?.stages]);

  const responseReceivedStage = useMemo(() => {
    return data?.stages.find(stage => stage.name === 'Response received from Equifax');
  }, [data?.stages]);

  const takenActions = useMemo(() => {
    const filteredStages = data?.stages.filter(
      stage =>
        stage.name === 'Dispute closed' ||
        stage.name === 'Dispute updated' ||
        stage.name === 'Dispute further' ||
        stage.name === 'Dispute escalated',
    );

    if (filteredStages?.length) {
      return filteredStages;
    }

    return [];
  }, [data?.stages]);

  const selectAction = useCallback(event => {
    setAction(event.target.value);
  }, []);

  const handleActionSelect = useCallback(() => {
    if (action === 'close') {
      closeDispute();
    } else if (action === 'refine') {
      navigate(generatePath(ROUTES.UPDATE_DISPUTE, { uuid }), {
        state: { disputeName: data?.name },
      });
    } else if (action === 'further') {
      navigate(generatePath(ROUTES.DISPUTE_FURTHER, { uuid }));
    } else if (action === 'escalate') {
      navigate(generatePath(ROUTES.ESCALATE_DISPUTE, { uuid }));
    }
  }, [action, closeDispute, navigate, uuid, data?.name]);

  const closePopupModal = useCallback(() => {
    setPopupModalVisible(false);
  }, []);

  const navigateToDisputes = useCallback(() => {
    setPopupModalVisible(false);

    navigate(ROUTES.DISPUTES);
  }, [navigate]);

  return (
    <div className={styles.details}>
      {dataLoading ? (
        <Loader forPage />
      ) : (
        data && (
          <>
            <div className={styles.details__header}>
              <Text type="p1" fontWeight={600}>
                {data.name}
              </Text>
            </div>
            <div className={styles.details__content}>
              <div className={styles.details__summary}>
                <Text type="h6">Summary</Text>
                <div className={styles['details__summary-container']}>
                  <div>
                    <Text type="p4" className={styles['details__summary-label']}>
                      Agency
                    </Text>
                    <img
                      src={equifax}
                      className={styles.details__logo}
                      width="74px"
                      height="24px"
                      alt="equifax"
                    />
                    <Text type="p4" className={styles['details__summary-label']}>
                      Dispute No
                    </Text>
                    <Text type="p4" className={styles['details__summary-value']}>
                      {data.number}
                    </Text>
                  </div>
                  <div>
                    <Text type="p4" className={styles['details__summary-label']}>
                      Dispute status
                    </Text>
                    <Badge
                      className={
                        data.status === 'In progress'
                          ? styles['details__in-progress-badge']
                          : styles['details__resolved-badge']
                      }
                      text={data.status}
                    />
                    <Text type="p4" className={styles['details__summary-label']}>
                      Date created
                    </Text>
                    <Text type="p4" className={styles['details__summary-value']}>
                      {formatDate(data.createdAt)}
                    </Text>
                  </div>
                </div>
              </div>
              <div className={styles.details__progress}>
                <Text type="h6">Progress</Text>
                <div className={styles['details__progress-container']}>
                  <div className={styles['details__timeline-wrapper']}>
                    {data.stages.map((_stage, index, arr) => {
                      if (index === arr.length - 1) {
                        return (
                          <img
                            key={index}
                            src={data.status === 'In progress' ? incompleteCircle : approveCircle}
                            alt={
                              data.status === 'In progress' ? 'incomplete-circle' : 'approve-circle'
                            }
                          />
                        );
                      }

                      return (
                        <React.Fragment key={index}>
                          <img src={approveCircle} alt="approve-circle" />
                          <div className={styles['details__timeline-line']} />
                        </React.Fragment>
                      );
                    })}
                  </div>
                  <div className={styles['details__progress-wrapper']}>
                    {data.stages.map((stage, index) => (
                      <div key={index}>
                        <Text type="p5" className={styles['details__date-text']}>
                          {formatDate(stage.date)}
                        </Text>
                        <Text type="p5" className={styles['details__stage-name']}>
                          {stage.name}
                        </Text>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className={styles['details__content-container']}>
                <Text type="h6">Dispute data</Text>
                <div className={styles['details__data-wrapper']}>
                  <div className={styles.details__data}>
                    <Text type="p5" className={styles['details__data-label']}>
                      Credit bureau
                    </Text>
                    <Text type="p5" fontWeight={600} className={styles['details__data-value']}>
                      {disputeCreatedStage.data['Credit bureau']}
                    </Text>
                  </div>
                  <div className={styles.details__data}>
                    <Text type="p5" className={styles['details__data-label']}>
                      Type of info to be corrected
                    </Text>
                    <Text type="p5" fontWeight={600} className={styles['details__data-value']}>
                      {disputeCreatedStage.data['Type of info to be corrected']}
                    </Text>
                  </div>
                  <div className={styles.details__data}>
                    <Text type="p5" className={styles['details__data-label']}>
                      Issue description
                    </Text>
                    <Text type="p5" fontWeight={600} className={styles['details__data-value']}>
                      {disputeCreatedStage.data['Issue description']}
                    </Text>
                  </div>
                  <div className={styles.details__data}>
                    <Text type="p5" className={styles['details__data-label']}>
                      Current data
                    </Text>
                    <Text type="p5" fontWeight={600} className={styles['details__data-value']}>
                      {disputeCreatedStage.data['Current data']}
                    </Text>
                  </div>
                  {disputeCreatedStage.data['New data'] && (
                    <div className={styles.details__data}>
                      <Text type="p5" className={styles['details__data-label']}>
                        New data
                      </Text>
                      <Text type="p5" fontWeight={600} className={styles['details__data-value']}>
                        {disputeCreatedStage.data['New data']}
                      </Text>
                    </div>
                  )}
                  {disputeCreatedStage.data['Attached document'] && (
                    <div className={styles.details__data}>
                      <Text type="p5" className={styles['details__data-label']}>
                        Attached document
                      </Text>
                      <Text type="p5" fontWeight={600} className={styles['details__data-value']}>
                        {disputeCreatedStage.data['Attached document']}
                      </Text>
                    </div>
                  )}
                  {disputeCreatedStage.data["Document's front page"] && (
                    <div className={styles.details__data}>
                      <Text type="p5" className={styles['details__data-label']}>
                        Document's front page
                      </Text>
                      <Text type="p5" fontWeight={600} className={styles['details__data-value']}>
                        {disputeCreatedStage.data["Document's front page"]}
                      </Text>
                    </div>
                  )}
                  {disputeCreatedStage.data["Document's back page"] && (
                    <div className={styles.details__data}>
                      <Text type="p5" className={styles['details__data-label']}>
                        Document's back page
                      </Text>
                      <Text type="p5" fontWeight={600} className={styles['details__data-value']}>
                        {disputeCreatedStage.data["Document's back page"]}
                      </Text>
                    </div>
                  )}
                </div>
              </div>
              {responseReceivedStage && (
                <div className={styles['details__content-container']}>
                  <Text type="h6">Equifax’s response</Text>
                  <div className={styles['details__response-wrapper']}>
                    <Text type="p5" fontWeight={600} className={styles['details__response-text']}>
                      {responseReceivedStage.data.data.trim()}
                    </Text>
                  </div>
                </div>
              )}
              {takenActions.map((takenAction, index) => (
                <ActionTaken key={index} name={takenAction.name} data={takenAction.data} />
              ))}
              <Actions
                possibleActions={data.possibleActions}
                action={action}
                onSelect={selectAction}
                onSubmit={handleActionSelect}
                loading={actionLoading}
              />
            </div>
          </>
        )
      )}
      <PopupModal
        visible={popupModalVisible}
        heading="Dispute closed"
        message={`Congratulations, you have successfully disputed “${data?.name}”`}
        secondaryButtonTitle="Close"
        secondaryButtonClick={closePopupModal}
        primaryButtonTitle="Go to disputes"
        primaryButtonClick={navigateToDisputes}
        hasIcon
      />
      {snackbar}
    </div>
  );
};
