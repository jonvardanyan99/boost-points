import logo from 'assets/images/logo.svg';
import { Button } from 'components/Button';
import { Dropdown } from 'components/Dropdown';
import { Input } from 'components/Input';
import { Text } from 'components/Text';
import { DOCUMENT_TYPE_OPTIONS, STATES_OPTIONS } from 'constants/selectOptions';
import { useFormik } from 'formik';
import React from 'react';

import styles from './styles.module.scss';

export const Identification = () => {
  const formik = useFormik({
    initialValues: {
      documentType: null,
      issueState: null,
      licenceNo: '',
    },
  });

  return (
    <div className={styles.identification}>
      <div className={styles.identification__container}>
        <img src={logo} alt="logo" />
        <Text type="h4" className={styles.identification__heading}>
          Identification
        </Text>
        <Text type="p4" className={styles.identification__instruction}>
          This info is required by credit organizations to obtain your credit reports
        </Text>
        <div className={styles.identification__content}>
          <Dropdown
            className={styles.identification__field}
            placeholder="Select Document Type"
            selectedOption={formik.values.documentType}
            onChange={option => formik.setFieldValue('documentType', option, true)}
            onBlur={() => formik.setFieldTouched('documentType', true, true)}
            options={DOCUMENT_TYPE_OPTIONS}
            label="Document type"
          />
          <Dropdown
            className={styles.identification__field}
            placeholder="Select State"
            selectedOption={formik.values.issueState}
            onChange={option => formik.setFieldValue('issueState', option, true)}
            onBlur={() => formik.setFieldTouched('issueState', true, true)}
            options={STATES_OPTIONS}
            label="State of issue"
          />
          <Input
            className={styles.identification__field}
            placeholder="249004225"
            name="licenceNo"
            value={formik.values.licenceNo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label="Licence no"
          />
          <Button
            className={styles['identification__main-button']}
            title="Continue"
            onClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
};
