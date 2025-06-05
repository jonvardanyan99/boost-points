import { useFormik } from 'formik';
import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Button } from '~/components/Button';
import { Loader } from '~/components/Loader';
import { Text } from '~/components/Text';
import { useErrorHandler } from '~/hooks/useErrorHandler';
import { useQuery } from '~/hooks/useQuery';
import { API } from '~/services/api';
import { DisputeFurtherFormValues } from '~/types/formValues';

import { PreviewModal } from './components/PreviewModal';
import styles from './styles.module.scss';

export const DisputeFurther: React.FC = () => {
  const params = useParams();
  const { uuid } = params as { uuid: string };
  const [previewModalVisible, setPreviewModalVisible] = useState(false);
  const { handleApiError, snackbar } = useErrorHandler();

  const { data, loading } = useQuery({ requestFn: () => API.getIssueFurtherOptions({ uuid }) });

  const formik = useFormik<DisputeFurtherFormValues>({
    initialValues: {
      issueData: {
        uuid: '',
        reason: '',
        text: '',
      },
    },
    onSubmit: () => {
      setPreviewModalVisible(true);
    },
  });

  const selectIssue = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const foundOption = data?.data.find(option => option.reason === event.target.value);

      formik.setFieldValue('issueData', foundOption);
    },
    [data?.data, formik],
  );

  const closePreviewModal = useCallback(() => {
    setPreviewModalVisible(false);
  }, []);

  return (
    <div className={styles.page}>
      {loading ? (
        <Loader forPage />
      ) : (
        <>
          <div className={styles.page__header}>
            <Text fontWeight={600} type="p1">
              Dispute further
            </Text>
            <Text className={styles.page__text} type="p5">
              Dispute with Equifax
            </Text>
          </div>
          <div className={styles.page__content}>
            <div className={styles['page__content-container']}>
              {data?.data.map(option => (
                <label
                  className={styles['page__options-container']}
                  htmlFor={option.uuid}
                  key={option.uuid}
                >
                  <input
                    className={styles.page__radio}
                    id={option.uuid}
                    name="issue"
                    type="radio"
                    value={option.reason}
                    onChange={selectIssue}
                  />
                  <Text fontWeight={600} type="p4">
                    {option.reason}
                  </Text>
                </label>
              ))}
              <Button
                className={styles.page__button}
                disabled={!formik.dirty}
                title="Proceed"
                onClick={formik.handleSubmit}
              />
            </div>
          </div>
        </>
      )}
      <PreviewModal
        data={formik.values.issueData}
        handleApiError={handleApiError}
        visible={previewModalVisible}
        onClose={closePreviewModal}
      />
      {snackbar}
    </div>
  );
};
