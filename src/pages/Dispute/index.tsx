import { Button } from 'components/Button';
import { FileUploader } from 'components/FileUploader';
import { Input } from 'components/Input';
import { Loader } from 'components/Loader';
import { Text } from 'components/Text';
import { ROUTES } from 'constants/routes';
import { useFormik } from 'formik';
import { useErrorHandler } from 'hooks/useErrorHandler';
import { useQuery } from 'hooks/useQuery';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API } from 'services/api';
import { useAppSelector } from 'store/hooks';
import { selectAccount } from 'store/slices/user/selectors';
import { UserState } from 'store/slices/user/types';
import { DisputeFormValues } from 'types/formValues';
import { CreateDisputeData } from 'types/models';
import { getFormikError } from 'utils/errorHandlers';
import { formatAddressTitle } from 'utils/formats';
import { getDisputeFormSchema } from 'utils/validators';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import { PreviewModal } from './components/PreviewModal';
import styles from './styles.module.scss';

export const Dispute: React.FC = () => {
  const account = useAppSelector(selectAccount) as NonNullable<UserState['account']>;
  const { subscription } = account;
  const params = useParams();
  const { uuid } = params as { uuid: string };
  const navigate = useNavigate();
  const [formSchema, setFormSchema] = useState<DisputeFormValues>({});
  const [previewModalVisible, setPreviewModalVisible] = useState(false);
  const { handleApiError, snackbar } = useErrorHandler();

  const { data: disputesData, loading: disputesLoading } = useQuery({ requestFn: API.getDisputes });
  const { data: issueData, loading: issueLoading } = useQuery({
    requestFn: () => API.getIssue({ uuid }),
  });

  const formik = useFormik<DisputeFormValues>({
    initialValues: {},
    validationSchema: toFormikValidationSchema(
      getDisputeFormSchema(formSchema as CreateDisputeData),
    ),
    onSubmit: () => {
      setPreviewModalVisible(true);
    },
  });

  useEffect(() => {
    if (disputesData) {
      if (
        subscription?.status !== 'Active' ||
        disputesData.total === subscription?.subscriptionPlan?.disputesQt
      ) {
        navigate(ROUTES.SUBSCRIPTION_PLANS);
      }
    }
  }, [disputesData, subscription?.status, subscription?.subscriptionPlan?.disputesQt, navigate]);

  useEffect(() => {
    if (issueData) {
      const initialValues: DisputeFormValues = {};

      const formInitialValues = issueData.formData.questions.reduce<DisputeFormValues>(
        (acc, question) => {
          if (question.type === 'text') {
            acc[question.cellName] = {
              type: question.type,
              value: '',
            };
          }

          if (question.type === 'file-upload') {
            acc[question.cellName] = {
              type: question.type,
              value: null,
            };
          }

          return acc;
        },
        initialValues,
      );

      formik.resetForm({
        values: formInitialValues,
      });

      setFormSchema(formInitialValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [issueData]);

  useEffect(() => {
    formik.validateForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formSchema]);

  const closePreviewModal = useCallback(() => {
    setPreviewModalVisible(false);
  }, []);

  return (
    <div className={styles.dispute}>
      {issueLoading || disputesLoading ? (
        <Loader forPage />
      ) : (
        <>
          <div className={styles.dispute__header}>
            {issueData && (
              <Text type="p1" fontWeight={600}>
                {issueData.name}
              </Text>
            )}
            <Text type="p5" className={styles.dispute__info}>
              Dispute with Equifax
            </Text>
          </div>
          <div className={styles['dispute__content-container']}>
            <div className={styles.dispute__content}>
              <div className={styles['dispute__form-container']}>
                {issueData?.formData.questions.map(question => {
                  if (question.type === 'text') {
                    return (
                      <Input
                        key={question.questionId}
                        placeholder={formatAddressTitle(account.data.residentialAddress)}
                        name={question.cellName}
                        value={(formik.values[question.cellName]?.value as string) || ''}
                        onChange={e =>
                          formik.setFieldValue(
                            question.cellName,
                            { ...formik.values[question.cellName], value: e.target.value },
                            true,
                          )
                        }
                        onBlur={formik.handleBlur}
                        label={`${question.questionText} *`}
                        error={getFormikError(formik, question.cellName, 'value')}
                      />
                    );
                  }

                  if (question.type === 'file-upload') {
                    return (
                      <FileUploader
                        key={question.questionId}
                        description="Select a file to upload"
                        value={(formik.values[question.cellName]?.value as object as File) || null}
                        onSelect={fileData =>
                          formik.setFieldValue(
                            question.cellName,
                            { ...formik.values[question.cellName], value: fileData },
                            true,
                          )
                        }
                        onBlur={() => formik.setFieldTouched(question.cellName, true, true)}
                        onDelete={() =>
                          formik.setFieldValue(
                            question.cellName,
                            { ...formik.values[question.cellName], value: null },
                            true,
                          )
                        }
                        label={`${question.questionText} *`}
                        error={getFormikError(formik, question.cellName, 'value')}
                      />
                    );
                  }

                  return null;
                })}
              </div>
              <Button
                className={styles.dispute__button}
                title="Preview & Submit"
                onClick={formik.handleSubmit}
                disabled={!formik.isValid}
              />
            </div>
          </div>
        </>
      )}
      <PreviewModal
        visible={previewModalVisible}
        onClose={closePreviewModal}
        issueUuid={uuid}
        issueName={issueData?.name || ''}
        data={formik.values}
        currentAddress={formatAddressTitle(account.data.residentialAddress)}
        handleApiError={handleApiError}
      />
      {snackbar}
    </div>
  );
};
