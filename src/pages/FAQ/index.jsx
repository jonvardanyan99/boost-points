import { Input } from 'components/Input';
import { Text } from 'components/Text';
import React, { useCallback, useEffect, useState } from 'react';

import { Question } from './components/Question';
import { questions } from './data';
import styles from './styles.module.scss';

export const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(
      questions.filter(questionData =>
        questionData.question.toLowerCase().includes(searchQuery.toLowerCase().trim()),
      ),
    );
  }, [searchQuery]);

  const handleInputChange = useCallback(event => {
    setSearchQuery(event.target.value);
  }, []);

  return (
    <div className={styles.faq}>
      <div className={styles.faq__container}>
        <Text type="h6">Frequently Asked Questions</Text>
        <Input
          className={styles['faq__search-input']}
          placeholder="Search"
          value={searchQuery}
          setValue={setSearchQuery}
          onChange={handleInputChange}
          clearable
        />
        {data.length > 0 && (
          <div className={styles['faq__question-container']}>
            {data.map(item => (
              <Question key={item.id} question={item.question} text={item.text} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
