import leftArrow from 'assets/icons/left-arrow.svg';
import axios from 'axios';
import { Button } from 'components/Button';
import { Modal } from 'components/Modal';
import { PopupModal } from 'components/PopupModal';
import { Text } from 'components/Text';
import { ROUTES } from 'constants/routes';
import { useMutation } from 'hooks/useMutation';
import React, { useCallback, useState } from 'react';
import { generatePath, useLocation, useNavigate } from 'react-router-dom';
import { API } from 'services/api';
import { CreateDisputeVariables } from 'services/api/types/mutations';
import { DisputeFormValues } from 'types/formValues';
import { dataUrlToFile } from 'utils/helpers';
import { extractKeyFromPresignedUrl, uploadFileToAWS } from 'utils/uploadFileToAWS';

import styles from './styles.module.scss';

interface Props {
  visible: boolean;
  onClose: () => void;
  issueUuid: string;
  issueName: string;
  data: DisputeFormValues;
  currentAddress: string;
  handleApiError: (error: unknown) => void;
}

export const PreviewModal: React.FC<Props> = ({
  visible,
  onClose,
  issueUuid,
  issueName,
  data,
  currentAddress,
  handleApiError,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [popupModalVisible, setPopupModalVisible] = useState(false);

  const submitDisputeRequest = async () => {
    try {
      const filesRequests = Object.keys(data).map(async key => {
        if (data[key].type === 'file-upload') {
          const response = await API.getDisputeLink();
          const typedValue = data[key].value as object as File;

          await uploadFileToAWS(
            response.data.link,
            await dataUrlToFile(typedValue as unknown as string, typedValue.name),
          );

          return {
            key,
            link: response.data.link,
          };
        }

        return null;
      });

      const responses = (await axios.all(filesRequests)).filter(request => request !== null);

      const initialValues: CreateDisputeVariables = {
        issueUuid,
        data: {},
        files: [],
      };

      const disputeData = Object.keys(data).reduce<CreateDisputeVariables>((acc, key) => {
        if (data[key].type === 'file-upload') {
          const typedValue = data[key].value as object as File;
          acc.data[key] = typedValue.name;

          const foundFile = responses.find(response => response.key === key);
          const typedFoundFile = foundFile as NonNullable<typeof foundFile>;

          acc.files.push({
            key: extractKeyFromPresignedUrl(typedFoundFile.link),
            name: key,
            originalName: typedValue.name,
          });
        } else if (data[key].type === 'text') {
          acc.data[key] = data[key].value as string;
        }

        return acc;
      }, initialValues);

      await API.createDispute(disputeData);

      onClose();
      setPopupModalVisible(true);
    } catch (error) {
      handleApiError(error);
    }
  };

  const [submitDispute, { loading }] = useMutation(submitDisputeRequest);

  const handleCloseClick = useCallback(() => {
    setPopupModalVisible(false);

    navigate(generatePath(ROUTES.REPORT, { agency: location.state?.agency }));
  }, [navigate, location.state?.agency]);

  const navigateToDisputes = useCallback(() => {
    setPopupModalVisible(false);

    navigate(ROUTES.DISPUTES);
  }, [navigate]);

  return (
    <>
      <Modal visible={visible} className={styles['preview-modal']}>
        <div className={styles['preview-modal__container']}>
          <div className={styles['preview-modal__wrapper']}>
            <button
              type="button"
              className={styles['preview-modal__left-arrow-button']}
              onClick={onClose}
            >
              <img src={leftArrow} alt="left-arrow" />
            </button>
            <Text type="h6" className={styles['preview-modal__heading']}>
              Preview dispute
            </Text>
            <div className={styles['preview-modal__content-container']}>
              <div className={styles['preview-modal__field']}>
                <Text type="p5" className={styles['preview-modal__field-label']}>
                  Credit bureau
                </Text>
                <Text type="p5" fontWeight={600} className={styles['preview-modal__field-name']}>
                  Equifax
                </Text>
              </div>
              <div className={styles['preview-modal__field']}>
                <Text type="p5" className={styles['preview-modal__field-label']}>
                  Type of info to be corrected
                </Text>
                <Text type="p5" fontWeight={600} className={styles['preview-modal__field-name']}>
                  {issueName}
                </Text>
              </div>
              {Object.keys(data).map(key => {
                const typedValue = data[key].value as object as File;

                if (data[key].type === 'text') {
                  return (
                    <React.Fragment key={key}>
                      <div className={styles['preview-modal__field']}>
                        <Text type="p5" className={styles['preview-modal__field-label']}>
                          Current data
                        </Text>
                        <Text
                          type="p5"
                          fontWeight={600}
                          className={styles['preview-modal__field-name']}
                        >
                          {currentAddress}
                        </Text>
                      </div>
                      <div className={styles['preview-modal__field']}>
                        <Text type="p5" className={styles['preview-modal__field-label']}>
                          {key}
                        </Text>
                        <Text
                          type="p5"
                          fontWeight={600}
                          className={styles['preview-modal__field-name']}
                        >
                          {(data[key]?.value as string) || ''}
                        </Text>
                      </div>
                    </React.Fragment>
                  );
                }

                return (
                  <div key={key} className={styles['preview-modal__field']}>
                    <Text type="p5" className={styles['preview-modal__field-label']}>
                      {key}
                    </Text>
                    <Text
                      type="p5"
                      fontWeight={600}
                      className={styles['preview-modal__field-name']}
                    >
                      {typedValue?.name || ''}
                    </Text>
                  </div>
                );
              })}
            </div>
            <Button
              className={styles['preview-modal__main-button']}
              title="Submit dispute"
              onClick={submitDispute}
              loading={loading}
            />
          </div>
        </div>
      </Modal>
      <PopupModal
        visible={popupModalVisible}
        heading="Dispute created"
        message="You can track your disputes in the “Disputes” section"
        secondaryButtonTitle="Close"
        secondaryButtonClick={handleCloseClick}
        primaryButtonTitle="Go to disputes"
        primaryButtonClick={navigateToDisputes}
        hasIcon
      />
    </>
  );
};
