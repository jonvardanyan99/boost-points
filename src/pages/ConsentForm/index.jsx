import { Button } from 'components/Button';
import { Checkbox } from 'components/Checkbox';
import { Text } from 'components/Text';
import format from 'date-fns/format';
import { useErrorHandler } from 'hooks/useErrorHandler';
import { useMutation } from 'hooks/useMutation';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API } from 'services/api';
import { setConsentFormSigned } from 'store/slices/user';
import { selectAccount } from 'store/slices/user/selectors';
import { backFormatPhoneNumber, formatAddressTitle } from 'utils/formats';
import { dataUrlToFile } from 'utils/helpers';
import { uploadFileToAWS } from 'utils/uploadFileToAWS';
import { extractKeyFromPresignedUrl } from 'utils/uploadFileToAWS';

import { SignaturePad } from './components/SignaturePad';
import styles from './styles.module.scss';

export const ConsentForm = () => {
  const account = useSelector(selectAccount);
  const dispatch = useDispatch();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [signature, setSignature] = useState('');
  const { handleApiError, snackbar } = useErrorHandler();

  const fullNameText = `Full Name: ${account.data.fullName}`;
  const birthDateText = `Date of Birth: ${format(new Date(account.data.birthDate), 'dd MMM y')}`;
  const currentAddressText = `Current Address: ${formatAddressTitle(
    account.data.residentialAddress,
  )}`;
  const contactNumberText = `Contact Number: ${backFormatPhoneNumber(account.data.phoneNumber)}`;

  const consentDeclarationText = `I, ${account.data.fullName}, hereby provide my explicit consent to Wardle Consultancy Services to act on my behalf in requesting and obtaining my credit reports from the following credit reporting agencies:`;

  const signConsentFormRequest = async () => {
    try {
      const response = await API.getSignLink();

      await uploadFileToAWS(response.data.link, await dataUrlToFile(signature, 'signature.png'));

      await API.signConsentForm({
        text: 'text',
        signKey: extractKeyFromPresignedUrl(response.data.link),
      });

      dispatch(setConsentFormSigned());
    } catch (error) {
      handleApiError(error);
    }
  };

  const [signConsentForm, { loading }] = useMutation(signConsentFormRequest);

  return (
    <div className={styles['consent-form']}>
      <Text type="h4" className={styles['consent-form__heading']}>
        Consent Form
      </Text>
      <Text type="p4" className={styles['consent-form__text']}>
        Please read the access seeker consent below and confirm to proceed requesting credit reports
      </Text>
      <div className={styles['consent-form__content']}>
        <Text type="p2" fontWeight={600} className={styles['consent-form__title']}>
          PART A: CLIENT DETAILS
        </Text>
        <Text type="p3" className={styles['consent-form__text']}>
          {fullNameText}
        </Text>
        <Text type="p3" className={styles['consent-form__text']}>
          {birthDateText}
        </Text>
        <Text type="p3" className={styles['consent-form__text']}>
          {currentAddressText}
        </Text>
        <Text type="p3" className={styles['consent-form__text']}>
          {contactNumberText}
        </Text>
        <Text type="p2" fontWeight={600} className={styles['consent-form__title']}>
          PART B: CONSENT DECLARATION
        </Text>
        <Text type="p3" className={styles['consent-form__text']}>
          {consentDeclarationText}
        </Text>
        <ul className={styles['consent-form__list-item-wrapper']}>
          <li className={styles['consent-form__list-item']}>Equifax</li>
          <li className={styles['consent-form__list-item']}>Experian</li>
          <li className={styles['consent-form__list-item']}>Illion</li>
        </ul>
        <Text type="p3" className={styles['consent-form__text']}>
          I understand and acknowledge the following:
        </Text>
        <ol className={styles['consent-form__list-item-wrapper']}>
          <li className={styles['consent-form__list-item']}>
            Wardle Consultancy Services will use the credit report solely for the purpose of
            providing me with advice and assistance in relation to my financial affairs.
          </li>
          <li className={styles['consent-form__list-item']}>
            The information obtained from the credit reporting agencies will be treated with
            confidentiality and in accordance with the applicable data protection and privacy laws.
          </li>
          <li className={styles['consent-form__list-item']}>
            I have the right to withdraw this consent at any time by notifying Wardle Consultancy
            Services in writing.
          </li>
          <li className={styles['consent-form__list-item']}>
            This consent is valid until [specific date, e.g., "31st December 2023"] or until I
            revoke it, whichever is earlier.
          </li>
        </ol>
        <Text type="p2" fontWeight={600} className={styles['consent-form__title']}>
          PART C: DECLARATION & SIGNATURE
        </Text>
        <Text type="p3" className={styles['consent-form__text']}>
          I declare that the details provided in Part A are accurate and correct. I have read,
          understood, and agree to the terms stated in Part B of this consent form.
        </Text>
      </div>
      <div className={styles['consent-form__confirm']}>
        <Checkbox
          className={styles['consent-form__checkbox']}
          checked={isConfirmed}
          onChange={setIsConfirmed}
          label="I have read and agree with the access seeker consent form above"
        />
      </div>
      {isConfirmed && (
        <SignaturePad
          className={styles['consent-form__signature']}
          value={signature}
          onChange={setSignature}
        />
      )}
      <Button
        className={styles['consent-form__main-button']}
        title="Get reports"
        onClick={signConsentForm}
        loading={loading}
        disabled={!isConfirmed || !signature}
      />
      {snackbar}
    </div>
  );
};
