import leftArrow from 'assets/icons/left-arrow.svg';
import axios from 'axios';
import { Button } from 'components/Button';
import { Modal } from 'components/Modal';
import { PopupModal } from 'components/PopupModal';
import { Text } from 'components/Text';
import { ROUTES } from 'constants/routes';
import { useMutation } from 'hooks/useMutation';
import React, { useCallback, useState } from 'react';
import { generatePath, useLocation, useNavigate, useParams } from 'react-router-dom';
import { API } from 'services/api';
import { SendDisputeActionVariables } from 'services/api/types/mutations';
import { UpdateDisputeFormValues } from 'types/formValues';
import { DeepNonNullable } from 'types/utils';
import { dataUrlToFile, generateId } from 'utils/helpers';
import { extractKeyFromPresignedUrl, uploadFileToAWS } from 'utils/uploadFileToAWS';

import styles from './styles.module.scss';

type FilesRequests = Promise<{
  link: string;
}>[];

type InfoData = DeepNonNullable<
  Required<Pick<NonNullable<SendDisputeActionVariables['data']>, 'data' | 'files'>>
>;

interface Props {
  visible: boolean;
  onClose: () => void;
  data: UpdateDisputeFormValues;
  handleApiError: (error: unknown) => void;
}

export const PreviewModal: React.FC<Props> = ({ visible, onClose, data, handleApiError }) => {
  const params = useParams();
  const { uuid } = params as { uuid: string };
  const location = useLocation();
  const navigate = useNavigate();
  const [popupModalVisible, setPopupModalVisible] = useState(false);

  const submitInfoRequest = async () => {
    try {
      let filesRequests: FilesRequests = [];

      if (data.files) {
        filesRequests = data.files.map(async file => {
          const response = await API.getDisputeLink();

          await uploadFileToAWS(
            response.data.link,
            await dataUrlToFile(file as unknown as string, file.name),
          );

          return {
            link: response.data.link,
          };
        });
      }

      const responses = await axios.all(filesRequests);

      const initialValues: InfoData = {
        data: {},
        files: [],
      };

      const infoData = Object.keys(data).reduce<InfoData>((acc, key) => {
        if (key === 'files') {
          if (data.files) {
            data.files.forEach((file, index) => {
              acc.data[`New file ${index + 1}`] = file.name;

              acc.files.push({
                key: extractKeyFromPresignedUrl(responses[index].link),
                name: `New file ${index + 1}`,
                originalName: file.name,
              });
            });
          }
        } else if (key === 'New details') {
          if (data['New details']) {
            acc.data['New details'] = data['New details'];
          }
        }

        return acc;
      }, initialValues);

      await API.sendDisputeAction({ uuid, action: 'refine', data: infoData });

      onClose();
      setPopupModalVisible(true);
    } catch (error) {
      handleApiError(error);
    }
  };

  const [submitInfo, { loading }] = useMutation(submitInfoRequest);

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
              Preview
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
                  {location.state?.disputeName || ''}
                </Text>
              </div>
              {Object.keys(data).map(key => {
                const typedKey = key as keyof UpdateDisputeFormValues;

                if (data[typedKey] && typeof data[typedKey] === 'string') {
                  return (
                    <div key={typedKey} className={styles['preview-modal__field']}>
                      <Text type="p5" className={styles['preview-modal__field-label']}>
                        {typedKey}
                      </Text>
                      <Text
                        type="p5"
                        fontWeight={600}
                        className={styles['preview-modal__field-name']}
                      >
                        {data[typedKey]}
                      </Text>
                    </div>
                  );
                }

                if (data[typedKey] && typeof data[typedKey] === 'object') {
                  return data[typedKey].map((file, index) => (
                    <div key={generateId()} className={styles['preview-modal__field']}>
                      <Text type="p5" className={styles['preview-modal__field-label']}>
                        {`New file ${index + 1}`}
                      </Text>
                      <Text
                        type="p5"
                        fontWeight={600}
                        className={styles['preview-modal__field-name']}
                      >
                        {file.name}
                      </Text>
                    </div>
                  ));
                }

                return null;
              })}
            </div>
            <Button
              className={styles['preview-modal__main-button']}
              title="Submit"
              onClick={submitInfo}
              loading={loading}
            />
          </div>
        </div>
      </Modal>
      <PopupModal
        visible={popupModalVisible}
        heading="New details sent"
        message={`You've successfully provided extra information to Equifax for the '${location.state?.disputeName}' dispute`}
        secondaryButtonTitle="Close"
        secondaryButtonClick={handleCloseClick}
        primaryButtonTitle="Go to disputes"
        primaryButtonClick={navigateToDisputes}
        hasIcon
      />
    </>
  );
};
