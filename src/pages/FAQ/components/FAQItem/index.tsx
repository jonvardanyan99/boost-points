import rightArrowGray from 'assets/icons/right-arrow-gray-2.svg';
import upArrowGray from 'assets/icons/up-arrow-gray.svg';
import { Text } from 'components/Text';
import React, { useCallback, useState } from 'react';

import styles from './styles.module.scss';

interface Props {
  question: string;
  text: string;
}

export const FAQItem: React.FC<Props> = ({ question, text }) => {
  const [isActive, setIsActive] = useState(false);

  const toggleIsActive = useCallback(() => {
    setIsActive(prevValue => !prevValue);
  }, []);

  return (
    <button type="button" className={styles.question} onClick={toggleIsActive}>
      <div className={styles.question__wrapper}>
        <Text type="p3">{question}</Text>
        {isActive ? (
          <img src={upArrowGray} alt="up-arrow-gray" />
        ) : (
          <img src={rightArrowGray} alt="right-arrow-gray" />
        )}
      </div>
      {isActive && (
        <Text type="p4" className={styles.question__text}>
          {text}
        </Text>
      )}
    </button>
  );
};
