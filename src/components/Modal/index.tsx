import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import styles from './styles.module.scss';

const modalRoot = global.document.getElementById('modal-root') as HTMLDivElement;

interface Props {
  visible: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<Props> = ({ visible, children, className }) => {
  const containerRef = useRef(global.document.createElement('div'));

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (visible) {
      const container = containerRef.current;

      const ContainerClassName = className ? className : '';
      container.classList.add(styles.modal, ContainerClassName);

      modalRoot.appendChild(container);
      global.document.body.classList.add(styles['hidden-body']);

      return () => {
        modalRoot.removeChild(container);
        global.document.body.classList.remove(styles['hidden-body']);
      };
    }
  }, [className, visible]);

  if (visible) {
    return createPortal(children, containerRef.current);
  }

  return null;
};
