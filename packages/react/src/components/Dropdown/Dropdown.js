/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useRef, useContext } from 'react';
import { useSelect } from 'downshift';
import cx from 'classnames';
import PropTypes from 'prop-types';
import {
  Checkmark,
  WarningAltFilled,
  WarningFilled,
} from '@carbon/icons-react';
import ListBox, { PropTypes as ListBoxPropTypes } from '../ListBox';
import mergeRefs from '../../tools/mergeRefs';
import { useFeatureFlag } from '../FeatureFlags';
import { usePrefix } from '../../internal/usePrefix';
import { FormContext } from '../FluidForm';

const defaultItemToString = (item) => {
  if (typeof item === 'string') {
    return item;
  }

  return item ? item.label : '';
};

const Dropdown = React.forwardRef(function Dropdown(
  {
    className: containerClassName,
    disabled,
    direction,
    items,
    label,
    ariaLabel,
    itemToString,
    itemToElement,
    renderSelectedItem,
    type,
    size,
    onChange,
    id,
    titleText,
    hideLabel,
    helperText,
    translateWithId,
    light,
    invalid,
    invalidText,
    warn,
    warnText,
    initialSelectedItem,
    selectedItem: controlledSelectedItem,
    downshiftProps,
    ...other
  },
  ref
) {
  const prefix = usePrefix();
  const { isFluid } = useContext(FormContext);
  const selectProps = {
    ...downshiftProps,
    items,
    itemToString,
    initialSelectedItem,
    onSelectedItemChange,
  };

  // only set selectedItem if the prop is defined. Setting if it is undefined
  // will overwrite default selected items from useSelect
  if (controlledSelectedItem !== undefined) {
    selectProps.selectedItem = controlledSelectedItem;
  }

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getItemProps,
    highlightedIndex,
    selectedItem,
  } = useSelect(selectProps);
  const inline = type === 'inline';
  const showWarning = !invalid && warn;

  const enabled = useFeatureFlag('enable-v11-release');

  const className = cx(
    `${prefix}--dropdown`,
    [enabled ? null : containerClassName],
    {
      [`${prefix}--dropdown--invalid`]: invalid,
      [`${prefix}--dropdown--warning`]: showWarning,
      [`${prefix}--dropdown--open`]: isOpen,
      [`${prefix}--dropdown--inline`]: inline,
      [`${prefix}--dropdown--disabled`]: disabled,
      [`${prefix}--dropdown--light`]: light,
      [`${prefix}--dropdown--${size}`]: size,
      [`${prefix}--list-box--up`]: direction === 'top',
    }
  );

  const titleClasses = cx(`${prefix}--label`, {
    [`${prefix}--label--disabled`]: disabled,
    [`${prefix}--visually-hidden`]: hideLabel,
  });

  const helperClasses = cx(`${prefix}--form__helper-text`, {
    [`${prefix}--form__helper-text--disabled`]: disabled,
  });

  const wrapperClasses = cx(
    `${prefix}--dropdown__wrapper`,
    `${prefix}--list-box__wrapper`,
    [enabled ? containerClassName : null],
    {
      [`${prefix}--dropdown__wrapper--inline`]: inline,
      [`${prefix}--list-box__wrapper--inline`]: inline,
      [`${prefix}--dropdown__wrapper--inline--invalid`]: inline && invalid,
      [`${prefix}--list-box__wrapper--inline--invalid`]: inline && invalid,
      [`${prefix}--dropdown__wrapper--fluid--invalid`]: isFluid && invalid,
    }
  );

  // needs to be Capitalized for react to render it correctly
  const ItemToElement = itemToElement;
  const toggleButtonProps = getToggleButtonProps();
  const helper =
    helperText && !isFluid ? (
      <div className={helperClasses}>{helperText}</div>
    ) : null;

  function onSelectedItemChange({ selectedItem }) {
    if (onChange) {
      onChange({ selectedItem });
    }
  }

  const menuItemOptionRefs = useRef(items.map((_) => React.createRef()));

  return (
    <div className={wrapperClasses} {...other}>
      {titleText && (
        <label className={titleClasses} {...getLabelProps()}>
          {titleText}
        </label>
      )}
      <ListBox
        aria-label={ariaLabel}
        size={size}
        className={className}
        invalid={invalid}
        invalidText={invalidText}
        warn={warn}
        warnText={warnText}
        light={light}
        isOpen={isOpen}
        id={id}>
        {invalid && (
          <WarningFilled className={`${prefix}--list-box__invalid-icon`} />
        )}
        {showWarning && (
          <WarningAltFilled
            className={`${prefix}--list-box__invalid-icon ${prefix}--list-box__invalid-icon--warning`}
          />
        )}
        <button
          type="button"
          className={`${prefix}--list-box__field`}
          disabled={disabled}
          aria-disabled={disabled}
          title={selectedItem ? itemToString(selectedItem) : label}
          {...toggleButtonProps}
          ref={mergeRefs(toggleButtonProps.ref, ref)}>
          <span className={`${prefix}--list-box__label`}>
            {selectedItem
              ? renderSelectedItem
                ? renderSelectedItem(selectedItem)
                : itemToString(selectedItem)
              : label}
          </span>
          <ListBox.MenuIcon isOpen={isOpen} translateWithId={translateWithId} />
        </button>
        <ListBox.Menu {...getMenuProps()}>
          {isOpen &&
            items.map((item, index) => {
              const itemProps = getItemProps({
                item,
                index,
                disabled: item.disabled,
              });
              const title = itemToElement ? item.text : itemToString(item);
              return (
                <ListBox.MenuItem
                  key={itemProps.id}
                  isActive={selectedItem === item}
                  isHighlighted={
                    highlightedIndex === index || selectedItem === item
                  }
                  title={title}
                  ref={{
                    menuItemOptionRef: menuItemOptionRefs.current[index],
                  }}
                  {...itemProps}>
                  {itemToElement ? (
                    <ItemToElement key={itemProps.id} {...item} />
                  ) : (
                    itemToString(item)
                  )}
                  {selectedItem === item && (
                    <Checkmark
                      className={`${prefix}--list-box__menu-item__selected-icon`}
                    />
                  )}
                </ListBox.MenuItem>
              );
            })}
        </ListBox.Menu>
      </ListBox>
      {!inline && !invalid && !warn && helper}
    </div>
  );
});

Dropdown.displayName = 'Dropdown';
Dropdown.propTypes = {
  /**
   * 'aria-label' of the ListBox component.
   */
  ariaLabel: PropTypes.string,

  /**
   * Provide a custom className to be applied on the bx--dropdown node
   */
  className: PropTypes.string,

  /**
   * Specify the direction of the dropdown. Can be either top or bottom.
   */
  direction: PropTypes.oneOf(['top', 'bottom']),

  /**
   * Disable the control
   */
  disabled: PropTypes.bool,

  /**
   * Additional props passed to Downshift
   */
  downshiftProps: PropTypes.object,

  /**
   * Provide helper text that is used alongside the control label for
   * additional help
   */
  helperText: PropTypes.node,

  /**
   * Specify whether the title text should be hidden or not
   */
  hideLabel: PropTypes.bool,

  /**
   * Specify a custom `id`
   */
  id: PropTypes.string.isRequired,

  /**
   * Allow users to pass in an arbitrary item or a string (in case their items are an array of strings)
   * from their collection that are pre-selected
   */
  initialSelectedItem: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.number,
  ]),

  /**
   * Specify if the currently selected value is invalid.
   */
  invalid: PropTypes.bool,

  /**
   * Message which is displayed if the value is invalid.
   */
  invalidText: PropTypes.node,

  /**
   * Function to render items as custom components instead of strings.
   * Defaults to null and is overridden by a getter
   */
  itemToElement: PropTypes.func,

  /**
   * Helper function passed to downshift that allows the library to render a
   * given item to a string label. By default, it extracts the `label` field
   * from a given item to serve as the item label in the list.
   */
  itemToString: PropTypes.func,

  /**
   * We try to stay as generic as possible here to allow individuals to pass
   * in a collection of whatever kind of data structure they prefer
   */
  items: PropTypes.array.isRequired,

  /**
   * Generic `label` that will be used as the textual representation of what
   * this field is for
   */
  label: PropTypes.node.isRequired,

  /**
   * `true` to use the light version.
   */
  light: PropTypes.bool,

  /**
   * `onChange` is a utility for this controlled component to communicate to a
   * consuming component what kind of internal state changes are occurring.
   */
  onChange: PropTypes.func,

  /**
   * An optional callback to render the currently selected item as a react element instead of only
   * as a string.
   */
  renderSelectedItem: PropTypes.func,

  /**
   * In the case you want to control the dropdown selection entirely.
   */
  selectedItem: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.number,
  ]),

  /**
   * Specify the size of the ListBox. Currently supports either `sm`, `md` or `lg` as an option.
   */
  size: ListBoxPropTypes.ListBoxSize,

  /**
   * Provide the title text that will be read by a screen reader when
   * visiting this control
   */
  titleText: PropTypes.node,

  /**
   * Callback function for translating ListBoxMenuIcon SVG title
   */
  translateWithId: PropTypes.func,

  /**
   * The dropdown type, `default` or `inline`
   */
  type: ListBoxPropTypes.ListBoxType,

  /**
   * Specify whether the control is currently in warning state
   */
  warn: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText: PropTypes.node,
};

Dropdown.defaultProps = {
  disabled: false,
  type: 'default',
  itemToString: defaultItemToString,
  itemToElement: null,
  light: false,
  titleText: '',
  helperText: '',
  direction: 'bottom',
};

export default Dropdown;
