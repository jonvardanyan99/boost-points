import classNames from 'classnames';
import React, { CSSProperties, useEffect, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';

import { Text } from '~/components/Text';

import styles from './styles.module.scss';

const CSS: CSSProperties = { borderRadius: '4px', width: '100%', height: '100%' };

interface Props {
  className?: string;
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}

export const SignaturePad: React.FC<Props> = ({ className, value, onChange }) => {
  const signatureRef = useRef<SignatureCanvas>(null);

  useEffect(() => {
    return () => {
      onChange('');
    };
  }, [onChange]);

  const clearSignature = () => {
    if (signatureRef.current) {
      signatureRef.current.clear();
    }
    onChange('');
  };

  const getSignature = () => {
    if (signatureRef.current) {
      onChange(signatureRef.current.toDataURL());
    }
  };

  return (
    <div className={classNames(styles['signature-pad'], className)}>
      <Text className={styles['signature-pad__text']} type="p4">
        Sign inside this box
      </Text>
      {value && (
        <button type="button" onClick={clearSignature}>
          <Text className={styles['signature-pad__clear-text']} fontWeight={600} type="p4">
            Clear
          </Text>
        </button>
      )}
      <SignatureCanvas canvasProps={{ style: CSS }} ref={signatureRef} onEnd={getSignature} />
    </div>
  );
};
