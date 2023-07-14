
/* eslint-enable @typescript-eslint/no-explicit-any */

/**
 * Calendar modules
 */
var Property = ej.base.Property;
var Event = ej.base.Event;
var __extends$1 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path='../calendar/calendar-model.d.ts'/>
//class constant defination
var DATEWRAPPER = 'e-date-wrapper';
var ROOT$1 = 'e-datepicker';
var LIBRARY = 'e-lib';
var CONTROL = 'e-control';
var POPUPWRAPPER = 'e-popup-wrapper';
var INPUTWRAPPER = 'e-input-group-icon';
var POPUP = 'e-popup';
var INPUTCONTAINER = 'e-input-group';
var INPUTFOCUS = 'e-input-focus';
var INPUTROOT = 'e-input';
var ERROR = 'e-error';
var ACTIVE = 'e-active';
var OVERFLOW = 'e-date-overflow';
var DATEICON = 'e-date-icon';
var ICONS = 'e-icons';
var OPENDURATION = 300;
var OFFSETVALUE = 4;
var SELECTED$2 = 'e-selected';
var FOCUSEDDATE$2 = 'e-focused-date';
var NONEDIT = 'e-non-edit';
var containerAttr = ['title', 'class', 'style'];
/**
 * Represents the DatePicker component that allows user to select
 * or enter a date value.
 * ```html
 * <input id='datepicker'/>
 * ```
 * ```typescript
 * <script>
 *   let datePickerObject:DatePicker = new DatePicker({ value: new Date() });
 *   datePickerObject.appendTo('#datepicker');
 * </script>
 * ```
 */
var NepaliDatePicker = /** @__PURE__ @class */ (function (_super) {
    __extends$1(NepaliDatePicker, _super);
    /**
     * Constructor for creating the widget.
     *
     * @param {DatePickerModel} options - Specifies the DatePicker model.
     * @param {string | HTMLInputElement} element - Specifies the element to render as component.
     * @private
     */
    function NepaliDatePicker(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.isDateIconClicked = false;
        _this.isAltKeyPressed = false;
        _this.isInteracted = true;
        _this.invalidValueString = null;
        _this.checkPreviousValue = null;
        _this.maskedDateValue = '';
        _this.isAngular = false;
        _this.preventChange = false;
        _this.isIconClicked = false;
        _this.isDynamicValueChanged = false;
        _this.moduleName = _this.getModuleName();
        _this.isFocused = false;
        _this.datepickerOptions = options;
        return _this;
    }
    /**
     * To Initialize the control rendering.
     *
     * @returns {void}
     * @private
     */
    NepaliDatePicker.prototype.render = function () {
        this.initialize();
        this.bindEvents();
        ej.inputs.Input.calculateWidth(this.inputElement, this.inputWrapper.container);
        if (!ej.base.isNullOrUndefined(this.inputWrapper.buttons[0]) && !ej.base.isNullOrUndefined(this.inputWrapper.container.getElementsByClassName('e-float-text-overflow')[0]) && this.floatLabelType !== 'Never') {
            this.inputWrapper.container.getElementsByClassName('e-float-text-overflow')[0].classList.add('e-icon');
        }
        if (!ej.base.isNullOrUndefined(ej.base.closest(this.element, 'fieldset')) && ej.base.closest(this.element, 'fieldset').disabled) {
            this.enabled = false;
        }
        this.renderComplete();
        this.setTimeZone(this.serverTimezoneOffset);
    };
    NepaliDatePicker.prototype.setTimeZone = function (offsetValue) {
        if (!ej.base.isNullOrUndefined(this.serverTimezoneOffset) && this.value) {
            var clientTimeZoneDiff = new Date().getTimezoneOffset() / 60;
            var serverTimezoneDiff = offsetValue;
            var timeZoneDiff = serverTimezoneDiff + clientTimeZoneDiff;
            timeZoneDiff = this.isDayLightSaving() ? timeZoneDiff-- : timeZoneDiff;
            this.value = new Date((this.value).getTime() + (timeZoneDiff * 60 * 60 * 1000));
            this.updateInput();
        }
    };
    NepaliDatePicker.prototype.isDayLightSaving = function () {
        var firstOffset = new Date(this.value.getFullYear(), 0, 1).getTimezoneOffset();
        var secondOffset = new Date(this.value.getFullYear(), 6, 1).getTimezoneOffset();
        return (this.value.getTimezoneOffset() < Math.max(firstOffset, secondOffset));
    };
    NepaliDatePicker.prototype.setAllowEdit = function () {
        if (this.allowEdit) {
            if (!this.readonly) {
                this.inputElement.removeAttribute('readonly');
            }
        }
        else {
            ej.base.attributes(this.inputElement, { 'readonly': '' });
        }
        this.updateIconState();
    };
    NepaliDatePicker.prototype.updateIconState = function () {
        if (!this.allowEdit && this.inputWrapper && !this.readonly) {
            if (this.inputElement.value === '') {
                ej.base.removeClass([this.inputWrapper.container], [NONEDIT]);
            }
            else {
                ej.base.addClass([this.inputWrapper.container], [NONEDIT]);
            }
        }
        else if (this.inputWrapper) {
            ej.base.removeClass([this.inputWrapper.container], [NONEDIT]);
        }
    };
    NepaliDatePicker.prototype.initialize = function () {
        this.checkInvalidValue(this.value);
        if (this.enableMask) {
            this.notify('createMask', {
                module: 'MaskedDateTime'
            });
        }
        this.createInput();
        this.updateHtmlAttributeToWrapper();
        this.setAllowEdit();
        if (this.enableMask && !this.value && this.maskedDateValue && (this.floatLabelType === 'Always' || !this.floatLabelType || !this.placeholder)) {
            this.updateInput(true);
            this.updateInputValue(this.maskedDateValue);
        }
        else if (!this.enableMask) {
            this.updateInput(true);
        }
        this.previousElementValue = this.inputElement.value;
        this.previousDate = !ej.base.isNullOrUndefined(this.value) ? new Date(+this.value) : null;
        this.inputElement.setAttribute('value', this.inputElement.value);
        this.inputValueCopy = this.value;
    };
    NepaliDatePicker.prototype.createInput = function () {
        var ariaAttrs = {
            'aria-atomic': 'true', 'aria-expanded': 'false',
            'role': 'combobox', 'autocomplete': 'off', 'autocorrect': 'off',
            'autocapitalize': 'off', 'spellcheck': 'false', 'aria-invalid': 'false'
        };
        if (this.getModuleName() === 'datepicker') {
            var l10nLocale = { placeholder: this.placeholder };
            this.globalize = new ej.base.Internationalization(this.locale);
            this.l10n = new ej.base.L10n('datepicker', l10nLocale, this.locale);
            this.setProperties({ placeholder: this.placeholder || this.l10n.getConstant('placeholder') }, true);
        }
        var updatedCssClassValues = this.cssClass;
        if (!ej.base.isNullOrUndefined(this.cssClass) && this.cssClass !== '') {
            updatedCssClassValues = (this.cssClass.replace(/\s+/g, ' ')).trim();
        }
        var isBindClearAction = this.enableMask ? false : true;
        this.inputWrapper = ej.inputs.Input.createInput({
            element: this.inputElement,
            floatLabelType: this.floatLabelType,
            bindClearAction: isBindClearAction,
            properties: {
                readonly: this.readonly,
                placeholder: this.placeholder,
                cssClass: updatedCssClassValues,
                enabled: this.enabled,
                enableRtl: this.enableRtl,
                showClearButton: this.showClearButton
            },
            buttons: [INPUTWRAPPER + ' ' + DATEICON + ' ' + ICONS]
        }, this.createElement);
        this.setWidth(this.width);
        if (this.inputElement.name !== '') {
            this.inputElement.setAttribute('name', '' + this.inputElement.getAttribute('name'));
        }
        else {
            this.inputElement.setAttribute('name', '' + this.element.id);
        }
        ej.base.attributes(this.inputElement, ariaAttrs);
        if (!this.enabled) {
            this.inputElement.setAttribute('aria-disabled', 'true');
            this.inputElement.tabIndex = -1;
        }
        else {
            this.inputElement.setAttribute('aria-disabled', 'false');
            this.inputElement.setAttribute('tabindex', this.tabIndex);
        }
        ej.inputs.Input.addAttributes({ 'aria-label': 'select' }, this.inputWrapper.buttons[0]);
        ej.base.addClass([this.inputWrapper.container], DATEWRAPPER);
    };
    NepaliDatePicker.prototype.updateInput = function (isDynamic) {
        if (isDynamic === void 0) { isDynamic = false; }
        var formatOptions;
        if (this.value && !this.isCalendar()) {
            this.disabledDates(isDynamic);
        }
        if (isNaN(+new Date(this.checkValue(this.value)))) {
            this.setProperties({ value: null }, true);
        }
        if (this.strictMode) {
            //calls the Calendar processDate protected method to update the date value according to the strictMode true behaviour.
            _super.prototype.validateDate.call(this);
            this.minMaxUpdates();
            _super.prototype.minMaxUpdate.call(this);
        }
        if (!ej.base.isNullOrUndefined(this.value)) {
            var dateValue = this.value;
            var dateString = void 0;
            var tempFormat = !ej.base.isNullOrUndefined(this.formatString) ? this.formatString : this.dateTimeFormat;
            if (this.getModuleName() === 'datetimepicker') {
                if (this.calendarMode === 'Gregorian') {
                    dateString = this.globalize.formatDate(this.value, {
                        format: tempFormat, type: 'dateTime', skeleton: 'yMd'
                    });
                }
                else {
                    dateString = this.globalize.formatDate(this.value, {
                        format: tempFormat, type: 'dateTime', skeleton: 'yMd', calendar: 'islamic'
                    });
                }
            }
            else {
                if (this.calendarMode === 'Gregorian') {
                    formatOptions = { format: this.formatString, type: 'dateTime', skeleton: 'yMd' };
                }
                else {
                    formatOptions = { format: this.formatString, type: 'dateTime', skeleton: 'yMd', calendar: 'islamic' };
                }
                dateString = this.globalize.formatDate(this.value, formatOptions);
            }
            if ((+dateValue <= +this.max) && (+dateValue >= +this.min)) {
                this.updateInputValue(dateString);
            }
            else {
                var value = (+dateValue >= +this.max || !+this.value) || (!+this.value || +dateValue <= +this.min);
                if (!this.strictMode && value) {
                    this.updateInputValue(dateString);
                }
            }
        }
        if (ej.base.isNullOrUndefined(this.value) && this.strictMode) {
            if (!this.enableMask) {
                this.updateInputValue('');
            }
            else {
                this.updateInputValue(this.maskedDateValue);
                this.notify('createMask', {
                    module: 'MaskedDateTime'
                });
            }
        }
        if (!this.strictMode && ej.base.isNullOrUndefined(this.value) && this.invalidValueString) {
            this.updateInputValue(this.invalidValueString);
        }
        this.changedArgs = { value: this.value };
        this.errorClass();
        this.updateIconState();
    };
    NepaliDatePicker.prototype.minMaxUpdates = function () {
        if (!ej.base.isNullOrUndefined(this.value) && this.value < this.min && this.min <= this.max && this.strictMode) {
            this.setProperties({ value: this.min }, true);
            this.changedArgs = { value: this.value };
        }
        else {
            if (!ej.base.isNullOrUndefined(this.value) && this.value > this.max && this.min <= this.max && this.strictMode) {
                this.setProperties({ value: this.max }, true);
                this.changedArgs = { value: this.value };
            }
        }
    };
    NepaliDatePicker.prototype.checkStringValue = function (val) {
        var returnDate = null;
        var formatOptions = null;
        var formatDateTime = null;
        if (this.getModuleName() === 'datetimepicker') {
            var culture = new ej.base.Internationalization(this.locale);
            if (this.calendarMode === 'Gregorian') {
                formatOptions = { format: this.dateTimeFormat, type: 'dateTime', skeleton: 'yMd' };
                formatDateTime = { format: culture.getDatePattern({ skeleton: 'yMd' }), type: 'dateTime' };
            }
            else {
                formatOptions = { format: this.dateTimeFormat, type: 'dateTime', skeleton: 'yMd', calendar: 'islamic' };
                formatDateTime = { format: culture.getDatePattern({ skeleton: 'yMd' }), type: 'dateTime', calendar: 'islamic' };
            }
        }
        else {
            if (this.calendarMode === 'Gregorian') {
                formatOptions = { format: this.formatString, type: 'dateTime', skeleton: 'yMd' };
            }
            else {
                formatOptions = { format: this.formatString, type: 'dateTime', skeleton: 'yMd', calendar: 'islamic' };
            }
        }
        returnDate = this.checkDateValue(this.globalize.parseDate(val, formatOptions));
        if (ej.base.isNullOrUndefined(returnDate) && (this.getModuleName() === 'datetimepicker')) {
            returnDate = this.checkDateValue(this.globalize.parseDate(val, formatDateTime));
        }
        return returnDate;
    };
    NepaliDatePicker.prototype.checkInvalidValue = function (value) {
        if (!(value instanceof Date) && !ej.base.isNullOrUndefined(value)) {
            var valueDate = null;
            var valueString = value;
            if (typeof value === 'number') {
                valueString = value.toString();
            }
            var formatOptions = null;
            var formatDateTime = null;
            if (this.getModuleName() === 'datetimepicker') {
                var culture = new ej.base.Internationalization(this.locale);
                if (this.calendarMode === 'Gregorian') {
                    formatOptions = { format: this.dateTimeFormat, type: 'dateTime', skeleton: 'yMd' };
                    formatDateTime = { format: culture.getDatePattern({ skeleton: 'yMd' }), type: 'dateTime' };
                }
                else {
                    formatOptions = { format: this.dateTimeFormat, type: 'dateTime', skeleton: 'yMd', calendar: 'islamic' };
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    formatDateTime = { format: culture.getDatePattern({ skeleton: 'yMd' }), type: 'dateTime', calendar: 'islamic' };
                }
            }
            else {
                if (this.calendarMode === 'Gregorian') {
                    formatOptions = { format: this.formatString, type: 'dateTime', skeleton: 'yMd' };
                }
                else {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    formatOptions = { format: this.formatString, type: 'dateTime', skeleton: 'yMd', calendar: 'islamic' };
                }
            }
            var invalid = false;
            if (typeof valueString !== 'string') {
                valueString = null;
                invalid = true;
            }
            else {
                if (typeof valueString === 'string') {
                    valueString = valueString.trim();
                }
                valueDate = this.checkStringValue(valueString);
                if (!valueDate) {
                    var extISOString = null;
                    var basicISOString = null;
                    // eslint-disable-next-line
                    extISOString = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;
                    // eslint-disable-next-line
                    basicISOString = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;
                    if ((!extISOString.test(valueString) && !basicISOString.test(valueString))
                        || (/^[a-zA-Z0-9- ]*$/).test(valueString) || isNaN(+new Date(this.checkValue(valueString)))) {
                        invalid = true;
                    }
                    else {
                        valueDate = new Date(valueString);
                    }
                }
            }
            if (invalid) {
                if (!this.strictMode) {
                    this.invalidValueString = valueString;
                }
                this.setProperties({ value: null }, true);
            }
            else {
                this.setProperties({ value: valueDate }, true);
            }
        }
    };
    NepaliDatePicker.prototype.bindInputEvent = function () {
        if (!ej.base.isNullOrUndefined(this.formatString) || this.enableMask) {
            if (this.enableMask || this.formatString.indexOf('y') === -1) {
                ej.base.EventHandler.add(this.inputElement, 'input', this.inputHandler, this);
            }
            else {
                ej.base.EventHandler.remove(this.inputElement, 'input', this.inputHandler);
            }
        }
    };
    NepaliDatePicker.prototype.bindEvents = function () {
        ej.base.EventHandler.add(this.inputWrapper.buttons[0], 'mousedown touchstart', this.dateIconHandler, this);
        ej.base.EventHandler.add(this.inputElement, 'mouseup', this.mouseUpHandler, this);
        ej.base.EventHandler.add(this.inputElement, 'focus', this.inputFocusHandler, this);
        ej.base.EventHandler.add(this.inputElement, 'blur', this.inputBlurHandler, this);
        if (this.enableMask) {
            ej.base.EventHandler.add(this.inputElement, 'keydown', this.keydownHandler, this);
        }
        this.bindInputEvent();
        // To prevent the twice triggering.
        ej.base.EventHandler.add(this.inputElement, 'change', this.inputChangeHandler, this);
        if (this.showClearButton && this.inputWrapper.clearButton) {
            ej.base.EventHandler.add(this.inputWrapper.clearButton, 'mousedown touchstart', this.resetHandler, this);
        }
        if (this.formElement) {
            ej.base.EventHandler.add(this.formElement, 'reset', this.resetFormHandler, this);
        }
        this.defaultKeyConfigs = ej.base.extend(this.defaultKeyConfigs, this.keyConfigs);
        this.keyboardModules = new ej.base.KeyboardEvents(this.inputElement, {
            eventName: 'keydown',
            keyAction: this.inputKeyActionHandle.bind(this),
            keyConfigs: this.defaultKeyConfigs
        });
    };
    NepaliDatePicker.prototype.keydownHandler = function (e) {
        switch (e.code) {
            case 'ArrowLeft':
            case 'ArrowRight':
            case 'ArrowUp':
            case 'ArrowDown':
            case 'Home':
            case 'End':
            case 'Delete':
                if (this.enableMask && !this.popupObj && !this.readonly) {
                    if (e.code !== 'Delete') {
                        e.preventDefault();
                    }
                    this.notify('keyDownHandler', {
                        module: 'MaskedDateTime',
                        e: e
                    });
                }
                break;
            default:
                break;
        }
    };
    NepaliDatePicker.prototype.unBindEvents = function () {
        if (!ej.base.isNullOrUndefined(this.inputWrapper)) {
            ej.base.EventHandler.remove(this.inputWrapper.buttons[0], 'mousedown touchstart', this.dateIconHandler);
        }
        ej.base.EventHandler.remove(this.inputElement, 'mouseup', this.mouseUpHandler);
        ej.base.EventHandler.remove(this.inputElement, 'focus', this.inputFocusHandler);
        ej.base.EventHandler.remove(this.inputElement, 'blur', this.inputBlurHandler);
        ej.base.EventHandler.remove(this.inputElement, 'change', this.inputChangeHandler);
        if (this.enableMask) {
            ej.base.EventHandler.remove(this.inputElement, 'keydown', this.keydownHandler);
        }
        if (this.showClearButton && this.inputWrapper.clearButton) {
            ej.base.EventHandler.remove(this.inputWrapper.clearButton, 'mousedown touchstart', this.resetHandler);
        }
        if (this.formElement) {
            ej.base.EventHandler.remove(this.formElement, 'reset', this.resetFormHandler);
        }
    };
    NepaliDatePicker.prototype.resetFormHandler = function () {
        if (!this.enabled) {
            return;
        }
        if (!this.inputElement.disabled) {
            var value = this.inputElement.getAttribute('value');
            if (this.element.tagName === 'EJS-DATEPICKER' || this.element.tagName === 'EJS-DATETIMEPICKER') {
                value = '';
                this.inputValueCopy = null;
                this.inputElement.setAttribute('value', '');
            }
            this.setProperties({ value: this.inputValueCopy }, true);
            this.restoreValue();
            if (this.inputElement) {
                this.updateInputValue(value);
                this.errorClass();
            }
        }
    };
    NepaliDatePicker.prototype.restoreValue = function () {
        this.currentDate = this.value ? this.value : new Date();
        this.previousDate = this.value;
        this.previousElementValue = (ej.base.isNullOrUndefined(this.inputValueCopy)) ? '' :
            this.globalize.formatDate(this.inputValueCopy, {
                format: this.formatString, type: 'dateTime', skeleton: 'yMd'
            });
    };
    NepaliDatePicker.prototype.inputChangeHandler = function (e) {
        if (!this.enabled) {
            return;
        }
        e.stopPropagation();
    };
    NepaliDatePicker.prototype.bindClearEvent = function () {
        if (this.showClearButton && this.inputWrapper.clearButton) {
            ej.base.EventHandler.add(this.inputWrapper.clearButton, 'mousedown touchstart', this.resetHandler, this);
        }
    };
    NepaliDatePicker.prototype.resetHandler = function (e) {
        if (!this.enabled) {
            return;
        }
        e.preventDefault();
        this.clear(e);
    };
    NepaliDatePicker.prototype.mouseUpHandler = function (e) {
        if (this.enableMask) {
            e.preventDefault();
            this.notify('setMaskSelection', {
                module: 'MaskedDateTime'
            });
        }
    };
    NepaliDatePicker.prototype.clear = function (event) {
        this.setProperties({ value: null }, true);
        if (!this.enableMask) {
            this.updateInputValue('');
        }
        var clearedArgs = {
            event: event
        };
        this.trigger('cleared', clearedArgs);
        this.invalidValueString = '';
        this.updateInput();
        this.popupUpdate();
        this.changeEvent(event);
        if (this.enableMask) {
            this.notify('clearHandler', {
                module: 'MaskedDateTime'
            });
        }
        if (ej.base.closest(this.element, 'form')) {
            var element = this.element;
            var keyupEvent = document.createEvent('KeyboardEvent');
            keyupEvent.initEvent('keyup', false, true);
            element.dispatchEvent(keyupEvent);
        }
    };
    NepaliDatePicker.prototype.preventEventBubbling = function (e) {
        e.preventDefault();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.interopAdaptor.invokeMethodAsync('OnDateIconClick');
    };
    NepaliDatePicker.prototype.updateInputValue = function (value) {
        ej.inputs.Input.setValue(value, this.inputElement, this.floatLabelType, this.showClearButton);
    };
    NepaliDatePicker.prototype.dateIconHandler = function (e) {
        if (!this.enabled) {
            return;
        }
        this.isIconClicked = true;
        if (ej.base.Browser.isDevice) {
            this.inputElement.setAttribute('readonly', '');
            this.inputElement.blur();
        }
        e.preventDefault();
        if (!this.readonly) {
            if (this.isCalendar()) {
                this.hide(e);
            }
            else {
                this.isDateIconClicked = true;
                this.show(null, e);
                if (this.getModuleName() === 'datetimepicker') {
                    this.inputElement.focus();
                }
                this.inputElement.focus();
                ej.base.addClass([this.inputWrapper.container], [INPUTFOCUS]);
                ej.base.addClass(this.inputWrapper.buttons, ACTIVE);
            }
        }
        this.isIconClicked = false;
    };
    NepaliDatePicker.prototype.updateHtmlAttributeToWrapper = function () {
        if (!ej.base.isNullOrUndefined(this.htmlAttributes)) {
            for (var _i = 0, _a = Object.keys(this.htmlAttributes); _i < _a.length; _i++) {
                var key = _a[_i];
                if (!ej.base.isNullOrUndefined(this.htmlAttributes["" + key])) {
                    if (containerAttr.indexOf(key) > -1) {
                        if (key === 'class') {
                            var updatedClassValues = (this.htmlAttributes["" + key].replace(/\s+/g, ' ')).trim();
                            if (updatedClassValues !== '') {
                                ej.base.addClass([this.inputWrapper.container], updatedClassValues.split(' '));
                            }
                        }
                        else if (key === 'style') {
                            var setStyle = this.inputWrapper.container.getAttribute(key);
                            if (!ej.base.isNullOrUndefined(setStyle)) {
                                if (setStyle.charAt(setStyle.length - 1) === ';') {
                                    setStyle = setStyle + this.htmlAttributes["" + key];
                                }
                                else {
                                    setStyle = setStyle + ';' + this.htmlAttributes["" + key];
                                }
                            }
                            else {
                                setStyle = this.htmlAttributes["" + key];
                            }
                            this.inputWrapper.container.setAttribute(key, setStyle);
                        }
                        else {
                            this.inputWrapper.container.setAttribute(key, this.htmlAttributes["" + key]);
                        }
                    }
                }
            }
        }
    };
    NepaliDatePicker.prototype.updateHtmlAttributeToElement = function () {
        if (!ej.base.isNullOrUndefined(this.htmlAttributes)) {
            for (var _i = 0, _a = Object.keys(this.htmlAttributes); _i < _a.length; _i++) {
                var key = _a[_i];
                if (containerAttr.indexOf(key) < 0) {
                    this.inputElement.setAttribute(key, this.htmlAttributes["" + key]);
                }
            }
        }
    };
    NepaliDatePicker.prototype.updateCssClass = function (newCssClass, oldCssClass) {
        if (!ej.base.isNullOrUndefined(oldCssClass)) {
            oldCssClass = (oldCssClass.replace(/\s+/g, ' ')).trim();
        }
        if (!ej.base.isNullOrUndefined(newCssClass)) {
            newCssClass = (newCssClass.replace(/\s+/g, ' ')).trim();
        }
        ej.inputs.Input.setCssClass(newCssClass, [this.inputWrapper.container], oldCssClass);
        if (this.popupWrapper) {
            ej.inputs.Input.setCssClass(newCssClass, [this.popupWrapper], oldCssClass);
        }
    };
    NepaliDatePicker.prototype.calendarKeyActionHandle = function (e) {
        switch (e.action) {
            case 'escape':
                if (this.isCalendar()) {
                    this.hide(e);
                }
                else {
                    this.inputWrapper.container.children[this.index].blur();
                }
                break;
            case 'enter':
                if (!this.isCalendar()) {
                    this.show(null, e);
                }
                else {
                    if (+this.value !== +this.currentDate && !this.isCalendar()) {
                        this.inputWrapper.container.children[this.index].focus();
                    }
                }
                if (this.getModuleName() === 'datetimepicker') {
                    this.inputElement.focus();
                }
                break;
            case 'tab':
                this.hide(e);
        }
    };
    NepaliDatePicker.prototype.inputFocusHandler = function () {
        this.isFocused = true;
        if (!this.enabled) {
            return;
        }
        if (this.enableMask && !this.inputElement.value && this.placeholder) {
            if (this.maskedDateValue && !this.value && (this.floatLabelType === 'Auto' || this.floatLabelType === 'Never' || this.placeholder)) {
                this.updateInputValue(this.maskedDateValue);
                this.inputElement.selectionStart = 0;
                this.inputElement.selectionEnd = this.inputElement.value.length;
            }
        }
        var focusArguments = {
            model: this
        };
        this.isDateIconClicked = false;
        this.trigger('focus', focusArguments);
        this.updateIconState();
        if (this.openOnFocus && !this.isIconClicked) {
            this.show();
        }
    };
    NepaliDatePicker.prototype.inputHandler = function () {
        this.isPopupClicked = false;
        if (this.enableMask) {
            this.notify('inputHandler', {
                module: 'MaskedDateTime'
            });
        }
    };
    NepaliDatePicker.prototype.inputBlurHandler = function (e) {
        if (!this.enabled) {
            return;
        }
        this.strictModeUpdate();
        if (this.inputElement.value === '' && ej.base.isNullOrUndefined(this.value)) {
            this.invalidValueString = null;
            this.updateInputValue('');
        }
        this.updateInput();
        this.popupUpdate();
        this.changeTrigger(e);
        if (this.enableMask && this.maskedDateValue && this.placeholder && this.floatLabelType !== 'Always') {
            if (this.inputElement.value === this.maskedDateValue && !this.value && (this.floatLabelType === 'Auto' || this.floatLabelType === 'Never' || this.placeholder)) {
                this.updateInputValue('');
            }
        }
        this.errorClass();
        if (this.isCalendar() && document.activeElement === this.inputElement) {
            this.hide(e);
        }
        if (this.getModuleName() === 'datepicker') {
            var blurArguments = {
                model: this
            };
            this.trigger('blur', blurArguments);
        }
        if (this.isCalendar()) {
            this.defaultKeyConfigs = extend(this.defaultKeyConfigs, this.keyConfigs);
            this.calendarKeyboardModules = new KeyboardEvents(this.calendarElement.children[1].firstElementChild, {
                eventName: 'keydown',
                keyAction: this.calendarKeyActionHandle.bind(this),
                keyConfigs: this.defaultKeyConfigs
            });
        }
        this.isPopupClicked = false;
    };
    NepaliDatePicker.prototype.documentHandler = function (e) {
        if ((!ej.base.isNullOrUndefined(this.popupObj) && !ej.base.isNullOrUndefined(this.inputWrapper) && (this.inputWrapper.container.contains(e.target) && e.type !== 'mousedown' ||
            (this.popupObj.element && this.popupObj.element.contains(e.target)))) && e.type !== 'touchstart') {
            e.preventDefault();
        }
        var target = e.target;
        if (!(ej.base.closest(target, '.e-datepicker.e-popup-wrapper')) && !ej.base.isNullOrUndefined(this.inputWrapper)
            && !(ej.base.closest(target, '.' + INPUTCONTAINER) === this.inputWrapper.container)
            && (!target.classList.contains('e-day'))) {
            this.hide(e);
            this.focusOut();
        }
        else if (ej.base.closest(target, '.e-datepicker.e-popup-wrapper')) {
            // Fix for close the popup when select the previously selected value.
            if (target.classList.contains('e-day')
                && !ej.base.isNullOrUndefined(e.target.parentElement)
                && e.target.parentElement.classList.contains('e-selected')
                && closest(target, '.e-content')
                && closest(target, '.e-content').classList.contains('e-' + this.depth.toLowerCase())) {
                this.hide(e);
            }
            else if (ej.base.closest(target, '.e-footer-container')
                && target.classList.contains('e-today')
                && target.classList.contains('e-btn')
                && (+new Date(+this.value) === +_super.prototype.generateTodayVal.call(this, this.value))) {
                this.hide(e);
            }
        }
    };
    NepaliDatePicker.prototype.inputKeyActionHandle = function (e) {
        var clickedView = this.currentView();
        switch (e.action) {
            case 'altUpArrow':
                this.isAltKeyPressed = false;
                this.hide(e);
                this.inputElement.focus();
                break;
            case 'altDownArrow':
                this.isAltKeyPressed = true;
                this.strictModeUpdate();
                this.updateInput();
                this.changeTrigger(e);
                if (this.getModuleName() === 'datepicker') {
                    this.show(null, e);
                }
                break;
            case 'escape':
                this.hide(e);
                break;
            case 'enter':
                this.strictModeUpdate();
                this.updateInput();
                this.popupUpdate();
                this.changeTrigger(e);
                this.errorClass();
                if (!this.isCalendar() && document.activeElement === this.inputElement) {
                    this.hide(e);
                }
                if (this.isCalendar()) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                break;
            case 'tab':
            case 'shiftTab':
                {
                    var start = this.inputElement.selectionStart;
                    var end = this.inputElement.selectionEnd;
                    if (this.enableMask && !this.popupObj && !this.readonly) {
                        var length_1 = this.inputElement.value.length;
                        if ((start === 0 && end === length_1) || (end !== length_1 && e.action === 'tab') || (start !== 0 && e.action === 'shiftTab')) {
                            e.preventDefault();
                        }
                        this.notify('keyDownHandler', {
                            module: 'MaskedDateTime',
                            e: e
                        });
                        start = this.inputElement.selectionStart;
                        end = this.inputElement.selectionEnd;
                    }
                    this.strictModeUpdate();
                    this.updateInput();
                    this.popupUpdate();
                    this.changeTrigger(e);
                    this.errorClass();
                    if (this.enableMask) {
                        this.inputElement.selectionStart = start;
                        this.inputElement.selectionEnd = end;
                    }
                    this.hide(e);
                    break;
                }
            default:
                this.defaultAction(e);
                // Fix for close the popup when select the previously selected value.
                if (e.action === 'select' && clickedView === this.depth) {
                    this.hide(e);
                }
        }
    };
    NepaliDatePicker.prototype.defaultAction = function (e) {
        this.previousDate = ((!ej.base.isNullOrUndefined(this.value) && new Date(+this.value)) || null);
        if (this.isCalendar()) {
            _super.prototype.keyActionHandle.call(this, e);
            if (this.isCalendar()) {
                ej.base.attributes(this.inputElement, {
                    'aria-activedescendant': '' + this.setActiveDescendant()
                });
            }
        }
    };
    NepaliDatePicker.prototype.popupUpdate = function () {
        if ((ej.base.isNullOrUndefined(this.value)) && (!ej.base.isNullOrUndefined(this.previousDate)) ||
            (+this.value !== +this.previousDate)) {
            if (this.popupObj) {
                if (this.popupObj.element.querySelectorAll('.' + SELECTED$2).length > 0) {
                   ej.base.removeClass(this.popupObj.element.querySelectorAll('.' + SELECTED$2), [SELECTED$2]);
                }
            }
            if (!ej.base.isNullOrUndefined(this.value)) {
                if ((+this.value >= +this.min) && (+this.value <= +this.max)) {
                    var targetdate = new Date(this.checkValue(this.value));
                    _super.prototype.navigateTo.call(this, 'Month', targetdate);
                }
            }
        }
    };
    NepaliDatePicker.prototype.strictModeUpdate = function () {
        var format;
        var formatOptions;
        if (this.getModuleName() === 'datetimepicker') {
            format = !ej.base.isNullOrUndefined(this.formatString) ? this.formatString : this.dateTimeFormat;
        }
        else {
            format = ej.base.isNullOrUndefined(this.formatString) ? this.formatString : this.formatString.replace('dd', 'd');
        }
        if (!ej.base.isNullOrUndefined(format)) {
            var len = format.split('M').length - 1;
            if (len < 3) {
                format = format.replace('MM', 'M');
            }
        }
        var dateOptions;
        if (this.getModuleName() === 'datetimepicker') {
            if (this.calendarMode === 'Gregorian') {
                dateOptions = {
                    format: !ej.base.isNullOrUndefined(this.formatString) ? this.formatString : this.dateTimeFormat,
                    type: 'dateTime', skeleton: 'yMd'
                };
            }
            else {
                dateOptions = {
                    format: !ej.base.isNullOrUndefined(this.formatString) ? this.formatString : this.dateTimeFormat,
                    type: 'dateTime', skeleton: 'yMd', calendar: 'islamic'
                };
            }
        }
        else {
            if (this.calendarMode === 'Gregorian') {
                formatOptions = { format: format, type: 'dateTime', skeleton: 'yMd' };
            }
            else {
                formatOptions = { format: format, type: 'dateTime', skeleton: 'yMd', calendar: 'islamic' };
            }
            dateOptions = formatOptions;
        }
        var date;
        if (typeof this.inputElement.value === 'string') {
            this.inputElement.value = this.inputElement.value.trim();
        }
        if ((this.getModuleName() === 'datetimepicker')) {
            if (this.checkDateValue(this.globalize.parseDate(this.inputElement.value, dateOptions))) {
                date = this.globalize.parseDate(this.inputElement.value.toLocaleUpperCase(), dateOptions);
            }
            else {
                if (this.calendarMode === 'Gregorian') {
                    formatOptions = { type: 'dateTime', skeleton: 'yMd' };
                }
                else {
                    formatOptions = { type: 'dateTime', skeleton: 'yMd', calendar: 'islamic' };
                }
                date = this.globalize.parseDate(this.inputElement.value, formatOptions);
            }
        }
        else {
            date = this.globalize.parseDate(this.inputElement.value, dateOptions);
            date = (!ej.base.isNullOrUndefined(date) && isNaN(+date)) ? null : date;
            if (!ej.base.isNullOrUndefined(this.formatString) && this.inputElement.value !== '' && this.strictMode) {
                if ((this.isPopupClicked || (!this.isPopupClicked && this.inputElement.value === this.previousElementValue))
                    && this.formatString.indexOf('y') === -1) {
                    date.setFullYear(this.value.getFullYear());
                }
            }
        }
        // EJ2-35061 - To prevent change event from triggering twice when using strictmode and format property
        if ((this.getModuleName() === 'datepicker') && (this.value && !isNaN(+this.value)) && date) {
            date.setHours(this.value.getHours(), this.value.getMinutes(), this.value.getSeconds(), this.value.getMilliseconds());
        }
        if (this.strictMode && date) {
            this.updateInputValue(this.globalize.formatDate(date, dateOptions));
            if (this.inputElement.value !== this.previousElementValue) {
                this.setProperties({ value: date }, true);
            }
        }
        else if (!this.strictMode) {
            if (this.inputElement.value !== this.previousElementValue) {
                this.setProperties({ value: date }, true);
            }
        }
        if (this.strictMode && !date && this.inputElement.value === (this.enableMask ? this.maskedDateValue : '')) {
            this.setProperties({ value: null }, true);
        }
        if (isNaN(+this.value)) {
            this.setProperties({ value: null }, true);
        }
        if (ej.base.isNullOrUndefined(this.value)) {
            this.currentDate = new Date(new Date().setHours(0, 0, 0, 0));
        }
    };
    NepaliDatePicker.prototype.createCalendar = function () {
        var _this = this;
        this.popupWrapper = this.createElement('div', { className: '' + ROOT$1 + ' ' + POPUPWRAPPER });
        if (!ej.base.isNullOrUndefined(this.cssClass)) {
            this.popupWrapper.className += ' ' + this.cssClass;
        }
        if (ej.base.Browser.isDevice) {
            this.modelHeader();
            this.modal = this.createElement('div');
            this.modal.className = '' + ROOT$1 + ' e-date-modal';
            document.body.className += ' ' + OVERFLOW;
            this.modal.style.display = 'block';
            document.body.appendChild(this.modal);
        }
        //this.calendarElement represent the Calendar object from the Calendar class.
        this.calendarElement.querySelector('table tbody').className = '';
        this.popupObj = new ej.popups.Popup(this.popupWrapper, {
            content: this.calendarElement,
            relateTo: ej.base.Browser.isDevice ? document.body : this.inputWrapper.container,
            position: ej.base.Browser.isDevice ? { X: 'center', Y: 'center' } : { X: 'left', Y: 'bottom' },
            offsetY: OFFSETVALUE,
            targetType: 'container',
            enableRtl: this.enableRtl,
            zIndex: this.zIndex,
            collision: ej.base.Browser.isDevice ? { X: 'fit', Y: 'fit' } : { X: 'flip', Y: 'flip' },
            open: function () {
                if (_this.getModuleName() !== 'datetimepicker') {
                    if (document.activeElement !== _this.inputElement) {
                        _this.defaultKeyConfigs = extend(_this.defaultKeyConfigs, _this.keyConfigs);
                        _this.calendarElement.children[1].firstElementChild.focus();
                        _this.calendarKeyboardModules = new KeyboardEvents(_this.calendarElement.children[1].firstElementChild, {
                            eventName: 'keydown',
                            keyAction: _this.calendarKeyActionHandle.bind(_this),
                            keyConfigs: _this.defaultKeyConfigs
                        });
                        _this.calendarKeyboardModules = new KeyboardEvents(_this.inputWrapper.container.children[_this.index], {
                            eventName: 'keydown',
                            keyAction: _this.calendarKeyActionHandle.bind(_this),
                            keyConfigs: _this.defaultKeyConfigs
                        });
                    }
                }
            }, close: function () {
                if (_this.isDateIconClicked) {
                    _this.inputWrapper.container.children[_this.index].focus();
                }
                if (_this.value) {
                    _this.disabledDates();
                }
                if (_this.popupObj) {
                    _this.popupObj.destroy();
                }
                _this.resetCalendar();
                ej.base.detach(_this.popupWrapper);
                _this.popupObj = _this.popupWrapper = null;
                _this.preventArgs = null;
                _this.calendarKeyboardModules = null;
                _this.setAriaAttributes();
            }, targetExitViewport: function () {
                if (!Browser.isDevice) {
                    _this.hide();
                }
            }
        });
        this.popupObj.element.className += ' ' + this.cssClass;
        this.setAriaAttributes();
    };
    NepaliDatePicker.prototype.setAriaDisabled = function () {
        if (!this.enabled) {
            this.inputElement.setAttribute('aria-disabled', 'true');
            this.inputElement.tabIndex = -1;
        }
        else {
            this.inputElement.setAttribute('aria-disabled', 'false');
            this.inputElement.setAttribute('tabindex', this.tabIndex);
        }
    };
    NepaliDatePicker.prototype.modelHeader = function () {
        var dateOptions;
        var modelHeader = this.createElement('div', { className: 'e-model-header' });
        var yearHeading = this.createElement('h1', { className: 'e-model-year' });
        var h2 = this.createElement('div');
        var daySpan = this.createElement('span', { className: 'e-model-day' });
        var monthSpan = this.createElement('span', { className: 'e-model-month' });
        if (this.calendarMode === 'Gregorian') {
            dateOptions = { format: 'y', skeleton: 'dateTime' };
        }
        else {
            dateOptions = { format: 'y', skeleton: 'dateTime', calendar: 'islamic' };
        }
        yearHeading.textContent = '' + this.globalize.formatDate(this.value || new Date(), dateOptions);
        if (this.calendarMode === 'Gregorian') {
            dateOptions = { format: 'E', skeleton: 'dateTime' };
        }
        else {
            dateOptions = { format: 'E', skeleton: 'dateTime', calendar: 'islamic' };
        }
        daySpan.textContent = '' + this.globalize.formatDate(this.value || new Date(), dateOptions) + ', ';
        if (this.calendarMode === 'Gregorian') {
            dateOptions = { format: 'MMM d', skeleton: 'dateTime' };
        }
        else {
            dateOptions = { format: 'MMM d', skeleton: 'dateTime', calendar: 'islamic' };
        }
        monthSpan.textContent = '' + this.globalize.formatDate(this.value || new Date(), dateOptions);
        modelHeader.appendChild(yearHeading);
        h2.appendChild(daySpan);
        h2.appendChild(monthSpan);
        modelHeader.appendChild(h2);
        this.calendarElement.insertBefore(modelHeader, this.calendarElement.firstElementChild);
    };
    NepaliDatePicker.prototype.changeTrigger = function (event) {
        if (this.inputElement.value !== this.previousElementValue) {
            if (((this.previousDate && this.previousDate.valueOf()) !== (this.value && this.value.valueOf()))) {
                if (this.isDynamicValueChanged && this.isCalendar()) {
                    this.popupUpdate();
                }
                this.changedArgs.value = this.value;
                this.changedArgs.event = event || null;
                this.changedArgs.element = this.element;
                this.changedArgs.isInteracted = !ej.base.isNullOrUndefined(event);
                if (this.isAngular && this.preventChange) {
                    this.preventChange = false;
                }
                else {
                    this.trigger('change', this.changedArgs);
                }
                this.previousElementValue = this.inputElement.value;
                this.previousDate = !isNaN(+new Date(this.checkValue(this.value))) ? new Date(this.checkValue(this.value)) : null;
                this.isInteracted = true;
            }
        }
    };
    NepaliDatePicker.prototype.navigatedEvent = function () {
        this.trigger('navigated', this.navigatedArgs);
    };
    NepaliDatePicker.prototype.changeEvent = function (event) {
        if (!this.isIconClicked) {
            this.selectCalendar(event);
        }
        if (((this.previousDate && this.previousDate.valueOf()) !== (this.value && this.value.valueOf()))) {
            this.changedArgs.event = event ? event : null;
            this.changedArgs.element = this.element;
            this.changedArgs.isInteracted = this.isInteracted;
            if (!this.isDynamicValueChanged) {
                this.trigger('change', this.changedArgs);
            }
            this.previousDate = this.value && new Date(+this.value);
            if (!this.isDynamicValueChanged) {
                this.hide(event);
            }
            this.previousElementValue = this.inputElement.value;
            this.errorClass();
        }
        else if (event) {
            this.hide(event);
        }
    };
    NepaliDatePicker.prototype.requiredModules = function () {
        var modules = [];
        if (this) {
            modules.push({ args: [this], member: 'islamic' });
        }
        if (this.enableMask) {
            modules.push({ args: [this], member: 'MaskedDateTime' });
        }
        return modules;
    };
    NepaliDatePicker.prototype.selectCalendar = function (e) {
        var date;
        var tempFormat;
        var formatOptions;
        if (this.getModuleName() === 'datetimepicker') {
            tempFormat = !ej.base.isNullOrUndefined(this.formatString) ? this.formatString : this.dateTimeFormat;
        }
        else {
            tempFormat = this.formatString;
        }
        if (this.value) {
            if (this.getModuleName() === 'datetimepicker') {
                if (this.calendarMode === 'Gregorian') {
                    formatOptions = { format: tempFormat, type: 'dateTime', skeleton: 'yMd' };
                }
                else {
                    formatOptions = { format: tempFormat, type: 'dateTime', skeleton: 'yMd', calendar: 'islamic' };
                }
                date = this.globalize.formatDate(this.changedArgs.value, formatOptions);
            }
            else {
                if (this.calendarMode === 'Gregorian') {
                    formatOptions = { format: this.formatString, type: 'dateTime', skeleton: 'yMd' };
                }
                else {
                    formatOptions = { format: this.formatString, type: 'dateTime', skeleton: 'yMd', calendar: 'islamic' };
                }
                date = this.globalize.formatDate(this.changedArgs.value, formatOptions);
            }
            if (this.enableMask) {
                this.notify('createMask', {
                    module: 'MaskedDateTime'
                });
            }
        }
        if (!ej.base.isNullOrUndefined(date)) {
            this.updateInputValue(date);
            if (this.enableMask) {
                this.notify('setMaskSelection', {
                    module: 'MaskedDateTime'
                });
            }
        }
    };
    NepaliDatePicker.prototype.isCalendar = function () {
        if (this.popupWrapper && this.popupWrapper.classList.contains('' + POPUPWRAPPER)) {
            return true;
        }
        return false;
    };
    NepaliDatePicker.prototype.setWidth = function (width) {
        if (typeof width === 'number') {
            this.inputWrapper.container.style.width = formatUnit(this.width);
        }
        else if (typeof width === 'string') {
            this.inputWrapper.container.style.width = (width.match(/px|%|em/)) ? (this.width) : (formatUnit(this.width));
        }
        else {
            this.inputWrapper.container.style.width = '100%';
        }
    };
    /* eslint-disable valid-jsdoc, jsdoc/require-param */
    /**
     * Shows the Calendar.
     *
     * @returns {void}
     * @deprecated
     */
    NepaliDatePicker.prototype.show = function (type, e) {
        var _this = this;
        if ((this.enabled && this.readonly) || !this.enabled || this.popupObj) {
            return;
        }
        else {
            var prevent_1 = true;
            var outOfRange = void 0;
            if (!ej.base.isNullOrUndefined(this.value) && !(+this.value >= +new Date(this.checkValue(this.min))
                && +this.value <= +new Date(this.checkValue(this.max)))) {
                outOfRange = new Date(this.checkValue(this.value));
                this.setProperties({ 'value': null }, true);
            }
            else {
                outOfRange = this.value || null;
            }
            if (!this.isCalendar()) {
                _super.prototype.render.call(this);
                this.setProperties({ 'value': outOfRange || null }, true);
                this.previousDate = outOfRange;
                this.createCalendar();
            }
            if (ej.base.Browser.isDevice) {
                this.mobilePopupWrapper = this.createElement('div', { className: 'e-datepick-mob-popup-wrap' });
                document.body.appendChild(this.mobilePopupWrapper);
            }
            this.preventArgs = {
                preventDefault: function () {
                    prevent_1 = false;
                },
                popup: this.popupObj,
                event: e || null,
                cancel: false,
                appendTo: ej.base.Browser.isDevice ? this.mobilePopupWrapper : document.body
            };
            var eventArgs = this.preventArgs;
            this.trigger('open', eventArgs, function (eventArgs) {
                _this.preventArgs = eventArgs;
                if (prevent_1 && !_this.preventArgs.cancel) {
                    ej.base.addClass(_this.inputWrapper.buttons, ACTIVE);
                    _this.preventArgs.appendTo.appendChild(_this.popupWrapper);
                    _this.popupObj.refreshPosition(_this.inputElement);
                    var openAnimation = {
                        name: 'FadeIn',
                        duration: ej.base.Browser.isDevice ? 0 : OPENDURATION
                    };
                    if (_this.zIndex === 1000) {
                        _this.popupObj.show(new ej.base.Animation(openAnimation), _this.element);
                    }
                    else {
                        _this.popupObj.show(new ej.base.Animation(openAnimation), null);
                    }
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    _super.prototype.setOverlayIndex.call(_this, _this.mobilePopupWrapper, _this.popupObj.element, _this.modal, ej.base.Browser.isDevice);
                    _this.setAriaAttributes();
                }
                else {
                    _this.popupObj.destroy();
                    _this.popupWrapper = _this.popupObj = null;
                }
                if (!ej.base.isNullOrUndefined(_this.inputElement) && _this.inputElement.value === '') {
                    if (!ej.base.isNullOrUndefined(_this.tableBodyElement) && _this.tableBodyElement.querySelectorAll('td.e-selected').length > 0) {
                        ej.base.addClass([_this.tableBodyElement.querySelector('td.e-selected')], FOCUSEDDATE$2);
                       ej.base.removeClass(_this.tableBodyElement.querySelectorAll('td.e-selected'), SELECTED$2);
                    }
                }
                ej.base.EventHandler.add(document, 'mousedown touchstart', _this.documentHandler, _this);
            });
        }
    };
    /**
     * Hide the Calendar.
     *
     * @returns {void}
     * @deprecated
     */
    NepaliDatePicker.prototype.hide = function (event) {
        var _this = this;
        if (!ej.base.isNullOrUndefined(this.popupWrapper)) {
            var prevent_2 = true;
            this.preventArgs = {
                preventDefault: function () {
                    prevent_2 = false;
                },
                popup: this.popupObj,
                event: event || null,
                cancel: false
            };
           ej.base.removeClass(this.inputWrapper.buttons, ACTIVE);
           ej.base.removeClass([document.body], OVERFLOW);
            var eventArgs = this.preventArgs;
            if (this.isCalendar()) {
                this.trigger('close', eventArgs, function (eventArgs) {
                    _this.closeEventCallback(prevent_2, eventArgs);
                });
            }
            else {
                this.closeEventCallback(prevent_2, eventArgs);
            }
        }
        else {
            if (ej.base.Browser.isDevice && this.allowEdit && !this.readonly) {
                this.inputElement.removeAttribute('readonly');
            }
            this.setAllowEdit();
        }
    };
    /* eslint-enable valid-jsdoc, jsdoc/require-param */
    NepaliDatePicker.prototype.closeEventCallback = function (prevent, eventArgs) {
        this.preventArgs = eventArgs;
        if (this.isCalendar() && (prevent && !this.preventArgs.cancel)) {
            this.popupObj.hide();
            this.isAltKeyPressed = false;
            this.keyboardModule.destroy();
           ej.base.removeClass(this.inputWrapper.buttons, ACTIVE);
        }
        this.setAriaAttributes();
        if (ej.base.Browser.isDevice && this.modal) {
            this.modal.style.display = 'none';
            this.modal.outerHTML = '';
            this.modal = null;
        }
        if (ej.base.Browser.isDevice) {
            if (!ej.base.isNullOrUndefined(this.mobilePopupWrapper) && (prevent && (ej.base.isNullOrUndefined(this.preventArgs) || !this.preventArgs.cancel))) {
                this.mobilePopupWrapper.remove();
                this.mobilePopupWrapper = null;
            }
        }
        ej.base.EventHandler.remove(document, 'mousedown touchstart', this.documentHandler);
        if (ej.base.Browser.isDevice && this.allowEdit && !this.readonly) {
            this.inputElement.removeAttribute('readonly');
        }
        this.setAllowEdit();
    };
    /* eslint-disable jsdoc/require-param */
    /**
     * Sets the focus to widget for interaction.
     *
     * @returns {void}
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    NepaliDatePicker.prototype.focusIn = function (triggerEvent) {
        if (document.activeElement !== this.inputElement && this.enabled) {
            this.inputElement.focus();
            ej.base.addClass([this.inputWrapper.container], [INPUTFOCUS]);
        }
    };
    /* eslint-enable jsdoc/require-param */
    /**
     * Remove the focus from widget, if the widget is in focus state.
     *
     * @returns {void}
     */
    NepaliDatePicker.prototype.focusOut = function () {
        if (document.activeElement === this.inputElement) {
           ej.base.removeClass([this.inputWrapper.container], [INPUTFOCUS]);
            this.inputElement.blur();
        }
    };
    /* eslint-disable valid-jsdoc, jsdoc/require-returns-description */
    /**
     * Gets the current view of the DatePicker.
     *
     * @returns {string}
     * @deprecated
     */
    NepaliDatePicker.prototype.currentView = function () {
        var currentView;
        if (this.calendarElement) {
            // calls the Calendar currentView public method
            currentView = _super.prototype.currentView.call(this);
        }
        return currentView;
    };
    /* eslint-enable valid-jsdoc, jsdoc/require-returns-description */
    /**
     * Navigates to specified month or year or decade view of the DatePicker.
     *
     * @param  {string} view - Specifies the view of the calendar.
     * @param  {Date} date - Specifies the focused date in a view.
     * @returns {void}
     * @deprecated
     */
    NepaliDatePicker.prototype.navigateTo = function (view, date) {
        if (this.calendarElement) {
            // calls the Calendar navigateTo public method
            _super.prototype.navigateTo.call(this, view, date);
        }
    };
    /**
     * To destroy the widget.
     *
     * @returns {void}
     */
    NepaliDatePicker.prototype.destroy = function () {
        this.unBindEvents();
        _super.prototype.destroy.call(this);
        if (!ej.base.isNullOrUndefined(this.keyboardModules)) {
            this.keyboardModules.destroy();
        }
        if (this.popupObj && this.popupObj.element.classList.contains(POPUP)) {
            _super.prototype.destroy.call(this);
        }
        var ariaAttrs = {
            'aria-atomic': 'true', 'aria-disabled': 'true',
            'aria-expanded': 'false', 'role': 'combobox', 'autocomplete': 'off',
            'autocorrect': 'off', 'autocapitalize': 'off', 'spellcheck': 'false'
        };
        if (this.inputElement) {
            ej.inputs.Input.removeAttributes(ariaAttrs, this.inputElement);
            if (!ej.base.isNullOrUndefined(this.inputElementCopy.getAttribute('tabindex'))) {
                this.inputElement.setAttribute('tabindex', this.tabIndex);
            }
            else {
                this.inputElement.removeAttribute('tabindex');
            }
            ej.base.EventHandler.remove(this.inputElement, 'blur', this.inputBlurHandler);
            ej.base.EventHandler.remove(this.inputElement, 'focus', this.inputFocusHandler);
            this.ensureInputAttribute();
        }
        if (this.isCalendar()) {
            if (this.popupWrapper) {
                ej.base.detach(this.popupWrapper);
            }
            this.popupObj = this.popupWrapper = null;
            this.keyboardModule.destroy();
        }
        if (this.ngTag === null) {
            if (this.inputElement) {
                if (!ej.base.isNullOrUndefined(this.inputWrapper)) {
                    this.inputWrapper.container.insertAdjacentElement('afterend', this.inputElement);
                }
               ej.base.removeClass([this.inputElement], [INPUTROOT]);
            }
           ej.base.removeClass([this.element], [ROOT$1]);
            if (!ej.base.isNullOrUndefined(this.inputWrapper)) {
                ej.base.detach(this.inputWrapper.container);
            }
        }
        if (this.formElement) {
            ej.base.EventHandler.remove(this.formElement, 'reset', this.resetFormHandler);
        }
        this.inputWrapper = null;
        this.keyboardModules = null;
    };
    NepaliDatePicker.prototype.ensureInputAttribute = function () {
        var prop = [];
        for (var i = 0; i < this.inputElement.attributes.length; i++) {
            prop[i] = this.inputElement.attributes[i].name;
        }
        for (var i = 0; i < prop.length; i++) {
            if (ej.base.isNullOrUndefined(this.inputElementCopy.getAttribute(prop[i]))) {
                if (prop[i].toLowerCase() === 'value') {
                    this.inputElement.value = '';
                }
                this.inputElement.removeAttribute(prop[i]);
            }
            else {
                if (prop[i].toLowerCase() === 'value') {
                    this.inputElement.value = this.inputElementCopy.getAttribute(prop[i]);
                }
                this.inputElement.setAttribute(prop[i], this.inputElementCopy.getAttribute(prop[i]));
            }
        }
    };
    /**
     * Initialize the event handler
     *
     * @returns {void}
     * @private
     */
    NepaliDatePicker.prototype.preRender = function () {
        this.inputElementCopy = this.element.cloneNode(true);
        ej.base.removeClass([this.inputElementCopy], [ROOT$1, CONTROL, LIBRARY]);
        this.inputElement = this.element;
        this.formElement = ej.base.closest(this.inputElement, 'form');
        this.index = this.showClearButton ? 2 : 1;
        this.ngTag = null;
        if (this.element.tagName === 'EJS-DATEPICKER' || this.element.tagName === 'EJS-DATETIMEPICKER') {
            this.ngTag = this.element.tagName;
            this.inputElement = this.createElement('input');
            this.element.appendChild(this.inputElement);
        }
        if (this.element.getAttribute('id')) {
            if (this.ngTag !== null) {
                this.inputElement.id = this.element.getAttribute('id') + '_input';
            }
        }
        else {
            if (this.getModuleName() === 'datetimepicker') {
                this.element.id = ej.base.getUniqueID('ej2-datetimepicker');
                if (this.ngTag !== null) {
                    ej.base.attributes(this.inputElement, { 'id': this.element.id + '_input' });
                }
            }
            else {
                this.element.id = ej.base.getUniqueID('ej2-datepicker');
                if (this.ngTag !== null) {
                    ej.base.attributes(this.inputElement, { 'id': this.element.id + '_input' });
                }
            }
        }
        if (this.ngTag !== null) {
            this.validationAttribute(this.element, this.inputElement);
        }
        this.updateHtmlAttributeToElement();
        this.defaultKeyConfigs = this.getDefaultKeyConfig();
        this.checkHtmlAttributes(false);
        this.tabIndex = this.element.hasAttribute('tabindex') ? this.element.getAttribute('tabindex') : '0';
        this.element.removeAttribute('tabindex');
        _super.prototype.preRender.call(this);
    };
    NepaliDatePicker.prototype.getDefaultKeyConfig = function () {
        this.defaultKeyConfigs = {
            altUpArrow: 'alt+uparrow',
            altDownArrow: 'alt+downarrow',
            escape: 'escape',
            enter: 'enter',
            controlUp: 'ctrl+38',
            controlDown: 'ctrl+40',
            moveDown: 'downarrow',
            moveUp: 'uparrow',
            moveLeft: 'leftarrow',
            moveRight: 'rightarrow',
            select: 'enter',
            home: 'home',
            end: 'end',
            pageUp: 'pageup',
            pageDown: 'pagedown',
            shiftPageUp: 'shift+pageup',
            shiftPageDown: 'shift+pagedown',
            controlHome: 'ctrl+home',
            controlEnd: 'ctrl+end',
            shiftTab: 'shift+tab',
            tab: 'tab'
        };
        return this.defaultKeyConfigs;
    };
    NepaliDatePicker.prototype.validationAttribute = function (target, inputElement) {
        var nameAttribute = target.getAttribute('name') ? target.getAttribute('name') : target.getAttribute('id');
        inputElement.setAttribute('name', nameAttribute);
        target.removeAttribute('name');
        var attribute = ['required', 'aria-required', 'form'];
        for (var i = 0; i < attribute.length; i++) {
            if (ej.base.isNullOrUndefined(target.getAttribute(attribute[i]))) {
                continue;
            }
            var attr = target.getAttribute(attribute[i]);
            inputElement.setAttribute(attribute[i], attr);
            target.removeAttribute(attribute[i]);
        }
    };
    NepaliDatePicker.prototype.checkFormat = function () {
        var culture = new ej.base.Internationalization(this.locale);
        if (this.format) {
            if (typeof this.format === 'string') {
                this.formatString = this.format;
            }
            else if (this.format.skeleton !== '' && !ej.base.isNullOrUndefined(this.format.skeleton)) {
                var skeletonString = this.format.skeleton;
                if (this.getModuleName() === 'datetimepicker') {
                    this.formatString = culture.getDatePattern({ skeleton: skeletonString, type: 'dateTime' });
                }
                else {
                    this.formatString = culture.getDatePattern({ skeleton: skeletonString, type: 'date' });
                }
            }
            else {
                if (this.getModuleName() === 'datetimepicker') {
                    this.formatString = this.dateTimeFormat;
                }
                else {
                    this.formatString = null;
                }
            }
        }
        else {
            this.formatString = null;
        }
    };
    NepaliDatePicker.prototype.checkHtmlAttributes = function (dynamic) {
        this.globalize = new ej.base.Internationalization(this.locale);
        this.checkFormat();
        this.checkView();
        var attributes$$1 = dynamic ? ej.base.isNullOrUndefined(this.htmlAttributes) ? [] : Object.keys(this.htmlAttributes) :
            ['value', 'min', 'max', 'disabled', 'readonly', 'style', 'name', 'placeholder', 'type'];
        var options;
        if (this.getModuleName() === 'datetimepicker') {
            if (this.calendarMode === 'Gregorian') {
                options = {
                    format: !ej.base.isNullOrUndefined(this.formatString) ? this.formatString : this.dateTimeFormat,
                    type: 'dateTime', skeleton: 'yMd'
                };
            }
            else {
                options = {
                    format: !ej.base.isNullOrUndefined(this.formatString) ? this.formatString : this.dateTimeFormat,
                    type: 'dateTime', skeleton: 'yMd', calendar: 'islamic'
                };
            }
        }
        else {
            if (this.calendarMode === 'Gregorian') {
                options = { format: this.formatString, type: 'dateTime', skeleton: 'yMd' };
            }
            else {
                options = { format: this.formatString, type: 'dateTime', skeleton: 'yMd', calendar: 'islamic' };
            }
        }
        for (var _i = 0, attributes_1 = attributes$$1; _i < attributes_1.length; _i++) {
            var prop = attributes_1[_i];
            if (!ej.base.isNullOrUndefined(this.inputElement.getAttribute(prop))) {
                switch (prop) {
                    case 'disabled':
                        if (((ej.base.isNullOrUndefined(this.datepickerOptions) || (this.datepickerOptions['enabled'] === undefined)) || dynamic)) {
                            var enabled = this.inputElement.getAttribute(prop) === 'disabled' ||
                                this.inputElement.getAttribute(prop) === '' ||
                                this.inputElement.getAttribute(prop) === 'true' ? false : true;
                            this.setProperties({ enabled: enabled }, !dynamic);
                        }
                        break;
                    case 'readonly':
                        if (((ej.base.isNullOrUndefined(this.datepickerOptions) || (this.datepickerOptions['readonly'] === undefined)) || dynamic)) {
                            var readonly = this.inputElement.getAttribute(prop) === 'readonly' ||
                                this.inputElement.getAttribute(prop) === '' || this.inputElement.getAttribute(prop) === 'true' ? true : false;
                            this.setProperties({ readonly: readonly }, !dynamic);
                        }
                        break;
                    case 'placeholder':
                        if (((ej.base.isNullOrUndefined(this.datepickerOptions) || (this.datepickerOptions['placeholder'] === undefined)) || dynamic)) {
                            this.setProperties({ placeholder: this.inputElement.getAttribute(prop) }, !dynamic);
                        }
                        break;
                    case 'style':
                        this.inputElement.setAttribute('style', '' + this.inputElement.getAttribute(prop));
                        break;
                    case 'name':
                        this.inputElement.setAttribute('name', '' + this.inputElement.getAttribute(prop));
                        break;
                    case 'value':
                        if (((ej.base.isNullOrUndefined(this.datepickerOptions) || (this.datepickerOptions['value'] === undefined)) || dynamic)) {
                            var value = this.inputElement.getAttribute(prop);
                            this.setProperties(setValue(prop, this.globalize.parseDate(value, options), {}), !dynamic);
                        }
                        break;
                    case 'min':
                        if ((+this.min === +new Date(1900, 0, 1)) || dynamic) {
                            var min = this.inputElement.getAttribute(prop);
                            this.setProperties(setValue(prop, this.globalize.parseDate(min), {}), !dynamic);
                        }
                        break;
                    case 'max':
                        if ((+this.max === +new Date(2099, 11, 31)) || dynamic) {
                            var max = this.inputElement.getAttribute(prop);
                            this.setProperties(setValue(prop, this.globalize.parseDate(max), {}), !dynamic);
                        }
                        break;
                    case 'type':
                        if (this.inputElement.getAttribute(prop) !== 'text') {
                            this.inputElement.setAttribute('type', 'text');
                        }
                        break;
                }
            }
        }
    };
    /**
     * To get component name.
     *
     * @returns {string} Returns the component name.
     * @private
     */
    NepaliDatePicker.prototype.getModuleName = function () {
        return 'datepicker';
    };
    NepaliDatePicker.prototype.disabledDates = function (isDynamic) {
        if (isDynamic === void 0) { isDynamic = false; }
        var formatOptions;
        var globalize;
        var valueCopy = this.checkDateValue(this.value) ? new Date(+this.value) : new Date(this.checkValue(this.value));
        var previousValCopy = this.previousDate;
        //calls the Calendar render method to check the disabled dates through renderDayCell event and update the input value accordingly.
        this.minMaxUpdates();
        if (!isDynamic || (isDynamic && !ej.base.isNullOrUndefined(this.renderDayCell))) {
            _super.prototype.render.call(this);
        }
        this.previousDate = previousValCopy;
        var date = valueCopy && +(valueCopy);
        var dateIdString = '*[id^="/id"]'.replace('/id', '' + date);
        if (!this.strictMode) {
            if (typeof this.value === 'string' || ((typeof this.value === 'object') && (+this.value) !== (+valueCopy))) {
                this.setProperties({ value: valueCopy }, true);
            }
        }
        if (!ej.base.isNullOrUndefined(this.calendarElement) && !ej.base.isNullOrUndefined(this.calendarElement.querySelectorAll(dateIdString)[0])) {
            if (this.calendarElement.querySelectorAll(dateIdString)[0].classList.contains('e-disabled')) {
                if (!this.strictMode) {
                    this.currentDate = new Date(new Date().setHours(0, 0, 0, 0));
                }
            }
        }
        var inputVal;
        if (this.getModuleName() === 'datetimepicker') {
            if (this.calendarMode === 'Gregorian') {
                globalize = this.globalize.formatDate(valueCopy, {
                    format: !ej.base.isNullOrUndefined(this.formatString) ? this.formatString : this.dateTimeFormat,
                    type: 'dateTime', skeleton: 'yMd'
                });
            }
            else {
                globalize = this.globalize.formatDate(valueCopy, {
                    format: !ej.base.isNullOrUndefined(this.formatString) ? this.formatString : this.dateTimeFormat,
                    type: 'dateTime', skeleton: 'yMd', calendar: 'islamic'
                });
            }
            inputVal = globalize;
        }
        else {
            if (this.calendarMode === 'Gregorian') {
                formatOptions = { format: this.formatString, type: 'dateTime', skeleton: 'yMd' };
            }
            else {
                formatOptions = { format: this.formatString, type: 'dateTime', skeleton: 'yMd', calendar: 'islamic' };
            }
            inputVal = this.globalize.formatDate(valueCopy, formatOptions);
        }
        if (!this.popupObj) {
            this.updateInputValue(inputVal);
            if (this.enableMask) {
                this.updateInputValue(this.maskedDateValue);
                this.notify('createMask', {
                    module: 'MaskedDateTime'
                });
            }
        }
    };
    NepaliDatePicker.prototype.setAriaAttributes = function () {
        if (this.isCalendar()) {
            ej.inputs.Input.addAttributes({ 'aria-expanded': 'true' }, this.inputElement);
            ej.base.attributes(this.inputElement, { 'aria-owns': this.inputElement.id + '_options' });
            if (this.value) {
                ej.base.attributes(this.inputElement, { 'aria-activedescendant': '' + this.setActiveDescendant() });
            }
        }
        else {
            ej.inputs.Input.addAttributes({ 'aria-expanded': 'false' }, this.inputElement);
            this.inputElement.removeAttribute('aria-owns');
            this.inputElement.removeAttribute('aria-activedescendant');
        }
    };
    NepaliDatePicker.prototype.errorClass = function () {
        var dateIdString = '*[id^="/id"]'.replace('/id', '' + (+this.value));
        var isDisabledDate = this.calendarElement &&
            this.calendarElement.querySelectorAll(dateIdString)[0] &&
            this.calendarElement.querySelectorAll(dateIdString)[0].classList.contains('e-disabled');
        if ((!ej.base.isNullOrUndefined(this.value) && !ej.base.isNullOrUndefined(this.min) &&
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            !ej.base.isNullOrUndefined(this.max) && !(new Date(this.value).setMilliseconds(0) >= new Date(this.min).setMilliseconds(0)
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                && new Date(this.value).setMilliseconds(0) <= new Date(this.max).setMilliseconds(0)))
            || (!this.strictMode && this.inputElement.value !== '' && this.inputElement.value !== this.maskedDateValue && ej.base.isNullOrUndefined(this.value) || isDisabledDate)) {
            ej.base.addClass([this.inputWrapper.container], ERROR);
            ej.base.attributes(this.inputElement, { 'aria-invalid': 'true' });
        }
        else if (!ej.base.isNullOrUndefined(this.inputWrapper)) {
            ej.base.removeClass([this.inputWrapper.container], ERROR);
            ej.base.attributes(this.inputElement, { 'aria-invalid': 'false' });
        }
    };
    /**
     * Called internally if any of the property value changed.
     *
     * @param {DatePickerModel} newProp - Returns the dynamic property value of the component.
     * @param {DatePickerModel} oldProp - Returns the previous property value of the component.
     * @returns {void}
     * @private
     */
    NepaliDatePicker.prototype.onPropertyChanged = function (newProp, oldProp) {
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'value':
                    this.isDynamicValueChanged = true;
                    this.isInteracted = false;
                    this.invalidValueString = null;
                    this.checkInvalidValue(newProp.value);
                    newProp.value = this.value;
                    this.previousElementValue = this.inputElement.value;
                    if (ej.base.isNullOrUndefined(this.value)) {
                        if (this.enableMask) {
                            this.updateInputValue(this.maskedDateValue);
                        }
                        else {
                            this.updateInputValue('');
                        }
                        this.currentDate = new Date(new Date().setHours(0, 0, 0, 0));
                    }
                    this.updateInput(true);
                    if (+this.previousDate !== +this.value) {
                        this.changeTrigger(null);
                    }
                    this.isInteracted = true;
                    this.preventChange = this.isAngular && this.preventChange ? !this.preventChange : this.preventChange;
                    if (this.enableMask) {
                        this.notify('createMask', {
                            module: 'MaskedDateTime'
                        });
                    }
                    break;
                case 'format':
                    this.checkFormat();
                    this.bindInputEvent();
                    this.updateInput();
                    if (this.enableMask) {
                        this.notify('createMask', {
                            module: 'MaskedDateTime'
                        });
                        if (!this.value) {
                            this.updateInputValue(this.maskedDateValue);
                        }
                    }
                    break;
                case 'allowEdit':
                    this.setAllowEdit();
                    break;
                case 'placeholder':
                    ej.inputs.Input.setPlaceholder(this.placeholder, this.inputElement);
                    break;
                case 'readonly':
                    ej.inputs.Input.setReadonly(this.readonly, this.inputElement);
                    break;
                case 'enabled':
                    ej.inputs.Input.setEnabled(this.enabled, this.inputElement);
                    this.setAriaDisabled();
                    break;
                case 'htmlAttributes':
                    this.updateHtmlAttributeToElement();
                    this.updateHtmlAttributeToWrapper();
                    this.checkHtmlAttributes(true);
                    break;
                case 'locale':
                    this.globalize = new Internationalization(this.locale);
                    this.l10n.setLocale(this.locale);
                    this.setProperties({ placeholder: this.l10n.getConstant('placeholder') }, true);
                    ej.inputs.Input.setPlaceholder(this.placeholder, this.inputElement);
                    this.updateInput();
                    if (this.enableMask) {
                        this.notify('createMask', {
                            module: 'MaskedDateTime'
                        });
                    }
                    break;
                case 'enableRtl':
                    ej.inputs.Input.setEnableRtl(this.enableRtl, [this.inputWrapper.container]);
                    break;
                case 'start':
                case 'depth':
                    this.checkView();
                    if (this.calendarElement) {
                        _super.prototype.onPropertyChanged.call(this, newProp, oldProp);
                    }
                    break;
                case 'zIndex':
                    this.setProperties({ zIndex: newProp.zIndex }, true);
                    break;
                case 'cssClass':
                    this.updateCssClass(newProp.cssClass, oldProp.cssClass);
                    break;
                case 'showClearButton':
                    ej.inputs.Input.setClearButton(this.showClearButton, this.inputElement, this.inputWrapper);
                    this.bindClearEvent();
                    this.index = this.showClearButton ? 2 : 1;
                    break;
                case 'strictMode':
                    this.invalidValueString = null;
                    this.updateInput();
                    break;
                case 'width':
                    this.setWidth(newProp.width);
                    ej.inputs.Input.calculateWidth(this.inputElement, this.inputWrapper.container);
                    if (!ej.base.isNullOrUndefined(this.inputWrapper.buttons[0]) && !ej.base.isNullOrUndefined(this.inputWrapper.container.getElementsByClassName('e-float-text-overflow')[0]) && this.floatLabelType !== 'Never') {
                        this.inputWrapper.container.getElementsByClassName('e-float-text-overflow')[0].classList.add('e-icon');
                    }
                    break;
                case 'floatLabelType':
                    this.floatLabelType = newProp.floatLabelType;
                    ej.inputs.Input.removeFloating(this.inputWrapper);
                    ej.inputs.Input.addFloating(this.inputElement, this.floatLabelType, this.placeholder);
                    if (!ej.base.isNullOrUndefined(this.inputWrapper.buttons[0]) && !ej.base.isNullOrUndefined(this.inputWrapper.container.getElementsByClassName('e-float-text-overflow')[0]) && this.floatLabelType !== 'Never') {
                        this.inputWrapper.container.getElementsByClassName('e-float-text-overflow')[0].classList.add('e-icon');
                    }
                    break;
                case 'enableMask':
                    if (this.enableMask) {
                        this.notify('createMask', {
                            module: 'MaskedDateTime'
                        });
                        this.updateInputValue(this.maskedDateValue);
                        this.bindInputEvent();
                    }
                    else {
                        if (this.inputElement.value === this.maskedDateValue) {
                            this.updateInputValue('');
                        }
                    }
                    break;
                default:
                    if (this.calendarElement && this.isCalendar()) {
                        _super.prototype.onPropertyChanged.call(this, newProp, oldProp);
                    }
                    break;
            }
            if (!this.isDynamicValueChanged) {
                this.hide(null);
            }
            this.isDynamicValueChanged = false;
        }
    };
    __decorate$1([
        Property(null)
    ], NepaliDatePicker.prototype, "width", void 0);
    __decorate$1([
        Property(null)
    ], NepaliDatePicker.prototype, "value", void 0);
    __decorate$1([
        Property(null)
    ], NepaliDatePicker.prototype, "cssClass", void 0);
    __decorate$1([
        Property(false)
    ], NepaliDatePicker.prototype, "strictMode", void 0);
    __decorate$1([
        Property(null)
    ], NepaliDatePicker.prototype, "format", void 0);
    __decorate$1([
        Property(true)
    ], NepaliDatePicker.prototype, "enabled", void 0);
    __decorate$1([
        Property({})
    ], NepaliDatePicker.prototype, "htmlAttributes", void 0);
    __decorate$1([
        Property(null)
    ], NepaliDatePicker.prototype, "values", void 0);
    __decorate$1([
        Property(false)
    ], NepaliDatePicker.prototype, "isMultiSelection", void 0);
    __decorate$1([
        Property(true)
    ], NepaliDatePicker.prototype, "showClearButton", void 0);
    __decorate$1([
        Property(true)
    ], NepaliDatePicker.prototype, "allowEdit", void 0);
    __decorate$1([
        Property(null)
    ], NepaliDatePicker.prototype, "keyConfigs", void 0);
    __decorate$1([
        Property(false)
    ], NepaliDatePicker.prototype, "enablePersistence", void 0);
    __decorate$1([
        Property(1000)
    ], NepaliDatePicker.prototype, "zIndex", void 0);
    __decorate$1([
        Property(false)
    ], NepaliDatePicker.prototype, "readonly", void 0);
    __decorate$1([
        Property(null)
    ], NepaliDatePicker.prototype, "placeholder", void 0);
    __decorate$1([
        Property('Never')
    ], NepaliDatePicker.prototype, "floatLabelType", void 0);
    __decorate$1([
        Property(null)
    ], NepaliDatePicker.prototype, "serverTimezoneOffset", void 0);
    __decorate$1([
        Property(false)
    ], NepaliDatePicker.prototype, "openOnFocus", void 0);
    __decorate$1([
        Property(false)
    ], NepaliDatePicker.prototype, "enableMask", void 0);
    __decorate$1([
        Property({ day: 'day', month: 'month', year: 'year', hour: 'hour', minute: 'minute', second: 'second', dayOfTheWeek: 'day of the week' })
    ], NepaliDatePicker.prototype, "maskPlaceholder", void 0);
    __decorate$1([
        Event()
    ], NepaliDatePicker.prototype, "open", void 0);
    __decorate$1([
        Event()
    ], NepaliDatePicker.prototype, "cleared", void 0);
    __decorate$1([
        Event()
    ], NepaliDatePicker.prototype, "close", void 0);
    __decorate$1([
        Event()
    ], NepaliDatePicker.prototype, "blur", void 0);
    __decorate$1([
        Event()
    ], NepaliDatePicker.prototype, "focus", void 0);
    __decorate$1([
        Event()
    ], NepaliDatePicker.prototype, "created", void 0);
    __decorate$1([
        Event()
    ], NepaliDatePicker.prototype, "destroyed", void 0);
    NepaliDatePicker = __decorate$1([
        ej.base.NotifyPropertyChanges
    ], NepaliDatePicker);
    return NepaliDatePicker;
}(ej.calendars.Calendar));