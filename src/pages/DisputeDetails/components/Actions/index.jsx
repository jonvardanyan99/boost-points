import { Button } from 'components/Button';
import { Text } from 'components/Text';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';

import styles from './styles.module.scss';

export const Actions = ({ possibleActions, action, onSelect, onSubmit, loading }) => {
  const content = useMemo(() => {
    if (possibleActions === 'Start options') {
      return (
        <>
          <label htmlFor="close" className={styles['component__action-container']}>
            <input
              id="close"
              className={styles.component__radio}
              type="radio"
              name="action"
              value="close"
              onChange={onSelect}
            />
            <div className={styles['component__action-text-wrapper']}>
              <Text type="p4" fontWeight={600}>
                Close the case
              </Text>
              <Text type="p5" className={styles['component__action-text']}>
                Equifax has confirmed the resolution of your issue
              </Text>
            </div>
          </label>
          <label htmlFor="refine" className={styles['component__action-container']}>
            <input
              id="refine"
              className={styles.component__radio}
              type="radio"
              name="action"
              value="refine"
              onChange={onSelect}
            />
            <div className={styles['component__action-text-wrapper']}>
              <Text type="p4" fontWeight={600}>
                Submit additional info
              </Text>
              <Text type="p5" className={styles['component__action-text']}>
                Equifax has requested additional details for your dispute case
              </Text>
            </div>
          </label>
          <label htmlFor="further" className={styles['component__action-container']}>
            <input
              id="further"
              className={styles.component__radio}
              type="radio"
              name="action"
              value="further"
              onChange={onSelect}
            />
            <div className={styles['component__action-text-wrapper']}>
              <Text type="p4" fontWeight={600}>
                Dispute further
              </Text>
              <Text type="p5" className={styles['component__action-text']}>
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
          <label htmlFor="close" className={styles['component__action-container']}>
            <input
              id="close"
              className={styles.component__radio}
              type="radio"
              name="action"
              value="close"
              onChange={onSelect}
            />
            <div className={styles['component__action-text-wrapper']}>
              <Text type="p4" fontWeight={600}>
                Close the case
              </Text>
              <Text type="p5" className={styles['component__action-text']}>
                Equifax has confirmed the resolution of your issue
              </Text>
            </div>
          </label>
          <label htmlFor="escalate" className={styles['component__action-container']}>
            <input
              id="escalate"
              className={styles.component__radio}
              type="radio"
              name="action"
              value="escalate"
              onChange={onSelect}
            />
            <div className={styles['component__action-text-wrapper']}>
              <Text type="p4" fontWeight={600}>
                Help with the dispute
              </Text>
              <Text type="p5" className={styles['component__action-text']}>
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
        title="Confirm selection"
        onClick={onSubmit}
        loading={loading}
        disabled={!action}
      />
    </div>
  ) : null;
};

Actions.propTypes = {
  possibleActions: PropTypes.oneOf(['Start options', 'Options with help needed', 'No options'])
    .isRequired,
  action: PropTypes.oneOf(['', 'close', 'refine', 'further', 'escalate']).isRequired,
  onSelect: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
