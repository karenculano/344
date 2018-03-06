import debounce from 'lodash.debounce';
import settings from '../../globals/js/settings';
import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentByEvent from '../../globals/js/mixins/init-component-by-event';
import eventedShowHideState from '../../globals/js/mixins/evented-show-hide-state';
import handles from '../../globals/js/mixins/handles';
import FloatingMenu, { DIRECTION_LEFT, DIRECTION_TOP, DIRECTION_RIGHT, DIRECTION_BOTTOM } from '../floating-menu/floating-menu';
import getLaunchingDetails from '../../globals/js/misc/get-launching-details';
import on from '../../globals/js/misc/on';

/**
 * @param {Element} menuBody The menu body with the menu arrow.
 * @param {string} menuDirection Where the floating menu menu should be placed relative to the trigger button.
 * @returns {FloatingMenu~offset} The adjustment of the floating menu position, upon the position of the menu arrow.
 * @private
 */
const getMenuOffset = (menuBody, menuDirection) => {
  const arrowStyle = menuBody.ownerDocument.defaultView.getComputedStyle(menuBody, ':before');
  const arrowPositionProp = {
    [DIRECTION_LEFT]: 'right',
    [DIRECTION_TOP]: 'bottom',
    [DIRECTION_RIGHT]: 'left',
    [DIRECTION_BOTTOM]: 'top',
  }[menuDirection];
  const menuPositionAdjustmentProp = {
    [DIRECTION_LEFT]: 'left',
    [DIRECTION_TOP]: 'top',
    [DIRECTION_RIGHT]: 'left',
    [DIRECTION_BOTTOM]: 'top',
  }[menuDirection];
  const values = [arrowPositionProp, 'border-bottom-width'].reduce(
    (o, name) => ({
      ...o,
      [name]: Number((/^([\d-]+)px$/.exec(arrowStyle.getPropertyValue(name)) || [])[1]),
    }),
    {}
  );
  values[arrowPositionProp] = values[arrowPositionProp] || -6; // IE, etc.
  if (Object.keys(values).every(name => !isNaN(values[name]))) {
    const { [arrowPositionProp]: arrowPosition, 'border-bottom-width': borderBottomWidth } = values;
    return {
      left: 0,
      top: 0,
      [menuPositionAdjustmentProp]: Math.sqrt(borderBottomWidth ** 2 * 2) - arrowPosition,
    };
  }
  return undefined;
};

class Tooltip extends mixin(createComponent, initComponentByEvent, eventedShowHideState, handles) {
  /**
   * Tooltip.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @extends Handles
   */
  constructor(element, options) {
    super(element, options);
    this._hookOn(element);
  }

  /**
   * The debounced version of the event handler.
   * @type {Function}
   * @private
   */
  _debouncedHandleHover = debounce(this._handleHover, 200);

  /**
   * A method called when this widget is created upon events.
   * @param {Event} event The event triggering the creation.
   */
  createdByEvent(event) {
    const { relatedTarget, type } = event;
    this._debouncedHandleHover({ relatedTarget, type, details: getLaunchingDetails(event) });
  }

  /**
   * Changes the shown/hidden state.
   * @param {string} state The new state.
   * @param {Object} detail The detail of the event trigging this action.
   * @param {Function} callback Callback called when change in state completes.
   // */
  changeState(state, detail, callback) {
    if (!this.tooltip) {
      const tooltip = this.element.ownerDocument.querySelector(this.element.getAttribute(this.options.attribTooltipTarget));
      if (!tooltip) {
        throw new Error('Cannot find the target tooltip.');
      }

      // Lazily create a component instance for tooltip
      this.tooltip = FloatingMenu.create(tooltip, {
        refNode: this.element,
        classShown: this.options.classShown,
        offset: this.options.objMenuOffset,
      });
      this._hookOn(tooltip);
      this.children.push(this.tooltip);
    }

    // Delegates the action of changing state to the tooltip.
    // (And thus the before/after shown/hidden events are fired from the tooltip)
    this.tooltip.changeState(state, Object.assign(detail, { delegatorNode: this.element }), callback);
  }

  /**
   * Attaches event handlers to show/hide the tooltip.
   * @param {Element} element The element to attach the events to.
   * @private
   */
  _hookOn(element) {
    ['mouseover', 'mouseout', 'focus', 'blur', 'touchleave', 'touchcancel'].forEach(name => {
      this.manage(
        on(element, name, event => {
          const { relatedTarget, type } = event;
          this._debouncedHandleHover({ relatedTarget, type, details: getLaunchingDetails(event) });
        })
      );
    });
  }

  /**
   * Handles hover/focus events.
   * @param {Object} params The parameters.
   * @param {number} params.relatedTarget For `mouseover` event, indicates where the mouse pointer is gone.
   * @param {string} params.type The event type triggering this method.
   * @param {Object} params.details The event details.
   * @private
   */
  _handleHover({ relatedTarget, type, details }) {
    const state = {
      mouseover: 'shown',
      mouseout: 'hidden',
      focus: 'shown',
      blur: 'hidden',
      touchleave: 'hidden',
      touchcancel: 'hidden',
    }[type];
    // Note: SVGElement in IE11 does not have `.contains()`
    const shouldPreventClose =
      type === 'mouseout' &&
      relatedTarget &&
      ((this.element.contains && this.element.contains(relatedTarget)) || this.tooltip.element.contains(relatedTarget));
    if (!shouldPreventClose) {
      this.changeState(state, details);
    }
  }

  static components = new WeakMap();

  static get options() {
    const { prefix } = settings;
    return {
      selectorInit: '[data-tooltip-trigger]',
      classShown: `${prefix}--tooltip--shown`,
      attribTooltipTarget: 'data-tooltip-target',
      objMenuOffset: getMenuOffset,
      initEventNames: ['mouseover', 'focus'],
    };
  }
}

export default Tooltip;
