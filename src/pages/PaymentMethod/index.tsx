import { CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Stripe, StripeCardNumberElement, StripeElements } from '@stripe/stripe-js';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import close from '~/assets/icons/close.svg';
import { Button } from '~/components/Button';
import { Text } from '~/components/Text';
import { useErrorHandler } from '~/hooks/useErrorHandler';
import { useMutation } from '~/hooks/useMutation';
import { API } from '~/services/api';
import { useAppDispatch } from '~/store/hooks';
import { updateCardInfo } from '~/store/slices/user';

import { StripeElement } from './components/StripeElement';
import styles from './styles.module.scss';

export const PaymentMethod: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { handleApiError, snackbar } = useErrorHandler();

  const navigateBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const updatePaymentDetails = useCallback(async () => {
    try {
      const typedStripe = stripe as NonNullable<Stripe>;
      const typedElements = elements as NonNullable<StripeElements>;

      const { error, paymentMethod } = await typedStripe.createPaymentMethod({
        type: 'card',
        card: typedElements.getElement(CardNumberElement) as StripeCardNumberElement,
      });

      if (error) {
        handleApiError(error);
        return;
      }

      await API.updatePaymentMethod({ paymentMethodId: paymentMethod.id });

      if (paymentMethod.card) {
        dispatch(
          updateCardInfo({
            brand: paymentMethod.card.brand,
            lastCardNumbers: paymentMethod.card.last4,
          }),
        );
      }
      navigateBack();
    } catch (error) {
      handleApiError(error);
    }
  }, [stripe, elements, dispatch, navigateBack, handleApiError]);

  const [update, { loading }] = useMutation(updatePaymentDetails);

  return (
    <div className={styles.page}>
      <div className={styles['page__close-wrapper']}>
        <button className={styles['page__close-button']} type="button" onClick={navigateBack}>
          <img alt="close" src={close} />
        </button>
      </div>
      <Text className={styles.page__heading} type="h4">
        Update payment details
      </Text>
      <StripeElement type="cardNumberElement" />
      <div className={styles['page__input-wrapper']}>
        <StripeElement className={styles.page__input} type="cardExpiryElement" />
        <StripeElement className={styles.page__input} type="cardCvcElement" />
      </div>
      <Button
        className={styles.page__button}
        disabled={!stripe || !elements}
        loading={loading}
        title="Update"
        onClick={update}
      />
      {snackbar}
    </div>
  );
};
