import React, { useCallback, useState } from 'react';

import rightArrowGray from '~/assets/icons/right-arrow-gray-2.svg';
import upArrowGray from '~/assets/icons/up-arrow-gray.svg';
import { Text } from '~/components/Text';

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
    <button className={styles.question} type="button" onClick={toggleIsActive}>
      <div className={styles.question__wrapper}>
        <Text type="p3">{question}</Text>
        {isActive ? (
          <img alt="up-arrow-gray" src={upArrowGray} />
        ) : (
          <img alt="right-arrow-gray" src={rightArrowGray} />
        )}
      </div>
      {isActive && (
        <Text className={styles.question__text} type="p4">
          {text}
        </Text>
      )}
    </button>
  );
};
