import React, { useMemo } from 'react';

import { Button } from '~/components/Button';
import { Text } from '~/components/Text';
import { GetDisputeResponse } from '~/services/api/types/queries';
import { DisputeAction } from '~/types/models';

import styles from './styles.module.scss';

interface Props {
  possibleActions: GetDisputeResponse['possibleActions'];
  action: DisputeAction;
  onSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  loading: boolean;
}

export const Actions: React.FC<Props> = ({
  possibleActions,
  action,
  onSelect,
  onSubmit,
  loading,
}) => {
  const content = useMemo(() => {
    if (possibleActions === 'Start options') {
      return (
        <>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className={styles['component__action-container']} htmlFor="close">
            <input
              className={styles.component__radio}
              id="close"
              name="action"
              type="radio"
              value="close"
              onChange={onSelect}
            />
            <div className={styles['component__action-text-wrapper']}>
              <Text fontWeight={600} type="p4">
                Close the case
              </Text>
              <Text className={styles['component__action-text']} type="p5">
                Equifax has confirmed the resolution of your issue
              </Text>
            </div>
          </label>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className={styles['component__action-container']} htmlFor="refine">
            <input
              className={styles.component__radio}
              id="refine"
              name="action"
              type="radio"
              value="refine"
              onChange={onSelect}
            />
            <div className={styles['component__action-text-wrapper']}>
              <Text fontWeight={600} type="p4">
                Submit additional info
              </Text>
              <Text className={styles['component__action-text']} type="p5">
                Equifax has requested additional details for your dispute case
              </Text>
            </div>
          </label>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className={styles['component__action-container']} htmlFor="further">
            <input
              className={styles.component__radio}
              id="further"
              name="action"
              type="radio"
              value="further"
              onChange={onSelect}
            />
            <div className={styles['component__action-text-wrapper']}>
              <Text fontWeight={600} type="p4">
                Dispute further
              </Text>
              <Text className={styles['component__action-text']} type="p5">
                Negative response from Creditor
              </Text>
            </div>
          </label>
        </>
      );
    }

    if (possibleActions === 'Options with help needed') {
      return (
        <>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className={styles['component__action-container']} htmlFor="close">
            <input
              className={styles.component__radio}
              id="close"
              name="action"
              type="radio"
              value="close"
              onChange={onSelect}
            />
            <div className={styles['component__action-text-wrapper']}>
              <Text fontWeight={600} type="p4">
                Close the case
              </Text>
              <Text className={styles['component__action-text']} type="p5">
                Equifax has confirmed the resolution of your issue
              </Text>
            </div>
          </label>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className={styles['component__action-container']} htmlFor="escalate">
            <input
              className={styles.component__radio}
              id="escalate"
              name="action"
              type="radio"
              value="escalate"
              onChange={onSelect}
            />
            <div className={styles['component__action-text-wrapper']}>
              <Text fontWeight={600} type="p4">
                Help with the dispute
              </Text>
              <Text className={styles['component__action-text']} type="p5">
                Equifax's response hasn't met your needs and no specific action was requested,
                select this to escalate the case with Score Up support
              </Text>
            </div>
          </label>
        </>
      );
    }

    return null;
  }, [possibleActions, onSelect]);

  return possibleActions !== 'No options' ? (
    <div className={styles.component}>
      <Text type="h6">Take action</Text>
      {content}
      <Button
        className={styles.component__button}
        disabled={!action}
        loading={loading}
        title="Confirm selection"
        onClick={onSubmit}
      />
    </div>
  ) : null;
};
