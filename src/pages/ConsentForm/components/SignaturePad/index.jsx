import classNames from 'classnames';
import { Text } from 'components/Text';
import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';

import styles from './styles.module.scss';

const css = { borderRadius: '4px', width: '100%', height: '100%' };

export const SignaturePad = ({ className, value, onChange }) => {
  const signatureRef = useRef();

  useEffect(() => {
    return () => {
      onChange('');
    };
  }, [onChange]);

  const clearSignature = () => {
    signatureRef.current.clear();
    onChange('');
  };

  const getSignature = () => {
    onChange(signatureRef.current.toDataURL());
  };

  return (
    <div className={classNames(styles['signature-pad'], className)}>
      <Text type="p4" className={styles['signature-pad__text']}>
        Sign inside this box
      </Text>
      {value && (
        <button type="button" onClick={clearSignature}>
          <Text type="p4" className={styles['signature-pad__clear-text']} fontWeight={600}>
            Clear
          </Text>
        </button>
      )}
      <SignatureCanvas ref={signatureRef} canvasProps={{ style: css }} onEnd={getSignature} />
    </div>
  );
};

SignaturePad.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
