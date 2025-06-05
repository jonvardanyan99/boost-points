import React, { useCallback, useEffect, useState } from 'react';

import { Input } from '~/components/Input';
import { Text } from '~/components/Text';
import { AskedQuestion } from '~/types/models';

import { FAQItem } from './components/FAQItem';
import { questions } from './data';
import styles from './styles.module.scss';

export const FAQ: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState<AskedQuestion[]>([]);

  useEffect(() => {
    setData(
      questions.filter(questionData =>
        questionData.question.toLowerCase().includes(searchQuery.toLowerCase().trim()),
      ),
    );
  }, [searchQuery]);

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  }, []);

  return (
    <div className={styles.faq}>
      <div className={styles.faq__container}>
        <Text type="h6">Frequently Asked Questions</Text>
        <Input
          clearable
          className={styles['faq__search-input']}
          placeholder="Search"
          setValue={setSearchQuery}
          value={searchQuery}
          onChange={handleInputChange}
        />
        {data.length > 0 && (
          <div className={styles['faq__question-container']}>
            {data.map(item => (
              <FAQItem key={item.id} question={item.question} text={item.text} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
