import { CardCvcElement, CardExpiryElement, CardNumberElement } from '@stripe/react-stripe-js';
import React from 'react';

import { Text } from '~/components/Text';

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
          <Text className={styles['label-text']} type="p3">
            Card number
          </Text>
        </label>
        <CardNumberElement
          className={styles.element}
          id="card-number"
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
          <Text className={styles['label-text']} type="p3">
            Expiry date
          </Text>
        </label>
        <CardExpiryElement
          className={styles.element}
          id="expiry-date"
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
          <Text className={styles['label-text']} type="p3">
            CVC/CVV
          </Text>
        </label>
        <CardCvcElement
          className={styles.element}
          id="cvc/cvv"
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
