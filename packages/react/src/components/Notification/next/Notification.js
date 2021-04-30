/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import { settings } from 'carbon-components';
import {
  Close20,
  ErrorFilled20,
  CheckmarkFilled20,
  WarningFilled20,
  WarningAltFilled20,
  InformationFilled20,
  InformationSquareFilled20,
} from '@carbon/icons-react';

import useIsomorphicEffect from '../../../internal/useIsomorphicEffect';

const { prefix } = settings;

export function NotificationButton({
  ariaLabel,
  className,
  iconDescription,
  type,
  renderIcon: IconTag,
  name,
  notificationType,
  ...rest
}) {
  const buttonClassName = cx(className, {
    [`${prefix}--${notificationType}-notification__close-button`]: notificationType,
  });
  const iconClassName = cx({
    [`${prefix}--${notificationType}-notification__close-icon`]: notificationType,
  });

  return (
    // eslint-disable-next-line react/button-has-type
    <button
      {...rest}
      type={type}
      aria-label={iconDescription}
      title={iconDescription}
      className={buttonClassName}>
      {IconTag && (
        <IconTag aria-label={ariaLabel} className={iconClassName} name={name} />
      )}
    </button>
  );
}

NotificationButton.propTypes = {
  /**
   * Specify a label to be read by screen readers on the notification button
   */
  ariaLabel: PropTypes.string,

  /**
   * Specify an optional className to be applied to the notification button
   */
  className: PropTypes.string,

  /**
   * Provide a description for "close" icon that can be read by screen readers
   */
  iconDescription: PropTypes.string,

  /**
   * Specify an optional icon for the Button through a string,
   * if something but regular "close" icon is desirable
   */
  name: PropTypes.string,

  /**
   * Specify the notification type
   */
  notificationType: PropTypes.oneOf(['toast', 'inline']),

  /**
   * Optional prop to allow overriding the icon rendering.
   * Can be a React component class
   */
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /**
   * Optional prop to specify the type of the Button
   */
  type: PropTypes.string,
};

NotificationButton.defaultProps = {
  ariaLabel: 'close notification', // TODO: deprecate this prop
  notificationType: 'toast',
  type: 'button',
  iconDescription: 'close icon',
  renderIcon: Close20,
};

const iconTypes = {
  error: ErrorFilled20,
  success: CheckmarkFilled20,
  warning: WarningFilled20,
  ['warning-alt']: WarningAltFilled20,
  info: InformationFilled20,
  ['info-square']: InformationSquareFilled20,
};

function NotificationIcon({ iconDescription, kind, notificationType }) {
  const IconForKind = iconTypes[kind];
  if (!IconForKind) {
    return null;
  }
  return (
    <IconForKind
      className={`${prefix}--${notificationType}-notification__icon`}>
      <title>{iconDescription}</title>
    </IconForKind>
  );
}

NotificationIcon.propTypes = {
  iconDescription: PropTypes.string.isRequired,
  kind: PropTypes.oneOf([
    'error',
    'success',
    'warning',
    'warning-alt',
    'info',
    'info-square',
  ]).isRequired,
  notificationType: PropTypes.oneOf(['inline', 'toast']).isRequired,
};

export function ToastNotification({
  role,
  notificationType,
  onClose,
  onCloseButtonClick,
  iconDescription,
  statusIconDescription,
  className,
  content,
  kind,
  lowContrast,
  hideCloseButton,
  timeout,
  ...rest
}) {
  const [isOpen, setIsOpen] = useState(true);
  const containerClassName = cx(className, {
    [`${prefix}--toast-notification`]: true,
    [`${prefix}--toast-notification--low-contrast`]: lowContrast,
    [`${prefix}--toast-notification--${kind}`]: kind,
  });

  const handleClose = (evt) => {
    if (!onClose || onClose(evt) !== false) {
      setIsOpen(false);
    }
  };

  useIsomorphicEffect(() => {
    document.addEventListener('keydown', handleClose, false);

    return function cleanup() {
      document.removeEventListener('keydown', handleClose, false);
    };
  });

  function handleCloseButtonClick(event) {
    onCloseButtonClick(event);
    handleClose(event);
  }

  const savedOnClose = useRef(onClose);

  useEffect(() => {
    savedOnClose.current = onClose;
  });

  useEffect(() => {
    if (!timeout) {
      return;
    }

    const timeoutId = window.setTimeout((event) => {
      setIsOpen(false);
      if (savedOnClose.current) {
        savedOnClose.current(event);
      }
    }, timeout);
    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [timeout]);

  if (!isOpen) {
    return null;
  }

  return (
    <div {...rest} role={role} kind={kind} className={containerClassName}>
      <NotificationIcon
        notificationType={notificationType}
        kind={kind}
        iconDescription={statusIconDescription || `${kind} icon`}
      />
      <p className={`${prefix}--toast-notification__content`}>{content}</p>
      {!hideCloseButton && (
        <NotificationButton
          iconDescription={iconDescription}
          notificationType={notificationType}
          onClick={handleCloseButtonClick}
        />
      )}
    </div>
  );
}

ToastNotification.propTypes = {
  /**
   * Specify an optional className to be applied to the notification box
   */
  className: PropTypes.string,

  /**
   * Specify the content
   */
  content: PropTypes.string.isRequired,

  /**
   * Specify the close button should be disabled, or not
   */
  hideCloseButton: PropTypes.bool,

  /**
   * Provide a description for "close" icon that can be read by screen readers
   */
  iconDescription: PropTypes.string,

  /**
   * Specify what state the notification represents
   */
  kind: PropTypes.oneOf([
    'error',
    'info',
    'info-square',
    'success',
    'warning',
    'warning-alt',
  ]).isRequired,

  /**
   * Specify whether you are using the low contrast variant of the ToastNotification.
   */
  lowContrast: PropTypes.bool,

  /**
   * By default, this value is "toast". You can also provide an alternate type
   * if it makes sense for the underlying `<NotificationIcon>` and `<NotificationButton>`
   */
  notificationType: PropTypes.string,

  /**
   * Provide a function that is called when menu is closed
   */
  onClose: PropTypes.func,

  /**
   * Provide a function that is called when the close button is clicked
   */
  onCloseButtonClick: PropTypes.func,

  /**
   * By default, this value is "alert". You can also provide an alternate
   * role if it makes sense from the accessibility-side
   */
  role: PropTypes.string.isRequired,

  /**
   * Provide a description for "status" icon that can be read by screen readers
   */
  statusIconDescription: PropTypes.string,

  /**
   * Specify an optional duration the notification should be closed in
   */
  timeout: PropTypes.number,
};

ToastNotification.defaultProps = {
  kind: 'error',
  content: 'provide content',
  role: 'alert',
  notificationType: 'toast',
  iconDescription: 'closes notification',
  onCloseButtonClick: () => {},
  hideCloseButton: false,
  timeout: 0,
};

export function InlineNotification({
  content,
  role,
  notificationType,
  onClose,
  onCloseButtonClick,
  iconDescription,
  statusIconDescription,
  className,
  kind,
  lowContrast,
  hideCloseButton,
  ...rest
}) {
  const [isOpen, setIsOpen] = useState(true);
  const containerClassName = cx(className, {
    [`${prefix}--inline-notification`]: true,
    [`${prefix}--inline-notification--low-contrast`]: lowContrast,
    [`${prefix}--inline-notification--${kind}`]: kind,
    [`${prefix}--inline-notification--hide-close-button`]: hideCloseButton,
  });

  const handleClose = (evt) => {
    if (!onClose || onClose(evt) !== false) {
      setIsOpen(false);
    }
  };

  useIsomorphicEffect(() => {
    document.addEventListener('keydown', handleClose, false);

    return function cleanup() {
      document.removeEventListener('keydown', handleClose, false);
    };
  });

  function handleCloseButtonClick(event) {
    onCloseButtonClick(event);
    handleClose(event);
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div {...rest} role={role} kind={kind} className={containerClassName}>
      <div className={`${prefix}--inline-notification__details`}>
        <NotificationIcon
          notificationType={notificationType}
          kind={kind}
          iconDescription={statusIconDescription || `${kind} icon`}
        />
        <p className={`${prefix}--inline-notification__content`}>{content}</p>
      </div>

      {!hideCloseButton && (
        <NotificationButton
          iconDescription={iconDescription}
          notificationType={notificationType}
          onClick={handleCloseButtonClick}
        />
      )}
    </div>
  );
}

InlineNotification.propTypes = {
  /**
   * Specify an optional className to be applied to the notification box
   */
  className: PropTypes.string,

  /**
   * Specify the content
   */
  content: PropTypes.string.isRequired,

  /**
   * Specify the close button should be disabled, or not
   */
  hideCloseButton: PropTypes.bool,

  /**
   * Provide a description for "close" icon that can be read by screen readers
   */
  iconDescription: PropTypes.string,

  /**
   * Specify what state the notification represents
   */
  kind: PropTypes.oneOf([
    'error',
    'info',
    'info-square',
    'success',
    'warning',
    'warning-alt',
  ]).isRequired,

  /**
   * Specify whether you are using the low contrast variant of the InlineNotification.
   */
  lowContrast: PropTypes.bool,

  /**
   * By default, this value is "inline". You can also provide an alternate type
   * if it makes sense for the underlying `<NotificationIcon>` and `<NotificationButton>`
   */
  notificationType: PropTypes.string,

  /**
   * Provide a function that is called when menu is closed
   */
  onClose: PropTypes.func,

  /**
   * Provide a function that is called when the close button is clicked
   */
  onCloseButtonClick: PropTypes.func,

  /**
   * By default, this value is "alert". You can also provide an alternate
   * role if it makes sense from the accessibility-side
   */
  role: PropTypes.string.isRequired,

  /**
   * Provide a description for "status" icon that can be read by screen readers
   */
  statusIconDescription: PropTypes.string,
};

InlineNotification.defaultProps = {
  content: 'provide content',
  role: 'alert',
  notificationType: 'inline',
  iconDescription: 'closes notification',
  onCloseButtonClick: () => {},
  hideCloseButton: false,
};
