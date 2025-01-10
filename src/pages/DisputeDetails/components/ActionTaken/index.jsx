import approveCircle from 'assets/icons/approve-circle.svg';
import { Text } from 'components/Text';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { createParagraphsList } from 'utils/helpers';

import styles from './styles.module.scss';

export const ActionTaken = ({ name, data }) => {
  const heading = useMemo(() => {
    if (name === 'Dispute closed') {
      return 'Close the case';
    }

    if (name === 'Dispute updated') {
      return 'Submit additional info';
    }

    if (name === 'Dispute further') {
      return 'Dispute further';
    }

    if (name === 'Dispute escalated') {
      return 'Help with the dispute';
    }

    return '';
  }, [name]);

  const description = useMemo(() => {
    if (name === 'Dispute closed') {
      return 'Equifax has confirmed the resolution of your issue';
    }

    if (name === 'Dispute updated') {
      return 'Equifax has requested additional details for your dispute case';
    }

    if (name === 'Dispute further') {
      return 'Negative response from Creditor';
    }

    if (name === 'Dispute escalated') {
      return "Equifax's response hasn't met your needs and no specific action was requested, select this to escalate the case with Score Up support";
    }

    return '';
  }, [name]);

  const dataKeys = useMemo(() => {
    if (name === 'Dispute closed') {
      return null;
    }

    if (name === 'Dispute updated') {
      return Object.keys(data).sort((a, b) => {
        if (a === 'New details') return 1;
        if (b === 'New details') return -1;

        const numA = parseInt(a.match(/\d+/), 10);
        const numB = parseInt(b.match(/\d+/), 10);

        return numA - numB;
      });
    }

    return Object.keys(data);
  }, [name, data]);

  const disputeFurtherTextList = useMemo(() => {
    if (data?.Text) {
      return createParagraphsList(data.Text);
    }

    return null;
  }, [data]);

  return (
    <div className={styles.component}>
      <Text type="h6" className={styles.component__title}>
        Action taken
      </Text>
      <div className={styles.component__header}>
        <img src={approveCircle} width="22px" height="22px" alt="approve-circle" />
        <div className={styles['component__text-wrapper']}>
          <Text type="p4" fontWeight={600}>
            {heading}
          </Text>
          <Text type="p5" className={styles.component__text}>
            {description}
          </Text>
        </div>
      </div>
      {dataKeys && (
        <div className={styles['component__data-wrapper']}>
          {dataKeys.map(key => (
            <div key={key} className={styles.component__data}>
              <Text type="p5" className={styles['component__data-label']}>
                {key}
              </Text>
              {key === 'Text' ? (
                disputeFurtherTextList.map((text, index) => (
                  <Text
                    key={index}
                    type="p5"
                    fontWeight={600}
                    className={styles['component__data-value']}
                  >
                    {text}
                  </Text>
                ))
              ) : (
                <Text type="p5" fontWeight={600} className={styles['component__data-value']}>
                  {data[key]}
                </Text>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

ActionTaken.propTypes = {
  name: PropTypes.oneOf([
    'Dispute closed',
    'Dispute updated',
    'Dispute further',
    'Dispute escalated',
  ]),
  data: PropTypes.shape({}),
};
