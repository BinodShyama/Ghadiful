/**
 * Represents the Calendar component that allows the user to select a date.
 * ```html
 * <div id="calendar"/>
 * ```
 * ```typescript
 * <script>
 *   var calendarObj = new Calendar({ value: new Date() });
 *   calendarObj.appendTo("#calendar");
 * </script>
 * ```
 */
var CustomCalendar = /** @__PURE__ @class */ (function (_super) {
    __extends(CustomCalendar, _super);
    /**
     * Initialized new instance of Calendar Class.
     * Constructor for creating the widget
     *
     * @param {CalendarModel} options - Specifies the Calendar model.
     * @param {string | HTMLElement} element - Specifies the element to render as component.
     * @private
     */
    function CustomCalendar(options, element) {
        return _super.call(this, options, element) || this;
    }
    /**
     * To Initialize the control rendering.
     *
     * @returns {void}
     * @private
     */
    CustomCalendar.prototype.render = function () {
        if (this.calendarMode === 'Islamic' && this.islamicModule === undefined) {
            throwError('Requires the injectable Islamic modules to render Calendar in Islamic mode');
        }
        if (this.isMultiSelection && typeof this.values === 'object' && !ej.base.isNullOrUndefined(this.values) && this.values.length > 0) {
            var tempValues = [];
            var copyValues = [];
            for (var limit = 0; limit < this.values.length; limit++) {
                if (tempValues.indexOf(+this.values[limit]) === -1) {
                    tempValues.push(+this.values[limit]);
                    copyValues.push(this.values[limit]);
                }
            }
            this.setProperties({ values: copyValues }, true);
            for (var index = 0; index < this.values.length; index++) {
                if (!this.checkDateValue(this.values[index])) {
                    if (typeof (this.values[index]) === 'string' && this.checkDateValue(new Date(this.checkValue(this.values[index])))) {
                        var copyDate = new Date(this.checkValue(this.values[index]));
                        this.values.splice(index, 1);
                        this.values.splice(index, 0, copyDate);
                    }
                    else {
                        this.values.splice(index, 1);
                    }
                }
            }
            this.setProperties({ value: this.values[this.values.length - 1] }, true);
            this.previousValues = this.values.length;
        }
        this.validateDate();
        this.minMaxUpdate();
        if (this.getModuleName() === 'calendar') {
            this.setEnable(this.enabled);
            this.setClass(this.cssClass);
        }
        _super.prototype.render.call(this);
        if (this.getModuleName() === 'calendar') {
            var form = closest(this.element, 'form');
            if (form) {
                EventHandler.add(form, 'reset', this.formResetHandler.bind(this));
            }
            this.setTimeZone(this.serverTimezoneOffset);
        }
        this.renderComplete();
    };
    CustomCalendar.prototype.setEnable = function (enable) {
        if (!enable) {
            ej.base.addClass([this.element], DISABLED);
        }
        else {
            ej.base.removeClass([this.element], DISABLED);
        }
    };
    CustomCalendar.prototype.setClass = function (newCssClass, oldCssClass) {
        if (!ej.base.isNullOrUndefined(oldCssClass)) {
            oldCssClass = (oldCssClass.replace(/\s+/g, ' ')).trim();
        }
        if (!ej.base.isNullOrUndefined(newCssClass)) {
            newCssClass = (newCssClass.replace(/\s+/g, ' ')).trim();
        }
        if (!ej.base.isNullOrUndefined(oldCssClass) && oldCssClass !== '') {
            ej.base.removeClass([this.element], oldCssClass.split(' '));
        }
        if (!ej.base.isNullOrUndefined(newCssClass)) {
            ej.base.addClass([this.element], newCssClass.split(' '));
        }
    };
    CustomCalendar.prototype.isDayLightSaving = function () {
        var secondOffset = new Date(this.value.getFullYear(), 6, 1).getTimezoneOffset();
        var firstOffset = new Date(this.value.getFullYear(), 0, 1).getTimezoneOffset();
        return (this.value.getTimezoneOffset() < Math.max(firstOffset, secondOffset));
    };
    CustomCalendar.prototype.setTimeZone = function (offsetValue) {
        if (!ej.base.isNullOrUndefined(this.serverTimezoneOffset) && this.value) {
            var serverTimezoneDiff = offsetValue;
            var clientTimeZoneDiff = new Date().getTimezoneOffset() / 60;
            var timeZoneDiff = serverTimezoneDiff + clientTimeZoneDiff;
            timeZoneDiff = this.isDayLightSaving() ? timeZoneDiff-- : timeZoneDiff;
            this.value = new Date(this.value.getTime() + (timeZoneDiff * 60 * 60 * 1000));
        }
    };
    CustomCalendar.prototype.formResetHandler = function () {
        this.setProperties({ value: null }, true);
    };
    CustomCalendar.prototype.validateDate = function () {
        if (typeof this.value === 'string') {
            this.setProperties({ value: this.checkDateValue(new Date(this.checkValue(this.value))) }, true); // persist the value property.
        }
        _super.prototype.validateDate.call(this, this.value);
        if (!ej.base.isNullOrUndefined(this.value) && this.min <= this.max && this.value >= this.min && this.value <= this.max) {
            this.currentDate = new Date(this.checkValue(this.value));
        }
        if (isNaN(+this.value)) {
            this.setProperties({ value: null }, true);
        }
    };
    CustomCalendar.prototype.minMaxUpdate = function () {
        if (this.getModuleName() === 'calendar') {
            if (!ej.base.isNullOrUndefined(this.value) && this.value <= this.min && this.min <= this.max) {
                this.setProperties({ value: this.min }, true);
                this.changedArgs = { value: this.value };
            }
            else {
                if (!ej.base.isNullOrUndefined(this.value) && this.value >= this.max && this.min <= this.max) {
                    this.setProperties({ value: this.max }, true);
                    this.changedArgs = { value: this.value };
                }
            }
        }
        if (this.getModuleName() !== 'calendar' && !ej.base.isNullOrUndefined(this.value)) {
            if (!ej.base.isNullOrUndefined(this.value) && this.value < this.min && this.min <= this.max) {
                _super.prototype.minMaxUpdate.call(this, this.min);
            }
            else {
                if (!ej.base.isNullOrUndefined(this.value) && this.value > this.max && this.min <= this.max) {
                    _super.prototype.minMaxUpdate.call(this, this.max);
                }
            }
        }
        else {
            _super.prototype.minMaxUpdate.call(this, this.value);
        }
    };
    CustomCalendar.prototype.generateTodayVal = function (value) {
        var tempValue = new Date();
        if (!ej.base.isNullOrUndefined(this.timezone)) {
            tempValue = _super.prototype.getDate.call(this, tempValue, this.timezone);
        }
        if (value && ej.base.isNullOrUndefined(this.timezone)) {
            tempValue.setHours(value.getHours());
            tempValue.setMinutes(value.getMinutes());
            tempValue.setSeconds(value.getSeconds());
            tempValue.setMilliseconds(value.getMilliseconds());
        }
        else {
            tempValue = new Date(tempValue.getFullYear(), tempValue.getMonth(), tempValue.getDate(), 0, 0, 0, 0);
        }
        return tempValue;
    };
    CustomCalendar.prototype.todayButtonClick = function (e) {
        if (this.showTodayButton) {
            var tempValue = this.generateTodayVal(this.value);
            this.setProperties({ value: tempValue }, true);
            this.isTodayClicked = true;
            this.todayButtonEvent = e;
            if (this.isMultiSelection) {
                var copyValues = this.copyValues(this.values);
                if (!_super.prototype.checkPresentDate.call(this, tempValue, this.values)) {
                    copyValues.push(tempValue);
                    this.setProperties({ values: copyValues });
                }
            }
            _super.prototype.todayButtonClick.call(this, e, new Date(+this.value));
        }
    };
    CustomCalendar.prototype.keyActionHandle = function (e) {
        _super.prototype.keyActionHandle.call(this, e, this.value, this.isMultiSelection);
    };
    /**
     * Initialize the event handler
     *
     * @returns {void}
     * @private
     */
    CustomCalendar.prototype.preRender = function () {
        var _this = this;
        this.changeHandler = function (e) {
            _this.triggerChange(e);
        };
        this.checkView();
        _super.prototype.preRender.call(this, this.value);
    };
    /**
     * @returns {void}
     * @deprecated
     */
    CustomCalendar.prototype.createContent = function () {
        this.previousDate = this.value;
        this.previousDateTime = this.value;
        _super.prototype.createContent.call(this);
    };
    CustomCalendar.prototype.minMaxDate = function (localDate) {
        return _super.prototype.minMaxDate.call(this, localDate);
    };
    CustomCalendar.prototype.renderMonths = function (e, value, isCustomDate) {
        _super.prototype.renderMonths.call(this, e, this.value, isCustomDate);
    };
    CustomCalendar.prototype.renderDays = function (currentDate, value, isMultiSelect, values, isCustomDate, e) {
        var tempDays = _super.prototype.renderDays.call(this, currentDate, this.value, this.isMultiSelection, this.values, isCustomDate, e);
        if (this.isMultiSelection) {
            _super.prototype.validateValues.call(this, this.isMultiSelection, this.values);
        }
        return tempDays;
    };
    CustomCalendar.prototype.renderYears = function (e) {
        if (this.calendarMode === 'Gregorian') {
            _super.prototype.renderYears.call(this, e, this.value);
        }
        else {
            this.islamicModule.islamicRenderYears(e, this.value);
        }
    };
    CustomCalendar.prototype.renderDecades = function (e) {
        if (this.calendarMode === 'Gregorian') {
            _super.prototype.renderDecades.call(this, e, this.value);
        }
        else {
            this.islamicModule.islamicRenderDecade(e, this.value);
        }
    };
    CustomCalendar.prototype.renderTemplate = function (elements, count, classNm, e) {
        if (this.calendarMode === 'Gregorian') {
            _super.prototype.renderTemplate.call(this, elements, count, classNm, e, this.value);
        }
        else {
            this.islamicModule.islamicRenderTemplate(elements, count, classNm, e, this.value);
        }
        this.changedArgs = { value: this.value, values: this.values };
        this.changeHandler();
    };
    CustomCalendar.prototype.clickHandler = function (e) {
        var eve = e.currentTarget;
        this.isPopupClicked = true;
        if (eve.classList.contains(OTHERMONTH)) {
            if (this.isMultiSelection) {
                var copyValues = this.copyValues(this.values);
                if (copyValues.toString().indexOf(this.getIdValue(e, null).toString()) === -1) {
                    copyValues.push(this.getIdValue(e, null));
                    this.setProperties({ values: copyValues }, true);
                    this.setProperties({ value: this.values[this.values.length - 1] }, true);
                }
                else {
                    this.previousDates = true;
                }
            }
            else {
                this.setProperties({ value: this.getIdValue(e, null) }, true);
            }
        }
        var storeView = this.currentView();
        _super.prototype.clickHandler.call(this, e, this.value);
        if (this.isMultiSelection && this.currentDate !== this.value &&
            !ej.base.isNullOrUndefined(this.tableBodyElement.querySelectorAll('.' + FOCUSEDDATE)[0]) && storeView === 'Year') {
            this.tableBodyElement.querySelectorAll('.' + FOCUSEDDATE)[0].classList.remove(FOCUSEDDATE);
        }
    };
    CustomCalendar.prototype.switchView = function (view, e, isMultiSelection, isCustomDate) {
        _super.prototype.switchView.call(this, view, e, this.isMultiSelection, isCustomDate);
    };
    /**
     * To get component name
     *
     * @returns {string} Return the component name.
     * @private
     */
    CustomCalendar.prototype.getModuleName = function () {
        _super.prototype.getModuleName.call(this);
        return 'calendar';
    };
    /* eslint-disable valid-jsdoc, jsdoc/require-returns-description */
    /**
     * Gets the properties to be maintained upon browser refresh.
     *
     * @returns {string}
     */
    CustomCalendar.prototype.getPersistData = function () {
        _super.prototype.getPersistData.call(this);
        var keyEntity = ['value', 'values'];
        return this.addOnPersist(keyEntity);
    };
    /* eslint-enable valid-jsdoc, jsdoc/require-returns-description */
    /**
     * Called internally if any of the property value changed.
     *
     * @param {CalendarModel} newProp - Returns the dynamic property value of the component.
     * @param {CalendarModel} oldProp - Returns the previous property value of the component.
     * @returns {void}
     * @private
     */
    CustomCalendar.prototype.onPropertyChanged = function (newProp, oldProp) {
        this.effect = '';
        this.rangeValidation(this.min, this.max);
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'value':
                    if (this.isDateSelected) {
                        if (typeof newProp.value === 'string') {
                            this.setProperties({ value: new Date(this.checkValue(newProp.value)) }, true);
                        }
                        else {
                            newProp.value = new Date(this.checkValue(newProp.value));
                        }
                        if (isNaN(+this.value)) {
                            this.setProperties({ value: oldProp.value }, true);
                        }
                        this.update();
                    }
                    break;
                case 'values':
                    if (this.isDateSelected) {
                        if (typeof newProp.values === 'string' || typeof newProp.values === 'number') {
                            this.setProperties({ values: null }, true);
                        }
                        else {
                            var copyValues = this.copyValues(this.values);
                            for (var index = 0; index < copyValues.length; index++) {
                                var tempDate = copyValues[index];
                                if (this.checkDateValue(tempDate) && !_super.prototype.checkPresentDate.call(this, tempDate, copyValues)) {
                                    copyValues.push(tempDate);
                                }
                            }
                            this.setProperties({ values: copyValues }, true);
                            if (this.values.length > 0) {
                                this.setProperties({ value: newProp.values[newProp.values.length - 1] }, true);
                            }
                        }
                        this.validateValues(this.isMultiSelection, this.values);
                        this.update();
                    }
                    break;
                case 'isMultiSelection':
                    if (this.isDateSelected) {
                        this.setProperties({ isMultiSelection: newProp.isMultiSelection }, true);
                        this.update();
                    }
                    break;
                case 'enabled':
                    this.setEnable(this.enabled);
                    break;
                case 'cssClass':
                    if (this.getModuleName() === 'calendar') {
                        this.setClass(newProp.cssClass, oldProp.cssClass);
                    }
                    break;
                default:
                    _super.prototype.onPropertyChanged.call(this, newProp, oldProp, this.isMultiSelection, this.values);
            }
        }
        this.preventChange = this.isAngular && this.preventChange ? !this.preventChange : this.preventChange;
    };
    /**
     * Destroys the widget.
     *
     * @returns {void}
     */
    CustomCalendar.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        if (this.getModuleName() === 'calendar') {
            var form = closest(this.element, 'form');
            if (form) {
                EventHandler.remove(form, 'reset', this.formResetHandler.bind(this));
            }
        }
    };
    /**
     * This method is used to navigate to the month/year/decade view of the Calendar.
     *
     * @param {string} view - Specifies the view of the Calendar.
     * @param {Date} date - Specifies the focused date in a view.
     * @param {boolean} isCustomDate - Specifies whether the calendar is rendered with custom today date or not.
     * @returns {void}
     * @deprecated
     */
    CustomCalendar.prototype.navigateTo = function (view, date, isCustomDate) {
        this.minMaxUpdate();
        _super.prototype.navigateTo.call(this, view, date, isCustomDate);
    };
    /* eslint-disable valid-jsdoc, jsdoc/require-returns-description */
    /**
     * Gets the current view of the Calendar.
     *
     * @returns {string}
     * @deprecated
     */
    CustomCalendar.prototype.currentView = function () {
        return _super.prototype.currentView.call(this);
    };
    /* eslint-enable valid-jsdoc, jsdoc/require-returns-description */
    /**
     * This method is used to add the single or multiple dates to the values property of the Calendar.
     *
     * @param {Date | Date[]} dates - Specifies the date or dates to be added to the values property of the Calendar.
     * @returns {void}
     * @deprecated
     */
    CustomCalendar.prototype.addDate = function (dates) {
        if (typeof dates !== 'string' && typeof dates !== 'number') {
            var copyValues = this.copyValues(this.values);
            if (typeof dates === 'object' && (dates).length > 0) {
                var tempDates = dates;
                for (var i = 0; i < tempDates.length; i++) {
                    if (this.checkDateValue(tempDates[i]) && !_super.prototype.checkPresentDate.call(this, tempDates[i], copyValues)) {
                        if (!ej.base.isNullOrUndefined(copyValues) && copyValues.length > 0) {
                            copyValues.push(tempDates[i]);
                        }
                        else {
                            copyValues = [new Date(+tempDates[i])];
                        }
                    }
                }
            }
            else {
                if (this.checkDateValue(dates) && !_super.prototype.checkPresentDate.call(this, dates, copyValues)) {
                    if (!ej.base.isNullOrUndefined(copyValues) && copyValues.length > 0) {
                        copyValues.push((dates));
                    }
                    else {
                        copyValues = [new Date(+dates)];
                    }
                }
            }
            this.setProperties({ values: copyValues }, true);
            if (this.isMultiSelection) {
                this.setProperties({ value: this.values[this.values.length - 1] }, true);
            }
            this.validateValues(this.isMultiSelection, copyValues);
            this.update();
            this.changedArgs = { value: this.value, values: this.values };
            this.changeHandler();
        }
    };
    /**
     * This method is used to remove the single or multiple dates from the values property of the Calendar.
     *
     * @param {Date | Date[]} dates - Specifies the date or dates which need to be removed from the values property of the Calendar.
     * @returns {void}
     * @deprecated
     */
    CustomCalendar.prototype.removeDate = function (dates) {
        if (typeof dates !== 'string' && typeof dates !== 'number' && !ej.base.isNullOrUndefined(this.values) && this.values.length > 0) {
            var copyValues = this.copyValues(this.values);
            if (typeof dates === 'object' && ((dates).length > 0)) {
                var tempDates = dates;
                for (var index = 0; index < tempDates.length; index++) {
                    for (var i = 0; i < copyValues.length; i++) {
                        if (+copyValues[i] === +tempDates[index]) {
                            copyValues.splice(i, 1);
                        }
                    }
                }
            }
            else {
                for (var i = 0; i < copyValues.length; i++) {
                    if (+copyValues[i] === +dates) {
                        copyValues.splice(i, 1);
                    }
                }
            }
            this.setProperties({ values: copyValues }, false);
            this.update();
            if (this.isMultiSelection) {
                this.setProperties({ value: this.values[this.values.length - 1] }, true);
            }
            this.changedArgs = { value: this.value, values: this.values };
            this.changeHandler();
        }
    };
    /**
     * To set custom today date in calendar
     *
     * @param {Date} date - Specifies date value to be set.
     * @private
     * @returns {void}
     */
    CustomCalendar.prototype.setTodayDate = function (date) {
        var todayDate = new Date(+date);
        this.setProperties({ value: todayDate }, true);
        _super.prototype.todayButtonClick.call(this, null, todayDate, true);
    };
    CustomCalendar.prototype.update = function () {
        this.validateDate();
        this.minMaxUpdate();
        _super.prototype.setValueUpdate.call(this);
    };
    CustomCalendar.prototype.selectDate = function (e, date, element) {
        _super.prototype.selectDate.call(this, e, date, element, this.isMultiSelection, this.values);
        if (this.isMultiSelection && !ej.base.isNullOrUndefined(this.values) && this.values.length > 0) {
            this.setProperties({ value: this.values[this.values.length - 1] }, true);
        }
        this.changedArgs = { value: this.value, values: this.values };
        this.changeHandler(e);
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    CustomCalendar.prototype.changeEvent = function (e) {
        if ((this.value && this.value.valueOf()) !== (this.previousDate && +this.previousDate.valueOf())
            || this.isMultiSelection) {
            if (this.isAngular && this.preventChange) {
                this.preventChange = false;
            }
            else {
                this.trigger('change', this.changedArgs);
            }
            this.previousDate = new Date(+this.value);
        }
    };
    CustomCalendar.prototype.triggerChange = function (e) {
        if (!ej.base.isNullOrUndefined(this.todayButtonEvent) && this.isTodayClicked) {
            e = this.todayButtonEvent;
            this.isTodayClicked = false;
        }
        this.changedArgs.event = e || null;
        this.changedArgs.isInteracted = !ej.base.isNullOrUndefined(e);
        if (!ej.base.isNullOrUndefined(this.value)) {
            this.setProperties({ value: this.value }, true);
        }
        // eslint-disable-next-line use-isnan
        if (!this.isMultiSelection && +this.value !== Number.NaN && (!ej.base.isNullOrUndefined(this.value) &&
            !ej.base.isNullOrUndefined(this.previousDate) || this.previousDate === null
            && !isNaN(+this.value))) {
            this.changeEvent(e);
        }
        else if (!ej.base.isNullOrUndefined(this.values) && this.previousValues !== this.values.length) {
            this.changeEvent(e);
            this.previousValues = this.values.length;
        }
    };
    __decorate([
        Property(null)
    ], CustomCalendar.prototype, "value", void 0);
    __decorate([
        Property(null)
    ], CustomCalendar.prototype, "values", void 0);
    __decorate([
        Property(false)
    ], CustomCalendar.prototype, "isMultiSelection", void 0);
    __decorate([
        Event()
    ], CustomCalendar.prototype, "change", void 0);
    CustomCalendar = __decorate([
        NotifyPropertyChanges
    ], CustomCalendar);
    return CustomCalendar;
}(CalendarBase));