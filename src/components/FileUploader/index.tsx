import classNames from 'classnames';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';

import closeGray from '~/assets/icons/close-gray.svg';
import plus from '~/assets/icons/plus.svg';
import upload from '~/assets/icons/upload.svg';
import { Button } from '~/components/Button';
import { Text } from '~/components/Text';
import { generateId } from '~/utils/helpers';

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
            className={classNames(styles['file-uploader__label-text'], {
              [styles['file-uploader__label-text--selected']]: value instanceof File,
            })}
            type="p4"
          >
            {label}
          </Text>
        </label>
      )}
      {!(value instanceof File) ? (
        <label htmlFor={id}>
          <div className={styles['file-uploader__container']}>
            <img alt="upload" src={upload} />
            <Text className={styles['file-uploader__text']} type="p2">
              {description}
            </Text>
            <Button
              className={styles['file-uploader__main-button']}
              icon={plus}
              title="Add files"
              onClick={triggerFileInput}
            />
          </div>
          {error && (
            <Text className={styles['file-uploader__error-text']} type="p4">
              {error}
            </Text>
          )}
        </label>
      ) : (
        <>
          <div className={styles['file-uploader__file-name-wrapper']}>
            <Text className={styles['file-uploader__file-name']} fontWeight={600} type="p4">
              {value.name}
            </Text>
            <button
              className={styles['file-uploader__icon-button']}
              type="button"
              onClick={handleValueDelete}
            >
              <img alt="close-gray" src={closeGray} />
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
        className={styles['file-uploader__file-input']}
        id={id}
        ref={fileInputRef}
        type="file"
        onBlur={onBlur}
        onChange={handleFileSelect}
      />
    </div>
  );
};
