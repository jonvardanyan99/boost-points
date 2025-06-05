import { format } from 'date-fns/format';
import React, { useMemo, useState } from 'react';

import { Button } from '~/components/Button';
import { Checkbox } from '~/components/Checkbox';
import { Text } from '~/components/Text';
import { useErrorHandler } from '~/hooks/useErrorHandler';
import { useMutation } from '~/hooks/useMutation';
import { API } from '~/services/api';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { setConsentFormSigned } from '~/store/slices/user';
import { selectAccount } from '~/store/slices/user/selectors';
import { AccountData } from '~/types/models';
import { DeepNonNullable } from '~/types/utils';
import { backFormatPhoneNumber, formatAddressTitle } from '~/utils/formats';
import { dataUrlToFile } from '~/utils/helpers';
import { extractKeyFromPresignedUrl, uploadFileToAWS } from '~/utils/uploadFileToAWS';

import { SignaturePad } from './components/SignaturePad';
import styles from './styles.module.scss';

export const ConsentForm: React.FC = () => {
  const account = useAppSelector(selectAccount);
  const typedData = useMemo(() => {
    return account?.data as DeepNonNullable<AccountData, 'middleName' | 'previousAddress'>;
  }, [account]);
  const dispatch = useAppDispatch();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [signature, setSignature] = useState('');
  const { handleApiError, snackbar } = useErrorHandler();

  const fullNameText = `Full Name: ${typedData.fullName}`;
  const birthDateText = `Date of Birth: ${format(new Date(typedData.birthDate), 'dd MMM y')}`;
  const currentAddressText = `Current Address: ${formatAddressTitle(typedData.residentialAddress)}`;
  const contactNumberText = `Contact Number: ${backFormatPhoneNumber(typedData.phoneNumber)}`;

  const consentDeclarationText = `I, ${typedData.fullName}, hereby provide my explicit consent to Wardle Consultancy Services to act on my behalf in requesting and obtaining my credit reports from the following credit reporting agencies:`;

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
      <Text className={styles['consent-form__heading']} type="h4">
        Consent Form
      </Text>
      <Text className={styles['consent-form__text']} type="p4">
        Please read the access seeker consent below and confirm to proceed requesting credit reports
      </Text>
      <div className={styles['consent-form__content']}>
        <Text className={styles['consent-form__title']} fontWeight={600} type="p2">
          PART A: CLIENT DETAILS
        </Text>
        <Text className={styles['consent-form__text']} type="p3">
          {fullNameText}
        </Text>
        <Text className={styles['consent-form__text']} type="p3">
          {birthDateText}
        </Text>
        <Text className={styles['consent-form__text']} type="p3">
          {currentAddressText}
        </Text>
        <Text className={styles['consent-form__text']} type="p3">
          {contactNumberText}
        </Text>
        <Text className={styles['consent-form__title']} fontWeight={600} type="p2">
          PART B: CONSENT DECLARATION
        </Text>
        <Text className={styles['consent-form__text']} type="p3">
          {consentDeclarationText}
        </Text>
        <ul className={styles['consent-form__list-item-wrapper']}>
          <li className={styles['consent-form__list-item']}>Equifax</li>
          <li className={styles['consent-form__list-item']}>Experian</li>
          <li className={styles['consent-form__list-item']}>Illion</li>
        </ul>
        <Text className={styles['consent-form__text']} type="p3">
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
        <Text className={styles['consent-form__title']} fontWeight={600} type="p2">
          PART C: DECLARATION & SIGNATURE
        </Text>
        <Text className={styles['consent-form__text']} type="p3">
          I declare that the details provided in Part A are accurate and correct. I have read,
          understood, and agree to the terms stated in Part B of this consent form.
        </Text>
      </div>
      <div className={styles['consent-form__confirm']}>
        <Checkbox
          checked={isConfirmed}
          className={styles['consent-form__checkbox']}
          label="I have read and agree with the access seeker consent form above"
          onChange={setIsConfirmed}
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
        disabled={!isConfirmed || !signature}
        loading={loading}
        title="Get reports"
        onClick={signConsentForm}
      />
      {snackbar}
    </div>
  );
};
