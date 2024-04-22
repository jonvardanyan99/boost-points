import { Button } from 'components/Button';
import { Checkbox } from 'components/Checkbox';
import { Text } from 'components/Text';
import format from 'date-fns/format';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAccount } from 'store/reducers/user/selectors';
import { backFormatPhoneNumber, formatAddressTitle } from 'utils/formats';

import styles from './styles.module.scss';

export const ConsentForm = () => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const account = useSelector(selectAccount);

  const fullName = `${account.firstName} ${account.middleName || ''} ${account.surname}`;

  const fullNameText = `Full Name: ${fullName}`;
  const birthDateText = `Date of Birth: ${format(new Date(account.birthDate), 'dd MMM y')}`;
  const currentAddressText = `Current Address: ${formatAddressTitle(account.residentialAddress)}`;
  const contactNumberText = `Contact Number: ${backFormatPhoneNumber(account.phoneNumber)}`;

  const consentDeclarationText = `I, ${fullName}, hereby provide my explicit consent to Wardle Consultancy Services to act on my behalf in requesting and obtaining my credit reports from the following credit reporting agencies:`;

  return (
    <div className={styles['consent-form']}>
      <div className={styles['consent-form__container']}>
        <Text type="h4" className={styles['consent-form__heading']}>
          Consent Form
        </Text>
        <Text type="p4" className={styles['consent-form__text']}>
          Please read the access seeker consent below and confirm to proceed requesting credit
          reports
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
              confidentiality and in accordance with the applicable data protection and privacy
              laws.
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
        <Button
          className={styles['consent-form__main-button']}
          title="Get reports"
          onClick={() => {}}
        />
      </div>
    </div>
  );
};
