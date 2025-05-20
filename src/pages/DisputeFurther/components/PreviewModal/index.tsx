import leftArrow from 'assets/icons/left-arrow.svg';
import { Button } from 'components/Button';
import { Modal } from 'components/Modal';
import { PopupModal } from 'components/PopupModal';
import { Text } from 'components/Text';
import { ROUTES } from 'constants/routes';
import { useMutation } from 'hooks/useMutation';
import React, { useCallback, useMemo, useState } from 'react';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { API } from 'services/api';
import { SendDisputeActionVariables } from 'services/api/types/mutations';
import { GetIssueFurtherOptionsResponse } from 'services/api/types/queries';
import { createParagraphsList } from 'utils/helpers';

import styles from './styles.module.scss';

interface Props {
  visible: boolean;
  onClose: () => void;
  data: GetIssueFurtherOptionsResponse['data'][number];
  handleApiError: (error: unknown) => void;
}

type DisputeData = SendDisputeActionVariables['data'];

export const PreviewModal: React.FC<Props> = ({ visible, onClose, data, handleApiError }) => {
  const params = useParams();
  const { uuid } = params as { uuid: string };
  const navigate = useNavigate();
  const [popupModalVisible, setPopupModalVisible] = useState(false);

  const disputeFurtherRequest = async (disputeData: DisputeData) => {
    try {
      await API.sendDisputeAction({ uuid, action: 'further', data: disputeData });

      setPopupModalVisible(true);
    } catch (error) {
      handleApiError(error);
    }
  };

  const [disputeFurther, { loading }] = useMutation((disputeData: DisputeData) =>
    disputeFurtherRequest(disputeData),
  );

  const disputeTextList = useMemo(() => {
    if (Object.keys(data).length) {
      return createParagraphsList(data.text);
    }

    return [];
  }, [data]);

  const submitDispute = useCallback(() => {
    disputeFurther({
      data: {},
      files: [],
      issueFurtherOptionUuid: data.uuid,
    });
  }, [disputeFurther, data.uuid]);

  const handleCloseClick = useCallback(() => {
    setPopupModalVisible(false);

    navigate(generatePath(ROUTES.DISPUTE_DETAILS, { uuid }));
  }, [navigate, uuid]);

  const navigateToDisputes = useCallback(() => {
    setPopupModalVisible(false);

    navigate(ROUTES.DISPUTES);
  }, [navigate]);

  return (
    <>
      <Modal visible={visible} className={styles.modal}>
        <div className={styles.modal__container}>
          <div className={styles.modal__wrapper}>
            <button type="button" className={styles['modal__left-arrow-button']} onClick={onClose}>
              <img src={leftArrow} alt="left-arrow" />
            </button>
            <Text type="h6" className={styles.modal__heading}>
              Preview
            </Text>
            <div className={styles['modal__field-wrapper']}>
              <div className={styles.modal__field}>
                <Text type="p5" className={styles['modal__field-name']}>
                  Credit bureau
                </Text>
                <Text type="p5" fontWeight={600} className={styles['modal__field-value']}>
                  Equifax
                </Text>
              </div>
              <div className={styles.modal__field}>
                <Text type="p5" className={styles['modal__field-name']}>
                  Reason
                </Text>
                <Text type="p5" fontWeight={600} className={styles['modal__field-value']}>
                  {data.reason || ''}
                </Text>
              </div>
            </div>
            <div className={styles['modal__field-text']}>
              {disputeTextList.map((text, index) => (
                <Text
                  key={index}
                  type="p5"
                  fontWeight={600}
                  className={styles['modal__field-value']}
                >
                  {text}
                </Text>
              ))}
            </div>
            <Button
              className={styles.modal__button}
              title="Submit"
              onClick={submitDispute}
              loading={loading}
            />
          </div>
        </div>
      </Modal>
      <PopupModal
        visible={popupModalVisible}
        heading="Response sent to Equifax"
        message="You've successfully sent a response. Thank you for using Score Up"
        secondaryButtonTitle="Close"
        secondaryButtonClick={handleCloseClick}
        primaryButtonTitle="Go to disputes"
        primaryButtonClick={navigateToDisputes}
        hasIcon
      />
    </>
  );
};
