import greenCheckMark from 'assets/icons/green-check-mark.svg';
import { Button } from 'components/Button';
import { Text } from 'components/Text';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';

import styles from './styles.module.scss';

export const Plan = ({ data }) => {
  const durationText = useMemo(() => {
    return data.interval === 'Month' ? `${data.duration}-month plan` : 'Full year one payment';
  }, [data.interval, data.duration]);

  const priceText = useMemo(() => {
    const dollars = Math.floor(data.price / 100);
    const cents = (data.price % 100).toString().padStart(2, '0');

    return `$${dollars}.${cents}`;
  }, [data.price]);

  const discountedPriceText = useMemo(() => {
    if (data.discount) {
      const discount = (data.price * data.discount) / 100;
      const discountedPrice = data.price - discount;

      const dollars = Math.floor(discountedPrice / 100);
      const cents = (discountedPrice % 100).toString().padStart(2, '0');

      return `$${dollars}.${cents}`;
    }

    return null;
  }, [data.discount, data.price]);

  return (
    <div className={styles.plan}>
      <div className={styles.plan__header}>
        <div className={styles['plan__heading-wrapper']}>
          <Text type="h6" className={styles.plan__text}>
            {data.name}
          </Text>
          <Text type="p5" className={styles['plan__duration-text']}>
            {durationText}
          </Text>
        </div>
        {discountedPriceText ? (
          <div>
            <div className={styles['plan__prices-wrapper']}>
              <Text type="p3" fontWeight={600} className={styles.plan__price}>
                {priceText}
              </Text>
              <Text type="p3" fontWeight={600} className={styles.plan__text}>
                {data.interval === 'Month'
                  ? `${discountedPriceText}/month*`
                  : `${discountedPriceText}*`}
              </Text>
            </div>
            <Text type="p5" className={styles.plan__discount}>{`${data.discount}% discount`}</Text>
          </div>
        ) : (
          <Text type="p3" fontWeight={600} className={styles.plan__text}>
            {data.interval === 'Month' ? `${priceText}/month*` : `${priceText}*`}
          </Text>
        )}
      </div>
      <div className={styles['plan__features-container']}>
        <div className={styles['plan__feature-wrapper']}>
          <img src={greenCheckMark} alt="green-check-mark" />
          <Text
            type="p4"
            className={styles['plan__feature-text']}
          >{`${data.disputesQt} disputes per month`}</Text>
        </div>
        <div className={styles['plan__feature-wrapper']}>
          <img src={greenCheckMark} alt="green-check-mark" />
          <Text type="p4" className={styles['plan__feature-text']}>
            Dedicated customer support
          </Text>
        </div>
        <div className={styles['plan__feature-wrapper']}>
          <img src={greenCheckMark} alt="green-check-mark" />
          <Text type="p4" className={styles['plan__feature-text']}>
            Regular updates on your credit disputes
          </Text>
        </div>
      </div>
      <Button className={styles.plan__button} title="Select" onClick={() => {}} />
    </div>
  );
};

Plan.propTypes = {
  data: PropTypes.shape({}).isRequired,
};
