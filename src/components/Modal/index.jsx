import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import styles from './styles.module.scss';

const modalRoot = global.document.getElementById('modal-root');

export const Modal = ({ visible, children, className }) => {
  const containerRef = useRef(global.document.createElement('div'));

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (visible) {
      const container = containerRef.current;
      container.classList.add(styles.modal, className);

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

Modal.propTypes = {
  visible: PropTypes.bool.isRequired,
  children: PropTypes.shape({}).isRequired,
  className: PropTypes.string,
};
