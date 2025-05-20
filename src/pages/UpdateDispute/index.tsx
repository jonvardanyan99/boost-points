import { Button } from 'components/Button';
import { FileUploader } from 'components/FileUploader';
import { Input } from 'components/Input';
import { Text } from 'components/Text';
import { useFormik } from 'formik';
import { useErrorHandler } from 'hooks/useErrorHandler';
import React, { useCallback, useState } from 'react';
import { UpdateDisputeFormValues } from 'types/formValues';
import { generateId } from 'utils/helpers';

import { AddFileUploader } from './components/AddFileUploader';
import { PreviewModal } from './components/PreviewModal';
import styles from './styles.module.scss';

export const UpdateDispute: React.FC = () => {
  const [previewModalVisible, setPreviewModalVisible] = useState(false);
  const { handleApiError, snackbar } = useErrorHandler();

  const formik = useFormik<UpdateDisputeFormValues>({
    initialValues: {
      files: null,
      'New details': '',
    },
    onSubmit: () => {
      setPreviewModalVisible(true);
    },
  });

  const closePreviewModal = useCallback(() => {
    setPreviewModalVisible(false);
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.page__header}>
        <Text type="p1" fontWeight={600}>
          Submit additional info requested by Equifax
        </Text>
        <Text type="p5" className={styles.page__text}>
          Dispute with Equifax
        </Text>
      </div>
      <div className={styles.page__content}>
        <div className={styles['page__content-container']}>
          <Text type="p3" className={styles.page__text}>
            Use a form below to submit requested details whether it’s a file or a text data
          </Text>
          {!formik.values.files && (
            <FileUploader
              className={styles['page__file-uploader']}
              description="Select a file to upload"
              onSelect={data => {
                formik.setFieldValue('files', [data]);
              }}
            />
          )}
          {formik.values.files?.map((file, index) => {
            const files = formik.values.files as File[];

            return (
              <FileUploader
                key={generateId()}
                className={styles['page__file-uploader']}
                description="Select a file to upload"
                value={file}
                onSelect={data => {
                  const newFiles = [...files];
                  newFiles[index] = data;

                  formik.setFieldValue('files', newFiles);
                }}
                onDelete={() => {
                  let newFiles;

                  if (formik.values.files?.length === 1) {
                    newFiles = null;
                  } else {
                    newFiles = [...files];
                    newFiles.splice(index, 1);
                  }

                  formik.setFieldValue('files', newFiles);
                }}
              />
            );
          })}
          {formik.values.files && formik.values.files.length < 5 && (
            <AddFileUploader
              className={styles['page__add-file-uploader']}
              onSelect={data =>
                formik.setFieldValue('files', [...(formik.values.files as File[]), data])
              }
            />
          )}
          <Input
            className={styles.page__input}
            placeholder="Please enter relevant information in here"
            name="New details"
            value={formik.values['New details']}
            onChange={formik.handleChange}
          />
          <Button
            className={styles.page__button}
            title="Preview & Submit"
            onClick={formik.handleSubmit}
            disabled={!formik.dirty}
          />
        </div>
      </div>
      <PreviewModal
        visible={previewModalVisible}
        onClose={closePreviewModal}
        data={formik.values}
        handleApiError={handleApiError}
      />
      {snackbar}
    </div>
  );
};
