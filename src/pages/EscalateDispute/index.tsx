import { useFormik } from 'formik';
import React, { useCallback, useState } from 'react';
import { generatePath, useNavigate, useParams } from 'react-router-dom';

import { Button } from '~/components/Button';
import { PopupModal } from '~/components/PopupModal';
import { Text } from '~/components/Text';
import { ROUTES } from '~/constants/routes';
import { useErrorHandler } from '~/hooks/useErrorHandler';
import { useMutation } from '~/hooks/useMutation';
import { API } from '~/services/api';
import { SendDisputeActionVariables } from '~/services/api/types/mutations';
import { EscalateDisputeFormValues } from '~/types/formValues';

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
        <Text fontWeight={600} type="p1">
          Contact ScoreUp support
        </Text>
        <Text className={styles.page__text} type="p5">
          Dispute with Equifax
        </Text>
      </div>
      <div className={styles.page__content}>
        <div className={styles['page__content-container']}>
          <Textarea
            className={styles.page__textarea}
            label="Add a brief description"
            name="description"
            placeholder="Add a brief description"
            value={formik.values.description}
            onChange={formik.handleChange}
          />
          <Button
            className={styles.page__button}
            disabled={!formik.dirty}
            loading={loading}
            title="Submit"
            onClick={formik.handleSubmit}
          />
        </div>
      </div>
      <PopupModal
        hasIcon
        heading="Sent to ScoreUp support"
        message="Thank you for trusting Score Up to resolve your issue. A member of our team will review your dispute history and may contact you in the next three business days"
        primaryButtonClick={navigateToDisputes}
        primaryButtonTitle="Go to disputes"
        secondaryButtonClick={handleCloseClick}
        secondaryButtonTitle="Close"
        visible={popupModalVisible}
      />
      {snackbar}
    </div>
  );
};
