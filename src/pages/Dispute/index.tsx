import { useFormik } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import { Button } from '~/components/Button';
import { FileUploader } from '~/components/FileUploader';
import { Input } from '~/components/Input';
import { Loader } from '~/components/Loader';
import { Text } from '~/components/Text';
import { ROUTES } from '~/constants/routes';
import { useErrorHandler } from '~/hooks/useErrorHandler';
import { useQuery } from '~/hooks/useQuery';
import { API } from '~/services/api';
import { useAppSelector } from '~/store/hooks';
import { selectAccount } from '~/store/slices/user/selectors';
import { UserState } from '~/store/slices/user/types';
import { DisputeFormValues } from '~/types/formValues';
import { CreateDisputeData } from '~/types/models';
import { getFormikError } from '~/utils/errorHandlers';
import { formatAddressTitle } from '~/utils/formats';
import { getDisputeFormSchema } from '~/utils/validators';

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
              <Text fontWeight={600} type="p1">
                {issueData.name}
              </Text>
            )}
            <Text className={styles.dispute__info} type="p5">
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
                        error={getFormikError(formik, question.cellName, 'value')}
                        key={question.questionId}
                        label={`${question.questionText} *`}
                        name={question.cellName}
                        placeholder={formatAddressTitle(account.data.residentialAddress)}
                        value={(formik.values[question.cellName]?.value as string) || ''}
                        onBlur={formik.handleBlur}
                        onChange={e =>
                          formik.setFieldValue(
                            question.cellName,
                            { ...formik.values[question.cellName], value: e.target.value },
                            true,
                          )
                        }
                      />
                    );
                  }

                  if (question.type === 'file-upload') {
                    return (
                      <FileUploader
                        description="Select a file to upload"
                        error={getFormikError(formik, question.cellName, 'value')}
                        key={question.questionId}
                        label={`${question.questionText} *`}
                        value={(formik.values[question.cellName]?.value as object as File) || null}
                        onBlur={() => formik.setFieldTouched(question.cellName, true, true)}
                        onDelete={() =>
                          formik.setFieldValue(
                            question.cellName,
                            { ...formik.values[question.cellName], value: null },
                            true,
                          )
                        }
                        onSelect={fileData =>
                          formik.setFieldValue(
                            question.cellName,
                            { ...formik.values[question.cellName], value: fileData },
                            true,
                          )
                        }
                      />
                    );
                  }

                  return null;
                })}
              </div>
              <Button
                className={styles.dispute__button}
                disabled={!formik.isValid}
                title="Preview & Submit"
                onClick={formik.handleSubmit}
              />
            </div>
          </div>
        </>
      )}
      <PreviewModal
        currentAddress={formatAddressTitle(account.data.residentialAddress)}
        data={formik.values}
        handleApiError={handleApiError}
        issueName={issueData?.name || ''}
        issueUuid={uuid}
        visible={previewModalVisible}
        onClose={closePreviewModal}
      />
      {snackbar}
    </div>
  );
};
