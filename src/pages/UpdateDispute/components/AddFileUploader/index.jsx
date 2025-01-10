import plusGreen from 'assets/icons/plus-green.svg';
import classNames from 'classnames';
import { Text } from 'components/Text';
import PropTypes from 'prop-types';
import React, { useCallback, useRef } from 'react';

import styles from './styles.module.scss';

export const AddFileUploader = ({ className, onSelect }) => {
  const fileInputRef = useRef(null);

  const triggerFileInput = useCallback(() => {
    fileInputRef.current.click();
  }, []);

  const handleFileSelect = useCallback(
    event => {
      if (event.target.files.length) {
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

AddFileUploader.propTypes = {
  className: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
};
