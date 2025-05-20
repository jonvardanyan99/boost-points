import closeGray from 'assets/icons/close-gray.svg';
import plus from 'assets/icons/plus.svg';
import upload from 'assets/icons/upload.svg';
import classNames from 'classnames';
import { Button } from 'components/Button';
import { Text } from 'components/Text';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { generateId } from 'utils/helpers';

import styles from './styles.module.scss';

interface Props {
  className?: string;
  description: string;
  value?: File | null;
  onSelect: (file: File) => void;
  onBlur?: () => void;
  onDelete?: () => void;
  label?: string;
  error?: string | null;
}

export const FileUploader: React.FC<Props> = ({
  className,
  description,
  value,
  onSelect,
  onBlur,
  onDelete,
  label,
  error,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const id = useMemo(() => {
    return generateId();
  }, []);

  const initializeInput = useCallback(() => {
    const dataTransfer = new global.DataTransfer();
    dataTransfer.items.add(new File([''], 'initialFile.txt'));

    if (fileInputRef.current) {
      fileInputRef.current.files = dataTransfer.files;
    }
  }, []);

  useEffect(() => {
    initializeInput();
  }, [initializeInput]);

  const handleValueDelete = useCallback(() => {
    onDelete?.();
    initializeInput();
  }, [onDelete, initializeInput]);

  const triggerFileInput = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length) {
        onSelect(event.target.files[0]);
      } else if (onBlur) {
        onBlur();
      }
    },
    [onSelect, onBlur],
  );

  return (
    <div className={classNames(styles['file-uploader'], className)}>
      {label && (
        <label htmlFor={id}>
          <Text
            type="p4"
            className={classNames(styles['file-uploader__label-text'], {
              [styles['file-uploader__label-text--selected']]: value instanceof File,
            })}
          >
            {label}
          </Text>
        </label>
      )}
      {!(value instanceof File) ? (
        <label htmlFor={id}>
          <div className={styles['file-uploader__container']}>
            <img src={upload} alt="upload" />
            <Text type="p2" className={styles['file-uploader__text']}>
              {description}
            </Text>
            <Button
              className={styles['file-uploader__main-button']}
              title="Add files"
              onClick={triggerFileInput}
              icon={plus}
            />
          </div>
          {error && (
            <Text type="p4" className={styles['file-uploader__error-text']}>
              {error}
            </Text>
          )}
        </label>
      ) : (
        <>
          <div className={styles['file-uploader__file-name-wrapper']}>
            <Text type="p4" fontWeight={600} className={styles['file-uploader__file-name']}>
              {value.name}
            </Text>
            <button
              type="button"
              className={styles['file-uploader__icon-button']}
              onClick={handleValueDelete}
            >
              <img src={closeGray} alt="close-gray" />
            </button>
          </div>
          <Button
            className={styles['file-uploader__upload-new']}
            title="Upload new"
            onClick={triggerFileInput}
          />
        </>
      )}
      <input
        type="file"
        id={id}
        className={styles['file-uploader__file-input']}
        ref={fileInputRef}
        onChange={handleFileSelect}
        onBlur={onBlur}
      />
    </div>
  );
};
