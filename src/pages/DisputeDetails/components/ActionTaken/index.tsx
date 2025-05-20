import approveCircle from 'assets/icons/approve-circle.svg';
import { Text } from 'components/Text';
import React, { useMemo } from 'react';
import { TakenAction } from 'types/models';
import { createParagraphsList } from 'utils/helpers';

import styles from './styles.module.scss';

interface ActionInfo {
  heading: string;
  description: string;
}

interface Props {
  data: TakenAction;
}

export const ActionTaken: React.FC<Props> = ({ data }) => {
  const { name, data: actionData } = data;

  const actionInfo: ActionInfo = useMemo(() => {
    const info: ActionInfo = {
      heading: '',
      description: '',
    };

    if (name === 'Dispute closed') {
      info.heading = 'Close the case';
      info.description = 'Equifax has confirmed the resolution of your issue';
    }

    if (name === 'Dispute updated') {
      info.heading = 'Submit additional info';
      info.description = 'Equifax has requested additional details for your dispute case';
    }

    if (name === 'Dispute further') {
      info.heading = 'Dispute further';
      info.description = 'Negative response from Creditor';
    }

    if (name === 'Dispute escalated') {
      info.heading = 'Help with the dispute';
      info.description =
        "Equifax's response hasn't met your needs and no specific action was requested, select this to escalate the case with Score Up support";
    }

    return info;
  }, [name]);

  const dataKeys = useMemo(() => {
    if (name === 'Dispute closed') {
      return null;
    }

    if (actionData) {
      if (name === 'Dispute updated') {
        return Object.keys(actionData).sort((a, b) => {
          if (a === 'New details') return 1;
          if (b === 'New details') return -1;

          const numA = parseInt(a.match(/\d+/)?.[0] || '0', 10);
          const numB = parseInt(b.match(/\d+/)?.[0] || '0', 10);

          return numA - numB;
        });
      }

      return Object.keys(actionData);
    }

    return null;
  }, [actionData, name]);

  const disputeFurtherTextList = useMemo(() => {
    if (actionData?.Text) {
      return createParagraphsList(actionData.Text);
    }

    return null;
  }, [actionData?.Text]);

  return (
    <div className={styles.component}>
      <Text type="h6" className={styles.component__title}>
        Action taken
      </Text>
      <div className={styles.component__header}>
        <img src={approveCircle} width="22px" height="22px" alt="approve-circle" />
        <div className={styles['component__text-wrapper']}>
          <Text type="p4" fontWeight={600}>
            {actionInfo.heading}
          </Text>
          <Text type="p5" className={styles.component__text}>
            {actionInfo.description}
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
                disputeFurtherTextList?.map((text, index) => (
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
                  {actionData?.[key] || ''}
                </Text>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
