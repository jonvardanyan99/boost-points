import classNames from 'classnames';
import { Text } from 'components/Text';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';

import styles from './styles.module.scss';

export const SignaturePad = ({ className }) => {
  const [isSignatureDrawn, setIsSignatureDrawn] = useState(false);
  const signatureRef = useRef();

  const css = { borderRadius: '4px', width: '100%', height: '100%' };

  const clearSignature = () => {
    signatureRef.current.clear();
    setIsSignatureDrawn(false);
  };

  const handleDraw = () => {
    if (!isSignatureDrawn) {
      setIsSignatureDrawn(true);
    }
  };

  return (
    <div className={classNames(styles['signature-pad'], className)}>
      <Text type="p4" className={styles['signature-pad__text']}>
        Sign inside this box
      </Text>
      {isSignatureDrawn && (
        <button type="button" onClick={clearSignature}>
          <Text type="p4" className={styles['signature-pad__clear-text']} fontWeight={600}>
            Clear
          </Text>
        </button>
      )}
      <SignatureCanvas ref={signatureRef} canvasProps={{ style: css }} onBegin={handleDraw} />
    </div>
  );
};

SignaturePad.propTypes = {
  className: PropTypes.string,
};
