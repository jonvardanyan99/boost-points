import downArrow from 'assets/icons/down-arrow.svg';
import exclamationMark from 'assets/icons/exclamation-mark.svg';
import upArrow from 'assets/icons/up-arrow.svg';
import classNames from 'classnames';
import { Text } from 'components/Text';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo, useState } from 'react';

import { Issue } from './components/Issue';
import styles from './styles.module.scss';

export const IssueCategory = ({ name, issues, agency }) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const data = useMemo(() => {
    return issues.find(issue => issue.name === name) || null;
  }, [name, issues]);

  const toggleCategoryOpen = useCallback(() => {
    setIsCategoryOpen(prevValue => !prevValue);
  }, []);

  return (
    <div className={classNames(styles.category, { [styles['category--open']]: isCategoryOpen })}>
      <button
        type="button"
        className={classNames(styles.category__button, {
          [styles['category__button--active']]: data,
        })}
        onClick={data ? toggleCategoryOpen : undefined}
      >
        <div
          className={classNames(styles.category__header, {
            [styles['category__header--open']]: isCategoryOpen,
          })}
        >
          <Text type="p3" fontWeight={600}>
            {name}
          </Text>
          {data ? (
            <div className={styles['category__quantity-container']}>
              <div className={styles['category__quantity-wrapper']}>
                <img src={exclamationMark} width="13px" height="13px" alt="exclamation-mark" />
                <Text type="p4" fontWeight={600} className={styles.category__quantity}>
                  {data.qt}
                </Text>
              </div>
              {isCategoryOpen ? (
                <img src={upArrow} alt="up-arrow" />
              ) : (
                <img src={downArrow} alt="down-arrow" />
              )}
            </div>
          ) : (
            <Text type="p4" fontWeight={600} className={styles['category__no-quantity']}>
              0
            </Text>
          )}
        </div>
      </button>
      {isCategoryOpen && (
        <div className={styles['category__issues-container']}>
          {data.issues.map(issue => (
            <Issue key={issue.uuid} data={issue} agency={agency} />
          ))}
        </div>
      )}
    </div>
  );
};

IssueCategory.propTypes = {
  name: PropTypes.string.isRequired,
  issues: PropTypes.arrayOf(PropTypes.shape).isRequired,
  agency: PropTypes.string.isRequired,
};
