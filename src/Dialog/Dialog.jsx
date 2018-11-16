import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Transition } from 'react-transition-group';

import styles from './style.module.scss';

const TIMEOUT = {
  enter: 0,
  exit: 300,
};

function Dialog({
  active,
  actions,
  children,
  className,
  stateClassNames,
  container,
  onOutsideClick,
  ...rest
}) {
  return createPortal(
    <Transition
      in={active}
      timeout={TIMEOUT}
      unmountOnExit
      mountOnEnter
      appear
    >
      {state => (
        <div
          className={styles.dialog}
          role="dialog"
        >
          <div
            className={cx(styles.overlay, styles[state])}
            onClick={onOutsideClick}
            aria-hidden
          />
          <div
            className={cx(styles.modal, styles[state], {
              [styles['with-action']]: actions.length,
            })}
            role="document"
            {...rest}
          >
            {children}
            <div className={styles.actions}>
              {actions}
            </div>
          </div>
        </div>
      )}
    </Transition>,
    container,
  );
}

const elType = PropTypes.oneOfType([
  PropTypes.node,
  PropTypes.string,
]);

Dialog.propTypes = {
  // From parent
  active: PropTypes.bool.isRequired,
  actions: PropTypes.arrayOf(elType),
  children: elType,
  className: PropTypes.string,
  stateClassNames: PropTypes.objectOf(PropTypes.string),
  container: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  onOutsideClick: PropTypes.func,
};

const noop = () => {};

Dialog.defaultProps = {
  actions: [],
  children: null,
  className: '',
  stateClassNames: {},
  container: document.body,
  onOutsideClick: noop,
};

export default Dialog;
