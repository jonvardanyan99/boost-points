import { useFormik } from 'formik';
import React, { useCallback, useState } from 'react';

import { Button } from '~/components/Button';
import { FileUploader } from '~/components/FileUploader';
import { Input } from '~/components/Input';
import { Text } from '~/components/Text';
import { useErrorHandler } from '~/hooks/useErrorHandler';
import { UpdateDisputeFormValues } from '~/types/formValues';
import { generateId } from '~/utils/helpers';

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
        <Text fontWeight={600} type="p1">
          Submit additional info requested by Equifax
        </Text>
        <Text className={styles.page__text} type="p5">
          Dispute with Equifax
        </Text>
      </div>
      <div className={styles.page__content}>
        <div className={styles['page__content-container']}>
          <Text className={styles.page__text} type="p3">
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
                className={styles['page__file-uploader']}
                description="Select a file to upload"
                key={generateId()}
                value={file}
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
                onSelect={data => {
                  const newFiles = [...files];
                  newFiles[index] = data;

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
            name="New details"
            placeholder="Please enter relevant information in here"
            value={formik.values['New details']}
            onChange={formik.handleChange}
          />
          <Button
            className={styles.page__button}
            disabled={!formik.dirty}
            title="Preview & Submit"
            onClick={formik.handleSubmit}
          />
        </div>
      </div>
      <PreviewModal
        data={formik.values}
        handleApiError={handleApiError}
        visible={previewModalVisible}
        onClose={closePreviewModal}
      />
      {snackbar}
    </div>
  );
};
