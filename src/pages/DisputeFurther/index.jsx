import { Button } from 'components/Button';
import { Loader } from 'components/Loader';
import { Text } from 'components/Text';
import { useFormik } from 'formik';
import { useErrorHandler } from 'hooks/useErrorHandler';
import { useQuery } from 'hooks/useQuery';
import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API } from 'services/api';

import { PreviewModal } from './components/PreviewModal';
import styles from './styles.module.scss';

export const DisputeFurther = () => {
  const params = useParams();
  const { uuid } = params;
  const [previewModalVisible, setPreviewModalVisible] = useState(false);
  const { handleApiError, snackbar } = useErrorHandler();

  const { data, loading } = useQuery({ requestFn: () => API.getIssueFurtherOptions(uuid) });

  const formik = useFormik({
    initialValues: {
      issueData: {},
    },
    onSubmit: () => {
      setPreviewModalVisible(true);
    },
  });

  const selectIssue = useCallback(
    event => {
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
            <Text type="p1" fontWeight={600}>
              Dispute further
            </Text>
            <Text type="p5" className={styles.page__text}>
              Dispute with Equifax
            </Text>
          </div>
          <div className={styles.page__content}>
            <div className={styles['page__content-container']}>
              {data?.data.map(option => (
                <label
                  key={option.uuid}
                  htmlFor={option.uuid}
                  className={styles['page__options-container']}
                >
                  <input
                    id={option.uuid}
                    type="radio"
                    name="issue"
                    value={option.reason}
                    onChange={selectIssue}
                    className={styles.page__radio}
                  />
                  <Text type="p4" fontWeight={600}>
                    {option.reason}
                  </Text>
                </label>
              ))}
              <Button
                className={styles.page__button}
                title="Proceed"
                onClick={formik.handleSubmit}
                disabled={!formik.dirty}
              />
            </div>
          </div>
        </>
      )}
      <PreviewModal
        visible={previewModalVisible}
        onClose={closePreviewModal}
        data={formik.values.issueData}
        handleApiError={handleApiError}
      />
      {snackbar}
    </div>
  );
};
