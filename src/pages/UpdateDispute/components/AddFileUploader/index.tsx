import plusGreen from 'assets/icons/plus-green.svg';
import classNames from 'classnames';
import { Text } from 'components/Text';
import React, { useCallback, useRef } from 'react';

import styles from './styles.module.scss';

interface Props {
  className?: string;
  onSelect: (file: File) => void;
}

export const AddFileUploader: React.FC<Props> = ({ className, onSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerFileInput = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  const handleFileSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files?.length) {
        onSelect(event.target.files[0]);
      }
    },
    [onSelect],
  );

  return (
    <div className={classNames(styles['file-uploader'], className)}>
      <button type="button" className={styles['file-uploader__wrapper']} onClick={triggerFileInput}>
        <img src={plusGreen} alt="plus-green" />
        <Text type="p5" fontWeight={600} className={styles['file-uploader__text']}>
          Add another file
        </Text>
      </button>
      <input
        type="file"
        ref={fileInputRef}
        className={styles['file-uploader__file-input']}
        onChange={handleFileSelect}
      />
    </div>
  );
};
