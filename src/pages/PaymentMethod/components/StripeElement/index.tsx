import { CardCvcElement, CardExpiryElement, CardNumberElement } from '@stripe/react-stripe-js';
import { Text } from 'components/Text';
import React from 'react';

import styles from './styles.module.scss';

interface Props {
  type: 'cardNumberElement' | 'cardExpiryElement' | 'cardCvcElement';
  className?: string;
}

const FONT_SIZE = '13px';
const PLACEHOLDER_COLOR = 'rgb(182, 182, 196)';

export const StripeElement: React.FC<Props> = ({ type, className }) => {
  if (type === 'cardNumberElement') {
    return (
      <div className={className}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="card-number">
          <Text type="p3" className={styles['label-text']}>
            Card number
          </Text>
        </label>
        <CardNumberElement
          id="card-number"
          className={styles.element}
          options={{
            style: {
              base: {
                fontSize: FONT_SIZE,
                '::placeholder': {
                  color: PLACEHOLDER_COLOR,
                },
              },
            },
            classes: {
              focus: styles['element--focus'],
            },
          }}
        />
      </div>
    );
  }

  if (type === 'cardExpiryElement') {
    return (
      <div className={className}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="expiry-date">
          <Text type="p3" className={styles['label-text']}>
            Expiry date
          </Text>
        </label>
        <CardExpiryElement
          id="expiry-date"
          className={styles.element}
          options={{
            style: {
              base: {
                fontSize: FONT_SIZE,
                '::placeholder': {
                  color: PLACEHOLDER_COLOR,
                },
              },
            },
            classes: {
              focus: styles['element--focus'],
            },
          }}
        />
      </div>
    );
  }

  if (type === 'cardCvcElement') {
    return (
      <div className={className}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="cvc/cvv">
          <Text type="p3" className={styles['label-text']}>
            CVC/CVV
          </Text>
        </label>
        <CardCvcElement
          id="cvc/cvv"
          className={styles.element}
          options={{
            placeholder: 'CVC/CVV',
            style: {
              base: {
                fontSize: FONT_SIZE,
                '::placeholder': {
                  color: PLACEHOLDER_COLOR,
                },
              },
            },
            classes: {
              focus: styles['element--focus'],
            },
          }}
        />
      </div>
    );
  }

  return null;
};
