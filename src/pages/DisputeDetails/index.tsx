import React, { useCallback, useMemo, useState } from 'react';
import { generatePath, useNavigate, useParams } from 'react-router-dom';

import approveCircle from '~/assets/icons/approve-circle.svg';
import incompleteCircle from '~/assets/icons/incomplete-circle.svg';
import equifax from '~/assets/images/equifax.svg';
import { Badge } from '~/components/Badge';
import { Loader } from '~/components/Loader';
import { PopupModal } from '~/components/PopupModal';
import { Text } from '~/components/Text';
import { ROUTES } from '~/constants/routes';
import { useErrorHandler } from '~/hooks/useErrorHandler';
import { useMutation } from '~/hooks/useMutation';
import { useQuery } from '~/hooks/useQuery';
import { API } from '~/services/api';
import { DisputeAction, TakenAction } from '~/types/models';
import { formatDate } from '~/utils/formats';

import { Actions } from './components/Actions';
import { ActionTaken } from './components/ActionTaken';
import styles from './styles.module.scss';

export const DisputeDetails: React.FC = () => {
  const params = useParams();
  const { uuid } = params as { uuid: string };
  const navigate = useNavigate();
  const [action, setAction] = useState<DisputeAction>('');
  const [popupModalVisible, setPopupModalVisible] = useState(false);
  const { handleApiError, snackbar } = useErrorHandler();

  const { data, loading: dataLoading } = useQuery({ requestFn: () => API.getDispute({ uuid }) });

  const closeDisputeRequest = useCallback(async () => {
    try {
      await API.sendDisputeAction({ uuid, action: 'close' });

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
    ) as TakenAction[] | undefined;

    if (filteredStages?.length) {
      return filteredStages;
    }

    return [];
  }, [data?.stages]);

  const selectAction = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setAction(event.target.value as DisputeAction);
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
    window.location.reload();
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
              <Text fontWeight={600} type="p1">
                {data.name}
              </Text>
            </div>
            <div className={styles.details__content}>
              <div className={styles.details__summary}>
                <Text type="h6">Summary</Text>
                <div className={styles['details__summary-container']}>
                  <div>
                    <Text className={styles['details__summary-label']} type="p4">
                      Agency
                    </Text>
                    <img
                      alt="equifax"
                      className={styles.details__logo}
                      height="24px"
                      src={equifax}
                      width="74px"
                    />
                    <Text className={styles['details__summary-label']} type="p4">
                      Dispute No
                    </Text>
                    <Text className={styles['details__summary-value']} type="p4">
                      {data.number}
                    </Text>
                  </div>
                  <div>
                    <Text className={styles['details__summary-label']} type="p4">
                      Dispute status
                    </Text>
                    <Badge
                      className={
                        data.status === 'Resolved'
                          ? styles['details__resolved-badge']
                          : styles['details__in-progress-badge']
                      }
                      text={data.status}
                    />
                    <Text className={styles['details__summary-label']} type="p4">
                      Date created
                    </Text>
                    <Text className={styles['details__summary-value']} type="p4">
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
                            alt={
                              data.status === 'In progress' ? 'incomplete-circle' : 'approve-circle'
                            }
                            key={index}
                            src={data.status === 'In progress' ? incompleteCircle : approveCircle}
                          />
                        );
                      }

                      return (
                        <React.Fragment key={index}>
                          <img alt="approve-circle" src={approveCircle} />
                          <div className={styles['details__timeline-line']} />
                        </React.Fragment>
                      );
                    })}
                  </div>
                  <div className={styles['details__progress-wrapper']}>
                    {data.stages.map((stage, index) => (
                      <div key={index}>
                        <Text className={styles['details__date-text']} type="p5">
                          {formatDate(stage.date)}
                        </Text>
                        <Text className={styles['details__stage-name']} type="p5">
                          {stage.name}
                        </Text>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {disputeCreatedStage?.data && (
                <div className={styles['details__content-container']}>
                  <Text type="h6">Dispute data</Text>
                  <div className={styles['details__data-wrapper']}>
                    {Object.keys(disputeCreatedStage.data).map(key => (
                      <div className={styles.details__data} key={key}>
                        <Text className={styles['details__data-label']} type="p5">
                          {key}
                        </Text>
                        <Text className={styles['details__data-value']} fontWeight={600} type="p5">
                          {disputeCreatedStage.data?.[key] as string | number}
                        </Text>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {responseReceivedStage?.data && (
                <div className={styles['details__content-container']}>
                  <Text type="h6">Equifax’s response</Text>
                  <div className={styles['details__response-wrapper']}>
                    <Text className={styles['details__response-text']} fontWeight={600} type="p5">
                      {responseReceivedStage.data.data.trim()}
                    </Text>
                  </div>
                </div>
              )}
              {takenActions.map((takenAction, index) => (
                <ActionTaken data={takenAction} key={index} />
              ))}
              <Actions
                action={action}
                loading={actionLoading}
                possibleActions={data.possibleActions}
                onSelect={selectAction}
                onSubmit={handleActionSelect}
              />
            </div>
          </>
        )
      )}
      <PopupModal
        hasIcon
        heading="Dispute closed"
        message={`Congratulations, you have successfully disputed “${data?.name}”`}
        primaryButtonClick={navigateToDisputes}
        primaryButtonTitle="Go to disputes"
        secondaryButtonClick={closePopupModal}
        secondaryButtonTitle="Close"
        visible={popupModalVisible}
      />
      {snackbar}
    </div>
  );
};
