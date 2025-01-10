import leftArrow from 'assets/icons/left-arrow.svg';
import axios from 'axios';
import { Button } from 'components/Button';
import { Modal } from 'components/Modal';
import { PopupModal } from 'components/PopupModal';
import { Text } from 'components/Text';
import { ROUTES } from 'constants/routes';
import { useMutation } from 'hooks/useMutation';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import { generatePath, useLocation, useNavigate } from 'react-router-dom';
import { API } from 'services/api';
import { dataUrlToFile } from 'utils/helpers';
import { extractKeyFromPresignedUrl, uploadFileToAWS } from 'utils/uploadFileToAWS';

import styles from './styles.module.scss';

export const PreviewModal = ({
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

          await uploadFileToAWS(
            response.data.link,
            await dataUrlToFile(data[key].value, data[key].value.name),
          );

          return {
            key,
            link: response.data.link,
          };
        }

        return null;
      });

      const responses = (await axios.all(filesRequests)).filter(request => request !== null);

      const disputeData = Object.keys(data).reduce(
        (acc, key) => {
          if (data[key].type === 'file-upload') {
            acc.data[key] = data[key].value.name;

            const foundFile = responses.find(response => response.key === key);

            acc.files.push({
              key: extractKeyFromPresignedUrl(foundFile.link),
              name: key,
              originalName: data[key].value.name,
            });
          } else if (data[key].type === 'text') {
            acc.data[key] = data[key].value;
          }

          return acc;
        },
        {
          issueUuid,
          data: {},
          files: [],
        },
      );

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
                          {data[key]?.value || ''}
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
                      {data[key].value?.name || ''}
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

PreviewModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  issueUuid: PropTypes.string.isRequired,
  issueName: PropTypes.string.isRequired,
  data: PropTypes.shape({}).isRequired,
  currentAddress: PropTypes.string.isRequired,
  handleApiError: PropTypes.func.isRequired,
};
