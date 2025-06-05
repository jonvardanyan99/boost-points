import classNames from 'classnames';
import React, { useCallback, useRef } from 'react';

import plusGreen from '~/assets/icons/plus-green.svg';
import { Text } from '~/components/Text';

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
      <button className={styles['file-uploader__wrapper']} type="button" onClick={triggerFileInput}>
        <img alt="plus-green" src={plusGreen} />
        <Text className={styles['file-uploader__text']} fontWeight={600} type="p5">
          Add another file
        </Text>
      </button>
      <input
        className={styles['file-uploader__file-input']}
        ref={fileInputRef}
        type="file"
        onChange={handleFileSelect}
      />
    </div>
  );
};
