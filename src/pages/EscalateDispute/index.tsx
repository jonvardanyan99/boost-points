import { Button } from 'components/Button';
import { PopupModal } from 'components/PopupModal';
import { Text } from 'components/Text';
import { ROUTES } from 'constants/routes';
import { useFormik } from 'formik';
import { useErrorHandler } from 'hooks/useErrorHandler';
import { useMutation } from 'hooks/useMutation';
import React, { useCallback, useState } from 'react';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { API } from 'services/api';
import { SendDisputeActionVariables } from 'services/api/types/mutations';
import { EscalateDisputeFormValues } from 'types/formValues';

import { Textarea } from './components/Textarea';
import styles from './styles.module.scss';

type Data = SendDisputeActionVariables['data'];

export const EscalateDispute: React.FC = () => {
  const params = useParams();
  const { uuid } = params as { uuid: string };
  const navigate = useNavigate();
  const [popupModalVisible, setPopupModalVisible] = useState(false);
  const { handleApiError, snackbar } = useErrorHandler();

  const [escalate, { loading }] = useMutation((data: Data) =>
    API.sendDisputeAction({ uuid, action: 'escalate', data }),
  );

  const formik = useFormik<EscalateDisputeFormValues>({
    initialValues: {
      description: '',
    },
    onSubmit: async values => {
      try {
        await escalate({
          data: {
            'Description provided': values.description,
          },
          files: [],
        });

        setPopupModalVisible(true);
      } catch (error) {
        handleApiError(error);
      }
    },
  });

  const handleCloseClick = useCallback(() => {
    setPopupModalVisible(false);

    navigate(generatePath(ROUTES.DISPUTE_DETAILS, { uuid }));
  }, [navigate, uuid]);

  const navigateToDisputes = useCallback(() => {
    setPopupModalVisible(false);

    navigate(ROUTES.DISPUTES);
  }, [navigate]);

  return (
    <div className={styles.page}>
      <div className={styles.page__header}>
        <Text type="p1" fontWeight={600}>
          Contact ScoreUp support
        </Text>
        <Text type="p5" className={styles.page__text}>
          Dispute with Equifax
        </Text>
      </div>
      <div className={styles.page__content}>
        <div className={styles['page__content-container']}>
          <Textarea
            className={styles.page__textarea}
            label="Add a brief description"
            placeholder="Add a brief description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
          />
          <Button
            className={styles.page__button}
            title="Submit"
            onClick={formik.handleSubmit}
            loading={loading}
            disabled={!formik.dirty}
          />
        </div>
      </div>
      <PopupModal
        visible={popupModalVisible}
        heading="Sent to ScoreUp support"
        message="Thank you for trusting Score Up to resolve your issue. A member of our team will review your dispute history and may contact you in the next three business days"
        secondaryButtonTitle="Close"
        secondaryButtonClick={handleCloseClick}
        primaryButtonTitle="Go to disputes"
        primaryButtonClick={navigateToDisputes}
        hasIcon
      />
      {snackbar}
    </div>
  );
};
