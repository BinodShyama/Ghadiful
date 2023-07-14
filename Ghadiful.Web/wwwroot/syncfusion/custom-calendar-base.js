
ej.base.IntlBase.defaultObject.dates.calendars.bs = bs().bs;
ej.base.IntlBase.bsRegex = /^bs/;

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) {
                for (var p in b)
                    if (b.hasOwnProperty(p))
                        d[p] = b[p];
            };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* eslint-disable @typescript-eslint/no-unused-expressions */
//class constant defination.
let OTHERMONTH = 'e-other-month';
let OTHERDECADE = 'e-other-year';
let ROOT = 'e-calendar';
let DEVICE = 'e-device';
let HEADER = 'e-header';
let RTL = 'e-rtl';
let CONTENT = 'e-content';
let YEAR = 'e-year';
let MONTH = 'e-month';
let DECADE = 'e-decade';
let ICON = 'e-icons';
let PREVICON = 'e-prev';
let NEXTICON = 'e-next';
let PREVSPAN = 'e-date-icon-prev';
let NEXTSPAN = 'e-date-icon-next ';
let ICONCONTAINER = 'e-icon-container';
let DISABLED = 'e-disabled';
let OVERLAY = 'e-overlay';
let WEEKEND = 'e-weekend';
let WEEKNUMBER = 'e-week-number';
let SELECTED = 'e-selected';
let FOCUSEDDATE = 'e-focused-date';
let OTHERMONTHROW = 'e-month-hide';
let TODAY = 'e-today';
let TITLE = 'e-title';
let LINK = 'e-day';
let CELL = 'e-cell';
let WEEKHEADER = 'e-week-header';
let ZOOMIN = 'e-zoomin';
let FOOTER = 'e-footer-container';
let BTN = 'e-btn';
let FLAT = 'e-flat';
let CSS = 'e-css';
let PRIMARY = 'e-primary';
let DAYHEADERLONG = 'e-calendar-day-header-lg';
let dayMilliSeconds = 86400000;
let minutesMilliSeconds = 60000;
/**
 *
 * @private
 */
var CustomCalendarBase = /** @__PURE__ @class */ (function (_super) {
    __extends(CustomCalendarBase, _super);
    /**
     * Initialized new instance of Calendar Class.
     * Constructor for creating the widget
     *
     * @param {CalendarBaseModel} options - Specifies the CalendarBase model.
     * @param {string | HTMLElement} element - Specifies the element to render as component.
     * @private
     */
    function CustomCalendarBase(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.effect = '';
        _this.isPopupClicked = false;
        _this.isDateSelected = true;
        _this.isTodayClicked = false;
        _this.preventChange = false;
        _this.isAngular = false;
        _this.previousDates = false;
        return _this;
    }
    /**
     * To Initialize the control rendering.
     *
     * @returns {void}
     * @private
     */
    CustomCalendarBase.prototype.render = function () {
        this.rangeValidation(this.min, this.max);
        this.calendarEleCopy = this.element.cloneNode(true);
        if (this.calendarMode === 'bs') {
            if (+(this.min.setSeconds(0)) === +new Date(1900, 0, 1, 0, 0, 0)) {
                this.min = new Date(1950, 1, 1);
            }
            if (+this.max === +new Date(2099, 11, 31)) {
                this.max = new Date(2053, 10, 16);
            }
        }
        this.globalize = new CustomInternationalization(this.locale);
        if (ej.base.isNullOrUndefined(this.firstDayOfWeek) || this.firstDayOfWeek > 6 || this.firstDayOfWeek < 0) {
            this.setProperties({ firstDayOfWeek: this.globalize.getFirstDayOfWeek() }, true);
        }
        this.todayDisabled = false;
        this.todayDate = new Date(new Date().setHours(0, 0, 0, 0));
        if (this.getModuleName() === 'calendar') {
            this.element.classList.add(ROOT);
            if (this.enableRtl) {
                this.element.classList.add(RTL);
            }
            if (ej.base.Browser.isDevice) {
                this.element.classList.add(DEVICE);
            }
            ej.base.attributes(this.element, {
                'data-role': 'calendar'
            });
            this.tabIndex = this.element.hasAttribute('tabindex') ? this.element.getAttribute('tabindex') : '0';
            this.element.setAttribute('tabindex', this.tabIndex);
        }
        else {
            this.calendarElement = this.createElement('div');
            this.calendarElement.classList.add(ROOT);
            if (this.enableRtl) {
                this.calendarElement.classList.add(RTL);
            }
            if (ej.base.Browser.isDevice) {
                this.calendarElement.classList.add(DEVICE);
            }
            ej.base.attributes(this.calendarElement, {
                'data-role': 'calendar'
            });
        }
        if (!ej.base.isNullOrUndefined(ej.base.closest(this.element, 'fieldset')) && closest(this.element, 'fieldset').disabled) {
            this.enabled = false;
        }
        this.createHeader();
        this.createContent();
        this.wireEvents();
    };
    CustomCalendarBase.prototype.rangeValidation = function (min, max) {
        if (ej.base.isNullOrUndefined(min)) {
            this.setProperties({ min: new Date(1900, 0, 1) }, true);
        }
        if (ej.base.isNullOrUndefined(max)) {
            this.setProperties({ max: new Date(2099, 11, 31) }, true);
        }
    };
    CustomCalendarBase.prototype.getDefaultKeyConfig = function () {
        this.defaultKeyConfigs = {
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
            altUpArrow: 'alt+uparrow',
            spacebar: 'space',
            altRightArrow: 'alt+rightarrow',
            altLeftArrow: 'alt+leftarrow'
        };
        return this.defaultKeyConfigs;
    };
    CustomCalendarBase.prototype.validateDate = function (value) {
        this.setProperties({ min: this.checkDateValue(new Date(this.checkValue(this.min))) }, true);
        this.setProperties({ max: this.checkDateValue(new Date(this.checkValue(this.max))) }, true);
        this.currentDate = this.currentDate ? this.currentDate : new Date(new Date().setHours(0, 0, 0, 0));
        if (!ej.base.isNullOrUndefined(value) && this.min <= this.max && value >= this.min && value <= this.max) {
            this.currentDate = new Date(this.checkValue(value));
        }
    };
    CustomCalendarBase.prototype.setOverlayIndex = function (popupWrapper, popupElement, modal, isDevice) {
        if (isDevice && !ej.base.isNullOrUndefined(popupElement) && !ej.base.isNullOrUndefined(modal) && !ej.base.isNullOrUndefined(popupWrapper)) {
            var index = parseInt(popupElement.style.zIndex, 10) ? parseInt(popupElement.style.zIndex, 10) : 1000;
            modal.style.zIndex = (index - 1).toString();
            popupWrapper.style.zIndex = index.toString();
        }
    };
    CustomCalendarBase.prototype.minMaxUpdate = function (value) {
        if (!(+this.min <= +this.max)) {
            this.setProperties({ min: this.min }, true);
            ej.base.addClass([this.element], OVERLAY);
        }
        else {
            ej.base.removeClass([this.element], OVERLAY);
        }
        this.min = ej.base.isNullOrUndefined(this.min) || !(+this.min) ? this.min = new Date(1900, 0, 1) : this.min;
        this.max = ej.base.isNullOrUndefined(this.max) || !(+this.max) ? this.max = new Date(2099, 11, 31) : this.max;
        if (+this.min <= +this.max && value && +value <= +this.max && +value >= +this.min) {
            this.currentDate = new Date(this.checkValue(value));
        }
        else {
            if (+this.min <= +this.max && !value && +this.currentDate > +this.max) {
                this.currentDate = new Date(this.checkValue(this.max));
            }
            else {
                if (+this.currentDate < +this.min) {
                    this.currentDate = new Date(this.checkValue(this.min));
                }
            }
        }
    };
    CustomCalendarBase.prototype.createHeader = function () {
        var ariaPrevAttrs = {
            'aria-disabled': 'false',
            'aria-label': 'previous month'
        };
        var ariaNextAttrs = {
            'aria-disabled': 'false',
            'aria-label': 'next month'
        };
        var ariaTitleAttrs = {
            'aria-atomic': 'true', 'aria-live': 'assertive', 'aria-label': 'title'
        };
        this.headerElement = this.createElement('div', { className: HEADER });
        var iconContainer = this.createElement('div', { className: ICONCONTAINER });
        this.previousIcon = this.createElement('button', { className: '' + PREVICON, attrs: { type: 'button' } });
        ej.base.rippleEffect(this.previousIcon, {
            duration: 400,
            selector: '.e-prev',
            isCenterRipple: true
        });
        ej.base.attributes(this.previousIcon, ariaPrevAttrs);
        this.nextIcon = this.createElement('button', { className: '' + NEXTICON, attrs: { type: 'button' } });
        ej.base.rippleEffect(this.nextIcon, {
            selector: '.e-next',
            duration: 400,
            isCenterRipple: true
        });
        if (this.getModuleName() === 'daterangepicker') {
            ej.base.attributes(this.previousIcon, { tabIndex: '-1' });
            ej.base.attributes(this.nextIcon, { tabIndex: '-1' });
        }
        ej.base.attributes(this.nextIcon, ariaNextAttrs);
        this.headerTitleElement = this.createElement('div', { className: '' + LINK + ' ' + TITLE });
        ej.base.attributes(this.headerTitleElement, ariaTitleAttrs);
        this.headerElement.appendChild(this.headerTitleElement);
        this.previousIcon.appendChild(this.createElement('span', { className: '' + PREVSPAN + ' ' + ICON }));
        this.nextIcon.appendChild(this.createElement('span', { className: '' + NEXTSPAN + ' ' + ICON }));
        iconContainer.appendChild(this.previousIcon);
        iconContainer.appendChild(this.nextIcon);
        this.headerElement.appendChild(iconContainer);
        if (this.getModuleName() === 'calendar') {
            this.element.appendChild(this.headerElement);
        }
        else {
            this.calendarElement.appendChild(this.headerElement);
        }
        this.adjustLongHeaderSize();
    };
    CustomCalendarBase.prototype.createContent = function () {
        this.contentElement = this.createElement('div', { className: CONTENT });
        this.table = this.createElement('table', { attrs: { tabIndex: '0', 'role': 'grid', 'aria-activedescendant': '', 'aria-labelledby': this.element.id } });
        if (this.getModuleName() === 'calendar') {
            this.element.appendChild(this.contentElement);
        }
        else {
            this.calendarElement.appendChild(this.contentElement);
        }
        this.contentElement.appendChild(this.table);
        this.createContentHeader();
        this.createContentBody();
        if (this.showTodayButton) {
            this.createContentFooter();
        }
    };
    CustomCalendarBase.prototype.getCultureValues = function () {
        var culShortNames = [];
        var cldrObj;
        var dayFormat = 'days.stand-alone.' + this.dayHeaderFormat.toLowerCase();
        if (this.locale === 'en' || this.locale === 'en-US') {
            cldrObj = (ej.base.getValue(dayFormat, ej.base.getDefaultDateObject()));
        }
        else {
            cldrObj = (this.getCultureObjects(cldrData, '' + this.locale));
        }
        if (!ej.base.isNullOrUndefined(cldrObj)) {
            for (var _i = 0, _a = Object.keys(cldrObj); _i < _a.length; _i++) {
                var obj = _a[_i];
                culShortNames.push(ej.base.getValue(obj, cldrObj));
            }
        }
        return culShortNames;
    };
    CustomCalendarBase.prototype.toCapitalize = function (text) {
        return !ej.base.isNullOrUndefined(text) && text.length ? text[0].toUpperCase() + text.slice(1) : text;
    };
    CustomCalendarBase.prototype.createContentHeader = function () {
        if (this.getModuleName() === 'calendar') {
            if (!ej.base.isNullOrUndefined(this.element.querySelectorAll('.e-content .e-week-header')[0])) {
                ej.base.detach(this.element.querySelectorAll('.e-content .e-week-header')[0]);
            }
        }
        else {
            if (!ej.base.isNullOrUndefined(this.calendarElement.querySelectorAll('.e-content .e-week-header')[0])) {
                ej.base.detach(this.calendarElement.querySelectorAll('.e-content .e-week-header')[0]);
            }
        }
        var daysCount = 6;
        var html = '';
        if (this.firstDayOfWeek > 6 || this.firstDayOfWeek < 0) {
            this.setProperties({ firstDayOfWeek: 0 }, true);
        }
        this.tableHeadElement = this.createElement('thead', { className: WEEKHEADER });
        if (this.weekNumber) {
            html += '<th class="e-week-number"></th>';
            if (this.getModuleName() === 'calendar') {
                ej.base.addClass([this.element], '' + WEEKNUMBER);
            }
            else {
                ej.base.addClass([this.calendarElement], '' + WEEKNUMBER);
            }
        }
        // eslint-disable-next-line max-len
        var shortNames = this.getCultureValues().length > 0 && this.getCultureValues() ? this.shiftArray(((this.getCultureValues().length > 0 && this.getCultureValues())), this.firstDayOfWeek) : null;
        if (!ej.base.isNullOrUndefined(shortNames)) {
            for (var days = 0; days <= daysCount; days++) {
                html += '<th  class="">' + this.toCapitalize(shortNames[days]) + '</th>';
            }
        }
        html = '<tr>' + html + '</tr>';
        this.tableHeadElement.innerHTML = html;
        this.table.appendChild(this.tableHeadElement);
    };
    CustomCalendarBase.prototype.createContentBody = function () {
        if (this.getModuleName() === 'calendar') {
            if (!ej.base.isNullOrUndefined(this.element.querySelectorAll('.e-content tbody')[0])) {
                ej.base.detach(this.element.querySelectorAll('.e-content tbody')[0]);
            }
        }
        else {
            if (!ej.base.isNullOrUndefined(this.calendarElement.querySelectorAll('.e-content tbody')[0])) {
                ej.base.detach(this.calendarElement.querySelectorAll('.e-content tbody')[0]);
            }
        }
        switch (this.start) {
            case 'Year':
                this.renderYears();
                break;
            case 'Decade':
                this.renderDecades();
                break;
            default:
                this.renderMonths();
        }
    };
    CustomCalendarBase.prototype.updateFooter = function () {
        this.todayElement.textContent = this.l10.getConstant('today');
        this.todayElement.setAttribute('aria-label', this.l10.getConstant('today'));
    };
    CustomCalendarBase.prototype.createContentFooter = function () {
        if (this.showTodayButton) {
            var minimum = new Date(+this.min);
            var maximum = new Date(+this.max);
            var l10nLocale = { today: 'Today' };
            this.globalize = new CustomInternationalization(this.locale);
            this.l10 = new ej.base.L10n(this.getModuleName(), l10nLocale, this.locale);
            this.todayElement = this.createElement('button', { attrs: { role: 'button' } });
            ej.base.rippleEffect(this.todayElement);
            this.updateFooter();
            ej.base.addClass([this.todayElement], [BTN, TODAY, FLAT, PRIMARY, CSS]);
            if ((!(+new Date(minimum.setHours(0, 0, 0, 0)) <= +this.todayDate &&
                +this.todayDate <= +new Date(maximum.setHours(0, 0, 0, 0)))) || (this.todayDisabled)) {
                ej.base.addClass([this.todayElement], DISABLED);
            }
            this.footer = this.createElement('div', { className: FOOTER });
            this.footer.appendChild(this.todayElement);
            if (this.getModuleName() === 'calendar') {
                this.element.appendChild(this.footer);
            }
            if (this.getModuleName() === 'datepicker') {
                this.calendarElement.appendChild(this.footer);
            }
            if (this.getModuleName() === 'datetimepicker') {
                this.calendarElement.appendChild(this.footer);
            }
            if (!this.todayElement.classList.contains(DISABLED)) {
                ej.base.EventHandler.add(this.todayElement, 'click', this.todayButtonClick, this);
            }
        }
    };
    CustomCalendarBase.prototype.wireEvents = function (id, ref, keyConfig, moduleName) {
        ej.base.EventHandler.add(this.headerTitleElement, 'click', this.navigateTitle, this);
        this.defaultKeyConfigs = ej.base.extend(this.defaultKeyConfigs, this.keyConfigs);
        if (this.getModuleName() === 'calendar') {
            this.keyboardModule = new ej.base.KeyboardEvents(this.element, {
                eventName: 'keydown',
                keyAction: this.keyActionHandle.bind(this),
                keyConfigs: this.defaultKeyConfigs
            });
        }
        else {
            this.keyboardModule = new ej.base.KeyboardEvents(this.calendarElement, {
                eventName: 'keydown',
                keyAction: this.keyActionHandle.bind(this),
                keyConfigs: this.defaultKeyConfigs
            });
        }
    };
    CustomCalendarBase.prototype.dateWireEvents = function (id, ref, keyConfig, moduleName) {
        this.defaultKeyConfigs = this.getDefaultKeyConfig();
        this.defaultKeyConfigs = ej.base.extend(this.defaultKeyConfigs, keyConfig);
        this.serverModuleName = moduleName;
    };
    CustomCalendarBase.prototype.todayButtonClick = function (e, value, isCustomDate) {
        if (this.showTodayButton) {
            if (this.currentView() === this.depth) {
                this.effect = '';
            }
            else {
                this.effect = 'e-zoomin';
            }
            if (this.getViewNumber(this.start) >= this.getViewNumber(this.depth)) {
                this.navigateTo(this.depth, new Date(this.checkValue(value)), isCustomDate);
            }
            else {
                this.navigateTo('Month', new Date(this.checkValue(value)), isCustomDate);
            }
        }
    };
    CustomCalendarBase.prototype.resetCalendar = function () {
        this.calendarElement && ej.base.detach(this.calendarElement);
        this.tableBodyElement && ej.base.detach(this.tableBodyElement);
        this.table && ej.base.detach(this.table);
        this.tableHeadElement && ej.base.detach(this.tableHeadElement);
        this.nextIcon && ej.base.detach(this.nextIcon);
        this.previousIcon && ej.base.detach(this.previousIcon);
        this.footer && ej.base.detach(this.footer);
        this.todayElement = null;
        this.renderDayCellArgs = null;
        this.calendarElement = this.tableBodyElement = this.footer = this.tableHeadElement =
            this.nextIcon = this.previousIcon = this.table = null;
    };
    CustomCalendarBase.prototype.keyActionHandle = function (e, value, multiSelection) {
        var focusedDate = this.tableBodyElement.querySelector('tr td.e-focused-date');
        var selectedDate;
        if (multiSelection) {
            if (!ej.base.isNullOrUndefined(focusedDate) && +value === parseInt(focusedDate.getAttribute('id').split('_')[0], 10)) {
                selectedDate = focusedDate;
            }
            else {
                selectedDate = this.tableBodyElement.querySelector('tr td.e-selected');
            }
        }
        else {
            selectedDate = this.tableBodyElement.querySelector('tr td.e-selected');
        }
        var view = this.getViewNumber(this.currentView());
        var depthValue = this.getViewNumber(this.depth);
        var levelRestrict = (view === depthValue && this.getViewNumber(this.start) >= depthValue);
        this.effect = '';
        switch (e.action) {
            case 'moveLeft':
                this.keyboardNavigate(-1, view, e, this.max, this.min);
                e.preventDefault();
                break;
            case 'moveRight':
                this.keyboardNavigate(1, view, e, this.max, this.min);
                e.preventDefault();
                break;
            case 'moveUp':
                if (view === 0) {
                    this.keyboardNavigate(-7, view, e, this.max, this.min); // move the current date to the previous seven days.
                }
                else {
                    this.keyboardNavigate(-4, view, e, this.max, this.min); // move the current year to the previous four days.
                }
                e.preventDefault();
                break;
            case 'moveDown':
                if (view === 0) {
                    this.keyboardNavigate(7, view, e, this.max, this.min);
                }
                else {
                    this.keyboardNavigate(4, view, e, this.max, this.min);
                }
                e.preventDefault();
                break;
            case 'select':
                if (e.target === this.todayElement) {
                    this.todayButtonClick(e, value);
                }
                else {
                    var element = !ej.base.isNullOrUndefined(focusedDate) ? focusedDate : selectedDate;
                    if (!ej.base.isNullOrUndefined(element) && !element.classList.contains(DISABLED)) {
                        if (levelRestrict) {
                            // eslint-disable-next-line radix
                            var d = new Date(parseInt('' + (element).id, 0));
                            this.selectDate(e, d, (element));
                        }
                        else {
                            this.contentClick(null, --view, (element), value);
                        }
                    }
                }
                break;
            case 'controlUp':
                this.title();
                e.preventDefault();
                break;
            case 'controlDown':
                if (!ej.base.isNullOrUndefined(focusedDate) && !levelRestrict || !ej.base.isNullOrUndefined(selectedDate) && !levelRestrict) {
                    this.contentClick(null, --view, (focusedDate || selectedDate), value);
                }
                e.preventDefault();
                break;
            case 'home':
                this.currentDate = this.firstDay(this.currentDate);
                ej.base.detach(this.tableBodyElement);
                if (view === 0) {
                    this.renderMonths(e);
                }
                else if (view === 1) {
                    this.renderYears(e);
                }
                else {
                    this.renderDecades(e);
                }
                e.preventDefault();
                break;
            case 'end':
                this.currentDate = this.lastDay(this.currentDate, view);
                ej.base.detach(this.tableBodyElement);
                if (view === 0) {
                    this.renderMonths(e);
                }
                else if (view === 1) {
                    this.renderYears(e);
                }
                else {
                    this.renderDecades(e);
                }
                e.preventDefault();
                break;
            case 'pageUp':
                this.addMonths(this.currentDate, -1);
                this.navigateTo('Month', this.currentDate);
                e.preventDefault();
                break;
            case 'pageDown':
                this.addMonths(this.currentDate, 1);
                this.navigateTo('Month', this.currentDate);
                e.preventDefault();
                break;
            case 'shiftPageUp':
                this.addYears(this.currentDate, -1);
                this.navigateTo('Month', this.currentDate);
                e.preventDefault();
                break;
            case 'shiftPageDown':
                this.addYears(this.currentDate, 1);
                this.navigateTo('Month', this.currentDate);
                e.preventDefault();
                break;
            case 'controlHome':
                this.navigateTo('Month', new Date(this.currentDate.getFullYear(), 0, 1));
                e.preventDefault();
                break;
            case 'controlEnd':
                this.navigateTo('Month', new Date(this.currentDate.getFullYear(), 11, 31));
                e.preventDefault();
                break;
        }
        if (this.getModuleName() === 'calendar') {
            this.table.focus();
        }
    };
    CustomCalendarBase.prototype.keyboardNavigate = function (number, currentView, e, max, min) {
        var date = new Date(this.checkValue(this.currentDate));
        switch (currentView) {
            case 2:
                this.addYears(this.currentDate, number);
                if (this.isMonthYearRange(this.currentDate)) {
                    ej.base.detach(this.tableBodyElement);
                    this.renderDecades(e);
                }
                else {
                    this.currentDate = date;
                }
                break;
            case 1:
                this.addMonths(this.currentDate, number);
                if (this.calendarMode === 'Gregorian') {
                    if (this.isMonthYearRange(this.currentDate)) {
                        ej.base.detach(this.tableBodyElement);
                        this.renderYears(e);
                    }
                    else {
                        this.currentDate = date;
                    }
                }
                else {
                    if (this.isMonthYearRange(this.currentDate)) {
                        ej.base.detach(this.tableBodyElement);
                        this.renderYears(e);
                    }
                    else {
                        this.currentDate = date;
                    }
                }
                break;
            case 0:
                this.addDay(this.currentDate, number, e, max, min);
                if (this.isMinMaxRange(this.currentDate)) {
                    ej.base.detach(this.tableBodyElement);
                    this.renderMonths(e);
                }
                else {
                    this.currentDate = date;
                }
                break;
        }
    };
    /**
     * Initialize the event handler
     *
     * @param {Date} value - Specifies value of date.
     * @returns {void}
     * @private
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    CustomCalendarBase.prototype.preRender = function (value) {
        var _this = this;
        this.navigatePreviousHandler = this.navigatePrevious.bind(this);
        this.navigateNextHandler = this.navigateNext.bind(this);
        this.defaultKeyConfigs = this.getDefaultKeyConfig();
        this.navigateHandler = function (e) {
            _this.triggerNavigate(e);
        };
    };
    CustomCalendarBase.prototype.minMaxDate = function (localDate) {
        var currentDate = new Date(new Date(+localDate).setHours(0, 0, 0, 0));
        var minDate = new Date(new Date(+this.min).setHours(0, 0, 0, 0));
        var maxDate = new Date(new Date(+this.max).setHours(0, 0, 0, 0));
        if (+currentDate === +minDate || +currentDate === +maxDate) {
            if (+localDate < +this.min) {
                localDate = new Date(+this.min);
            }
            if (+localDate > +this.max) {
                localDate = new Date(+this.max);
            }
        }
        return localDate;
    };
    CustomCalendarBase.prototype.renderMonths = function (e, value, isCustomDate) {
        var numCells = this.weekNumber ? 8 : 7;
        var tdEles;
        if (this.calendarMode === 'Gregorian') {
            tdEles = this.renderDays(this.currentDate, value, null, null, isCustomDate, e);
        }
        else {
            tdEles = this.bsModule.bsRenderDays(this.currentDate, value);
        }
        this.createContentHeader();
        if (this.calendarMode === 'Gregorian') {
            this.renderTemplate(tdEles, numCells, MONTH, e, value);
        }
        else {
            this.bsModule.bsRenderTemplate(tdEles, numCells, MONTH, e, value);
        }
    };
    CustomCalendarBase.prototype.renderDays = function (currentDate, value, multiSelection, values, isTodayDate, e) {
        var tdEles = [];
        var cellsCount = 42;
        var todayDate = isTodayDate ? new Date(+currentDate) : this.getDate(new Date(), this.timezone);
        var localDate = new Date(this.checkValue(currentDate));
        var minMaxDate;
        var currentMonth = localDate.getMonth();
        this.titleUpdate(currentDate, 'days');
        var d = localDate;
        localDate = new Date(d.getFullYear(), d.getMonth(), 0, d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds());
        while (localDate.getDay() !== this.firstDayOfWeek) {
            this.setStartDate(localDate, -1 * dayMilliSeconds);
        }
        for (var day = 0; day < cellsCount; ++day) {
            var weekEle = this.createElement('td', { className: CELL });
            var weekAnchor = this.createElement('span');
            if (day % 7 === 0 && this.weekNumber) {
                // 6 days are added to get Last day of the week and 3 days are added to get middle day of the week.
                var numberOfDays = this.weekRule === 'FirstDay' ? 6 : (this.weekRule === 'FirstFourDayWeek' ? 3 : 0);
                var finalDate = new Date(localDate.getFullYear(), localDate.getMonth(), (localDate.getDate() + numberOfDays));
                weekAnchor.textContent = '' + this.getWeek(finalDate);
                weekEle.appendChild(weekAnchor);
                ej.base.addClass([weekEle], '' + WEEKNUMBER);
                tdEles.push(weekEle);
            }
            minMaxDate = new Date(+localDate);
            localDate = this.minMaxDate(localDate);
            var dateFormatOptions = { type: 'dateTime', skeleton: 'full' };
            var date = this.globalize.parseDate(this.globalize.formatDate(localDate, dateFormatOptions), dateFormatOptions);
            var tdEle = this.dayCell(localDate);
            var title = this.globalize.formatDate(localDate, { type: 'date', skeleton: 'full' });
            var dayLink = this.createElement('span');
            dayLink.textContent = this.globalize.formatDate(localDate, { format: 'd', type: 'date', skeleton: 'yMd' });
            var disabled = (this.min > localDate) || (this.max < localDate);
            if (disabled) {
                ej.base.addClass([tdEle], DISABLED);
                ej.base.addClass([tdEle], OVERLAY);
            }
            else {
                dayLink.setAttribute('title', '' + title);
            }
            if (currentMonth !== localDate.getMonth()) {
                ej.base.addClass([tdEle], OTHERMONTH);
            }
            if (localDate.getDay() === 0 || localDate.getDay() === 6) {
                ej.base.addClass([tdEle], WEEKEND);
            }
            tdEle.appendChild(dayLink);
            this.renderDayCellArgs = {
                date: localDate,
                isDisabled: false,
                element: tdEle,
                isOutOfRange: disabled
            };
            var argument = this.renderDayCellArgs;
            this.renderDayCellEvent(argument);
            if (argument.isDisabled) {
                var selectDate = new Date(this.checkValue(value));
                var argsDate = new Date(this.checkValue(argument.date));
                if (multiSelection) {
                    if (!ej.base.isNullOrUndefined(values) && values.length > 0) {
                        for (var index = 0; index < values.length; index++) {
                            var localDateString = +new Date(this.globalize.formatDate(argument.date, { type: 'date', skeleton: 'yMd' }));
                            var tempDateString = +new Date(this.globalize.formatDate(values[index], { type: 'date', skeleton: 'yMd' }));
                            if (localDateString === tempDateString) {
                                values.splice(index, 1);
                                index = -1;
                            }
                        }
                    }
                }
                else if (selectDate && +selectDate === +argsDate) {
                    this.setProperties({ value: null }, true);
                }
            }
            if (this.renderDayCellArgs.isDisabled && !tdEle.classList.contains(SELECTED)) {
                ej.base.addClass([tdEle], DISABLED);
                ej.base.addClass([tdEle], OVERLAY);
                if (+this.renderDayCellArgs.date === +this.todayDate) {
                    this.todayDisabled = true;
                }
            }
            var otherMnthBool = tdEle.classList.contains(OTHERMONTH);
            var disabledCls = tdEle.classList.contains(DISABLED);
            if (!disabledCls) {
                ej.base.EventHandler.add(tdEle, 'click', this.clickHandler, this);
            }
            // to set the value as null while setting the disabled date onProperty change.
            // if (args.isDisabled && +this.value === +args.date) {
            //     this.setProperties({ value: null }, true);
            // }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var currentTarget = void 0;
            if (!ej.base.isNullOrUndefined(e) && e.type === 'click') {
                currentTarget = e.currentTarget;
            }
            if (multiSelection && !ej.base.isNullOrUndefined(values) && !disabledCls) {
                for (var tempValue = 0; tempValue < values.length; tempValue++) {
                    var type = (this.calendarMode === 'Gregorian') ? 'gregorian' : 'bs';
                    var formatOptions = { format: null, type: 'date', skeleton: 'short', calendar: type };
                    var localDateString = this.globalize.formatDate(localDate, formatOptions);
                    var tempDateString = this.globalize.formatDate(values[tempValue], formatOptions);
                    if ((localDateString === tempDateString && this.getDateVal(localDate, values[tempValue]))
                        || (this.getDateVal(localDate, value))) {
                        ej.base.addClass([tdEle], SELECTED);
                    }
                    if (!ej.base.isNullOrUndefined(currentTarget) && currentTarget.innerText === tdEle.innerText &&
                        this.previousDates && tdEle.classList.contains(SELECTED) && currentTarget.classList.contains(SELECTED)) {
                        ej.base.removeClass([tdEle], SELECTED);
                        this.previousDates = false;
                        var copyValues = this.copyValues(values);
                        for (var i = 0; i < copyValues.length; i++) {
                            var type_1 = (this.calendarMode === 'Gregorian') ? 'gregorian' : 'bs';
                            var formatOptions_1 = { format: null, type: 'date', skeleton: 'short', calendar: type_1 };
                            var localDateString_1 = this.globalize.formatDate(date, formatOptions_1);
                            var tempDateString_1 = this.globalize.formatDate(copyValues[i], formatOptions_1);
                            if (localDateString_1 === tempDateString_1) {
                                var index = copyValues.indexOf(copyValues[i]);
                                copyValues.splice(index, 1);
                                values.splice(index, 1);
                            }
                        }
                        this.setProperties({ values: copyValues }, true);
                    }
                    else {
                        this.updateFocus(otherMnthBool, disabledCls, localDate, tdEle, currentDate);
                    }
                }
                if (values.length <= 0) {
                    this.updateFocus(otherMnthBool, disabledCls, localDate, tdEle, currentDate);
                }
            }
            else if (!disabledCls && this.getDateVal(localDate, value)) {
                ej.base.addClass([tdEle], SELECTED);
            }
            this.updateFocus(otherMnthBool, disabledCls, localDate, tdEle, currentDate);
            if (!ej.base.isNullOrUndefined(date) && date.getFullYear() === todayDate.getFullYear() && date.getMonth() === todayDate.getMonth()
                && date.getDate() === todayDate.getDate()) {
                ej.base.addClass([tdEle], TODAY);
            }
            tdEles.push(this.renderDayCellArgs.element);
            localDate = new Date(+minMaxDate);
            this.addDay(localDate, 1, null, this.max, this.min);
        }
        return tdEles;
    };
    CustomCalendarBase.prototype.updateFocus = function (otherMonth, disabled, localDate, tableElement, currentDate) {
        if (currentDate.getDate() === localDate.getDate() && !otherMonth && !disabled) {
            ej.base.addClass([tableElement], FOCUSEDDATE);
        }
        else {
            // eslint-disable-next-line radix
            if (currentDate >= this.max && parseInt(tableElement.id, 0) === +this.max && !otherMonth && !disabled) {
                ej.base.addClass([tableElement], FOCUSEDDATE);
            }
            // eslint-disable-next-line radix
            if (currentDate <= this.min && parseInt(tableElement.id, 0) === +this.min && !otherMonth && !disabled) {
                ej.base.addClass([tableElement], FOCUSEDDATE);
            }
        }
    };
    CustomCalendarBase.prototype.renderYears = function (e, value) {
        this.removeTableHeadElement();
        var numCells = 4;
        var tdEles = [];
        var valueUtil = ej.base.isNullOrUndefined(value);
        var curDate = new Date(this.checkValue(this.currentDate));
        var mon = curDate.getMonth();
        var yr = curDate.getFullYear();
        var localDate = curDate;
        var curYrs = localDate.getFullYear();
        var minYr = new Date(this.checkValue(this.min)).getFullYear();
        var minMonth = new Date(this.checkValue(this.min)).getMonth();
        var maxYr = new Date(this.checkValue(this.max)).getFullYear();
        var maxMonth = new Date(this.checkValue(this.max)).getMonth();
        localDate.setMonth(0);
        this.titleUpdate(this.currentDate, 'months');
        localDate.setDate(1);
        for (var month = 0; month < 12; ++month) {
            var tdEle = this.dayCell(localDate);
            var dayLink = this.createElement('span');
            var localMonth = (value && (value).getMonth() === localDate.getMonth());
            var select$$1 = (value && (value).getFullYear() === yr && localMonth);
            dayLink.textContent = this.toCapitalize(this.globalize.formatDate(localDate, {
                format: null, type: 'dateTime', skeleton: 'MMM'
            }));
            if ((this.min && (curYrs < minYr || (month < minMonth && curYrs === minYr))) || (this.max && (curYrs > maxYr || (month > maxMonth && curYrs >= maxYr)))) {
                ej.base.addClass([tdEle], DISABLED);
            }
            else if (!valueUtil && select$$1) {
                ej.base.addClass([tdEle], SELECTED);
            }
            else {
                if (localDate.getMonth() === mon && this.currentDate.getMonth() === mon) {
                    ej.base.addClass([tdEle], FOCUSEDDATE);
                }
            }
            localDate.setDate(1);
            localDate.setMonth(localDate.getMonth() + 1);
            if (!tdEle.classList.contains(DISABLED)) {
                ej.base.EventHandler.add(tdEle, 'click', this.clickHandler, this);
            }
            tdEle.appendChild(dayLink);
            tdEles.push(tdEle);
        }
        this.renderTemplate(tdEles, numCells, YEAR, e, value);
    };
    CustomCalendarBase.prototype.renderDecades = function (e, value) {
        this.removeTableHeadElement();
        var numCells = 4;
        var yearCell = 12;
        var tdEles = [];
        var localDate = new Date(this.checkValue(this.currentDate));
        localDate.setMonth(0);
        localDate.setDate(1);
        var localYr = localDate.getFullYear();
        var startYr = new Date(localDate.setFullYear((localYr - localYr % 10)));
        var endYr = new Date(localDate.setFullYear((localYr - localYr % 10 + (10 - 1))));
        var startFullYr = startYr.getFullYear();
        var endFullYr = endYr.getFullYear();
        var startHdrYr = this.globalize.formatDate(startYr, {
            format: null, type: 'dateTime', skeleton: 'y'
        });
        var endHdrYr = this.globalize.formatDate(endYr, { format: null, type: 'dateTime', skeleton: 'y' });
        this.headerTitleElement.textContent = startHdrYr + ' - ' + (endHdrYr);
        var start = new Date(localYr - (localYr % 10) - 1, 0, 1);
        var startYear = start.getFullYear();
        for (var rowIterator = 0; rowIterator < yearCell; ++rowIterator) {
            var year = startYear + rowIterator;
            localDate.setFullYear(year);
            var tdEle = this.dayCell(localDate);
            var dayLink = this.createElement('span');
            dayLink.textContent = this.globalize.formatDate(localDate, {
                format: null, type: 'dateTime', skeleton: 'y'
            });
            if ((year < startFullYr) || (year > endFullYr)) {
                ej.base.addClass([tdEle], OTHERDECADE);
                if (!ej.base.isNullOrUndefined(value) && localDate.getFullYear() === (value).getFullYear()) {
                    ej.base.addClass([tdEle], SELECTED);
                }
                if (year < new Date(this.checkValue(this.min)).getFullYear() ||
                    year > new Date(this.checkValue(this.max)).getFullYear()) {
                    ej.base.addClass([tdEle], DISABLED);
                }
            }
            else if (year < new Date(this.checkValue(this.min)).getFullYear() ||
                year > new Date(this.checkValue(this.max)).getFullYear()) {
                ej.base.addClass([tdEle], DISABLED);
            }
            else if (!ej.base.isNullOrUndefined(value) && localDate.getFullYear() === (value).getFullYear()) {
                ej.base.addClass([tdEle], SELECTED);
            }
            else {
                if (localDate.getFullYear() === this.currentDate.getFullYear() && !tdEle.classList.contains(DISABLED)) {
                    ej.base.addClass([tdEle], FOCUSEDDATE);
                }
            }
            if (!tdEle.classList.contains(DISABLED)) {
                ej.base.EventHandler.add(tdEle, 'click', this.clickHandler, this);
            }
            tdEle.appendChild(dayLink);
            tdEles.push(tdEle);
        }
        this.renderTemplate(tdEles, numCells, 'e-decade', e, value);
    };
    CustomCalendarBase.prototype.dayCell = function (localDate) {
        var type = (this.calendarMode === 'Gregorian') ? 'gregorian' : 'bs';
        var dateFormatOptions = { skeleton: 'full', type: 'dateTime', calendar: type };
        var date = this.globalize.parseDate(this.globalize.formatDate(localDate, dateFormatOptions), dateFormatOptions);
        var value;
        if (!ej.base.isNullOrUndefined(date)) {
            value = date.valueOf();
        }
        var attrs = {
            className: CELL, attrs: { 'id': '' + ej.base.getUniqueID('' + value), 'aria-selected': 'false' }
        };
        return this.createElement('td', attrs);
    };
    CustomCalendarBase.prototype.firstDay = function (date) {
        var collection = this.currentView() !== 'Decade' ? this.tableBodyElement.querySelectorAll('td' + ':not(.' + OTHERMONTH + '') :
            this.tableBodyElement.querySelectorAll('td' + ':not(.' + OTHERDECADE + '');
        if (collection.length) {
            for (var i = 0; i < collection.length; i++) {
                if (!collection[i].classList.contains(DISABLED)) {
                    // eslint-disable-next-line radix
                    date = new Date(parseInt(collection[i].id, 0));
                    break;
                }
            }
        }
        return date;
    };
    CustomCalendarBase.prototype.lastDay = function (date, view) {
        var lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        if (view !== 2) {
            var timeOffset = Math.abs(lastDate.getTimezoneOffset() - this.firstDay(date).getTimezoneOffset());
            if (timeOffset) {
                lastDate.setHours(this.firstDay(date).getHours() + (timeOffset / 60));
            }
            return this.findLastDay(lastDate);
        }
        else {
            return this.findLastDay(this.firstDay(lastDate));
        }
    };
    CustomCalendarBase.prototype.checkDateValue = function (value) {
        return (!ej.base.isNullOrUndefined(value) && value instanceof Date && !isNaN(+value)) ? value : null;
    };
    CustomCalendarBase.prototype.findLastDay = function (date) {
        var collection = this.currentView() === 'Decade' ? this.tableBodyElement.querySelectorAll('td' + ':not(.' + OTHERDECADE + '') :
            this.tableBodyElement.querySelectorAll('td' + ':not(.' + OTHERMONTH + '');
        if (collection.length) {
            for (var i = collection.length - 1; i >= 0; i--) {
                if (!collection[i].classList.contains(DISABLED)) {
                    // eslint-disable-next-line radix
                    date = new Date(parseInt(collection[i].id, 0));
                    break;
                }
            }
        }
        return date;
    };
    CustomCalendarBase.prototype.removeTableHeadElement = function () {
        if (this.getModuleName() === 'calendar') {
            if (!ej.base.isNullOrUndefined(this.element.querySelectorAll('.e-content table thead')[0])) {
                ej.base.detach(this.tableHeadElement);
            }
        }
        else {
            if (!ej.base.isNullOrUndefined(this.calendarElement.querySelectorAll('.e-content table thead')[0])) {
                ej.base.detach(this.tableHeadElement);
            }
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    CustomCalendarBase.prototype.renderTemplate = function (elements, count, classNm, e, value) {
        var view = this.getViewNumber(this.currentView());
        var trEle;
        this.tableBodyElement = this.createElement('tbody');
        this.table.appendChild(this.tableBodyElement);
        ej.base.removeClass([this.contentElement, this.headerElement], [MONTH, DECADE, YEAR]);
        ej.base.addClass([this.contentElement, this.headerElement], [classNm]);
        var weekNumCell = 41;
        var numberCell = 35;
        var otherMonthCell = 6;
        var row = count;
        var rowIterator = 0;
        for (var dayCell = 0; dayCell < elements.length / count; ++dayCell) {
            trEle = this.createElement('tr');
            for (rowIterator = 0 + rowIterator; rowIterator < row; rowIterator++) {
                if (!elements[rowIterator].classList.contains('e-week-number') && !ej.base.isNullOrUndefined(elements[rowIterator].children[0])) {
                    ej.base.addClass([elements[rowIterator].children[0]], [LINK]);
                    ej.base.rippleEffect(elements[rowIterator].children[0], {
                        duration: 600,
                        isCenterRipple: true
                    });
                }
                trEle.appendChild(elements[rowIterator]);
                if (this.weekNumber && rowIterator === otherMonthCell + 1 && elements[otherMonthCell + 1].classList.contains(OTHERMONTH)) {
                    ej.base.addClass([trEle], OTHERMONTHROW);
                }
                if (!this.weekNumber && rowIterator === otherMonthCell && elements[otherMonthCell].
                    classList.contains(OTHERMONTH)) {
                    ej.base.addClass([trEle], OTHERMONTHROW);
                }
                if (this.weekNumber) {
                    if (rowIterator === weekNumCell && elements[weekNumCell].classList.contains(OTHERMONTH)) {
                        ej.base.addClass([trEle], OTHERMONTHROW);
                    }
                }
                else {
                    if (rowIterator === numberCell && elements[numberCell].classList.contains(OTHERMONTH)) {
                        ej.base.addClass([trEle], OTHERMONTHROW);
                    }
                }
            }
            row = row + count;
            rowIterator = rowIterator + 0;
            this.tableBodyElement.appendChild(trEle);
        }
        this.table.querySelector('tbody').className = this.effect;
        if (this.calendarMode === 'Gregorian') {
            this.iconHandler();
        }
        else {
            this.bsModule.bsIconHandler();
        }
        if (view !== this.getViewNumber(this.currentView()) || (view === 0 && view !== this.getViewNumber(this.currentView()))) {
            this.navigateHandler(e);
        }
        this.setAriaActiveDescendant();
    };
    CustomCalendarBase.prototype.clickHandler = function (e, value) {
        this.clickEventEmitter(e);
        var eve = e.currentTarget;
        var view = this.getViewNumber(this.currentView());
        if (eve.classList.contains(OTHERMONTH)) {
            this.contentClick(e, 0, null, value);
        }
        else if (view === this.getViewNumber(this.depth) && this.getViewNumber(this.start) >= this.getViewNumber(this.depth)) {
            this.contentClick(e, 1, null, value);
        }
        else if (2 === view) {
            this.contentClick(e, 1, null, value);
        }
        else if (!eve.classList.contains(OTHERMONTH) && view === 0) {
            this.selectDate(e, this.getIdValue(e, null), null);
        }
        else {
            this.contentClick(e, 0, eve, value);
        }
        if (this.getModuleName() === 'calendar') {
            this.table.focus();
        }
    };
    // Content click event handler required for extended components
    CustomCalendarBase.prototype.clickEventEmitter = function (e) {
        e.preventDefault();
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    CustomCalendarBase.prototype.contentClick = function (e, view, element, value) {
        var currentView = this.getViewNumber(this.currentView());
        var d = this.getIdValue(e, element);
        switch (view) {
            case 0:
                if (currentView === this.getViewNumber(this.depth) && this.getViewNumber(this.start) >= this.getViewNumber(this.depth)) {
                    ej.base.detach(this.tableBodyElement);
                    this.currentDate = d;
                    this.effect = ZOOMIN;
                    this.renderMonths(e);
                }
                else {
                    if (this.calendarMode === 'Gregorian') {
                        this.currentDate.setMonth(d.getMonth());
                        if (d.getMonth() > 0 && this.currentDate.getMonth() !== d.getMonth()) {
                            this.currentDate.setDate(0);
                        }
                        this.currentDate.setFullYear(d.getFullYear());
                    }
                    else {
                        this.currentDate = d;
                    }
                    this.effect = ZOOMIN;
                    ej.base.detach(this.tableBodyElement);
                    this.renderMonths(e);
                }
                break;
            case 1:
                if (currentView === this.getViewNumber(this.depth) && this.getViewNumber(this.start) >= this.getViewNumber(this.depth)) {
                    this.selectDate(e, d, null);
                }
                else {
                    if (this.calendarMode === 'Gregorian') {
                        this.currentDate.setFullYear(d.getFullYear());
                    }
                    else {
                        this.bsPreviousHeader = this.headerElement.textContent;
                        var bsDate = this.bsModule.getBSDate(d);
                        this.currentDate = this.bsModule.toGregorian(bsDate.year, bsDate.month, 1);
                    }
                    this.effect = ZOOMIN;
                    ej.base.detach(this.tableBodyElement);
                    this.renderYears(e);
                }
        }
    };
    CustomCalendarBase.prototype.switchView = function (view, e, multiSelection, isCustomDate) {
        switch (view) {
            case 0:
                ej.base.detach(this.tableBodyElement);
                this.renderMonths(e, null, isCustomDate);
                break;
            case 1:
                ej.base.detach(this.tableBodyElement);
                this.renderYears(e);
                break;
            case 2:
                ej.base.detach(this.tableBodyElement);
                this.renderDecades(e);
        }
    };
    /**
     * To get component name
     *
     * @returns {string} Returns the component name.
     * @private
     */
    CustomCalendarBase.prototype.getModuleName = function () {
        return 'calendar';
    };
    /**
     *
     * @returns {void}
     * @deprecated
     */
    CustomCalendarBase.prototype.requiredModules = function () {
        var modules = [];
        if (this) {
            modules.push({ args: [this], member: 'bs' });
        }
        return modules;
    };
    /* eslint-disable valid-jsdoc, jsdoc/require-returns-description */
    /**
     * Gets the properties to be maintained upon browser refresh.
     *
     * @returns {string}
     */
    CustomCalendarBase.prototype.getPersistData = function () {
        var keyEntity = ['value'];
        return this.addOnPersist(keyEntity);
    };
    /* eslint-enable valid-jsdoc, jsdoc/require-returns-description */
    /**
     * Called internally if any of the property value changed.
     *
     * @param {CalendarBaseModel} newProp - Returns the dynamic property value of the component.
     * @param {CalendarBaseModel} oldProp - Returns the previous property value of the component.
     * @param {boolean} multiSelection - - Specifies whether multiple date selection is enabled or not.
     * @param {Date[]} values - Specifies the dates.
     * @returns {void}
     * @private
     */
    CustomCalendarBase.prototype.onPropertyChanged = function (newProp, oldProp, multiSelection, values) {
        this.effect = '';
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'enableRtl':
                    if (newProp.enableRtl) {
                        if (this.getModuleName() === 'calendar') {
                            this.element.classList.add('e-rtl');
                        }
                        else {
                            this.calendarElement.classList.add('e-rtl');
                        }
                    }
                    else {
                        if (this.getModuleName() === 'calendar') {
                            this.element.classList.remove('e-rtl');
                        }
                        else {
                            this.calendarElement.classList.remove('e-rtl');
                        }
                    }
                    break;
                case 'dayHeaderFormat':
                    this.getCultureValues();
                    if (this.getModuleName() !== 'datepicker') {
                        this.createContentHeader();
                    }
                    else if (this.calendarElement) {
                        this.createContentHeader();
                    }
                    this.adjustLongHeaderSize();
                    break;
                case 'min':
                case 'max':
                    this.rangeValidation(this.min, this.max);
                    if (prop === 'min') {
                        this.setProperties({ min: this.checkDateValue(new Date(this.checkValue(newProp.min))) }, true);
                    }
                    else {
                        this.setProperties({ max: this.checkDateValue(new Date(this.checkValue(newProp.max))) }, true);
                    }
                    this.setProperties({ start: this.currentView() }, true);
                    if (this.tableBodyElement) {
                        ej.base.detach(this.tableBodyElement);
                    }
                    this.minMaxUpdate();
                    if (multiSelection) {
                        this.validateValues(multiSelection, values);
                    }
                    if (this.getModuleName() !== 'datepicker') {
                        this.createContentBody();
                    }
                    else if (this.calendarElement) {
                        this.createContentBody();
                    }
                    if ((this.todayDate < this.min || this.max < this.todayDate) && (this.footer) && (this.todayElement)) {
                        ej.base.detach(this.todayElement);
                        ej.base.detach(this.footer);
                        this.todayElement = this.footer = null;
                        this.createContentFooter();
                    }
                    else {
                        if ((this.footer) && (this.todayElement) && this.todayElement.classList.contains('e-disabled')) {
                            ej.base.removeClass([this.todayElement], DISABLED);
                            ej.base.detach(this.todayElement);
                            ej.base.detach(this.footer);
                            this.todayElement = this.footer = null;
                            this.createContentFooter();
                        }
                    }
                    break;
                case 'start':
                case 'depth':
                case 'weekNumber':
                case 'firstDayOfWeek':
                case 'weekRule':
                    this.checkView();
                    if (this.getModuleName() !== 'datepicker') {
                        this.createContentHeader();
                        this.createContentBody();
                    }
                    else if (this.calendarElement) {
                        this.createContentHeader();
                        this.createContentBody();
                    }
                    break;
                case 'locale':
                    this.globalize = new CustomInternationalization(this.locale);
                    if (this.getModuleName() !== 'datepicker') {
                        this.createContentHeader();
                        this.createContentBody();
                    }
                    else if (this.calendarElement) {
                        this.createContentHeader();
                        this.createContentBody();
                    }
                    this.l10.setLocale(this.locale);
                    this.updateFooter();
                    break;
                case 'showTodayButton':
                    if (newProp.showTodayButton) {
                        this.createContentFooter();
                    }
                    else {
                        if (!ej.base.isNullOrUndefined(this.todayElement) && !ej.base.isNullOrUndefined(this.footer)) {
                            ej.base.detach(this.todayElement);
                            ej.base.detach(this.footer);
                            this.todayElement = this.footer = undefined;
                        }
                    }
                    this.setProperties({ showTodayButton: newProp.showTodayButton }, true);
                    break;
            }
        }
    };
    /**
     * values property updated with considered disabled dates of the calendar.
     *
     * @param {boolean} multiSelection - Specifies whether multiple date selection is enabled.
     * @param {Date[]} values - Specifies the dates to validate.
     * @returns {void}
     */
    CustomCalendarBase.prototype.validateValues = function (multiSelection, values) {
        if (multiSelection && !ej.base.isNullOrUndefined(values) && values.length > 0) {
            var copyValues = this.copyValues(values);
            for (var skipIndex = 0; skipIndex < copyValues.length; skipIndex++) {
                var tempValue = copyValues[skipIndex];
                var type = (this.calendarMode === 'Gregorian') ? 'gregorian' : 'bs';
                var tempValueString = void 0;
                if (this.calendarMode === 'Gregorian') {
                    tempValueString = this.globalize.formatDate(tempValue, { type: 'date', skeleton: 'yMd' });
                }
                else {
                    tempValueString = this.globalize.formatDate(tempValue, { type: 'dateTime', skeleton: 'full', calendar: 'bs' });
                }
                var minFormatOption = { type: 'date', skeleton: 'yMd', calendar: type };
                var minStringValue = this.globalize.formatDate(this.min, minFormatOption);
                var minString = minStringValue;
                var maxFormatOption = { type: 'date', skeleton: 'yMd', calendar: type };
                var maxStringValue = this.globalize.formatDate(this.max, maxFormatOption);
                var maxString = maxStringValue;
                if (+new Date(tempValueString) < +new Date(minString) ||
                    +new Date(tempValueString) > +new Date(maxString)) {
                    copyValues.splice(skipIndex, 1);
                    skipIndex = -1;
                }
            }
            this.setProperties({ values: copyValues }, true);
        }
    };
    CustomCalendarBase.prototype.setValueUpdate = function () {
        if (!ej.base.isNullOrUndefined(this.tableBodyElement)) {
            ej.base.detach(this.tableBodyElement);
            this.setProperties({ start: this.currentView() }, true);
            this.createContentBody();
        }
    };
    CustomCalendarBase.prototype.copyValues = function (values) {
        var copyValues = [];
        if (!ej.base.isNullOrUndefined(values) && values.length > 0) {
            for (var index = 0; index < values.length; index++) {
                copyValues.push(new Date(+values[index]));
            }
        }
        return copyValues;
    };
    CustomCalendarBase.prototype.titleUpdate = function (date, view) {
        var globalize = new CustomInternationalization(this.locale);
        var dayFormatOptions;
        var monthFormatOptions;
        var type = (this.calendarMode === 'Gregorian') ? 'gregorian' : 'bs';
        if (this.calendarMode === 'Gregorian') {
            dayFormatOptions = globalize.formatDate(date, { type: 'dateTime', skeleton: 'yMMMM', calendar: type });
            monthFormatOptions = globalize.formatDate(date, {
                format: null, type: 'dateTime', skeleton: 'y', calendar: type
            });
        }
        else {
            dayFormatOptions = globalize.formatDate(date, { type: 'dateTime', format: 'MMMM y', calendar: type });
            monthFormatOptions = globalize.formatDate(date, { type: 'dateTime', format: 'y', calendar: type });
        }
        switch (view) {
            case 'days':
                this.headerTitleElement.textContent = this.toCapitalize(dayFormatOptions);
                break;
            case 'months':
                this.headerTitleElement.textContent = monthFormatOptions;
        }
    };
    CustomCalendarBase.prototype.setActiveDescendant = function () {
        var id;
        var focusedEle = this.tableBodyElement.querySelector('tr td.e-focused-date');
        var selectedEle = this.tableBodyElement.querySelector('tr td.e-selected');
        var type = (this.calendarMode === 'Gregorian') ? 'gregorian' : 'bs';
        var title;
        var view = this.currentView();
        if (view === 'Month') {
            title = this.globalize.formatDate(this.currentDate, { type: 'date', skeleton: 'full', calendar: type });
        }
        else if (view === 'Year') {
            if (type !== 'bs') {
                title = this.globalize.formatDate(this.currentDate, { type: 'date', skeleton: 'yMMMM', calendar: type });
            }
            else {
                title = this.globalize.formatDate(this.currentDate, { type: 'date', skeleton: 'GyMMM', calendar: type });
            }
        }
        else {
            title = this.globalize.formatDate(this.currentDate, {
                format: null, type: 'date', skeleton: 'y', calendar: type
            });
        }
        if (selectedEle || focusedEle) {
            if (!ej.base.isNullOrUndefined(selectedEle)) {
                selectedEle.setAttribute('aria-selected', 'true');
            }
            (focusedEle || selectedEle).setAttribute('aria-label', title);
            id = (focusedEle || selectedEle).getAttribute('id');
        }
        return id;
    };
    CustomCalendarBase.prototype.iconHandler = function () {
        new Date(this.checkValue(this.currentDate)).setDate(1);
        switch (this.currentView()) {
            case 'Month':
                this.previousIconHandler(this.compareMonth(new Date(this.checkValue(this.currentDate)), this.min) < 1);
                this.nextIconHandler(this.compareMonth(new Date(this.checkValue(this.currentDate)), this.max) > -1);
                break;
            case 'Year':
                this.previousIconHandler(this.compareYear(new Date(this.checkValue(this.currentDate)), this.min) < 1);
                this.nextIconHandler(this.compareYear(new Date(this.checkValue(this.currentDate)), this.max) > -1);
                break;
            case 'Decade':
                this.previousIconHandler(this.compareDecade(new Date(this.checkValue(this.currentDate)), this.min) < 1);
                this.nextIconHandler(this.compareDecade(new Date(this.checkValue(this.currentDate)), this.max) > -1);
        }
    };
    /**
     * Destroys the widget.
     *
     * @returns {void}
     */
    CustomCalendarBase.prototype.destroy = function () {
        if (this.getModuleName() === 'calendar' && this.element) {
            ej.base.removeClass([this.element], [ROOT]);
        }
        else {
            if (this.calendarElement && this.element) {
                ej.base.removeClass([this.element], [ROOT]);
            }
        }
        if (this.getModuleName() === 'calendar' && this.element) {
            if (!ej.base.isNullOrUndefined(this.headerTitleElement)) {
                ej.base.EventHandler.remove(this.headerTitleElement, 'click', this.navigateTitle);
            }
            if (this.todayElement) {
                ej.base.EventHandler.remove(this.todayElement, 'click', this.todayButtonClick);
            }
            this.previousIconHandler(true);
            this.nextIconHandler(true);
            this.keyboardModule.destroy();
            this.element.removeAttribute('data-role');
            if (!ej.base.isNullOrUndefined(this.calendarEleCopy.getAttribute('tabindex'))) {
                this.element.setAttribute('tabindex', this.tabIndex);
            }
            else {
                this.element.removeAttribute('tabindex');
            }
        }
        if (this.element) {
            this.element.innerHTML = '';
        }
        this.todayElement = null;
        this.tableBodyElement = null;
        this.renderDayCellArgs = null;
        this.headerElement = null;
        this.nextIcon = null;
        this.table = null;
        this.tableHeadElement = null;
        this.previousIcon = null;
        this.headerTitleElement = null;
        this.footer = null;
        this.contentElement = null;
        _super.prototype.destroy.call(this);
    };
    CustomCalendarBase.prototype.title = function (e) {
        var currentView = this.getViewNumber(this.currentView());
        this.effect = ZOOMIN;
        this.switchView(++currentView, e);
    };
    CustomCalendarBase.prototype.getViewNumber = function (stringVal) {
        if (stringVal === 'Month') {
            return 0;
        }
        else if (stringVal === 'Year') {
            return 1;
        }
        else {
            return 2;
        }
    };
    CustomCalendarBase.prototype.navigateTitle = function (e) {
        e.preventDefault();
        this.title(e);
        if (this.getModuleName() === 'calendar') {
            this.table.focus();
        }
    };
    CustomCalendarBase.prototype.previous = function () {
        this.effect = '';
        var currentView = this.getViewNumber(this.currentView());
        switch (this.currentView()) {
            case 'Month':
                this.addMonths(this.currentDate, -1);
                this.switchView(currentView);
                break;
            case 'Year':
                this.addYears(this.currentDate, -1);
                this.switchView(currentView);
                break;
            case 'Decade':
                this.addYears(this.currentDate, -10);
                this.switchView(currentView);
                break;
        }
    };
    CustomCalendarBase.prototype.navigatePrevious = function (e) {
        e.preventDefault();
        if (this.calendarMode === 'Gregorian') {
            this.previous();
        }
        else {
            this.bsModule.bsPrevious();
        }
        this.triggerNavigate(e);
        if (this.getModuleName() === 'calendar') {
            this.table.focus();
        }
    };
    CustomCalendarBase.prototype.next = function () {
        this.effect = '';
        var currentView = this.getViewNumber(this.currentView());
        switch (this.currentView()) {
            case 'Month':
                this.addMonths(this.currentDate, 1);
                this.switchView(currentView);
                break;
            case 'Year':
                this.addYears(this.currentDate, 1);
                this.switchView(currentView);
                break;
            case 'Decade':
                this.addYears(this.currentDate, 10);
                this.switchView(currentView);
                break;
        }
    };
    CustomCalendarBase.prototype.navigateNext = function (eve) {
        eve.preventDefault();
        if (this.calendarMode === 'Gregorian') {
            this.next();
        }
        else {
            this.bsModule.bsNext();
        }
        this.triggerNavigate(eve);
        if (this.getModuleName() === 'calendar') {
            this.table.focus();
        }
    };
    /**
     * This method is used to navigate to the month/year/decade view of the Calendar.
     *
     * @param {string} view - Specifies the view of the Calendar.
     * @param {Date} date - Specifies the focused date in a view.
     * @param {boolean} isCustomDate - Specifies whether the calendar is rendered with custom today date or not.
     * @returns {void}
     */
    CustomCalendarBase.prototype.navigateTo = function (view, date, isCustomDate) {
        if (+date >= +this.min && +date <= +this.max) {
            this.currentDate = date;
        }
        if (+date <= +this.min) {
            this.currentDate = new Date(this.checkValue(this.min));
        }
        if (+date >= +this.max) {
            this.currentDate = new Date(this.checkValue(this.max));
        }
        if ((this.getViewNumber(this.depth) >= this.getViewNumber(view))) {
            if ((this.getViewNumber(this.depth) <= this.getViewNumber(this.start))
                || this.getViewNumber(this.depth) === this.getViewNumber(view)) {
                view = this.depth;
            }
        }
        this.switchView(this.getViewNumber(view), null, null, isCustomDate);
    };
    /* eslint-disable valid-jsdoc, jsdoc/require-returns-description */
    /**
     * Gets the current view of the Calendar.
     *
     * @returns {string}
     */
    CustomCalendarBase.prototype.currentView = function () {
        if (this.contentElement.classList.contains(YEAR)) {
            return 'Year';
        }
        else if (this.contentElement.classList.contains(DECADE)) {
            return 'Decade';
        }
        else {
            return 'Month';
        }
    };
    /* eslint-enable valid-jsdoc, jsdoc/require-returns-description */
    CustomCalendarBase.prototype.getDateVal = function (date, value) {
        return (!ej.base.isNullOrUndefined(value) && date.getDate() === (value).getDate()
            && date.getMonth() === (value).getMonth() && date.getFullYear() === (value).getFullYear());
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    CustomCalendarBase.prototype.getCultureObjects = function (ld, c) {
        var gregorianFormat = '.dates.calendars.gregorian.days.format.' + this.dayHeaderFormat.toLowerCase();
        var bsFormat = '.dates.calendars.bs.days.format.' + this.dayHeaderFormat.toLowerCase();
        var mainVal = 'main.';
        if (this.calendarMode === 'Gregorian') {
            return ej.base.getValue(mainVal + '' + this.locale + gregorianFormat, ld);
        }
        else {
            return ej.base.getValue('main.' + '' + this.locale + bsFormat, ld);
        }
    };
    CustomCalendarBase.prototype.getWeek = function (d) {
        var currentDate = new Date(this.checkValue(d)).valueOf();
        var date = new Date(d.getFullYear(), 0, 1).valueOf();
        return Math.ceil((((currentDate - date) + dayMilliSeconds) / dayMilliSeconds) / 7);
    };
    CustomCalendarBase.prototype.setStartDate = function (date, time) {
        var tzOffset = date.getTimezoneOffset();
        var d = new Date(date.getTime() + time);
        var tzOffsetDiff = d.getTimezoneOffset() - tzOffset;
        date.setTime(d.getTime() + tzOffsetDiff * minutesMilliSeconds);
    };
    CustomCalendarBase.prototype.addMonths = function (date, i) {
        if (this.calendarMode === 'Gregorian') {
            var day = date.getDate();
            date.setDate(1);
            date.setMonth(date.getMonth() + i);
            date.setDate(Math.min(day, this.getMaxDays(date)));
        }
        else {
            var bsDate = this.bsModule.getBSDate(date);
            this.currentDate = this.bsModule.toGregorian(bsDate.year, (bsDate.month) + i, 1);
        }
    };
    CustomCalendarBase.prototype.addYears = function (date, i) {
        if (this.calendarMode === 'Gregorian') {
            var day = date.getDate();
            date.setDate(1);
            date.setFullYear(date.getFullYear() + i);
            date.setDate(Math.min(day, this.getMaxDays(date)));
        }
        else {
            var bsDate = this.bsModule.getBSDate(date);
            this.currentDate = this.bsModule.toGregorian(bsDate.year + i, (bsDate.month), 1);
        }
    };
    CustomCalendarBase.prototype.getIdValue = function (e, element) {
        var eve;
        if (e) {
            eve = e.currentTarget;
        }
        else {
            eve = element;
        }
        var type = (this.calendarMode === 'Gregorian') ? 'gregorian' : 'bs';
        var dateFormatOptions = { type: 'dateTime', skeleton: 'full', calendar: type };
        // eslint-disable-next-line radix
        var dateString = this.globalize.formatDate(new Date(parseInt('' + eve.getAttribute('id'), 0)), dateFormatOptions);
        var date = this.globalize.parseDate(dateString, dateFormatOptions);
        var value = date.valueOf() - date.valueOf() % 1000;
        return new Date(value);
        //return this.globalize.parseDate(dateString, dateFormatOptions);
    };
    CustomCalendarBase.prototype.adjustLongHeaderSize = function () {
        ej.base.removeClass([this.element], DAYHEADERLONG);
        if (this.dayHeaderFormat === 'Wide') {
            ej.base.addClass([this.getModuleName() === 'calendar' ? this.element : this.calendarElement], DAYHEADERLONG);
        }
    };
    CustomCalendarBase.prototype.selectDate = function (e, date, node, multiSelection, values) {
        var element = node || e.currentTarget;
        this.isDateSelected = false;
        if (this.currentView() === 'Decade') {
            this.setDateDecade(this.currentDate, date.getFullYear());
        }
        else if (this.currentView() === 'Year') {
            this.setDateYear(this.currentDate, date);
        }
        else {
            if (multiSelection && !this.checkPresentDate(date, values)) {
                var copyValues = this.copyValues(values);
                if (!ej.base.isNullOrUndefined(values) && copyValues.length > 0) {
                    copyValues.push(new Date(this.checkValue(date)));
                    this.setProperties({ values: copyValues }, true);
                    this.setProperties({ value: values[values.length - 1] }, true);
                }
                else {
                    this.setProperties({ values: [new Date(this.checkValue(date))] }, true);
                }
            }
            else {
                this.setProperties({ value: new Date(this.checkValue(date)) }, true);
            }
            this.currentDate = new Date(this.checkValue(date));
        }
        var tableBodyElement = ej.base.closest(element, '.' + ROOT);
        if (ej.base.isNullOrUndefined(tableBodyElement)) {
            tableBodyElement = this.tableBodyElement;
        }
        if (!multiSelection && !ej.base.isNullOrUndefined(tableBodyElement.querySelector('.' + SELECTED))) {
            ej.base.removeClass([tableBodyElement.querySelector('.' + SELECTED)], SELECTED);
        }
        if (!multiSelection && !ej.base.isNullOrUndefined(tableBodyElement.querySelector('.' + FOCUSEDDATE))) {
            ej.base.removeClass([tableBodyElement.querySelector('.' + FOCUSEDDATE)], FOCUSEDDATE);
        }
        if (multiSelection) {
            var copyValues = this.copyValues(values);
            var collection = Array.prototype.slice.call(this.tableBodyElement.querySelectorAll('td'));
            for (var index = 0; index < collection.length; index++) {
                var tempElement = tableBodyElement.querySelectorAll('td' + '.' + FOCUSEDDATE)[0];
                var selectedElement = tableBodyElement.querySelectorAll('td' + '.' + SELECTED)[0];
                if (collection[index] === tempElement) {
                    ej.base.removeClass([collection[index]], FOCUSEDDATE);
                }
                if (collection[index] === selectedElement &&
                    !this.checkPresentDate(new Date(parseInt(selectedElement.getAttribute('id').split('_')[0], 10)), values)) {
                    ej.base.removeClass([collection[index]], SELECTED);
                }
            }
            if (element.classList.contains(SELECTED)) {
                ej.base.removeClass([element], SELECTED);
                for (var i = 0; i < copyValues.length; i++) {
                    var type = (this.calendarMode === 'Gregorian') ? 'gregorian' : 'bs';
                    var formatOptions = { format: null, type: 'date', skeleton: 'short', calendar: type };
                    var localDateString = this.globalize.formatDate(date, formatOptions);
                    var tempDateString = this.globalize.formatDate(copyValues[i], formatOptions);
                    if (localDateString === tempDateString) {
                        var index = copyValues.indexOf(copyValues[i]);
                        copyValues.splice(index, 1);
                        ej.base.addClass([element], FOCUSEDDATE);
                    }
                }
                this.setProperties({ values: copyValues }, true);
            }
            else {
                ej.base.addClass([element], SELECTED);
            }
        }
        else {
            ej.base.addClass([element], SELECTED);
        }
        this.isDateSelected = true;
    };
    CustomCalendarBase.prototype.checkPresentDate = function (dates, values) {
        var previousValue = false;
        if (!ej.base.isNullOrUndefined(values)) {
            for (var checkPrevious = 0; checkPrevious < values.length; checkPrevious++) {
                var type = (this.calendarMode === 'Gregorian') ? 'gregorian' : 'bs';
                var localDateString = this.globalize.formatDate(dates, {
                    format: null, type: 'date', skeleton: 'short', calendar: type
                });
                var tempDateString = this.globalize.formatDate(values[checkPrevious], {
                    format: null, type: 'date', skeleton: 'short', calendar: type
                });
                if (localDateString === tempDateString) {
                    previousValue = true;
                }
            }
        }
        return previousValue;
    };
    CustomCalendarBase.prototype.setAriaActiveDescendant = function () {
        ej.base.attributes(this.table, {
            'aria-activedescendant': '' + this.setActiveDescendant()
        });
    };
    CustomCalendarBase.prototype.previousIconHandler = function (disabled) {
        if (disabled) {
            if (!ej.base.isNullOrUndefined(this.previousIcon)) {
                ej.base.EventHandler.remove(this.previousIcon, 'click', this.navigatePreviousHandler);
                ej.base.addClass([this.previousIcon], '' + DISABLED);
                ej.base.addClass([this.previousIcon], '' + OVERLAY);
                this.previousIcon.setAttribute('aria-disabled', 'true');
            }
        }
        else {
            ej.base.EventHandler.add(this.previousIcon, 'click', this.navigatePreviousHandler);
            ej.base.removeClass([this.previousIcon], '' + DISABLED);
            ej.base.removeClass([this.previousIcon], '' + OVERLAY);
            this.previousIcon.setAttribute('aria-disabled', 'false');
        }
    };
    CustomCalendarBase.prototype.renderDayCellEvent = function (args) {
        ej.base.extend(this.renderDayCellArgs, { name: 'renderDayCell' });
        this.trigger('renderDayCell', args);
    };
    CustomCalendarBase.prototype.navigatedEvent = function (eve) {
        ej.base.extend(this.navigatedArgs, { name: 'navigated', event: eve });
        this.trigger('navigated', this.navigatedArgs);
    };
    CustomCalendarBase.prototype.triggerNavigate = function (event) {
        this.navigatedArgs = { view: this.currentView(), date: this.currentDate };
        this.navigatedEvent(event);
    };
    CustomCalendarBase.prototype.nextIconHandler = function (disabled) {
        if (disabled) {
            if (!ej.base.isNullOrUndefined(this.previousIcon)) {
                ej.base.EventHandler.remove(this.nextIcon, 'click', this.navigateNextHandler);
                ej.base.addClass([this.nextIcon], DISABLED);
                ej.base.addClass([this.nextIcon], OVERLAY);
                this.nextIcon.setAttribute('aria-disabled', 'true');
            }
        }
        else {
            ej.base.EventHandler.add(this.nextIcon, 'click', this.navigateNextHandler);
            ej.base.removeClass([this.nextIcon], DISABLED);
            ej.base.removeClass([this.nextIcon], OVERLAY);
            this.nextIcon.setAttribute('aria-disabled', 'false');
        }
    };
    CustomCalendarBase.prototype.compare = function (startDate, endDate, modifier) {
        var start = endDate.getFullYear();
        var end;
        var result;
        end = start;
        result = 0;
        if (modifier) {
            start = start - start % modifier;
            end = start - start % modifier + modifier - 1;
        }
        if (startDate.getFullYear() > end) {
            result = 1;
        }
        else if (startDate.getFullYear() < start) {
            result = -1;
        }
        return result;
    };
    CustomCalendarBase.prototype.isMinMaxRange = function (date) {
        return +date >= +this.min && +date <= +this.max;
    };
    CustomCalendarBase.prototype.isMonthYearRange = function (date) {
        if (this.calendarMode === 'Gregorian') {
            return date.getMonth() >= this.min.getMonth()
                && date.getFullYear() >= this.min.getFullYear()
                && date.getMonth() <= this.max.getMonth()
                && date.getFullYear() <= this.max.getFullYear();
        }
        else {
            var bsDate = this.bsModule.getBSDate(date);
            return bsDate.month >= (this.bsModule.getBSDate(new Date(1944, 1, 18))).month
                && bsDate.year >= (this.bsModule.getBSDate(new Date(1944, 1, 18))).year
                && bsDate.month <= (this.bsModule.getBSDate(new Date(2069, 1, 16))).month
                && bsDate.year <= (this.bsModule.getBSDate(new Date(2069, 1, 16))).year;
        }
    };
    CustomCalendarBase.prototype.compareYear = function (start, end) {
        return this.compare(start, end, 0);
    };
    CustomCalendarBase.prototype.compareDecade = function (start, end) {
        return this.compare(start, end, 10);
    };
    CustomCalendarBase.prototype.shiftArray = function (array, i) {
        return array.slice(i).concat(array.slice(0, i));
    };
    CustomCalendarBase.prototype.addDay = function (date, i, e, max, min) {
        var column = i;
        var value = new Date(+date);
        if (!ej.base.isNullOrUndefined(this.tableBodyElement) && !ej.base.isNullOrUndefined(e)) {
            while (this.findNextTD(new Date(+date), column, max, min)) {
                column += i;
            }
            var rangeValue = new Date(value.setDate(value.getDate() + column));
            column = (+rangeValue > +max || +rangeValue < +min) ? column === i ? i - i : i : column;
        }
        date.setDate(date.getDate() + column);
    };
    CustomCalendarBase.prototype.findNextTD = function (date, column, max, min) {
        var value = new Date(date.setDate(date.getDate() + column));
        var collection = [];
        var isDisabled = false;
        if ((!ej.base.isNullOrUndefined(value) && value.getMonth()) === (!ej.base.isNullOrUndefined(this.currentDate) && this.currentDate.getMonth())) {
            var tdEles = void 0;
            if (this.calendarMode === 'Gregorian') {
                tdEles = this.renderDays(value);
            }
            else {
                tdEles = this.bsModule.bsRenderDays(this.currentDate, value);
            }
            collection = tdEles.filter(function (element) {
                return element.classList.contains(DISABLED);
            });
        }
        else {
            collection = this.tableBodyElement.querySelectorAll('td.' + DISABLED);
        }
        if (+value <= (+(max)) && +value >= (+(min))) {
            if (collection.length) {
                for (var i = 0; i < collection.length; i++) {
                    // eslint-disable-next-line radix
                    isDisabled = (+value === +new Date(parseInt(collection[i].id, 0))) ? true : false;
                    if (isDisabled) {
                        break;
                    }
                }
            }
        }
        return isDisabled;
    };
    CustomCalendarBase.prototype.getMaxDays = function (d) {
        var date;
        var tmpDate = new Date(this.checkValue(d));
        date = 28;
        var month = tmpDate.getMonth();
        while (tmpDate.getMonth() === month) {
            ++date;
            tmpDate.setDate(date);
        }
        return date - 1;
    };
    CustomCalendarBase.prototype.setDateDecade = function (date, year) {
        date.setFullYear(year);
        this.setProperties({ value: new Date(this.checkValue(date)) }, true);
    };
    CustomCalendarBase.prototype.setDateYear = function (date, value) {
        date.setFullYear(value.getFullYear(), value.getMonth(), value.getDate());
        if (value.getMonth() !== date.getMonth()) {
            date.setDate(0);
            this.currentDate = new Date(this.checkValue(value));
        }
        this.setProperties({ value: new Date(this.checkValue(date)) }, true);
    };
    CustomCalendarBase.prototype.compareMonth = function (start, end) {
        var result;
        if (start.getFullYear() > end.getFullYear()) {
            result = 1;
        }
        else if (start.getFullYear() < end.getFullYear()) {
            result = -1;
        }
        else {
            result = start.getMonth() === end.getMonth() ? 0 : start.getMonth() > end.getMonth() ? 1 : -1;
        }
        return result;
    };
    CustomCalendarBase.prototype.checkValue = function (inValue) {
        if (inValue instanceof Date) {
            return (inValue.toUTCString());
        }
        else {
            return ('' + inValue);
        }
    };
    CustomCalendarBase.prototype.checkView = function () {
        if (this.start !== 'Decade' && this.start !== 'Year') {
            this.setProperties({ start: 'Month' }, true);
        }
        if (this.depth !== 'Decade' && this.depth !== 'Year') {
            this.setProperties({ depth: 'Month' }, true);
        }
        if (this.getViewNumber(this.depth) > this.getViewNumber(this.start)) {
            this.setProperties({ depth: 'Month' }, true);
        }
    };
    CustomCalendarBase.prototype.getDate = function (date, timezone) {
        if (timezone) {
            date = new Date(date.toLocaleString('en-US', { timeZone: timezone }));
        }
        return date;
    };
    __decorate([
        Property(new Date(1900, 0, 1))
    ], CustomCalendarBase.prototype, "min", void 0);
    __decorate([
        Property(true)
    ], CustomCalendarBase.prototype, "enabled", void 0);
    __decorate([
        Property(null)
    ], CustomCalendarBase.prototype, "cssClass", void 0);
    __decorate([
        Property(new Date(2099, 11, 31))
    ], CustomCalendarBase.prototype, "max", void 0);
    __decorate([
        Property(null)
    ], CustomCalendarBase.prototype, "firstDayOfWeek", void 0);
    __decorate([
        Property('Gregorian')
    ], CustomCalendarBase.prototype, "calendarMode", void 0);
    __decorate([
        Property('Month')
    ], CustomCalendarBase.prototype, "start", void 0);
    __decorate([
        Property('Month')
    ], CustomCalendarBase.prototype, "depth", void 0);
    __decorate([
        Property(false)
    ], CustomCalendarBase.prototype, "weekNumber", void 0);
    __decorate([
        Property('FirstDay')
    ], CustomCalendarBase.prototype, "weekRule", void 0);
    __decorate([
        Property(true)
    ], CustomCalendarBase.prototype, "showTodayButton", void 0);
    __decorate([
        Property('Short')
    ], CustomCalendarBase.prototype, "dayHeaderFormat", void 0);
    __decorate([
        Property(false)
    ], CustomCalendarBase.prototype, "enablePersistence", void 0);
    __decorate([
        Property(null)
    ], CustomCalendarBase.prototype, "keyConfigs", void 0);
    __decorate([
        Property(null)
    ], CustomCalendarBase.prototype, "serverTimezoneOffset", void 0);
    __decorate([
        Event()
    ], CustomCalendarBase.prototype, "created", void 0);
    __decorate([
        Event()
    ], CustomCalendarBase.prototype, "destroyed", void 0);
    __decorate([
        Event()
    ], CustomCalendarBase.prototype, "navigated", void 0);
    __decorate([
        Event()
    ], CustomCalendarBase.prototype, "renderDayCell", void 0);
    CustomCalendarBase = __decorate([
        NotifyPropertyChanges
    ], CustomCalendarBase);
    return CustomCalendarBase;
}(ej.base.Component));

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
        _this = _super.call(this, options, element) || this;
        return _this;
    }
    /**
     * To Initialize the control rendering.
     *
     * @returns {void}
     * @private
     */
    CustomCalendar.prototype.render = function () {
        if (this.calendarMode === 'bs' && this.bsModule === undefined) {
            throwError('Requires the injectable BS modules to render Calendar in BS mode');
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
            var form = ej.base.closest(this.element, 'form');
            if (form) {
                ej.base.EventHandler.add(form, 'reset', this.formResetHandler.bind(this));
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
            this.bsModule.bsRenderYears(e, this.value);
        }
    };
    CustomCalendar.prototype.renderDecades = function (e) {
        if (this.calendarMode === 'Gregorian') {
            _super.prototype.renderDecades.call(this, e, this.value);
        }
        else {
            this.bsModule.bsRenderDecade(e, this.value);
        }
    };
    CustomCalendar.prototype.renderTemplate = function (elements, count, classNm, e) {
        if (this.calendarMode === 'Gregorian') {
            _super.prototype.renderTemplate.call(this, elements, count, classNm, e, this.value);
        }
        else {
            this.bsModule.bsRenderTemplate(elements, count, classNm, e, this.value);
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
            var form = ej.base.closest(this.element, 'form');
            if (form) {
                ej.base.EventHandler.remove(form, 'reset', this.formResetHandler.bind(this));
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
}(CustomCalendarBase));

/**
 *
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
//class constant defination.
let OTHERMONTH$1 = 'e-other-month';
let YEAR$1 = 'e-year';
let MONTH$1 = 'e-month';
let DECADE$1 = 'e-decade';
let DISABLED$1 = 'e-disabled';
let OVERLAY$1 = 'e-overlay';
let WEEKEND$1 = 'e-weekend';
let WEEKNUMBER$1 = 'e-week-number';
let SELECTED$1 = 'e-selected';
let FOCUSEDDATE$1 = 'e-focused-date';
let OTHERMONTHROW$1 = 'e-month-hide';
let TODAY$1 = 'e-today';
let LINK$1 = 'e-day';
let CELL$1 = 'e-cell';
let dayMilliSeconds$1 = 86400000;
let minDecade = 2060;
let maxDecade = 2069;
var BikramSambat = /** @__PURE__ @class */ (function () {
    function BikramSambat(instance) {
        this.calendarInstance = instance;
    }
    BikramSambat.prototype.getModuleName = function () {
        return 'bs';
    };
    BikramSambat.prototype.bsTitleUpdate = function (date, view) {
        var globalize = new CustomInternationalization(this.calendarInstance.locale);
        switch (view) {
            case 'days':
                this.calendarInstance.headerTitleElement.textContent = globalize.formatDate(date, { type: 'dateTime', format: 'MMMM yyyy', calendar: 'bs' });
                break;
            case 'months':
                this.calendarInstance.headerTitleElement.textContent = globalize.formatDate(date, { type: 'dateTime', format: 'yyyy', calendar: 'bs' });
        }
    };
    BikramSambat.prototype.bsRenderDays = function (currentDate, value, multiSelection, values) {
        var tdEles = [];
        var cellsCount = 42;
        var localDate = new Date(this.bsInValue(currentDate));
        var minMaxDate;
        this.bsTitleUpdate(currentDate, 'days');
        var bsDate = this.getBSDate(localDate);
        var gregorianObject = this.toGregorian(bsDate.year, bsDate.month, 1);
        var currentMonth = bsDate.month;
        localDate = gregorianObject;
        while (localDate.getDay() !== this.calendarInstance.firstDayOfWeek) {
            this.calendarInstance.setStartDate(localDate, -1 * dayMilliSeconds$1);
        }
        for (var day = 0; day < cellsCount; ++day) {
            var weekEle = this.calendarInstance.createElement('td', { className: CELL$1 });
            var weekAnchor = this.calendarInstance.createElement('span');
            if (day % 7 === 0 && this.calendarInstance.weekNumber) {
                weekAnchor.textContent = '' + this.calendarInstance.getWeek(localDate);
                weekEle.appendChild(weekAnchor);
                ej.base.addClass([weekEle], '' + WEEKNUMBER$1);
                tdEles.push(weekEle);
            }
            minMaxDate = new Date(+localDate);
            localDate = this.calendarInstance.minMaxDate(localDate);
            var dateFormatOptions = { type: 'dateTime', skeleton: 'full', calendar: 'bs' };
            var date = this.calendarInstance.globalize.parseDate(this.calendarInstance.globalize.formatDate(localDate, dateFormatOptions), dateFormatOptions);
            var tdEle = this.bsDayCell(localDate);
            var title = this.calendarInstance.globalize.formatDate(localDate, { type: 'date', skeleton: 'full', calendar: 'bs' });
            var dayLink = this.calendarInstance.createElement('span');
            dayLink.textContent = this.calendarInstance.globalize.formatDate(localDate, { type: 'date', skeleton: 'd', calendar: 'bs' });
            var disabled = (this.calendarInstance.min > localDate) || (this.calendarInstance.max < localDate);
            if (disabled) {
                ej.base.addClass([tdEle], DISABLED$1);
                ej.base.addClass([tdEle], OVERLAY$1);
            }
            else {
                dayLink.setAttribute('title', '' + title);
            }
            var bsMonthObject = this.getBSDate(localDate);
            if (currentMonth !== bsMonthObject.month) {
                ej.base.addClass([tdEle], OTHERMONTH$1);
            }
            if (localDate.getDay() === 0 || localDate.getDay() === 6) {
                ej.base.addClass([tdEle], WEEKEND$1);
            }
            tdEle.appendChild(dayLink);
            this.calendarInstance.renderDayCellArgs = {
                date: localDate,
                isDisabled: false,
                element: tdEle,
                isOutOfRange: disabled
            };
            var argument = this.calendarInstance.renderDayCellArgs;
            this.calendarInstance.renderDayCellEvent(argument);
            if (argument.isDisabled) {
                if (this.calendarInstance.isMultiSelection) {
                    if (!ej.base.isNullOrUndefined(this.calendarInstance.values) && this.calendarInstance.values.length > 0) {
                        for (var index = 0; index < values.length; index++) {
                            var localDateString = +new Date(this.calendarInstance.globalize.formatDate(argument.date, { type: 'date', skeleton: 'yMd', calendar: 'bs' }));
                            var tempDateString = +new Date(this.calendarInstance.globalize.formatDate(this.calendarInstance.values[index], { type: 'date', skeleton: 'yMd', calendar: 'bs' }));
                            if (localDateString === tempDateString) {
                                this.calendarInstance.values.splice(index, 1);
                                index = -1;
                            }
                        }
                    }
                }
                else if (value && +value === +argument.date) {
                    this.calendarInstance.setProperties({ value: null }, true);
                }
            }
            if (this.calendarInstance.renderDayCellArgs.isDisabled && !tdEle.classList.contains(SELECTED$1)) {
                ej.base.addClass([tdEle], DISABLED$1);
                ej.base.addClass([tdEle], OVERLAY$1);
                if (+this.calendarInstance.renderDayCellArgs.date === +this.calendarInstance.todayDate) {
                    this.calendarInstance.todayDisabled = true;
                }
            }
            var otherMnthBool = tdEle.classList.contains(OTHERMONTH$1);
            var disabledCls = tdEle.classList.contains(DISABLED$1);
            if (!disabledCls) {
                ej.base.EventHandler.add(tdEle, 'click', this.calendarInstance.clickHandler, this.calendarInstance);
            }
            if (this.calendarInstance.isMultiSelection && !ej.base.isNullOrUndefined(this.calendarInstance.values) &&
                !otherMnthBool && !disabledCls) {
                for (var tempValue = 0; tempValue < this.calendarInstance.values.length; tempValue++) {
                    var localDateString = this.calendarInstance.globalize.formatDate(localDate, { type: 'date', skeleton: 'short', calendar: 'bs' });
                    var tempDateString = this.calendarInstance.globalize.formatDate(this.calendarInstance.values[tempValue], { type: 'date', skeleton: 'short', calendar: 'bs' });
                    if (localDateString === tempDateString &&
                        this.calendarInstance.getDateVal(localDate, this.calendarInstance.values[tempValue])) {
                        ej.base.addClass([tdEle], SELECTED$1);
                    }
                    else {
                        this.calendarInstance.updateFocus(otherMnthBool, disabledCls, localDate, tdEle, currentDate);
                    }
                }
                if (this.calendarInstance.values.length <= 0) {
                    this.calendarInstance.updateFocus(otherMnthBool, disabledCls, localDate, tdEle, currentDate);
                }
            }
            else if (!otherMnthBool && !disabledCls && this.calendarInstance.getDateVal(localDate, value)) {
                ej.base.addClass([tdEle], SELECTED$1);
            }
            else {
                this.calendarInstance.updateFocus(otherMnthBool, disabledCls, localDate, tdEle, currentDate);
            }
            if (date.getDate() === new Date().getDate() && date.getMonth() === new Date().getMonth()) {
                if (date.getFullYear() === new Date().getFullYear()) {
                    ej.base.addClass([tdEle], TODAY$1);
                }
            }
            localDate = new Date(+minMaxDate);
            tdEles.push(this.calendarInstance.renderDayCellArgs.element);
            this.calendarInstance.addDay(localDate, 1, null, this.calendarInstance.max, this.calendarInstance.min);
        }
        return tdEles;
    };
    BikramSambat.prototype.bsIconHandler = function () {
        new Date(this.bsInValue(this.calendarInstance.currentDate)).setDate(1);
        var date = new Date(this.bsInValue(this.calendarInstance.currentDate));
        switch (this.calendarInstance.currentView()) {
            case 'Month':
                {
                    var prevMonthCompare = this.bsCompareMonth(date, this.calendarInstance.min) < 1;
                    var nextMonthCompare = this.bsCompareMonth(date, this.calendarInstance.max) > -1;
                    this.calendarInstance.previousIconHandler(prevMonthCompare);
                    this.calendarInstance.nextIconHandler(nextMonthCompare);
                }
                break;
            case 'Year':
                {
                    var prevYearCompare = this.bsCompareYear(date, this.calendarInstance.min) < 1;
                    var nextYearCompare = this.bsCompareYear(date, this.calendarInstance.max) > -1;
                    this.calendarInstance.previousIconHandler(prevYearCompare);
                    this.calendarInstance.nextIconHandler(nextYearCompare);
                }
                break;
            case 'Decade': {
                var startBSYear = 2006;
                var gregorianValue = BSParser.toGregorian(startBSYear, 1, 1);
                var prevDecadeCompare = this.bsCompareDecade(date, this.calendarInstance.min) < 1;
                var nextDecadeCompare = this.bsCompareDecade(date, this.calendarInstance.max) > -1;
                prevDecadeCompare = BSParser.toGregorian(this.calendarInstance.headerTitleElement.textContent.split('-')[0].trim(), 1, 1).getFullYear() === gregorianValue.getFullYear() ? true : prevDecadeCompare;
                this.calendarInstance.previousIconHandler(prevDecadeCompare);
                this.calendarInstance.nextIconHandler(nextDecadeCompare);
            }
        }
    };
    BikramSambat.prototype.bsNext = function () {
        this.calendarInstance.effect = '';
        var view = this.calendarInstance.getViewNumber(this.calendarInstance.currentView());
        var bsDate = this.getBSDate(this.calendarInstance.currentDate);
        switch (this.calendarInstance.currentView()) {
            case 'Year':
                this.calendarInstance.currentDate = this.toGregorian(bsDate.year + 1, bsDate.month, 1);
                this.calendarInstance.switchView(view);
                break;
            case 'Month':
                this.calendarInstance.currentDate = bsDate.month == 12 ? this.toGregorian(bsDate.year+1, 1, 1): this.toGregorian(bsDate.year, bsDate.month + 1, 1);
                this.calendarInstance.switchView(view);
                break;
            case 'Decade':
                this.calendarInstance.nextIconClicked = true;
                if (bsDate.year - this.calendarInstance.headerElement.textContent.split('-')[0].trim() === 1) {
                    bsDate.year = bsDate.year - this.calendarInstance.headerElement.textContent.split('-')[0].trim() === 1 ? bsDate.year + 1 : bsDate.year;
                }
                this.calendarInstance.currentDate = this.toGregorian(bsDate.year + 10, bsDate.month, 1);
                this.calendarInstance.switchView(view);
                break;
        }
    };
    BikramSambat.prototype.bsPrevious = function () {
        var currentView = this.calendarInstance.getViewNumber(this.calendarInstance.currentView());
        this.calendarInstance.effect = '';
        var bsDate = this.getBSDate(this.calendarInstance.currentDate);
        switch (this.calendarInstance.currentView()) {
            case 'Month':
                this.calendarInstance.currentDate = bsDate.month == 1 ? this.toGregorian(bsDate.year-1, 12, 1) : this.toGregorian(bsDate.year, bsDate.month - 1, 1);
                this.calendarInstance.switchView(currentView);
                break;
            case 'Year':
                this.calendarInstance.currentDate = this.toGregorian(bsDate.year - 1, bsDate.month, 1);
                this.calendarInstance.switchView(currentView);
                break;
            case 'Decade':
                this.calendarInstance.previousIconClicked = true;
                this.calendarInstance.currentDate = this.toGregorian(bsDate.year - 10, bsDate.month - 1, 1);
                this.calendarInstance.switchView(currentView);
                break;
        }
    };
    BikramSambat.prototype.bsRenderYears = function (e, value) {
        this.calendarInstance.removeTableHeadElement();
        var numCells = 4;
        var tdEles = [];
        var valueUtil = ej.base.isNullOrUndefined(value);
        var curDate = new Date(this.bsInValue(this.calendarInstance.currentDate));
        var localDate = curDate;
        var bsDate = this.getBSDate(localDate);
        var gregorianObject = BSParser.toGregorian(bsDate.year, 1, 1);
        localDate = gregorianObject;
        var mon = bsDate.month;
        var yr = bsDate.year;
        var curYrs = bsDate.year;
        var minYr = (this.getBSDate(this.calendarInstance.min)).year;
        var minMonth = (this.getBSDate(this.calendarInstance.min)).month;
        var maxYr = (this.getBSDate(this.calendarInstance.max)).year;
        var maxMonth = (this.getBSDate(this.calendarInstance.max)).month;
        this.bsTitleUpdate(this.calendarInstance.currentDate, 'months');
        for (var month = 1; month <= 12; ++month) {
            var bsDate_1 = this.getBSDate(localDate);
            var gregorianObject_1 = BSParser.toGregorian(bsDate_1.year, month, 1);
            localDate = gregorianObject_1;
            var tdEle = this.bsDayCell(localDate);
            var dayLink = this.calendarInstance.createElement('span');
            var localMonth = (value &&
                (this.getBSDate(value)).month === (this.getBSDate(localDate)).month);
            var select$$1 = (value && (this.getBSDate(value)).year === yr && localMonth);
            dayLink.textContent = this.calendarInstance.globalize.formatDate(localDate, { type: 'dateTime', format: 'MMM', calendar: 'bs' });
            if ((this.calendarInstance.min && (curYrs < minYr || (month < minMonth && curYrs === minYr))) || (this.calendarInstance.max && (curYrs > maxYr || (month > maxMonth && curYrs >= maxYr)))) {
                ej.base.addClass([tdEle], DISABLED$1);
            }
            else if (!valueUtil && select$$1) {
                ej.base.addClass([tdEle], SELECTED$1);
            }
            else {
                if ((this.getBSDate(localDate)).month === mon &&
                    (this.getBSDate(this.calendarInstance.currentDate)).month === mon) {
                    ej.base.addClass([tdEle], FOCUSEDDATE$1);
                }
            }
            if (!tdEle.classList.contains(DISABLED$1)) {
                ej.base.EventHandler.add(tdEle, 'click', this.calendarInstance.clickHandler, this.calendarInstance);
            }
            tdEle.appendChild(dayLink);
            tdEles.push(tdEle);
        }
        this.bsRenderTemplate(tdEles, numCells, YEAR$1, e, value);
    };
    BikramSambat.prototype.bsRenderDecade = function (e, value) {
        this.calendarInstance.removeTableHeadElement();
        var numCells = 4;
        var yearCell = 12;
        var tdEles = [];
        var localDate = new Date(this.bsInValue(this.calendarInstance.currentDate));
        var bsDate = this.getBSDate(localDate);
        var gregorianObject = BSParser.toGregorian(bsDate.year, 1, 1);
        localDate = gregorianObject;
        var localYr = localDate.getFullYear();
        var startYr = new Date(this.bsInValue((localYr - localYr % 10)));
        var endYr = new Date(this.bsInValue((localYr - localYr % 10 + (10 - 1))));
        var startFullYr = startYr.getFullYear();
        var endFullYr = endYr.getFullYear();
        var startHdrYr = this.calendarInstance.globalize.formatDate(startYr, { type: 'dateTime', format: 'y', calendar: 'bs' });
        var endHdrYr = this.calendarInstance.globalize.formatDate(endYr, { type: 'dateTime', format: 'y', calendar: 'bs' });
        if (this.calendarInstance.locale === 'ar') {
            startHdrYr = Number(startHdrYr.replace(/[٠١٢٣٤٥٦٧٨٩]/g, function (d) { return String.fromCharCode(d.charCodeAt(0) - 1632 + 48); }));
            endHdrYr = Number(endHdrYr.replace(/[٠١٢٣٤٥٦٧٨٩]/g, function (d) { return String.fromCharCode(d.charCodeAt(0) - 1632 + 48); }));
        }
        var splityear = this.calendarInstance.headerElement.textContent.split('-');
        if ((!ej.base.isNullOrUndefined(e) && (splityear[0] !== startHdrYr) && e.action === 'home') || (!ej.base.isNullOrUndefined(e) && e.type === 'keydown' && e.action === 'end')) {
            startHdrYr = this.calendarInstance.headerElement.textContent.split('-')[0].trim();
            endHdrYr = this.calendarInstance.headerElement.textContent.split('-')[1].trim();
        }
        if (this.calendarInstance.bsPreviousHeader) {
            startHdrYr = this.calendarInstance.bsPreviousHeader.split('-')[0].trim();
            endHdrYr = this.calendarInstance.bsPreviousHeader.split('-')[1].trim();
            this.calendarInstance.bsPreviousHeader = null;
        }
        if (this.calendarInstance.previousIconClicked) {
            // eslint-disable-next-line no-var
            for (var i = 0; i <= splityear.length; i++) {
                endHdrYr = endHdrYr - splityear[i] === 2 || splityear[i]
                    - endHdrYr === 2 ? (parseInt(endHdrYr, 10) + 1).toString() :
                    endHdrYr - splityear[i] === 3 || splityear[i] - endHdrYr === 3 ?
                        (parseInt(endHdrYr, 10) + 2).toString() : endHdrYr - splityear[i] === 4 ||
                            splityear[i] - endHdrYr === 4 ? (parseInt(endHdrYr, 10) + 3).toString() :
                            endHdrYr - splityear[i] === 5 || splityear[i] - endHdrYr === 5 ?
                                (parseInt(endHdrYr, 10) + 4).toString() : endHdrYr;
                if (endHdrYr - splityear[i] === 0 || splityear[i] - endHdrYr === 0) {
                    endHdrYr = (parseInt(endHdrYr, 10) - 1).toString();
                }
            }
            if (endHdrYr - splityear[i] === 8 || splityear[i] - endHdrYr === 8) {
                endHdrYr = (parseInt(endHdrYr, 10) - 9).toString();
                startHdrYr = (parseInt(endHdrYr, 10) - 9).toString();
            }
            if (endHdrYr - splityear[i] === 7 || splityear[i] - endHdrYr === 7) {
                endHdrYr = (parseInt(endHdrYr, 10) - 8).toString();
                startHdrYr = (parseInt(endHdrYr, 10) - 9).toString();
            }
            startHdrYr = endHdrYr - startHdrYr === 10
                ? (parseInt(startHdrYr, 10) + 1).toString() : endHdrYr - startHdrYr === 11
                    ? (parseInt(startHdrYr, 10) + 2).toString() : endHdrYr - startHdrYr === 12
                        ? (parseInt(startHdrYr, 10) + 3).toString() : startHdrYr;
            if (endHdrYr - startHdrYr === 8) {
                startHdrYr = (parseInt(startHdrYr, 10) - 1).toString();
            }
        }
        if (this.calendarInstance.nextIconClicked) {
            for (var i_1 = 0; i_1 <= splityear.length; i_1++) {
                if (startHdrYr - splityear[i_1] === 0 || splityear[i_1] - startHdrYr === 0) {
                    startHdrYr = (parseInt(startHdrYr, 10) + 1).toString();
                }
                if (startHdrYr - splityear[i_1] === 2 && startHdrYr > splityear[i_1].trim()) {
                    startHdrYr = (parseInt(startHdrYr, 10) - 1).toString();
                }
                if (splityear[i_1] - startHdrYr === 1 && startHdrYr < splityear[i_1].trim()) {
                    startHdrYr = (parseInt(startHdrYr, 10) + 2).toString();
                }
            }
            if (startHdrYr - this.calendarInstance.headerTitleElement.textContent.split('-')[1].trim() > 1) {
                startHdrYr = (parseInt(this.calendarInstance.headerTitleElement.textContent.split('-')[1].trim(), 10) + 1).toString();
                endHdrYr = (parseInt(startHdrYr, 10) + 9).toString();
            }
            endHdrYr = endHdrYr - startHdrYr === 10 ? (parseInt(endHdrYr, 10) - 1).toString() : endHdrYr;
            endHdrYr = endHdrYr - startHdrYr === 7
                ? (parseInt(endHdrYr, 10) + 2).toString() : endHdrYr - startHdrYr === 8
                    ? (parseInt(endHdrYr, 10) + 1).toString() : endHdrYr;
        }
        if (this.calendarInstance.locale === 'ar') {
            var startHeaderYear = this.calendarInstance.globalize.formatDate(startYr, { type: 'dateTime', format: 'y', calendar: 'bs' });
            var endHeaderYear = this.calendarInstance.globalize.formatDate(endYr, { type: 'dateTime', format: 'y', calendar: 'bs' });
            this.calendarInstance.headerTitleElement.textContent = startHeaderYear + ' - ' + (endHeaderYear);
        }
        else {
            this.calendarInstance.headerTitleElement.textContent = startHdrYr + ' - ' + (endHdrYr);
        }
        this.calendarInstance.nextIconClicked = this.calendarInstance.previousIconClicked = false;
        var year = (parseInt(startHdrYr, 10) -2).toString();
        startFullYr = startHdrYr - 56;// Math.round(parseInt(startHdrYr, 10) * 0.97 + 622);
        endFullYr = endHdrYr - 56;// Math.round(parseInt(endHdrYr, 10) * 0.97 + 622);
        var startYear = parseInt(year, 10) - 56;// Math.round(parseInt(year, 10) * 0.97 + 622);
        for (var rowCount = 1; rowCount <= yearCell; ++rowCount) {
            var year_1 = startYear + rowCount;
            localDate.setFullYear(year_1);
            localDate.setDate(1);
            localDate.setMonth(0);
            if ((this.getBSDate(localDate).year - bsDate.year) > 1) {
                localDate.setMonth(1);
                rowCount = rowCount - 1;
                localDate.setFullYear(localDate.getFullYear() - 1);
            }
            bsDate = this.getBSDate(localDate);
            var gregorianObject_2 = BSParser.toGregorian(bsDate.year, 1, 1);
            localDate = gregorianObject_2;
            if (bsDate.year === parseInt(startHdrYr, 10) - 1 || bsDate.year >= startHdrYr &&
                bsDate.year <= endHdrYr || bsDate.year === parseInt(endHdrYr, 10) + 1) {
                var tdEle = this.bsDayCell(localDate);
                ej.base.attributes(tdEle, { 'role': 'gridcell' });
                var dayLink = this.calendarInstance.createElement('span');
                dayLink.textContent = this.calendarInstance.globalize.formatDate(localDate, { type: 'dateTime', format: 'y', calendar: 'bs' });
                if (bsDate.year === parseInt(startHdrYr, 10) - 1 || (year_1 < startFullYr) ||
                    (year_1 > endFullYr) && bsDate.year !== parseInt(endHdrYr, 10)) {
                    ej.base.addClass([tdEle], OTHERMONTH$1);
                }
                else if (year_1 < new Date(this.bsInValue(this.calendarInstance.min)).getFullYear()
                    || year_1 > new Date(this.bsInValue(this.calendarInstance.max)).getFullYear()) {
                    ej.base.addClass([tdEle], DISABLED$1);
                }
                else if (!ej.base.isNullOrUndefined(value) &&
                    (this.getBSDate(localDate)).year ===
                    (this.getBSDate(value)).year) {
                    ej.base.addClass([tdEle], SELECTED$1);
                }
                else {
                    if (localDate.getFullYear() === this.calendarInstance.currentDate.getFullYear() &&
                        !tdEle.classList.contains(DISABLED$1)) {
                        ej.base.addClass([tdEle], FOCUSEDDATE$1);
                    }
                }
                if (!tdEle.classList.contains(DISABLED$1)) {
                    ej.base.EventHandler.add(tdEle, 'click', this.calendarInstance.clickHandler, this.calendarInstance);
                }
                tdEle.appendChild(dayLink);
                if ((!ej.base.isNullOrUndefined(e) && e.action === 'home' && bsDate.year.toString() === startHdrYr) || (!ej.base.isNullOrUndefined(e) && e.action === 'end' && bsDate.year.toString() === endHdrYr)) {
                    ej.base.addClass([tdEle], FOCUSEDDATE$1);
                }
                tdEles.push(tdEle);
            }
        }
        this.bsRenderTemplate(tdEles, numCells, 'e-decade', e, value);
    };
    BikramSambat.prototype.bsDayCell = function (localDate) {
        var dateFormatOptions = { skeleton: 'full', type: 'dateTime', calendar: 'bs' };
        var formatDate = this.calendarInstance.globalize.formatDate(localDate, dateFormatOptions);
        var date = this.calendarInstance.globalize.parseDate(formatDate, dateFormatOptions);
        var value = date.valueOf();
        var attrs = {
            className: CELL$1, attrs: { 'id': '' + ej.base.getUniqueID('' + value), 'aria-selected': 'false', 'role': 'gridcell' }
        };
        return this.calendarInstance.createElement('td', attrs);
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    BikramSambat.prototype.bsRenderTemplate = function (elements, count, classNm, e, value) {
        var view = this.calendarInstance.getViewNumber(this.calendarInstance.currentView());
        var trEle;
        this.calendarInstance.tableBodyElement = this.calendarInstance.createElement('tbody');
        this.calendarInstance.table.appendChild(this.calendarInstance.tableBodyElement);
        ej.base.removeClass([this.calendarInstance.contentElement, this.calendarInstance.headerElement], [MONTH$1, DECADE$1, YEAR$1]);
        ej.base.addClass([this.calendarInstance.contentElement, this.calendarInstance.headerElement], [classNm]);
        var weekNumCell = 41;
        var numberCell = 35;
        var otherMonthCell = 6;
        var row = count;
        var rowCount = 0;
        for (var dayCell = 0; dayCell < Math.round(elements.length / count); ++dayCell) {
            trEle = this.calendarInstance.createElement('tr', { attrs: { 'role': 'row' } });
            for (rowCount = 0 + rowCount; rowCount < row; rowCount++) {
                if (!elements[rowCount].classList.contains('e-week-number') && !ej.base.isNullOrUndefined(elements[rowCount].children[0])) {
                    ej.base.addClass([elements[rowCount].children[0]], [LINK$1]);
                    ej.base.rippleEffect(elements[rowCount].children[0], {
                        duration: 600,
                        isCenterRipple: true
                    });
                }
                trEle.appendChild(elements[rowCount]);
                if (this.calendarInstance.weekNumber &&
                    rowCount === otherMonthCell + 1 && elements[otherMonthCell + 1].classList.contains(OTHERMONTH$1)) {
                    ej.base.addClass([trEle], OTHERMONTHROW$1);
                }
                if (!this.calendarInstance.weekNumber
                    && rowCount === otherMonthCell && elements[otherMonthCell].classList.contains(OTHERMONTH$1)) {
                    ej.base.addClass([trEle], OTHERMONTHROW$1);
                }
                if (this.calendarInstance.weekNumber) {
                    if (rowCount === weekNumCell && elements[weekNumCell].classList.contains(OTHERMONTH$1)) {
                        ej.base.addClass([trEle], OTHERMONTHROW$1);
                    }
                }
                else {
                    if (rowCount === numberCell && elements[numberCell].classList.contains(OTHERMONTH$1)) {
                        ej.base.addClass([trEle], OTHERMONTHROW$1);
                    }
                }
            }
            row = row + count;
            rowCount = rowCount + 0;
            this.calendarInstance.tableBodyElement.appendChild(trEle);
        }
        this.calendarInstance.table.querySelector('tbody').className = this.calendarInstance.effect;
        this.bsIconHandler();
        if (view !== this.calendarInstance.getViewNumber(this.calendarInstance.currentView())
            || (view === 0 && view !== this.calendarInstance.getViewNumber(this.calendarInstance.currentView()))) {
            this.calendarInstance.navigateHandler(e);
        }
        this.calendarInstance.setAriaActiveDescendant();
        this.calendarInstance.changedArgs = { value: this.calendarInstance.value, values: this.calendarInstance.values };
        this.calendarInstance.changeHandler();
    };
    BikramSambat.prototype.bsCompareMonth = function (start, end) {
        var bsStart = (this.getBSDate(start));
        var bsEnd = (this.getBSDate(end));
        var result;
        if (bsStart.year > bsEnd.year) {
            result = 1;
        }
        else if (bsStart.year < bsEnd.year) {
            result = -1;
        }
        else {
            result = bsStart.month === bsEnd.month ? 0 : bsStart.month > bsEnd.month ? 1 : -1;
        }
        return result;
    };
    BikramSambat.prototype.bsCompare = function (startDate, endDate, modifier) {
        var bsStart = this.getBSDate(startDate);
        var bsEnd = this.getBSDate(endDate);
        var start = bsEnd.year;
        var end;
        var result;
        end = start;
        result = 0;
        if (modifier) {
            start = start - start % modifier;
            end = start - start % modifier + modifier - 1;
        }
        if (bsStart.year > end) {
            result = 1;
        }
        else if ((this.calendarInstance.currentView() === 'Decade') && bsStart.year < start &&
            !((startDate.getFullYear() >= minDecade && startDate.getFullYear() <= maxDecade))) {
            result = -1;
        }
        else if (bsStart.year < start && (this.calendarInstance.currentView() === 'Year')) {
            result = -1;
        }
        return result;
    };
    BikramSambat.prototype.getBSDate = function (date) {
        return (BSParser.getBSDate(date));
    };
    BikramSambat.prototype.toGregorian = function (year, month, date) {
        return BSParser.toGregorian(year, month, date);
    };
    BikramSambat.prototype.bsCompareYear = function (start, end) {
        return this.bsCompare(start, end, 0);
    };
    BikramSambat.prototype.bsCompareDecade = function (start, end) {
        return this.bsCompare(start, end, 10);
    };
    BikramSambat.prototype.destroy = function () {
        this.calendarInstance = null;
    };
    BikramSambat.prototype.bsInValue = function (inValue) {
        if (inValue instanceof Date) {
            return (inValue.toUTCString());
        }
        else {
            return ('' + inValue);
        }
    };
    return BikramSambat;
}());

var __extends$1 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) {
                for (var p in b)
                    if (b.hasOwnProperty(p)) d[p] = b[p];
            };
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
let DATEWRAPPER = 'e-date-wrapper';
let ROOT$1 = 'e-datepicker';
let LIBRARY = 'e-lib';
let CONTROL = 'e-control';
let POPUPWRAPPER = 'e-popup-wrapper';
let INPUTWRAPPER = 'e-input-group-icon';
let POPUP = 'e-popup';
let INPUTCONTAINER = 'e-input-group';
let INPUTFOCUS = 'e-input-focus';
let INPUTROOT = 'e-input';
let ERROR = 'e-error';
let ACTIVE = 'e-active';
let OVERFLOW = 'e-date-overflow';
let DATEICON = 'e-date-icon';
let ICONS = 'e-icons';
let OPENDURATION = 300;
let OFFSETVALUE = 4;
let SELECTED$2 = 'e-selected';
let FOCUSEDDATE$2 = 'e-focused-date';
let NONEDIT = 'e-non-edit';
let containerAttr = ['title', 'class', 'style'];
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
var CustomDatePicker = /** @__PURE__ @class */ (function (_super) {
    _super.Inject(BikramSambat);
    _super.Inject(ej.calendars.MaskedDateTime);
    __extends$1(CustomDatePicker, _super);
    /**
     * Constructor for creating the widget.
     *
     * @param {DatePickerModel} options - Specifies the DatePicker model.
     * @param {string | HTMLInputElement} element - Specifies the element to render as component.
     * @private
     */
    function CustomDatePicker(options, element) {
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
    CustomDatePicker.prototype.render = function () {
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
    CustomDatePicker.prototype.setTimeZone = function (offsetValue) {
        if (!ej.base.isNullOrUndefined(this.serverTimezoneOffset) && this.value) {
            var clientTimeZoneDiff = new Date().getTimezoneOffset() / 60;
            var serverTimezoneDiff = offsetValue;
            var timeZoneDiff = serverTimezoneDiff + clientTimeZoneDiff;
            timeZoneDiff = this.isDayLightSaving() ? timeZoneDiff-- : timeZoneDiff;
            this.value = new Date((this.value).getTime() + (timeZoneDiff * 60 * 60 * 1000));
            this.updateInput();
        }
    };
    CustomDatePicker.prototype.isDayLightSaving = function () {
        var firstOffset = new Date(this.value.getFullYear(), 0, 1).getTimezoneOffset();
        var secondOffset = new Date(this.value.getFullYear(), 6, 1).getTimezoneOffset();
        return (this.value.getTimezoneOffset() < Math.max(firstOffset, secondOffset));
    };
    CustomDatePicker.prototype.setAllowEdit = function () {
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
    CustomDatePicker.prototype.updateIconState = function () {
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
    CustomDatePicker.prototype.initialize = function () {
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
    CustomDatePicker.prototype.createInput = function () {
        var ariaAttrs = {
            'aria-atomic': 'true', 'aria-expanded': 'false',
            'role': 'combobox', 'autocomplete': 'off', 'autocorrect': 'off',
            'autocapitalize': 'off', 'spellcheck': 'false', 'aria-invalid': 'false'
        };
        if (this.getModuleName() === 'datepicker') {
            var l10nLocale = { placeholder: this.placeholder };
            this.globalize = new CustomInternationalization(this.locale);
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
    CustomDatePicker.prototype.updateInput = function (isDynamic) {
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
                        format: tempFormat, type: 'dateTime', skeleton: 'yMd', calendar: 'bs'
                    });
                }
            }
            else {
                if (this.calendarMode === 'Gregorian') {
                    formatOptions = { format: this.formatString, type: 'dateTime', skeleton: 'yMd' };
                }
                else {
                    formatOptions = { format: this.formatString, type: 'dateTime', skeleton: 'yMd', calendar: 'bs' };
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
    CustomDatePicker.prototype.minMaxUpdates = function () {
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
    CustomDatePicker.prototype.checkStringValue = function (val) {
        var returnDate = null;
        var formatOptions = null;
        var formatDateTime = null;
        if (this.getModuleName() === 'datetimepicker') {
            var culture = new CustomInternationalization(this.locale);
            if (this.calendarMode === 'Gregorian') {
                formatOptions = { format: this.dateTimeFormat, type: 'dateTime', skeleton: 'yMd' };
                formatDateTime = { format: culture.getDatePattern({ skeleton: 'yMd' }), type: 'dateTime' };
            }
            else {
                formatOptions = { format: this.dateTimeFormat, type: 'dateTime', skeleton: 'yMd', calendar: 'bs' };
                formatDateTime = { format: culture.getDatePattern({ skeleton: 'yMd' }), type: 'dateTime', calendar: 'bs' };
            }
        }
        else {
            if (this.calendarMode === 'Gregorian') {
                formatOptions = { format: this.formatString, type: 'dateTime', skeleton: 'yMd' };
            }
            else {
                formatOptions = { format: this.formatString, type: 'dateTime', skeleton: 'yMd', calendar: 'bs' };
            }
        }
        returnDate = this.checkDateValue(this.globalize.parseDate(val, formatOptions));
        if (ej.base.isNullOrUndefined(returnDate) && (this.getModuleName() === 'datetimepicker')) {
            returnDate = this.checkDateValue(this.globalize.parseDate(val, formatDateTime));
        }
        return returnDate;
    };
    CustomDatePicker.prototype.checkInvalidValue = function (value) {
        if (!(value instanceof Date) && !ej.base.isNullOrUndefined(value)) {
            var valueDate = null;
            var valueString = value;
            if (typeof value === 'number') {
                valueString = value.toString();
            }
            var formatOptions = null;
            var formatDateTime = null;
            if (this.getModuleName() === 'datetimepicker') {
                var culture = new CustomInternationalization(this.locale);
                if (this.calendarMode === 'Gregorian') {
                    formatOptions = { format: this.dateTimeFormat, type: 'dateTime', skeleton: 'yMd' };
                    formatDateTime = { format: culture.getDatePattern({ skeleton: 'yMd' }), type: 'dateTime' };
                }
                else {
                    formatOptions = { format: this.dateTimeFormat, type: 'dateTime', skeleton: 'yMd', calendar: 'bs' };
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    formatDateTime = { format: culture.getDatePattern({ skeleton: 'yMd' }), type: 'dateTime', calendar: 'bs' };
                }
            }
            else {
                if (this.calendarMode === 'Gregorian') {
                    formatOptions = { format: this.formatString, type: 'dateTime', skeleton: 'yMd' };
                }
                else {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    formatOptions = { format: this.formatString, type: 'dateTime', skeleton: 'yMd', calendar: 'bs' };
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
    CustomDatePicker.prototype.bindInputEvent = function () {
        if (!ej.base.isNullOrUndefined(this.formatString) || this.enableMask) {
            if (this.enableMask || this.formatString.indexOf('y') === -1) {
                ej.base.EventHandler.add(this.inputElement, 'input', this.inputHandler, this);
            }
            else {
                ej.base.EventHandler.remove(this.inputElement, 'input', this.inputHandler);
            }
        }
    };
    CustomDatePicker.prototype.bindEvents = function () {
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
    CustomDatePicker.prototype.keydownHandler = function (e) {
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
    CustomDatePicker.prototype.unBindEvents = function () {
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
    CustomDatePicker.prototype.resetFormHandler = function () {
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
    CustomDatePicker.prototype.restoreValue = function () {
        this.currentDate = this.value ? this.value : new Date();
        this.previousDate = this.value;
        this.previousElementValue = (ej.base.isNullOrUndefined(this.inputValueCopy)) ? '' :
            this.globalize.formatDate(this.inputValueCopy, {
                format: this.formatString, type: 'dateTime', skeleton: 'yMd'
            });
    };
    CustomDatePicker.prototype.inputChangeHandler = function (e) {
        if (!this.enabled) {
            return;
        }
        e.stopPropagation();
    };
    CustomDatePicker.prototype.bindClearEvent = function () {
        if (this.showClearButton && this.inputWrapper.clearButton) {
            ej.base.EventHandler.add(this.inputWrapper.clearButton, 'mousedown touchstart', this.resetHandler, this);
        }
    };
    CustomDatePicker.prototype.resetHandler = function (e) {
        if (!this.enabled) {
            return;
        }
        e.preventDefault();
        this.clear(e);
    };
    CustomDatePicker.prototype.mouseUpHandler = function (e) {
        if (this.enableMask) {
            e.preventDefault();
            this.notify('setMaskSelection', {
                module: 'MaskedDateTime'
            });
        }
    };
    CustomDatePicker.prototype.clear = function (event) {
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
    CustomDatePicker.prototype.preventEventBubbling = function (e) {
        e.preventDefault();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.interopAdaptor.invokeMethodAsync('OnDateIconClick');
    };
    CustomDatePicker.prototype.updateInputValue = function (value) {
        ej.inputs.Input.setValue(value, this.inputElement, this.floatLabelType, this.showClearButton);
    };
    CustomDatePicker.prototype.dateIconHandler = function (e) {
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
    CustomDatePicker.prototype.updateHtmlAttributeToWrapper = function () {
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
    CustomDatePicker.prototype.updateHtmlAttributeToElement = function () {
        if (!ej.base.isNullOrUndefined(this.htmlAttributes)) {
            for (var _i = 0, _a = Object.keys(this.htmlAttributes); _i < _a.length; _i++) {
                var key = _a[_i];
                if (containerAttr.indexOf(key) < 0) {
                    this.inputElement.setAttribute(key, this.htmlAttributes["" + key]);
                }
            }
        }
    };
    CustomDatePicker.prototype.updateCssClass = function (newCssClass, oldCssClass) {
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
    CustomDatePicker.prototype.calendarKeyActionHandle = function (e) {
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
    CustomDatePicker.prototype.inputFocusHandler = function () {
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
    CustomDatePicker.prototype.inputHandler = function () {
        this.isPopupClicked = false;
        if (this.enableMask) {
            this.notify('inputHandler', {
                module: 'MaskedDateTime'
            });
        }
    };
    CustomDatePicker.prototype.inputBlurHandler = function (e) {
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
            this.calendarKeyboardModules = new ej.base.KeyboardEvents(this.calendarElement.children[1].firstElementChild, {
                eventName: 'keydown',
                keyAction: this.calendarKeyActionHandle.bind(this),
                keyConfigs: this.defaultKeyConfigs
            });
        }
        this.isPopupClicked = false;
    };
    CustomDatePicker.prototype.documentHandler = function (e) {
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
    CustomDatePicker.prototype.inputKeyActionHandle = function (e) {
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
    CustomDatePicker.prototype.defaultAction = function (e) {
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
    CustomDatePicker.prototype.popupUpdate = function () {
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
    CustomDatePicker.prototype.strictModeUpdate = function () {
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
                    type: 'dateTime', skeleton: 'yMd', calendar: 'bs'
                };
            }
        }
        else {
            if (this.calendarMode === 'Gregorian') {
                formatOptions = { format: format, type: 'dateTime', skeleton: 'yMd' };
            }
            else {
                formatOptions = { format: format, type: 'dateTime', skeleton: 'yMd', calendar: 'bs' };
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
                    formatOptions = { type: 'dateTime', skeleton: 'yMd', calendar: 'bs' };
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
    CustomDatePicker.prototype.createCalendar = function () {
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
                        _this.calendarKeyboardModules = new ej.base.KeyboardEvents(_this.calendarElement.children[1].firstElementChild, {
                            eventName: 'keydown',
                            keyAction: _this.calendarKeyActionHandle.bind(_this),
                            keyConfigs: _this.defaultKeyConfigs
                        });
                        _this.calendarKeyboardModules = new ej.base.KeyboardEvents(_this.inputWrapper.container.children[_this.index], {
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
                if (!ej.base.Browser.isDevice) {
                    _this.hide();
                }
            }
        });
        this.popupObj.element.className += ' ' + this.cssClass;
        this.setAriaAttributes();
    };
    CustomDatePicker.prototype.setAriaDisabled = function () {
        if (!this.enabled) {
            this.inputElement.setAttribute('aria-disabled', 'true');
            this.inputElement.tabIndex = -1;
        }
        else {
            this.inputElement.setAttribute('aria-disabled', 'false');
            this.inputElement.setAttribute('tabindex', this.tabIndex);
        }
    };
    CustomDatePicker.prototype.modelHeader = function () {
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
            dateOptions = { format: 'y', skeleton: 'dateTime', calendar: 'bs' };
        }
        yearHeading.textContent = '' + this.globalize.formatDate(this.value || new Date(), dateOptions);
        if (this.calendarMode === 'Gregorian') {
            dateOptions = { format: 'E', skeleton: 'dateTime' };
        }
        else {
            dateOptions = { format: 'E', skeleton: 'dateTime', calendar: 'bs' };
        }
        daySpan.textContent = '' + this.globalize.formatDate(this.value || new Date(), dateOptions) + ', ';
        if (this.calendarMode === 'Gregorian') {
            dateOptions = { format: 'MMM d', skeleton: 'dateTime' };
        }
        else {
            dateOptions = { format: 'MMM d', skeleton: 'dateTime', calendar: 'bs' };
        }
        monthSpan.textContent = '' + this.globalize.formatDate(this.value || new Date(), dateOptions);
        modelHeader.appendChild(yearHeading);
        h2.appendChild(daySpan);
        h2.appendChild(monthSpan);
        modelHeader.appendChild(h2);
        this.calendarElement.insertBefore(modelHeader, this.calendarElement.firstElementChild);
    };
    CustomDatePicker.prototype.changeTrigger = function (event) {
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
    CustomDatePicker.prototype.navigatedEvent = function () {
        this.trigger('navigated', this.navigatedArgs);
    };
    CustomDatePicker.prototype.changeEvent = function (event) {
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
    CustomDatePicker.prototype.requiredModules = function () {
        var modules = [];
        if (this) {
            modules.push({ args: [this], member: 'bs' });
        }
        if (this.enableMask) {
            modules.push({ args: [this], member: 'MaskedDateTime' });
        }
        return modules;
    };
    CustomDatePicker.prototype.selectCalendar = function (e) {
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
                    formatOptions = { format: tempFormat, type: 'dateTime', skeleton: 'yMd', calendar: 'bs' };
                }
                date = this.globalize.formatDate(this.changedArgs.value, formatOptions);
            }
            else {
                if (this.calendarMode === 'Gregorian') {
                    formatOptions = { format: this.formatString, type: 'dateTime', skeleton: 'yMd' };
                }
                else {
                    formatOptions = { format: this.formatString, type: 'dateTime', skeleton: 'yMd', calendar: 'bs' };
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
    CustomDatePicker.prototype.isCalendar = function () {
        if (this.popupWrapper && this.popupWrapper.classList.contains('' + POPUPWRAPPER)) {
            return true;
        }
        return false;
    };
    CustomDatePicker.prototype.setWidth = function (width) {
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
    CustomDatePicker.prototype.show = function (type, e) {
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
    CustomDatePicker.prototype.hide = function (event) {
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
    CustomDatePicker.prototype.closeEventCallback = function (prevent, eventArgs) {
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
    CustomDatePicker.prototype.focusIn = function (triggerEvent) {
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
    CustomDatePicker.prototype.focusOut = function () {
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
    CustomDatePicker.prototype.currentView = function () {
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
    CustomDatePicker.prototype.navigateTo = function (view, date) {
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
    CustomDatePicker.prototype.destroy = function () {
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
    CustomDatePicker.prototype.ensureInputAttribute = function () {
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
    CustomDatePicker.prototype.preRender = function () {
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
    CustomDatePicker.prototype.getDefaultKeyConfig = function () {
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
    CustomDatePicker.prototype.validationAttribute = function (target, inputElement) {
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
    CustomDatePicker.prototype.checkFormat = function () {
        var culture = new CustomInternationalization(this.locale);
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
    CustomDatePicker.prototype.checkHtmlAttributes = function (dynamic) {
        this.globalize = new CustomInternationalization(this.locale);
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
                    type: 'dateTime', skeleton: 'yMd', calendar: 'bs'
                };
            }
        }
        else {
            if (this.calendarMode === 'Gregorian') {
                options = { format: this.formatString, type: 'dateTime', skeleton: 'yMd' };
            }
            else {
                options = { format: this.formatString, type: 'dateTime', skeleton: 'yMd', calendar: 'bs' };
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
                            if (value == "") break;
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
    CustomDatePicker.prototype.getModuleName = function () {
        return 'datepicker';
    };
    CustomDatePicker.prototype.disabledDates = function (isDynamic) {
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
                    type: 'dateTime', skeleton: 'yMd', calendar: 'bs'
                });
            }
            inputVal = globalize;
        }
        else {
            if (this.calendarMode === 'Gregorian') {
                formatOptions = { format: this.formatString, type: 'dateTime', skeleton: 'yMd' };
            }
            else {
                formatOptions = { format: this.formatString, type: 'dateTime', skeleton: 'yMd', calendar: 'bs' };
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
    CustomDatePicker.prototype.setAriaAttributes = function () {
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
    CustomDatePicker.prototype.errorClass = function () {
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
    CustomDatePicker.prototype.onPropertyChanged = function (newProp, oldProp) {
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
                    this.globalize = new CustomInternationalization(this.locale);
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
    ], CustomDatePicker.prototype, "width", void 0);
    __decorate$1([
        Property(null)
    ], CustomDatePicker.prototype, "value", void 0);
    __decorate$1([
        Property(null)
    ], CustomDatePicker.prototype, "cssClass", void 0);
    __decorate$1([
        Property(false)
    ], CustomDatePicker.prototype, "strictMode", void 0);
    __decorate$1([
        Property(null)
    ], CustomDatePicker.prototype, "format", void 0);
    __decorate$1([
        Property(true)
    ], CustomDatePicker.prototype, "enabled", void 0);
    __decorate$1([
        Property({})
    ], CustomDatePicker.prototype, "htmlAttributes", void 0);
    __decorate$1([
        Property(null)
    ], CustomDatePicker.prototype, "values", void 0);
    __decorate$1([
        Property(false)
    ], CustomDatePicker.prototype, "isMultiSelection", void 0);
    __decorate$1([
        Property(true)
    ], CustomDatePicker.prototype, "showClearButton", void 0);
    __decorate$1([
        Property(true)
    ], CustomDatePicker.prototype, "allowEdit", void 0);
    __decorate$1([
        Property(null)
    ], CustomDatePicker.prototype, "keyConfigs", void 0);
    __decorate$1([
        Property(false)
    ], CustomDatePicker.prototype, "enablePersistence", void 0);
    __decorate$1([
        Property(1000)
    ], CustomDatePicker.prototype, "zIndex", void 0);
    __decorate$1([
        Property(false)
    ], CustomDatePicker.prototype, "readonly", void 0);
    __decorate$1([
        Property(null)
    ], CustomDatePicker.prototype, "placeholder", void 0);
    __decorate$1([
        Property('Never')
    ], CustomDatePicker.prototype, "floatLabelType", void 0);
    __decorate$1([
        Property(null)
    ], CustomDatePicker.prototype, "serverTimezoneOffset", void 0);
    __decorate$1([
        Property(false)
    ], CustomDatePicker.prototype, "openOnFocus", void 0);
    __decorate$1([
        Property(false)
    ], CustomDatePicker.prototype, "enableMask", void 0);
    __decorate$1([
        Property({ day: 'day', month: 'month', year: 'year', hour: 'hour', minute: 'minute', second: 'second', dayOfTheWeek: 'day of the week' })
    ], CustomDatePicker.prototype, "maskPlaceholder", void 0);
    __decorate$1([
        Event()
    ], CustomDatePicker.prototype, "open", void 0);
    __decorate$1([
        Event()
    ], CustomDatePicker.prototype, "cleared", void 0);
    __decorate$1([
        Event()
    ], CustomDatePicker.prototype, "close", void 0);
    __decorate$1([
        Event()
    ], CustomDatePicker.prototype, "blur", void 0);
    __decorate$1([
        Event()
    ], CustomDatePicker.prototype, "focus", void 0);
    __decorate$1([
        Event()
    ], CustomDatePicker.prototype, "created", void 0);
    __decorate$1([
        Event()
    ], CustomDatePicker.prototype, "destroyed", void 0);
    CustomDatePicker = __decorate$1([
        ej.base.NotifyPropertyChanges
    ], CustomDatePicker);
    return CustomDatePicker;
}(CustomCalendar));



var __extends$2 = (undefined && undefined.__extends) || (function () {
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
var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path='../calendar/calendar-model.d.ts'/>
let DATERANGEWRAPPER = 'e-date-range-wrapper';
let INPUTCONTAINER$1 = 'e-input-group';
let DATERANGEICON = 'e-input-group-icon e-range-icon e-icons';
let POPUP$1 = 'e-popup';
let LEFTCALENDER = 'e-left-calendar';
let RIGHTCALENDER = 'e-right-calendar';
let LEFTCONTAINER = 'e-left-container';
let RIGHTCONTAINER = 'e-right-container';
let ROOT$2 = 'e-daterangepicker';
let LIBRARY$1 = 'e-lib';
let CONTROL$1 = 'e-control';
let ERROR$1 = 'e-error';
let ACTIVE$1 = 'e-active';
let STARTENDCONTAINER = 'e-start-end';
let STARTDATE = 'e-start-date';
let ENDDATE = 'e-end-date';
let STARTBUTTON = 'e-start-btn';
let INPUTFOCUS$1 = 'e-input-focus';
let ENDBUTTON = 'e-end-btn';
let RANGEHOVER = 'e-range-hover';
let OTHERMONTH$2 = 'e-other-month';
let STARTLABEL = 'e-start-label';
let ENDLABEL = 'e-end-label';
let DISABLED$2 = 'e-disabled';
let SELECTED$3 = 'e-selected';
let CALENDAR = 'e-calendar';
let NEXTICON$1 = 'e-next';
let PREVICON$1 = 'e-prev';
let HEADER$1 = 'e-header';
let TITLE$1 = 'e-title';
let ICONCONTAINER$1 = 'e-icon-container';
let RANGECONTAINER = 'e-date-range-container';
let RANGEHEADER = 'e-range-header';
let PRESETS = 'e-presets';
let FOOTER$1 = 'e-footer';
let RANGEBORDER = 'e-range-border';
let TODAY$2 = 'e-today';
let FOCUSDATE = 'e-focused-date';
let CONTENT$1 = 'e-content';
let DAYSPAN = 'e-day-span';
let WEEKNUMBER$2 = 'e-week-number';
let DATEDISABLED = 'e-date-disabled';
let ICONDISABLED = 'e-icon-disabled';
let CALENDARCONTAINER = 'e-calendar-container';
let SEPARATOR = 'e-separator';
let APPLY = 'e-apply';
let CANCEL = 'e-cancel';
let DEVICE$1 = 'e-device';
let OVERLAY$2 = 'e-overlay';
let CHANGEICON = 'e-change-icon e-icons';
let LISTCLASS = 'e-list-item';
let RTL$1 = 'e-rtl';
let HOVER = 'e-hover';
let OVERFLOW$1 = 'e-range-overflow';
let OFFSETVALUE$1 = 4;
let PRIMARY$1 = 'e-primary';
let FLAT$1 = 'e-flat';
let CSS$1 = 'e-css';
let ZOOMIN$1 = 'e-zoomin';
let NONEDITABLE = 'e-non-edit';
let DAYHEADERLONG$1 = 'e-daterange-day-header-lg';
let HIDDENELEMENT = 'e-daterange-hidden';
let wrapperAttr = ['title', 'class', 'style'];
var Presets = /** @__PURE__ @class */ (function (_super) {
    __extends$2(Presets, _super);
    function Presets() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$2([
        Property()
    ], Presets.prototype, "label", void 0);
    __decorate$2([
        Property()
    ], Presets.prototype, "start", void 0);
    __decorate$2([
        Property()
    ], Presets.prototype, "end", void 0);
    return Presets;
}(ej.base.ChildProperty));
/**
 * Represents the DateRangePicker component that allows user to select the date range from the calendar
 * or entering the range through the input element.
 * ```html
 * <input id="daterangepicker"/>
 * ```
 * ```typescript
 * <script>
 *   var dateRangePickerObj = new CustomDateRangePicker({ startDate: new Date("05/07/2017"), endDate: new Date("10/07/2017") });
 *   dateRangePickerObj.appendTo("#daterangepicker");
 * </script>
 * ```
 */
var CustomDateRangePicker = /** @__PURE__ @class */ (function (_super) {
    _super.Inject(BikramSambat);
    _super.Inject(ej.calendars.MaskedDateTime);
    __extends$2(CustomDateRangePicker, _super);
    /**
     * Constructor for creating the widget
     *
     * @param {DateRangePickerModel} options - Specifies the DateRangePicker model.
     * @param {string | HTMLInputElement} element - Specifies the element to render as component.
     * @private
     */
    function CustomDateRangePicker(options, element) {
        var _this = _super.call(this, options, element) || this;
      
        _this.isCustomRange = false;
        _this.isCustomWindow = false;
        _this.presetsItem = [];
        _this.liCollections = [];
        _this.previousEleValue = '';
        _this.isKeyPopup = false;
        _this.dateDisabled = false;
        _this.isRangeIconClicked = false;
        _this.isMaxDaysClicked = false;
        _this.disabledDays = [];
        _this.preventBlur = false;
        _this.preventFocus = false;
        _this.invalidValueString = null;
        _this.isAngular = false;
        _this.preventChange = false;
        _this.dateRangeOptions = options;
        return _this;
    }
    /**
     * To Initialize the control rendering.
     *
     * @returns {void}
     * @private
     */
    CustomDateRangePicker.prototype.render = function () {
        this.initialize();
        this.setProperties({ startDate: this.startValue }, true);
        this.setProperties({ endDate: this.endValue }, true);
        this.setModelValue();
        this.setDataAttribute(false);
        if (this.element.hasAttribute('data-val')) {
            this.element.setAttribute('data-val', 'false');
        }
        Input.calculateWidth(this.inputElement, this.inputWrapper.container);
        if (!isNullOrUndefined(this.inputWrapper.buttons[0]) && !isNullOrUndefined(this.inputWrapper.container.getElementsByClassName('e-float-text-overflow')[0]) && this.floatLabelType !== 'Never') {
            this.inputWrapper.container.getElementsByClassName('e-float-text-overflow')[0].classList.add('e-icon');
        }
        if (!isNullOrUndefined(closest(this.element, 'fieldset')) && closest(this.element, 'fieldset').disabled) {
            this.enabled = false;
        }
        this.renderComplete();
    };
    /**
     * Initialize the event handler
     *
     * @returns {void}
     * @private
     */
    CustomDateRangePicker.prototype.preRender = function () {
        this.keyInputConfigs = {
            altDownArrow: 'alt+downarrow',
            escape: 'escape',
            enter: 'enter',
            tab: 'tab',
            altRightArrow: 'alt+rightarrow',
            altLeftArrow: 'alt+leftarrow',
            moveUp: 'uparrow',
            moveDown: 'downarrow',
            spacebar: 'space'
        };
        this.defaultConstant = {
            placeholder: this.placeholder,
            startLabel: 'Start Date',
            endLabel: 'End Date',
            customRange: 'Custom Range',
            applyText: 'Apply',
            cancelText: 'Cancel',
            selectedDays: 'Selected Days',
            days: 'days'
        };
        /**
         * Mobile View
         */
        this.isMobile = window.matchMedia('(max-width:550px)').matches;
        this.inputElement = this.element;
        this.angularTag = null;
        if (this.element.tagName === 'EJS-DATERANGEPICKER') {
            this.angularTag = this.element.tagName;
            this.inputElement = this.createElement('input');
            this.element.appendChild(this.inputElement);
        }
        this.cloneElement = this.element.cloneNode(true);
        ej.base.removeClass([this.cloneElement], [ROOT$2, CONTROL$1, LIBRARY$1]);
        this.updateHtmlAttributeToElement();
        if (this.element.getAttribute('id')) {
            if (this.angularTag !== null) {
                this.inputElement.id = this.element.getAttribute('id') + '_input';
            }
        }
        else {
            this.element.id = getUniqueID('ej2-datetimepicker');
            if (this.angularTag !== null) {
                attributes(this.inputElement, { 'id': this.element.id + '_input' });
            }
        }
        this.checkInvalidRange(this.value);
        if (!this.invalidValueString && (typeof (this.value) === 'string')) {
            var rangeArray = this.value.split(' ' + this.separator + ' ');
            this.value = [new Date(rangeArray[0]), new Date(rangeArray[1])];
        }
        this.initProperty();
        this.tabIndex = this.element.hasAttribute('tabindex') ? this.element.getAttribute('tabindex') : '0';
        this.element.removeAttribute('tabindex');
        _super.prototype.preRender.call(this);
        this.navNextFunction = this.navNextMonth.bind(this);
        this.navPrevFunction = this.navPrevMonth.bind(this);
        this.deviceNavNextFunction = this.deviceNavNext.bind(this);
        this.deviceNavPrevFunction = this.deviceNavPrevious.bind(this);
        this.initStartDate = this.checkDateValue(this.startValue);
        this.initEndDate = this.checkDateValue(this.endValue);
        this.formElement = closest(this.element, 'form');
    };
    CustomDateRangePicker.prototype.updateValue = function () {
        if (this.value && this.value.length > 0) {
            if (this.value[0] instanceof Date && !isNaN(+this.value[0])) {
                this.setProperties({ startDate: this.value[0] }, true);
                this.startValue = this.value[0];
            }
            else if (typeof this.value[0] === 'string') {
                if (+this.value[0] === 0 || isNaN(+(new Date(this.checkValue(this.value[0]))))) {
                    this.startValue = null;
                    this.setValue();
                }
                else {
                    this.setProperties({ startDate: new Date(this.checkValue(this.value[0])) }, true);
                    this.startValue = new Date(this.checkValue(this.value[0]));
                }
            }
            else {
                this.startValue = null;
                this.setValue();
            }
            if (this.value[1] instanceof Date && !isNaN(+this.value[1])) {
                this.setProperties({ endDate: this.value[1] }, true);
                this.endValue = this.value[1];
            }
            else if (typeof this.value[1] === 'string') {
                if (+this.value[0] === 0 || isNaN(+(new Date(this.checkValue(this.value[0]))))) {
                    this.setProperties({ endDate: null }, true);
                    this.endValue = null;
                    this.setValue();
                }
                else {
                    this.setProperties({ endDate: new Date(this.checkValue(this.value[1])) }, true);
                    this.endValue = new Date(this.checkValue(this.value[1]));
                    this.setValue();
                }
            }
            else {
                this.setProperties({ endDate: null }, true);
                this.endValue = null;
                this.setValue();
            }
        }
        else if (this.value && this.value.start) {
            if (this.value.start instanceof Date && !isNaN(+this.value.start)) {
                this.setProperties({ startDate: this.value.start }, true);
                this.startValue = this.value.start;
            }
            else if (typeof this.value.start === 'string') {
                this.setProperties({ startDate: new Date(this.checkValue(this.value.start)) }, true);
                this.startValue = new Date(this.checkValue(this.value.start));
            }
            else {
                this.startValue = null;
                this.setValue();
            }
            if (this.value.end instanceof Date && !isNaN(+this.value.end)) {
                this.setProperties({ endDate: this.value.end }, true);
                this.endValue = this.value.end;
            }
            else if (typeof this.value.end === 'string') {
                this.setProperties({ endDate: new Date(this.checkValue(this.value.end)) }, true);
                this.endValue = new Date(this.checkValue(this.value.end));
                this.setValue();
            }
            else {
                this.setProperties({ endDate: null }, true);
                this.endValue = null;
                this.setValue();
            }
        }
        else if (isNullOrUndefined(this.value)) {
            this.endValue = this.checkDateValue(new Date(this.checkValue(this.endDate)));
            this.startValue = this.checkDateValue(new Date(this.checkValue(this.startDate)));
            this.setValue();
        }
    };
    CustomDateRangePicker.prototype.initProperty = function () {
        this.globalize = new CustomInternationalization(this.locale);
        this.checkFormat();
        this.checkView();
        if (isNullOrUndefined(this.firstDayOfWeek) || this.firstDayOfWeek > 6 || this.firstDayOfWeek < 0) {
            this.setProperties({ firstDayOfWeek: this.globalize.getFirstDayOfWeek() }, true);
        }
        this.updateValue();
    };
    CustomDateRangePicker.prototype.checkFormat = function () {
        if (this.format) {
            if (typeof this.format === 'string') {
                this.formatString = this.format;
            }
            else if (this.format.skeleton !== '' && !isNullOrUndefined(this.format.skeleton)) {
                var skeletonString = this.format.skeleton;
                this.formatString = this.globalize.getDatePattern({ skeleton: skeletonString, type: 'date' });
            }
            else {
                this.formatString = null;
            }
        }
        else {
            this.formatString = null;
        }
    };
    CustomDateRangePicker.prototype.initialize = function () {
        if (this.angularTag !== null) {
            this.validationAttribute(this.element, this.inputElement);
        }
        this.checkHtmlAttributes(false);
        merge(this.defaultKeyConfigs, { shiftTab: 'shift+tab', tab: 'tab' });
        var start = this.checkDateValue(new Date(this.checkValue(this.startValue)));
        this.setProperties({ startDate: start }, true); // persist the value propeerty.
        this.setProperties({ endValue: this.checkDateValue(new Date(this.checkValue(this.endValue))) }, true);
        this.setValue();
        this.setProperties({ min: this.checkDateValue(new Date(this.checkValue(this.min))) }, true);
        this.setProperties({ max: this.checkDateValue(new Date(this.checkValue(this.max))) }, true);
        this.l10n = new ej.base.L10n('daterangepicker', this.defaultConstant, this.locale);
        this.l10n.setLocale(this.locale);
        this.setProperties({ placeholder: this.placeholder || this.l10n.getConstant('placeholder') }, true);
        this.processPresets();
        this.createInput();
        this.updateHtmlAttributeToWrapper();
        this.setRangeAllowEdit();
        this.bindEvents();
    };
    CustomDateRangePicker.prototype.setDataAttribute = function (isDynamic) {
        var attributes$$1 = {};
        if (!isDynamic) {
            for (var i = 0; i < this.element.attributes.length; i++) {
                attributes$$1[this.element.attributes[i].name] =
                    this.element.getAttribute(this.element.attributes[i].name);
            }
        }
        else {
            attributes$$1 = this.htmlAttributes;
        }
        for (var _i = 0, _a = Object.keys(attributes$$1); _i < _a.length; _i++) {
            var pro = _a[_i];
            if (pro.indexOf('data') === 0) {
                this.firstHiddenChild.setAttribute(pro, attributes$$1["" + pro]);
                this.secondHiddenChild.setAttribute(pro, attributes$$1["" + pro]);
            }
        }
    };
    CustomDateRangePicker.prototype.setRangeAllowEdit = function () {
        if (this.allowEdit) {
            if (!this.readonly) {
                this.inputElement.removeAttribute('readonly');
            }
        }
        else {
            attributes(this.inputElement, { 'readonly': '' });
        }
        this.updateClearIconState();
    };
    CustomDateRangePicker.prototype.updateClearIconState = function () {
        if (!this.allowEdit && this.inputWrapper && !this.readonly) {
            if (this.inputElement.value === '') {
                ej.base.removeClass([this.inputWrapper.container], [NONEDITABLE]);
            }
            else {
                addClass([this.inputWrapper.container], [NONEDITABLE]);
            }
        }
        else if (this.inputWrapper) {
            ej.base.removeClass([this.inputWrapper.container], [NONEDITABLE]);
        }
    };
    CustomDateRangePicker.prototype.validationAttribute = function (element, input) {
        var name = element.getAttribute('name') ? element.getAttribute('name') : element.getAttribute('id');
        input.setAttribute('name', name);
        element.removeAttribute('name');
        var attributes$$1 = ['required', 'aria-required', 'form'];
        for (var i = 0; i < attributes$$1.length; i++) {
            if (isNullOrUndefined(element.getAttribute(attributes$$1[i]))) {
                continue;
            }
            var attr = element.getAttribute(attributes$$1[i]);
            input.setAttribute(attributes$$1[i], attr);
            element.removeAttribute(attributes$$1[i]);
        }
    };
    CustomDateRangePicker.prototype.updateHtmlAttributeToWrapper = function () {
        if (!isNullOrUndefined(this.htmlAttributes)) {
            for (var _i = 0, _a = Object.keys(this.htmlAttributes); _i < _a.length; _i++) {
                var key = _a[_i];
                if (wrapperAttr.indexOf(key) > -1) {
                    if (key === 'class') {
                        var updatedClassValue = (this.htmlAttributes["" + key].replace(/\s+/g, ' ')).trim();
                        if (updatedClassValue !== '') {
                            addClass([this.inputWrapper.container], updatedClassValue.split(' '));
                        }
                    }
                    else if (key === 'style') {
                        var dateRangeStyle = this.inputWrapper.container.getAttribute(key);
                        dateRangeStyle = !isNullOrUndefined(dateRangeStyle) ? (dateRangeStyle + this.htmlAttributes["" + key]) :
                            this.htmlAttributes["" + key];
                        this.inputWrapper.container.setAttribute(key, dateRangeStyle);
                    }
                    else {
                        this.inputWrapper.container.setAttribute(key, this.htmlAttributes["" + key]);
                    }
                }
            }
        }
    };
    CustomDateRangePicker.prototype.updateHtmlAttributeToElement = function () {
        if (!isNullOrUndefined(this.htmlAttributes)) {
            for (var _i = 0, _a = Object.keys(this.htmlAttributes); _i < _a.length; _i++) {
                var key = _a[_i];
                if (wrapperAttr.indexOf(key) < 0) {
                    this.inputElement.setAttribute(key, this.htmlAttributes["" + key]);
                }
            }
        }
    };
    CustomDateRangePicker.prototype.updateCssClass = function (cssNewClass, cssOldClass) {
        if (!isNullOrUndefined(cssOldClass)) {
            cssOldClass = (cssOldClass.replace(/\s+/g, ' ')).trim();
        }
        if (!isNullOrUndefined(cssNewClass)) {
            cssNewClass = (cssNewClass.replace(/\s+/g, ' ')).trim();
        }
        Input.setCssClass(cssNewClass, [this.inputWrapper.container], cssOldClass);
        if (this.popupWrapper) {
            Input.setCssClass(cssNewClass, [this.popupWrapper], cssOldClass);
        }
    };
    CustomDateRangePicker.prototype.processPresets = function () {
        this.presetsItem = [];
        var i = 0;
        if (!isUndefined(this.presets[0].start && this.presets[0].end && this.presets[0].label)) {
            for (var _i = 0, _a = this.presets; _i < _a.length; _i++) {
                var range = _a[_i];
                var id = range.label.replace(/\s+/g, '') + '_' + (++i);
                if (typeof range.end === 'string') {
                    this.presetsItem.push({
                        id: id, text: range.label, end: new Date(this.checkValue(range.end)), start: new Date(this.checkValue(range.start))
                    });
                }
                else {
                    this.presetsItem.push({ id: id, text: range.label, start: range.start, end: range.end });
                }
            }
            var startDate = isNullOrUndefined(this.startValue) ? null : new Date(+this.startValue);
            var endDate = isNullOrUndefined(this.endValue) ? null : new Date(+this.endValue);
            this.presetsItem.push({ id: 'custom_range', text: this.l10n.getConstant('customRange'), start: startDate, end: endDate });
            if (!isNullOrUndefined(this.startValue) && !isNullOrUndefined(this.endValue)) {
                this.isCustomRange = true;
                this.activeIndex = this.presetsItem.length - 1;
            }
        }
    };
    CustomDateRangePicker.prototype.bindEvents = function () {
        EventHandler.add(this.inputWrapper.buttons[0], 'mousedown', this.rangeIconHandler, this);
        EventHandler.add(this.inputElement, 'focus', this.inputFocusHandler, this);
        EventHandler.add(this.inputElement, 'blur', this.inputBlurHandler, this);
        EventHandler.add(this.inputElement, 'change', this.inputChangeHandler, this);
        if (this.showClearButton && this.inputWrapper.clearButton) {
            EventHandler.add(this.inputWrapper.clearButton, 'mousedown', this.resetHandler, this);
        }
        if (!this.isMobile) {
            this.keyInputConfigs = extend(this.keyInputConfigs, this.keyConfigs);
            this.inputKeyboardModule = new KeyboardEvents(this.inputElement, {
                eventName: 'keydown',
                keyAction: this.inputHandler.bind(this),
                keyConfigs: this.keyInputConfigs
            });
        }
        if (this.formElement) {
            EventHandler.add(this.formElement, 'reset', this.formResetHandler, this);
        }
        if (this.enabled) {
            this.inputElement.setAttribute('tabindex', this.tabIndex);
        }
        else {
            this.inputElement.tabIndex = -1;
        }
    };
    CustomDateRangePicker.prototype.unBindEvents = function () {
        EventHandler.remove(this.inputWrapper.buttons[0], 'mousedown', this.rangeIconHandler);
        EventHandler.remove(this.inputElement, 'blur', this.inputBlurHandler);
        EventHandler.remove(this.inputElement, 'focus', this.inputFocusHandler);
        EventHandler.remove(this.inputElement, 'change', this.inputChangeHandler);
        if (this.showClearButton && this.inputWrapper.clearButton) {
            EventHandler.remove(this.inputWrapper.clearButton, 'mousedown touchstart', this.resetHandler);
        }
        if (!this.isMobile) {
            if (!isNullOrUndefined(this.inputKeyboardModule)) {
                this.inputKeyboardModule.destroy();
            }
        }
        if (this.formElement) {
            EventHandler.remove(this.formElement, 'reset', this.formResetHandler);
        }
        this.inputElement.tabIndex = -1;
    };
    CustomDateRangePicker.prototype.updateHiddenInput = function () {
        if (this.firstHiddenChild && this.secondHiddenChild) {
            var format = { type: 'datetime', skeleton: 'yMd' };
            if (typeof this.startDate === 'string') {
                this.startDate = this.globalize.parseDate(this.startDate, format);
            }
            if (typeof this.endDate === 'string') {
                this.endDate = this.globalize.parseDate(this.endDate, format);
            }
            this.firstHiddenChild.value = (this.startDate && this.globalize.formatDate(this.startDate, format))
                || (this.inputElement.value);
            this.secondHiddenChild.value = (this.endDate && this.globalize.formatDate(this.endDate, format)) ||
                (this.inputElement.value);
            this.dispatchEvent(this.firstHiddenChild, 'focusout');
            this.dispatchEvent(this.firstHiddenChild, 'change');
        }
    };
    CustomDateRangePicker.prototype.inputChangeHandler = function (e) {
        if (!this.enabled) {
            return;
        }
        e.stopPropagation();
        this.updateHiddenInput();
    };
    CustomDateRangePicker.prototype.bindClearEvent = function () {
        if (this.showClearButton && this.inputWrapper.clearButton) {
            EventHandler.add(this.inputWrapper.clearButton, 'mousedown', this.resetHandler, this);
        }
    };
    CustomDateRangePicker.prototype.resetHandler = function (e) {
        if (!this.enabled) {
            return;
        }
        this.valueType = this.value;
        e.preventDefault();
        this.clear();
        var clearedArgs = {
            event: e
        };
        this.setProperties({ endDate: this.checkDateValue(this.endValue) }, true);
        this.setProperties({ startDate: this.checkDateValue(this.startValue) }, true);
        this.trigger('cleared', clearedArgs);
        this.changeTrigger(e);
        this.clearRange();
        this.hide(e);
        if (closest(this.element, 'form')) {
            var element = this.firstHiddenChild;
            var keyupEvent = document.createEvent('KeyboardEvent');
            keyupEvent.initEvent('keyup', false, true);
            element.dispatchEvent(keyupEvent);
        }
    };
    CustomDateRangePicker.prototype.restoreValue = function () {
        this.previousEleValue = this.inputElement.value;
        this.previousStartValue = this.startValue;
        this.previousEndValue = this.endValue;
        this.valueType = null;
        this.initStartDate = this.checkDateValue(this.startValue);
        this.initEndDate = this.checkDateValue(this.endValue);
        this.setValue();
        this.setModelValue();
    };
    CustomDateRangePicker.prototype.formResetHandler = function (e) {
        if (!this.enabled) {
            return;
        }
        if (this.formElement && (e.target === this.formElement) && !this.inputElement.disabled) {
            var val = this.inputElement.getAttribute('value');
            if (!isNullOrUndefined(this.startCopy)) {
                if (!isNullOrUndefined(this.value) && !isNullOrUndefined(this.value.start)) {
                    this.setProperties({ value: { start: this.startCopy, end: this.endCopy } }, true);
                    this.startValue = this.value.start;
                    this.endValue = this.value.end;
                }
                else {
                    this.setProperties({ value: [this.startCopy, this.endCopy] }, true);
                    this.startValue = this.value[0];
                    this.endValue = this.value[1];
                }
                this.setProperties({ startDate: this.startValue, endDate: this.endValue }, true);
            }
            else {
                this.setProperties({ value: null, startDate: null, endDate: null }, true);
                this.startValue = this.endValue = null;
            }
            if (this.element.tagName === 'EJS-DATERANGEPICKER') {
                this.setProperties({ value: null, startDate: null, endDate: null }, true);
                val = '';
                this.startValue = this.endValue = null;
                this.inputElement.setAttribute('value', '');
            }
            this.restoreValue();
            if (this.inputElement) {
                Input.setValue(val, this.inputElement, this.floatLabelType, this.showClearButton);
                this.errorClass();
            }
        }
    };
    CustomDateRangePicker.prototype.clear = function () {
        if (this.startValue !== null) {
            this.startValue = null;
        }
        if (this.endValue !== null) {
            this.endValue = null;
        }
        if (this.value && this.value.start) {
            this.setProperties({ value: { start: null, end: null } }, true);
        }
        if (this.value !== null && this.value.length > 0) {
            this.setProperties({ value: null }, true);
        }
        Input.setValue('', this.inputElement, this.floatLabelType, this.showClearButton);
        if (!(isNullOrUndefined(this.applyButton))) {
            this.applyButton.disabled = this.applyButton.element.disabled = true;
        }
        this.removeSelection();
    };
    CustomDateRangePicker.prototype.rangeIconHandler = function (e) {
        if (!this.enabled) {
            return;
        }
        if (this.isMobile) {
            this.inputElement.setAttribute('readonly', '');
        }
        e.preventDefault();
        this.targetElement = null;
        if (this.isPopupOpen() && document.body.contains(this.popupObj.element)) {
            this.applyFunction(e);
        }
        else {
            this.isRangeIconClicked = true;
            this.inputWrapper.container.children[0].focus();
            this.show(null, e);
            if (!this.isMobile) {
                if (!isNullOrUndefined(this.leftCalendar)) {
                    this.isRangeIconClicked = false;
                    this.calendarFocus();
                    this.isRangeIconClicked = true;
                }
            }
            addClass([this.inputWrapper.container], [INPUTFOCUS$1]);
        }
    };
    CustomDateRangePicker.prototype.checkHtmlAttributes = function (isDynamic) {
        this.globalize = new CustomInternationalization(this.locale);
        var attributes$$1 = isDynamic ? isNullOrUndefined(this.htmlAttributes) ? [] : Object.keys(this.htmlAttributes) :
            ['startDate', 'endDate', 'minDays', 'maxDays', 'min', 'max', 'disabled', 'readonly', 'style', 'name', 'placeholder',
                'type', 'value'];
        var format = { format: this.formatString, type: 'date', skeleton: 'yMd' };
        for (var _i = 0, attributes_1 = attributes$$1; _i < attributes_1.length; _i++) {
            var prop = attributes_1[_i];
            if (!isNullOrUndefined(this.inputElement.getAttribute(prop))) {
                switch (prop) {
                    case 'disabled':
                        if ((isNullOrUndefined(this.dateRangeOptions) || (this.dateRangeOptions['enabled'] === undefined)) || isDynamic) {
                            var disabled = this.inputElement.getAttribute(prop) === 'disabled' ||
                                this.inputElement.getAttribute(prop) === '' || this.inputElement.getAttribute(prop) === 'true' ? true : false;
                            this.setProperties({ enabled: !disabled }, !isDynamic);
                        }
                        break;
                    case 'readonly':
                        if ((isNullOrUndefined(this.dateRangeOptions) || (this.dateRangeOptions['readonly'] === undefined)) || isDynamic) {
                            var readonly = this.inputElement.getAttribute(prop) === 'readonly' ||
                                this.inputElement.getAttribute(prop) === 'true' || this.inputElement.getAttribute(prop) === '' ? true : false;
                            this.setProperties({ readonly: readonly }, !isDynamic);
                        }
                        break;
                    case 'placeholder':
                        if ((isNullOrUndefined(this.dateRangeOptions) || (this.dateRangeOptions['placeholder'] === undefined)) || isDynamic) {
                            this.setProperties({ placeholder: this.inputElement.getAttribute(prop) }, !isDynamic);
                        }
                        break;
                    case 'value':
                        if ((isNullOrUndefined(this.dateRangeOptions) || (this.dateRangeOptions['value'] === undefined)) || isDynamic) {
                            var value = this.inputElement.getAttribute(prop);
                            this.setProperties(setValue(prop, value, {}), !isDynamic);
                        }
                        break;
                    case 'style':
                        this.inputElement.setAttribute('style', '' + this.inputElement.getAttribute(prop));
                        break;
                    case 'min':
                        if ((isNullOrUndefined(this.min) || +this.min === +new Date(1900, 0, 1)) || isDynamic) {
                            var dateValue = this.globalize.parseDate(this.inputElement.getAttribute(prop), format);
                            this.setProperties(setValue(prop, dateValue, {}), !isDynamic);
                        }
                        break;
                    case 'name':
                        this.inputElement.setAttribute('name', '' + this.inputElement.getAttribute(prop));
                        break;
                    case 'max':
                        if ((isNullOrUndefined(this.max) || +this.max === +new Date(2099, 11, 31)) || isDynamic) {
                            var dateValue = this.globalize.parseDate(this.inputElement.getAttribute(prop), format);
                            this.setProperties(setValue(prop, dateValue, {}), !isDynamic);
                        }
                        break;
                    case 'startDate':
                        if (isNullOrUndefined(this.startDate)) {
                            var dateValue = this.globalize.parseDate(this.inputElement.getAttribute(prop), format);
                            this.startValue = dateValue;
                            this.setValue();
                        }
                        break;
                    case 'endDate':
                        if (isNullOrUndefined(this.endDate)) {
                            var dateValue = this.globalize.parseDate(this.inputElement.getAttribute(prop), format);
                            this.endValue = dateValue;
                            this.setValue();
                        }
                        break;
                    case 'minDays':
                        if (isNullOrUndefined(this.minDays)) {
                            this.setProperties(setValue(prop, parseInt(this.inputElement.getAttribute(prop), 10), {}), true);
                        }
                        break;
                    case 'maxDays':
                        if (isNullOrUndefined(this.maxDays)) {
                            this.setProperties(setValue(prop, parseInt(this.inputElement.getAttribute(prop), 10), {}), true);
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
    CustomDateRangePicker.prototype.createPopup = function () {
        for (var i = 0; i < this.presetsItem.length; i++) {
            if ((i !== (this.presetsItem.length - 1)) && this.presetsItem[i].id === 'custom_range') {
                this.presetsItem.splice(i, 1);
            }
        }
        this.activeIndex = this.presetsItem.length - 1;
        this.isCustomRange = true;
        for (var i = 0; i <= this.presetsItem.length - 2; i++) {
            var startDate = this.presetsItem[i].start;
            var endDate = this.presetsItem[i].end;
            if (this.startValue && this.endValue) {
                if ((+new Date(startDate.setHours(0, 0, 0, 0)) === +new Date(this.startValue.setHours(0, 0, 0, 0))) &&
                    (+new Date(endDate.setHours(0, 0, 0, 0)) === +new Date(this.endValue.setHours(0, 0, 0, 0)))) {
                    this.activeIndex = i;
                    this.isCustomRange = false;
                }
            }
        }
        this.popupWrapper = createElement('div', { id: this.element.id + '_popup', className: ROOT$2 + ' ' + POPUP$1 });
        this.adjustLongHeaderWidth();
        var isPreset = (!this.isCustomRange || this.isMobile);
        if (!isUndefined(this.presets[0].start && this.presets[0].end && this.presets[0].label) && isPreset) {
            this.isCustomWindow = false;
            this.createPresets();
            this.listRippleEffect();
            this.renderPopup();
        }
        else {
            this.isCustomWindow = true;
            this.renderControl();
        }
    };
    CustomDateRangePicker.prototype.renderControl = function () {
        this.createControl();
        this.bindCalendarEvents();
        this.updateRange((this.isMobile ? [this.calendarElement] : [this.leftCalendar, this.rightCalendar]));
        if (!isNullOrUndefined(this.endValue) && !isNullOrUndefined(this.startValue) &&
            !isNullOrUndefined(this.renderDayCellArgs) && this.renderDayCellArgs.isDisabled) {
            this.disabledDateRender();
        }
        this.updateHeader();
    };
    CustomDateRangePicker.prototype.clearCalendarEvents = function () {
        if (this.leftCalPrevIcon && this.leftCalNextIcon && this.rightCalPrevIcon && this.rightCalNextIcon) {
            EventHandler.clearEvents(this.leftCalPrevIcon);
            EventHandler.clearEvents(this.leftCalNextIcon);
            EventHandler.clearEvents(this.rightCalPrevIcon);
            EventHandler.clearEvents(this.rightCalNextIcon);
        }
    };
    CustomDateRangePicker.prototype.updateNavIcons = function () {
        _super.prototype.iconHandler.call(this);
    };
    CustomDateRangePicker.prototype.calendarIconEvent = function () {
        this.clearCalendarEvents();
        if (this.leftCalPrevIcon && !this.leftCalPrevIcon.classList.contains(DISABLED$2)) {
            EventHandler.add(this.leftCalPrevIcon, 'mousedown', this.navPrevFunction);
        }
        if (this.leftCalNextIcon && !this.leftCalNextIcon.classList.contains(DISABLED$2)) {
            EventHandler.add(this.leftCalNextIcon, 'mousedown', this.navNextFunction);
        }
        if (this.rightCalPrevIcon && !this.rightCalPrevIcon.classList.contains(DISABLED$2)) {
            EventHandler.add(this.rightCalPrevIcon, 'mousedown', this.navPrevFunction);
        }
        if (this.rightCalNextIcon && !this.rightCalNextIcon.classList.contains(DISABLED$2)) {
            EventHandler.add(this.rightCalNextIcon, 'mousedown', this.navNextFunction);
        }
    };
    CustomDateRangePicker.prototype.bindCalendarEvents = function () {
        if (!this.isMobile) {
            this.updateNavIcons();
            this.calendarIconEvent();
            this.calendarIconRipple();
            this.headerTitleElement = this.popupObj.element.querySelector('.' + RIGHTCALENDER + ' .' + HEADER$1 + ' .' + TITLE$1);
            this.headerTitleElement = this.popupObj.element.querySelector('.' + LEFTCALENDER + ' .' + HEADER$1 + ' .' + TITLE$1);
            this.defaultKeyConfigs = extend(this.defaultKeyConfigs, this.keyConfigs);
            this.leftKeyboardModule = new KeyboardEvents(this.leftCalendar, {
                eventName: 'keydown',
                keyAction: this.keyInputHandler.bind(this),
                keyConfigs: this.defaultKeyConfigs
            });
            this.rightKeyboardModule = new KeyboardEvents(this.rightCalendar, {
                eventName: 'keydown',
                keyAction: this.keyInputHandler.bind(this),
                keyConfigs: this.defaultKeyConfigs
            });
        }
        else {
            this.deviceCalendarEvent();
            EventHandler.add(this.startButton.element, 'click', this.deviceHeaderClick, this);
            EventHandler.add(this.endButton.element, 'click', this.deviceHeaderClick, this);
        }
        if (this.start === this.depth) {
            this.bindCalendarCellEvents();
        }
        this.removeFocusedDate();
    };
    CustomDateRangePicker.prototype.calendarIconRipple = function () {
        rippleEffect(this.leftCalPrevIcon, { selector: '.e-prev', duration: 400, isCenterRipple: true });
        rippleEffect(this.leftCalNextIcon, { selector: '.e-next', duration: 400, isCenterRipple: true });
        rippleEffect(this.rightCalPrevIcon, { selector: '.e-prev', duration: 400, isCenterRipple: true });
        rippleEffect(this.rightCalNextIcon, { selector: '.e-next', duration: 400, isCenterRipple: true });
    };
    CustomDateRangePicker.prototype.deviceCalendarEvent = function () {
        EventHandler.clearEvents(this.nextIcon);
        EventHandler.clearEvents(this.previousIcon);
        rippleEffect(this.nextIcon, { selector: '.e-prev', duration: 400, isCenterRipple: true });
        rippleEffect(this.previousIcon, { selector: '.e-next', duration: 400, isCenterRipple: true });
        if (this.nextIcon && !this.nextIcon.classList.contains(DISABLED$2)) {
            EventHandler.add(this.nextIcon, 'mousedown', this.deviceNavNextFunction);
        }
        if (this.previousIcon && !this.previousIcon.classList.contains(DISABLED$2)) {
            EventHandler.add(this.previousIcon, 'mousedown', this.deviceNavPrevFunction);
        }
    };
    CustomDateRangePicker.prototype.deviceNavNext = function (e) {
        var calendar = closest(e.target, '.' + CALENDAR);
        this.updateDeviceCalendar(calendar);
        this.navigateNext(e);
        this.deviceNavigation();
    };
    CustomDateRangePicker.prototype.deviceNavPrevious = function (e) {
        var calendar = closest(e.target, '.' + CALENDAR);
        this.updateDeviceCalendar(calendar);
        this.navigatePrevious(e);
        this.deviceNavigation();
    };
    CustomDateRangePicker.prototype.updateDeviceCalendar = function (calendar) {
        if (calendar) {
            this.previousIcon = calendar.querySelector('.' + PREVICON$1);
            this.nextIcon = calendar.querySelector('.' + NEXTICON$1);
            this.calendarElement = calendar;
            this.deviceCalendar = calendar;
            this.contentElement = calendar.querySelector('.' + CONTENT$1);
            this.tableBodyElement = select('.' + CONTENT$1 + ' tbody', calendar);
            this.table = calendar.querySelector('.' + CONTENT$1).getElementsByTagName('table')[0];
            this.headerTitleElement = calendar.querySelector('.' + HEADER$1 + ' .' + TITLE$1);
            this.headerElement = calendar.querySelector('.' + HEADER$1);
        }
    };
    CustomDateRangePicker.prototype.deviceHeaderClick = function (event) {
        var element = event.currentTarget;
        if (element.classList.contains(STARTBUTTON) && !isNullOrUndefined(this.startValue)) {
            this.endButton.element.classList.remove(ACTIVE$1);
            this.startButton.element.classList.add(ACTIVE$1);
            var calendar = this.popupObj.element.querySelector('.' + CALENDAR);
            this.updateDeviceCalendar(calendar);
            if (isNullOrUndefined(this.calendarElement.querySelector('.' + STARTDATE + ':not(.e-other-month)'))) {
                this.currentDate = new Date(+this.startValue);
                remove(this.tableBodyElement);
                this.createContentBody();
                this.deviceNavigation();
            }
            this.removeClassDisabled();
        }
        else if (!isNullOrUndefined(this.startValue) && !isNullOrUndefined(this.endValue)) {
            this.startButton.element.classList.remove(ACTIVE$1);
            this.endButton.element.classList.add(ACTIVE$1);
            var calendar = this.popupObj.element.querySelector('.' + CALENDAR);
            this.updateDeviceCalendar(calendar);
            if (isNullOrUndefined(this.calendarElement.querySelector('.' + ENDDATE + ':not(.e-other-month)'))) {
                this.currentDate = new Date(+this.endValue);
                remove(this.tableBodyElement);
                this.createContentBody();
                this.deviceNavigation();
            }
            this.updateMinMaxDays(this.popupObj.element.querySelector('.' + CALENDAR));
            this.selectableDates();
        }
    };
    CustomDateRangePicker.prototype.inputFocusHandler = function () {
        if (!this.enabled) {
            return;
        }
        this.preventBlur = false;
        var focusArguments = {
            model: this
        };
        if (!this.preventFocus) {
            this.trigger('focus', focusArguments);
        }
        this.updateClearIconState();
        this.updateHiddenInput();
        if (this.openOnFocus && !this.preventFocus) {
            this.preventFocus = true;
            this.show();
        }
        else {
            this.preventFocus = true;
        }
    };
    CustomDateRangePicker.prototype.inputBlurHandler = function (e) {
        if (!this.enabled) {
            return;
        }
        if (!this.preventBlur) {
            var value = this.inputElement.value;
            if (!isNullOrUndefined(this.presetsItem)) {
                if (this.presetsItem.length > 0 && this.previousEleValue !== this.inputElement.value) {
                    this.activeIndex = this.presetsItem.length - 1;
                    this.isCustomRange = true;
                }
            }
            if (!isNullOrUndefined(value) && value.trim() !== '') {
                var range = value.split(' ' + this.separator + ' ');
                if (range.length > 1) {
                    this.invalidValueString = null;
                    var dateOptions = { format: this.formatString, type: 'date', skeleton: 'yMd' };
                    var start = new Date(range[0]);
                    var end = new Date(range[1]);
                    var startDate = this.getStartEndDate(start, false, range, dateOptions);
                    var endDate = this.getStartEndDate(end, true, range, dateOptions);
                    if (!isNullOrUndefined(startDate) && !isNaN(+startDate) && !isNullOrUndefined(endDate) && !isNaN(+endDate)) {
                        var prevStartVal = this.startValue;
                        this.startValue = startDate;
                        var prevEndVal = this.endValue;
                        this.endValue = endDate;
                        this.setValue();
                        this.refreshControl();
                        if (value !== this.previousEleValue) {
                            this.changeTrigger(e);
                        }
                        if (!this.preventBlur && document.activeElement !== this.inputElement) {
                            this.preventFocus = false;
                            var blurArguments = {
                                model: this
                            };
                            this.trigger('blur', blurArguments);
                        }
                        this.updateHiddenInput();
                        // For Mobile mode, when a value is present and choose another range and click on console
                        // when popup is open, two startvalues and end values are updated in the popup.
                        if (this.isMobile && this.isPopupOpen()) {
                            this.startValue = prevStartVal;
                            this.endValue = prevEndVal;
                        }
                        return;
                    }
                    else {
                        if (!this.strictMode) {
                            this.startValue = null;
                            this.endValue = null;
                            this.setValue();
                        }
                    }
                }
                else {
                    if (!this.strictMode) {
                        this.startValue = null;
                        this.endValue = null;
                        this.setValue();
                    }
                }
            }
            if (!this.strictMode) {
                if (isNullOrUndefined(this.popupObj)) {
                    this.currentDate = null;
                }
                this.previousStartValue = this.previousEndValue = null;
                this.startValue = null;
                this.endValue = null;
                this.setValue();
            }
            else {
                if (!isNullOrUndefined(value) && value.trim() === '') {
                    this.startValue = null;
                    this.endValue = null;
                }
                Input.setValue('', this.inputElement, this.floatLabelType, this.showClearButton);
                this.updateInput();
            }
            this.errorClass();
            this.changeTrigger(e);
            if (!this.preventBlur && document.activeElement !== this.inputElement) {
                this.preventFocus = false;
                var blurArguments = {
                    model: this
                };
                this.trigger('blur', blurArguments);
            }
        }
        this.updateHiddenInput();
    };
    // eslint-disable-next-line @typescript-eslint/tslint/config
    CustomDateRangePicker.prototype.getStartEndDate = function (date, isEnd, range, dateOptions) {
        if (this.depth === 'Month') {
            return this.globalize.parseDate(range[isEnd ? 1 : 0].trim(), dateOptions);
        }
        else if (this.depth === 'Year') {
            return new Date(date.getFullYear(), date.getMonth() + (isEnd ? 1 : 0), isEnd ? 0 : 1);
        }
        else {
            return new Date(date.getFullYear(), isEnd ? 11 : 0, isEnd ? 31 : 1);
        }
    };
    CustomDateRangePicker.prototype.clearRange = function () {
        this.previousStartValue = this.previousEndValue = null;
        this.currentDate = null;
    };
    CustomDateRangePicker.prototype.errorClass = function () {
        var inputStr = this.inputElement.value.trim();
        if (((isNullOrUndefined(this.endValue) && isNullOrUndefined(this.startValue) && inputStr !== '') ||
            ((!isNullOrUndefined(this.startValue) && +this.startValue < +this.min)
                || ((!isNullOrUndefined(this.startValue) && !isNullOrUndefined(this.endValue)) && +this.startValue > +this.endValue)
                || (!isNullOrUndefined(this.endValue) && +this.endValue > +this.max))
            || ((this.startValue && this.isDateDisabled(this.startValue))
                || (this.endValue && this.isDateDisabled(this.endValue)))) && inputStr !== '') {
            addClass([this.inputWrapper.container], ERROR$1);
            attributes(this.inputElement, { 'aria-invalid': 'true' });
        }
        else {
            if (this.inputWrapper) {
                ej.base.removeClass([this.inputWrapper.container], ERROR$1);
                attributes(this.inputElement, { 'aria-invalid': 'false' });
            }
        }
    };
    CustomDateRangePicker.prototype.keyCalendarUpdate = function (isLeftCalendar, ele, isRemoveFocus) {
        if (isRemoveFocus === void 0) { isRemoveFocus = true; }
        if (isRemoveFocus) {
            this.removeFocusedDate();
        }
        if (isLeftCalendar) {
            this.leftCalCurrentDate = new Date(+this.currentDate);
            ele = this.leftCalendar;
        }
        else {
            this.rightCalCurrentDate = new Date(+this.currentDate);
            ele = this.rightCalendar;
        }
        this.updateCalendarElement(ele);
        this.table.focus();
        return ele;
    };
    CustomDateRangePicker.prototype.navInCalendar = function (e, isLeftCalendar, leftLimit, rightLimit, ele) {
        var view = this.getViewNumber(this.currentView());
        var date;
        var min = this.min;
        var max;
        if (!isNullOrUndefined(this.maxDays) && this.isMaxDaysClicked && !isNullOrUndefined(this.startValue)) {
            max = new Date(new Date(+this.startValue).setDate(this.startValue.getDate() + (this.maxDays - 1)));
        }
        else {
            max = this.max;
        }
        switch (e.action) {
            case 'moveRight':
                date = new Date(+this.currentDate);
                this.addDay(date, 1, e, max, min);
                if (isLeftCalendar && +date === +rightLimit) {
                    ele = this.keyCalendarUpdate(false, ele);
                }
                this.keyboardNavigate(1, view, e, max, min);
                this.keyNavigation(ele, e);
                break;
            case 'moveLeft':
                date = new Date(+this.currentDate);
                this.addDay(date, -1, e, max, min);
                if (!isLeftCalendar) {
                    if (+date === +leftLimit) {
                        ele = this.keyCalendarUpdate(true, ele);
                    }
                }
                this.keyboardNavigate(-1, view, e, max, min);
                this.keyNavigation(ele, e);
                break;
            case 'moveUp':
                if (view === 0) {
                    date = new Date(+this.currentDate);
                    this.addDay(date, -7, e, max, min);
                    if (+date <= +leftLimit && !isLeftCalendar) {
                        ele = this.keyCalendarUpdate(true, ele);
                    }
                    this.keyboardNavigate(-7, view, e, max, min);
                }
                else {
                    this.keyboardNavigate(-4, view, e, this.max, this.min); // move the current year to the previous four days.
                }
                this.keyNavigation(ele, e);
                break;
            case 'moveDown':
                if (view === 0) {
                    date = new Date(+this.currentDate);
                    this.addDay(date, 7, e, max, min);
                    if (isLeftCalendar && +date >= +rightLimit) {
                        ele = this.keyCalendarUpdate(false, ele);
                    }
                    this.keyboardNavigate(7, view, e, max, min);
                }
                else {
                    this.keyboardNavigate(4, view, e, this.max, this.min);
                }
                this.keyNavigation(ele, e);
                break;
            case 'home':
                this.currentDate = this.firstDay(this.currentDate);
                remove(this.tableBodyElement);
                if (view === 0) {
                    this.renderMonths(e);
                }
                else if (view === 1) {
                    this.renderYears(e);
                }
                else {
                    this.renderDecades(e);
                }
                this.keyNavigation(ele, e);
                break;
            case 'end':
                this.currentDate = this.lastDay(this.currentDate, view);
                remove(this.tableBodyElement);
                if (view === 0) {
                    this.renderMonths(e);
                }
                else if (view === 1) {
                    this.renderYears(e);
                }
                else {
                    this.renderDecades(e);
                }
                this.keyNavigation(ele, e);
                break;
            case 'tab':
                if (this.tabKeyValidation(ele, LEFTCALENDER)) {
                    ele = this.keyCalendarUpdate(false, ele, false);
                    this.currentDate = this.firstCellToFocus(this.rightCalendar);
                    view = this.getViewNumber(this.currentView());
                    this.keyboardNavigate(0, view, e, max, min);
                    this.keyNavigation(ele, e);
                }
                break;
            case 'shiftTab':
                if (this.tabKeyValidation(ele, RIGHTCALENDER)) {
                    ele = this.keyCalendarUpdate(true, ele, false);
                    this.currentDate = this.firstCellToFocus(this.leftCalendar);
                    this.keyboardNavigate(0, view, e, max, min);
                    this.keyNavigation(ele, e);
                }
                break;
        }
    };
    CustomDateRangePicker.prototype.firstCellToFocus = function (calendar) {
        var focusAbleEle = this.getViewNumber(this.currentView()) === 2 ? calendar.children[1].firstElementChild.querySelector('td.e-cell:not(.e-week-number):not(.e-disabled):not(.e-other-year)') : calendar.children[1].firstElementChild.querySelector('td.e-cell:not(.e-week-number):not(.e-disabled):not(.e-other-month)');
        var focusEleID = focusAbleEle && focusAbleEle.id ? focusAbleEle.id.split('_')[0] : null;
        var currentFirstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
        var focusDate = focusEleID ? new Date(+focusEleID) : currentFirstDay;
        return focusDate;
    };
    CustomDateRangePicker.prototype.keyInputHandler = function (e, value) {
        var date;
        var view = this.getViewNumber(this.currentView());
        var rightDateLimit = new Date(this.rightCalCurrentDate.getFullYear(), this.rightCalCurrentDate.getMonth(), 1);
        var leftDateLimit = new Date(this.leftCalCurrentDate.getFullYear(), this.leftCalCurrentDate.getMonth() + 1, 0);
        var ele = closest(e.target, '.' + RIGHTCALENDER);
        ele = isNullOrUndefined(ele) ? this.leftCalendar : ele;
        var isLeftCalendar = ele.classList.contains(LEFTCALENDER);
        this.updateCalendarElement(ele);
        var selectedDate = this.tableBodyElement.querySelector('tr td.e-selected');
        var focusedDate = ele.querySelector('tr td.' + FOCUSDATE);
        var startDate = ele.querySelector('tr td.' + STARTDATE);
        var endDate = ele.querySelector('tr td.' + ENDDATE);
        var depthValue = this.getViewNumber(this.depth);
        var levelRestrict = (view === depthValue && this.getViewNumber(this.start) >= depthValue);
        var leftCalendar = closest(e.target, '.' + LEFTCALENDER);
        var rightCalendar = closest(e.target, '.' + RIGHTCALENDER);
        var presetElement = closest(e.target, '.' + PRESETS);
        if (!isNullOrUndefined(focusedDate)) {
            // eslint-disable-next-line no-self-assign
            this.currentDate = this.currentDate;
        }
        else if (!isNullOrUndefined(endDate) && !this.dateDisabled) {
            this.currentDate = new Date(+this.endValue);
        }
        else if (!isNullOrUndefined(startDate) && !this.dateDisabled) {
            this.currentDate = new Date(+this.startValue);
        }
        else if (!this.dateDisabled) {
            this.currentDate.setDate(1);
        }
        this.effect = '';
        switch (e.action) {
            case 'altUpArrow':
                if (this.isPopupOpen()) {
                    this.hide(e);
                    this.preventFocus = true;
                    this.inputElement.focus();
                    addClass([this.inputWrapper.container], [INPUTFOCUS$1]);
                }
                break;
            case 'select':
                if (levelRestrict) {
                    var element = !isNullOrUndefined(focusedDate) ? focusedDate : startDate;
                    if (!isNullOrUndefined(element) && !element.classList.contains(DISABLED$2)) {
                        this.selectRange(null, (element));
                    }
                }
                else {
                    if (!isNullOrUndefined(selectedDate) && !levelRestrict || !isNullOrUndefined(focusedDate)) {
                        if (!isNullOrUndefined(this.value)) {
                            if (this.calendarElement.classList.contains(LEFTCALENDER)) {
                                value = this.startDate;
                            }
                            else {
                                value = this.endDate;
                            }
                        }
                        this.controlDown = e;
                        this.contentClick(null, --view, (focusedDate || selectedDate), value);
                    }
                }
                e.preventDefault();
                break;
            case 'controlHome':
                {
                    var yearDate = new Date(this.currentDate.getFullYear(), 0, 1);
                    if (!isLeftCalendar && +yearDate < +leftDateLimit) {
                        ele = this.keyCalendarUpdate(true, ele);
                    }
                    _super.prototype.navigateTo.call(this, 'Month', new Date(this.currentDate.getFullYear(), 0, 1));
                    this.keyNavigation(ele, e);
                }
                break;
            case 'altRightArrow':
                if (!isNullOrUndefined(leftCalendar)) {
                    this.rightCalendar.children[1].firstElementChild.focus();
                }
                else if (!isNullOrUndefined(rightCalendar)) {
                    if (!isNullOrUndefined(this.presetElement)) {
                        this.presetElement.focus();
                        this.removeFocusedDate();
                    }
                    else {
                        this.cancelButton.element.focus();
                    }
                }
                else {
                    if (!isNullOrUndefined(presetElement)) {
                        this.cancelButton.element.focus();
                    }
                }
                e.preventDefault();
                break;
            case 'altLeftArrow':
                if (!isNullOrUndefined(leftCalendar)) {
                    if (this.applyButton.element.disabled !== true) {
                        this.applyButton.element.focus();
                    }
                    else {
                        this.cancelButton.element.focus();
                    }
                }
                else {
                    if (!isNullOrUndefined(rightCalendar)) {
                        this.leftCalendar.children[1].firstElementChild.focus();
                    }
                }
                e.preventDefault();
                break;
            case 'controlUp':
                if (this.calendarElement.classList.contains(LEFTCALENDER)) {
                    this.calendarNavigation(e, this.calendarElement);
                }
                else {
                    this.calendarNavigation(e, this.calendarElement);
                }
                e.preventDefault();
                break;
            case 'controlDown':
                if ((!isNullOrUndefined(selectedDate) || !isNullOrUndefined(focusedDate)) && !levelRestrict) {
                    if (!isNullOrUndefined(this.value)) {
                        if (this.calendarElement.classList.contains(LEFTCALENDER)) {
                            value = this.startDate;
                        }
                        else {
                            value = this.endDate;
                        }
                    }
                    this.controlDown = e;
                    this.contentClick(null, --view, (selectedDate || focusedDate), value);
                }
                e.preventDefault();
                break;
            case 'controlEnd':
                {
                    var yearDate = new Date(this.currentDate.getFullYear(), 11, 31);
                    if (isLeftCalendar && +yearDate > +rightDateLimit) {
                        ele = this.keyCalendarUpdate(false, ele);
                    }
                    _super.prototype.navigateTo.call(this, 'Month', new Date(this.currentDate.getFullYear(), 11, 31));
                    this.keyNavigation(ele, e);
                }
                break;
            case 'pageUp':
                date = new Date(+this.currentDate);
                this.addMonths(date, -1);
                if (!isLeftCalendar && +date <= +leftDateLimit) {
                    ele = this.keyCalendarUpdate(true, ele);
                }
                this.addMonths(this.currentDate, -1);
                _super.prototype.navigateTo.call(this, 'Month', this.currentDate);
                this.keyNavigation(ele, e);
                break;
            case 'pageDown':
                date = new Date(+this.currentDate);
                this.addMonths(date, 1);
                if (isLeftCalendar && +date >= +rightDateLimit) {
                    ele = this.keyCalendarUpdate(false, ele);
                }
                this.addMonths(this.currentDate, 1);
                _super.prototype.navigateTo.call(this, 'Month', this.currentDate);
                this.keyNavigation(ele, e);
                break;
            case 'shiftPageUp':
                date = new Date(+this.currentDate);
                this.addYears(date, -1);
                if (!isLeftCalendar && +date <= +leftDateLimit) {
                    ele = this.keyCalendarUpdate(true, ele);
                }
                this.addYears(this.currentDate, -1);
                _super.prototype.navigateTo.call(this, 'Month', this.currentDate);
                this.keyNavigation(ele, e);
                break;
            case 'shiftPageDown':
                date = new Date(+this.currentDate);
                this.addYears(date, 1);
                if (isLeftCalendar && +date >= +rightDateLimit) {
                    ele = this.keyCalendarUpdate(false, ele);
                }
                this.addYears(this.currentDate, 1);
                _super.prototype.navigateTo.call(this, 'Month', this.currentDate);
                this.keyNavigation(ele, e);
                break;
            case 'shiftTab':
                if (!isNullOrUndefined(this.presetElement)) {
                    this.presetElement.setAttribute('tabindex', '0');
                    this.presetElement.focus();
                    this.removeFocusedDate();
                }
                if (isLeftCalendar) {
                    e.preventDefault();
                }
                if (this.tabKeyValidation(ele, RIGHTCALENDER)) {
                    this.currentDate = new Date(+this.leftCalCurrentDate);
                    this.navInCalendar(e, isLeftCalendar, leftDateLimit, rightDateLimit, ele);
                }
                break;
            case 'spacebar':
                if (this.applyButton && !this.applyButton.disabled) {
                    this.applyFunction(e);
                }
                break;
            case 'tab':
                if (this.tabKeyValidation(ele, LEFTCALENDER)) {
                    this.currentDate = new Date(+this.rightCalCurrentDate);
                    this.navInCalendar(e, isLeftCalendar, leftDateLimit, rightDateLimit, ele);
                }
                break;
            default:
                this.navInCalendar(e, isLeftCalendar, leftDateLimit, rightDateLimit, ele);
                this.checkMinMaxDays();
        }
        this.presetHeight();
    };
    CustomDateRangePicker.prototype.tabKeyValidation = function (ele, calendarPos) {
        var isLeftCalendar = ele.classList.contains(calendarPos);
        var rightHeader = this.rightCalendar.querySelector('.e-header');
        var leftHeader = this.leftCalendar.querySelector('.e-header');
        var isRightMonth = rightHeader ? rightHeader.classList.contains('e-month') : false;
        var isLeftMonth = leftHeader ? leftHeader.classList.contains('e-month') : false;
        var isRightYear = rightHeader ? rightHeader.classList.contains('e-year') : false;
        var isLeftYear = leftHeader ? leftHeader.classList.contains('e-year') : false;
        var isRightDecade = rightHeader ? rightHeader.classList.contains('e-decade') : false;
        var isLeftDecade = leftHeader ? leftHeader.classList.contains('e-decade') : false;
        return isLeftCalendar && (isLeftMonth || isLeftYear || isLeftDecade) &&
            (isRightMonth || isRightYear || isRightDecade) && !this.isMobile;
    };
    CustomDateRangePicker.prototype.keyNavigation = function (calendar, e) {
        this.bindCalendarCellEvents(calendar);
        if (calendar.classList.contains(LEFTCALENDER)) {
            this.leftCalCurrentDate = new Date(+this.currentDate);
        }
        else {
            this.rightCalCurrentDate = new Date(+this.currentDate);
        }
        this.updateNavIcons();
        this.calendarIconEvent();
        this.updateRange([calendar]);
        this.dateDisabled = this.isDateDisabled(this.currentDate);
        e.preventDefault();
    };
    CustomDateRangePicker.prototype.inputHandler = function (e) {
        switch (e.action) {
            case 'altDownArrow':
                if (!this.isPopupOpen()) {
                    if (this.inputElement.value === '') {
                        this.clear();
                        this.changeTrigger(e);
                        this.clearRange();
                    }
                    this.show(null, e);
                    this.isRangeIconClicked = false;
                    if (!this.isMobile) {
                        if (!isNullOrUndefined(this.leftCalendar)) {
                            this.calendarFocus();
                        }
                    }
                    this.isKeyPopup = true;
                }
                break;
            case 'escape':
                if (this.isPopupOpen()) {
                    this.hide(e);
                }
                break;
            case 'enter':
                if (document.activeElement === this.inputElement) {
                    this.inputBlurHandler(e);
                    this.hide(e);
                }
                break;
            case 'tab':
                if (document.activeElement === this.inputElement && this.isPopupOpen()) {
                    this.hide(e);
                    e.preventDefault();
                }
                break;
        }
    };
    CustomDateRangePicker.prototype.bindCalendarCellEvents = function (calendar) {
        var tdCells;
        if (calendar) {
            tdCells = calendar.querySelectorAll('.' + CALENDAR + ' td');
        }
        else {
            tdCells = this.popupObj.element.querySelectorAll('.' + CALENDAR + ' td');
        }
        for (var _i = 0, tdCells_1 = tdCells; _i < tdCells_1.length; _i++) {
            var cell = tdCells_1[_i];
            EventHandler.clearEvents(cell);
            var disabledCell = cell.classList.contains(DISABLED$2) || cell.classList.contains(DATEDISABLED);
            if (!disabledCell && !cell.classList.contains(WEEKNUMBER$2)) {
                if (!this.isMobile) {
                    EventHandler.add(cell, 'mouseover', this.hoverSelection, this);
                }
                EventHandler.add(cell, 'mousedown', this.selectRange, this);
            }
        }
    };
    CustomDateRangePicker.prototype.removeFocusedDate = function () {
        var isDate = !isNullOrUndefined(this.startValue) || !isNullOrUndefined(this.endValue);
        var focusedDate = this.popupObj.element.querySelectorAll('.' + CALENDAR + ' .' + FOCUSDATE);
        for (var _i = 0, focusedDate_1 = focusedDate; _i < focusedDate_1.length; _i++) {
            var ele = focusedDate_1[_i];
            var today = new Date();
            var eleDate = this.getIdValue(null, ele);
            if ((this.depth === 'Month' && this.currentView() === 'Month' &&
                (!ele.classList.contains(TODAY$2) || (ele.classList.contains(TODAY$2) && isDate)))
                || (this.depth === 'Year' && this.currentView() === 'Year' &&
                    ((!this.isSameMonth(today, eleDate) && !this.isSameYear(today, eleDate)) || isDate))
                || (this.depth === 'Decade' && this.currentView() === 'Decade' &&
                    (!this.isSameYear(today, eleDate) || isDate))) {
                ele.classList.remove(FOCUSDATE);
                if (!ele.classList.contains(STARTDATE) && !ele.classList.contains(ENDDATE)) {
                    ele.removeAttribute('aria-label');
                }
            }
        }
    };
    CustomDateRangePicker.prototype.hoverSelection = function (event, element) {
        var currentElement = element || event.currentTarget;
        var currentDate = this.getIdValue(null, currentElement);
        if (!isNullOrUndefined(this.startValue) && +this.startValue >= +this.min && +this.startValue <= +this.max) {
            if ((!this.isDateDisabled(this.endValue) && !this.isDateDisabled(this.startValue)
                && isNullOrUndefined(this.endValue) && isNullOrUndefined(this.startValue))
                || (!isNullOrUndefined(this.startValue) && isNullOrUndefined(this.endValue))) {
                var tdCells = this.popupObj.element.querySelectorAll('.' + CALENDAR + ' td');
                for (var _i = 0, tdCells_2 = tdCells; _i < tdCells_2.length; _i++) {
                    var ele = tdCells_2[_i];
                    var isDisabledCell = (!ele.classList.contains(DISABLED$2) || ele.classList.contains(DATEDISABLED));
                    if (!ele.classList.contains(WEEKNUMBER$2) && isDisabledCell) {
                        var eleDate = this.getIdValue(null, ele);
                        var startDateValue = new Date(+this.startValue);
                        var eleDateValue = new Date(+eleDate);
                        if (eleDateValue.setHours(0, 0, 0, 0) >= startDateValue.setHours(0, 0, 0, 0) && +eleDate <= +currentDate) {
                            addClass([ele], RANGEHOVER);
                        }
                        else {
                            ej.base.removeClass([ele], [RANGEHOVER]);
                        }
                    }
                }
            }
        }
    };
    CustomDateRangePicker.prototype.isSameStartEnd = function (startVal, endVal) {
        var isSame = false;
        if (this.depth === 'Month') {
            if ((startVal).setHours(0, 0, 0, 0) === (endVal).setHours(0, 0, 0, 0)) {
                isSame = true;
            }
        }
        else if (this.depth === 'Year') {
            if ((startVal.getFullYear() === endVal.getFullYear()) &&
                (startVal.getMonth() === endVal.getMonth())) {
                isSame = true;
            }
        }
        else if (this.depth === 'Decade') {
            if (startVal.getFullYear() === endVal.getFullYear()) {
                isSame = true;
            }
        }
        return isSame;
    };
    CustomDateRangePicker.prototype.updateRange = function (elementCollection) {
        if (!isNullOrUndefined(this.startValue)) {
            for (var _i = 0, elementCollection_1 = elementCollection; _i < elementCollection_1.length; _i++) {
                var calendar = elementCollection_1[_i];
                var tdCells = calendar.querySelectorAll('.' + CALENDAR + ' td');
                for (var _a = 0, tdCells_3 = tdCells; _a < tdCells_3.length; _a++) {
                    var ele = tdCells_3[_a];
                    if (!ele.classList.contains(WEEKNUMBER$2) && !ele.classList.contains(DISABLED$2)) {
                        var eleDate = this.getIdValue(null, ele);
                        var eleDateValue = this.getIdValue(null, ele);
                        if (!isNullOrUndefined(this.endValue)) {
                            if (this.currentView() === this.depth &&
                                +eleDateValue.setHours(0, 0, 0, 0) >= +new Date(+this.startValue).setHours(0, 0, 0, 0)
                                && +eleDateValue.setHours(0, 0, 0, 0) <= +new Date(+this.endValue).setHours(0, 0, 0, 0) &&
                                !this.isSameStartEnd(new Date(+this.startValue), new Date(+this.endValue)) &&
                                +new Date(+this.startValue).setHours(0, 0, 0, 0) >= +this.min
                                && +new Date(+this.endValue).setHours(0, 0, 0, 0) <= +this.max
                                && !(this.isDateDisabled(this.startValue) || this.isDateDisabled(this.endValue))) {
                                addClass([ele], RANGEHOVER);
                            }
                        }
                        else {
                            ej.base.removeClass([ele], [RANGEHOVER]);
                        }
                        if (ele.classList.contains(SELECTED$3) && ele.classList.contains(ENDDATE) &&
                            (+eleDateValue !== +this.endValue)) {
                            ej.base.removeClass([ele], [SELECTED$3]);
                            ej.base.removeClass([ele], [ENDDATE]);
                        }
                        if (ele.classList.contains(RANGEHOVER) && (+eleDateValue > +this.endValue)) {
                            ej.base.removeClass([ele], [RANGEHOVER]);
                        }
                        if (!ele.classList.contains(OTHERMONTH$2)) {
                            var startDateValue = new Date(+this.startValue);
                            var eleDateValue_1 = new Date(+eleDate);
                            if (this.currentView() === this.depth &&
                                +eleDateValue_1.setHours(0, 0, 0, 0) === +startDateValue.setHours(0, 0, 0, 0)
                                && +eleDateValue_1.setHours(0, 0, 0, 0) >= +startDateValue.setHours(0, 0, 0, 0) &&
                                +this.startValue >= +this.min
                                && !this.inputWrapper.container.classList.contains('e-error')
                                && !(this.isDateDisabled(this.startValue) || this.isDateDisabled(this.endValue))) {
                                addClass([ele], [STARTDATE, SELECTED$3]);
                                this.addSelectedAttributes(ele, this.startValue, true);
                            }
                            var endDateValue = new Date(+this.endValue);
                            if (this.currentView() === 'Year') {
                                eleDateValue_1 = new Date(eleDateValue_1.getFullYear(), eleDateValue_1.getMonth() + 1, 0);
                            }
                            else if (this.currentView() === 'Decade') {
                                eleDateValue_1 = new Date(eleDateValue_1.getFullYear(), 11, 31);
                            }
                            if (this.currentView() === this.depth &&
                                !isNullOrUndefined(this.endValue) &&
                                +eleDateValue_1.setHours(0, 0, 0, 0) === +endDateValue.setHours(0, 0, 0, 0)
                                && +eleDateValue_1.setHours(0, 0, 0, 0) <= +endDateValue.setHours(0, 0, 0, 0) &&
                                +this.startValue >= +this.min
                                && !this.inputWrapper.container.classList.contains('e-error')
                                && !(this.isDateDisabled(this.startValue) || this.isDateDisabled(this.endValue))) {
                                addClass([ele], [ENDDATE, SELECTED$3]);
                                this.addSelectedAttributes(ele, this.startValue, false);
                            }
                            if (+eleDate === +this.startValue && !isNullOrUndefined(this.endValue) && +eleDate === +this.endValue) {
                                this.addSelectedAttributes(ele, this.endValue, false, true);
                            }
                        }
                    }
                }
            }
        }
    };
    CustomDateRangePicker.prototype.checkMinMaxDays = function () {
        if ((!isNullOrUndefined(this.minDays) && this.minDays > 0) || (!isNullOrUndefined(this.maxDays) && this.maxDays > 0)) {
            if (!this.isMobile) {
                this.updateMinMaxDays(this.popupObj.element.querySelector('.' + LEFTCALENDER));
                this.updateMinMaxDays(this.popupObj.element.querySelector('.' + RIGHTCALENDER));
            }
            else {
                this.updateMinMaxDays(this.popupObj.element.querySelector('.' + CALENDAR));
            }
        }
    };
    CustomDateRangePicker.prototype.rangeArgs = function (e) {
        var inputValue;
        var range;
        var startDate = !isNullOrUndefined(this.startValue) ?
            this.globalize.formatDate(this.startValue, {
                format: this.formatString, type: 'date', skeleton: 'yMd'
            }) : null;
        var endDate = !isNullOrUndefined(this.endValue) ?
            this.globalize.formatDate(this.endValue, {
                format: this.formatString, type: 'date', skeleton: 'yMd'
            }) : null;
        if (!isNullOrUndefined(this.endValue) && !isNullOrUndefined(this.startValue)) {
            inputValue = startDate + ' ' + this.separator + ' ' + endDate;
            range = (Math.round(Math.abs((this.removeTimeValueFromDate(this.startValue).getTime() -
                this.removeTimeValueFromDate(this.endValue).getTime()) / (1000 * 60 * 60 * 24))) + 1);
        }
        else {
            inputValue = '';
            range = 0;
        }
        var args = {
            value: this.value,
            startDate: this.startValue,
            endDate: this.endValue,
            daySpan: range,
            event: e || null,
            element: this.element,
            isInteracted: !isNullOrUndefined(e),
            text: inputValue
        };
        return args;
    };
    CustomDateRangePicker.prototype.otherMonthSelect = function (ele, isStartDate, sameDate) {
        var value = +this.getIdValue(null, ele);
        var dateIdString = '*[id^="/id"]:not(.e-other-month)'.replace('/id', '' + value);
        var tdCell = this.popupObj && this.popupObj.element.querySelector(dateIdString);
        if (!isNullOrUndefined(tdCell)) {
            if (isStartDate) {
                addClass([tdCell], [STARTDATE, SELECTED$3]);
                this.addSelectedAttributes(tdCell, this.startValue, true);
            }
            else {
                addClass([tdCell], [ENDDATE, SELECTED$3]);
                this.addSelectedAttributes(tdCell, this.endValue, true);
            }
            if (sameDate) {
                this.addSelectedAttributes(ele, this.endValue, false, true);
            }
        }
    };
    CustomDateRangePicker.prototype.selectRange = function (event, element) {
        var leftCalendar;
        var rightCalendar;
        if (event) {
            event.preventDefault();
        }
        var date = isNullOrUndefined(event) ? this.getIdValue(null, element)
            : this.getIdValue(event, null);
        var y = date.getFullYear();
        var m = date.getMonth();
        var firstDay = new Date(y, m, 1);
        var lastDay = new Date(y, m + 1, 0);
        var firstMonth = new Date(y, 0, 1);
        var lastMonth = new Date(y, 11, 31);
        if (!isNullOrUndefined(this.endValue) && !isNullOrUndefined(this.startValue)) {
            if (!this.isMobile || this.isMobile && !this.endButton.element.classList.contains(ACTIVE$1)) {
                this.removeSelection();
            }
        }
        else if (this.isMobile && this.startButton.element.classList.contains(ACTIVE$1)) {
            this.removeSelection();
        }
        var ele = element || event.currentTarget;
        if (isNullOrUndefined(this.startValue)) {
            if (!isNullOrUndefined(this.previousStartValue)) {
                date.setHours(this.previousStartValue.getHours());
                date.setMinutes(this.previousStartValue.getMinutes());
                date.setSeconds(this.previousStartValue.getSeconds());
            }
            this.startValue = (this.depth === 'Month') ? new Date(this.checkValue(date)) :
                (this.depth === 'Year') ? firstDay : firstMonth;
            this.endValue = null;
            this.setValue();
            addClass([ele], STARTDATE);
            this.addSelectedAttributes(ele, this.startValue, true);
            if (ele.classList.contains(OTHERMONTH$2)) {
                this.otherMonthSelect(ele, true);
            }
            this.checkMinMaxDays();
            this.applyButton.disabled = true;
            this.applyButton.element.disabled = true;
            if (this.isMobile) {
                this.endButton.element.classList.add(ACTIVE$1);
                this.startButton.element.classList.remove(ACTIVE$1);
                this.endButton.element.removeAttribute('disabled');
                this.selectableDates();
            }
            this.trigger('select', this.rangeArgs(event));
        }
        else {
            if (+date === +this.startValue || +date > +this.startValue) {
                if (+date === +this.startValue && !isNullOrUndefined(this.minDays) && this.minDays > 1) {
                    return;
                }
                this.endValue = null;
                this.setValue();
                if (this.isMobile || element) {
                    this.hoverSelection(event, element);
                }
                if (!isNullOrUndefined(this.previousEndValue)) {
                    date.setHours(this.previousEndValue.getHours());
                    date.setMinutes(this.previousEndValue.getMinutes());
                    date.setSeconds(this.previousEndValue.getSeconds());
                }
                this.endValue = (this.depth === 'Month') ? new Date(this.checkValue(date)) :
                    (this.depth === 'Year') ? lastDay : lastMonth;
                this.setValue();
                var endEle = this.popupObj.element.querySelectorAll('.' + ENDDATE);
                if (this.isMobile) {
                    this.startButton.element.classList.remove(ACTIVE$1);
                    this.endButton.element.classList.add(ACTIVE$1);
                    for (var _i = 0, endEle_1 = endEle; _i < endEle_1.length; _i++) {
                        var ele_1 = endEle_1[_i];
                        ele_1.removeAttribute('aria-label');
                        if (!ele_1.classList.contains(STARTDATE)) {
                            ele_1.setAttribute('aria-selected', 'false');
                            ej.base.removeClass([ele_1], [ENDDATE, SELECTED$3]);
                        }
                        else {
                            this.addSelectedAttributes(ele_1, this.startValue, true);
                            ej.base.removeClass([ele_1], [ENDDATE]);
                        }
                    }
                }
                addClass([ele], ENDDATE);
                if (+this.endValue === +this.startValue) {
                    this.addSelectedAttributes(ele, this.endValue, false, true);
                }
                else {
                    this.addSelectedAttributes(ele, this.endValue, false);
                }
                if (ele.classList.contains(OTHERMONTH$2)) {
                    if (+this.endValue === +this.startValue) {
                        this.otherMonthSelect(ele, false, true);
                    }
                    else {
                        this.otherMonthSelect(ele, false);
                    }
                }
                endEle = this.popupObj.element.querySelectorAll('.' + ENDDATE);
                for (var _a = 0, endEle_2 = endEle; _a < endEle_2.length; _a++) {
                    var ele_2 = endEle_2[_a];
                    if (ele_2.classList.contains(STARTDATE)) {
                        ej.base.removeClass([ele_2], [RANGEHOVER]);
                    }
                }
                this.applyButton.disabled = false;
                this.applyButton.element.disabled = false;
                if (!this.isMobile) {
                    this.removeClassDisabled();
                }
                if (!isNullOrUndefined(this.renderDayCellArgs) && this.renderDayCellArgs.isDisabled) {
                    this.disabledDateRender();
                }
                this.trigger('select', this.rangeArgs(event));
            }
            else if (+date < +this.startValue) {
                this.removeClassDisabled();
                this.startValue = (this.depth === 'Month') ? new Date(this.checkValue(date)) :
                    (this.depth === 'Year') ? firstDay : firstMonth;
                this.setValue();
                this.removeSelectedAttributes();
                ej.base.removeClass(this.popupObj.element.querySelectorAll('.' + STARTDATE), [STARTDATE, SELECTED$3]);
                addClass([ele], STARTDATE);
                this.addSelectedAttributes(ele, this.startValue, true);
                if (ele.classList.contains(OTHERMONTH$2)) {
                    this.otherMonthSelect(ele, true);
                }
                this.checkMinMaxDays();
            }
        }
        if (event) {
            leftCalendar = closest(event.target, '.' + LEFTCALENDER);
        }
        if (!isNullOrUndefined(leftCalendar)) {
            this.leftCalendar.children[1].firstElementChild.focus();
        }
        else {
            if (event) {
                rightCalendar = event && closest(event.target, '.' + RIGHTCALENDER);
            }
            if (!isNullOrUndefined(rightCalendar)) {
                this.rightCalendar.children[1].firstElementChild.focus();
            }
        }
        addClass([ele], SELECTED$3);
        this.calendarIconEvent();
        this.updateHeader();
        this.removeFocusedDate();
    };
    CustomDateRangePicker.prototype.selectableDates = function () {
        if (!isNullOrUndefined(this.startValue)) {
            var tdCells = this.calendarElement.querySelectorAll('.' + CALENDAR + ' td');
            var isStartDate = false;
            if (this.currentView() === this.depth) {
                for (var _i = 0, tdCells_4 = tdCells; _i < tdCells_4.length; _i++) {
                    var ele = tdCells_4[_i];
                    if (!ele.classList.contains(STARTDATE) && !ele.classList.contains(WEEKNUMBER$2)) {
                        if (!ele.classList.contains(DISABLED$2)) {
                            var eleDate = this.getIdValue(null, ele);
                            if (+eleDate < +this.startValue) {
                                addClass([ele], [DATEDISABLED, DISABLED$2, OVERLAY$2]);
                                EventHandler.clearEvents(ele);
                                continue;
                            }
                            else {
                                break;
                            }
                        }
                    }
                    if (ele.classList.contains(STARTDATE) && !ele.classList.contains(OTHERMONTH$2)) {
                        isStartDate = true;
                        break;
                    }
                }
                if (isStartDate) {
                    if (!this.previousIcon.classList.contains(DISABLED$2)) {
                        addClass([this.previousIcon], [ICONDISABLED, DISABLED$2, OVERLAY$2]);
                    }
                }
            }
            else {
                for (var _a = 0, tdCells_5 = tdCells; _a < tdCells_5.length; _a++) {
                    var ele = tdCells_5[_a];
                    var startMonth = this.startValue.getMonth();
                    var startYear = this.startValue.getFullYear();
                    var element = this.getIdValue(null, ele);
                    if (!this.startButton.element.classList.contains(ACTIVE$1) && ((this.currentView() === 'Year' &&
                        (element.getMonth() < startMonth) && (element.getFullYear() <= startYear))
                        || (this.currentView() === 'Decade' && (element.getMonth() <= startMonth) &&
                            (element.getFullYear() < startYear)))) {
                        addClass([ele], [DISABLED$2]);
                    }
                    else {
                        break;
                    }
                }
                if (tdCells[0].classList.contains(DISABLED$2)) {
                    this.previousIconHandler(true);
                }
                else if (tdCells[tdCells.length - 1].classList.contains(DISABLED$2)) {
                    this.nextIconHandler(true);
                }
            }
        }
    };
    CustomDateRangePicker.prototype.updateMinMaxDays = function (calendar) {
        if ((!isNullOrUndefined(this.startValue) && isNullOrUndefined(this.endValue)) ||
            (this.isMobile && this.endButton.element.classList.contains(ACTIVE$1))) {
            if ((!isNullOrUndefined(this.minDays) && this.minDays > 0) || (!isNullOrUndefined(this.maxDays) && this.maxDays > 0)) {
                var startValueSelected = this.removeTimeValueFromDate(this.startValue);
                var minDate = new Date(new Date(+startValueSelected).setDate(startValueSelected.getDate() + (this.minDays - 1)));
                var maxDate = new Date(new Date(+startValueSelected).setDate(startValueSelected.getDate() + (this.maxDays - 1)));
                minDate = (!isNullOrUndefined(this.minDays) && this.minDays > 0) ? minDate : null;
                maxDate = (!isNullOrUndefined(this.maxDays) && this.maxDays > 0) ? maxDate : null;
                if (this.currentView() === 'Year') {
                    minDate = isNullOrUndefined(minDate) ? null : new Date(minDate.getFullYear(), minDate.getMonth(), 0);
                    maxDate = isNullOrUndefined(maxDate) ? null : new Date(maxDate.getFullYear(), maxDate.getMonth(), 1);
                }
                else if (this.currentView() === 'Decade') {
                    minDate = isNullOrUndefined(minDate) ? null : new Date(minDate.getFullYear() - 1, 11, 1);
                    maxDate = isNullOrUndefined(maxDate) ? null : new Date(maxDate.getFullYear(), 0, 1);
                }
                var tdCells = calendar.querySelectorAll('.' + CALENDAR + ' td');
                var maxEle = void 0;
                for (var _i = 0, tdCells_6 = tdCells; _i < tdCells_6.length; _i++) {
                    var ele = tdCells_6[_i];
                    if (!ele.classList.contains(STARTDATE) && !ele.classList.contains(WEEKNUMBER$2)) {
                        var eleDate = this.getIdValue(null, ele);
                        eleDate = this.removeTimeValueFromDate(eleDate);
                        if (!isNullOrUndefined(minDate) && +eleDate === +minDate && ele.classList.contains(DISABLED$2)) {
                            minDate.setDate(minDate.getDate() + 1);
                        }
                        if (!ele.classList.contains(DISABLED$2)) {
                            if (+eleDate <= +startValueSelected) {
                                continue;
                            }
                            if (!isNullOrUndefined(minDate) && +eleDate < +minDate) {
                                addClass([ele], [DATEDISABLED, DISABLED$2, OVERLAY$2]);
                                EventHandler.clearEvents(ele);
                            }
                            if (!isNullOrUndefined(maxDate) && +eleDate > +maxDate) {
                                addClass([ele], [DATEDISABLED, DISABLED$2, OVERLAY$2]);
                                this.isMaxDaysClicked = true;
                                EventHandler.clearEvents(ele);
                                if (isNullOrUndefined(maxEle) && !ele.classList.contains(OTHERMONTH$2)) {
                                    maxEle = ele;
                                }
                            }
                        }
                    }
                }
                if (!isNullOrUndefined(maxEle)) {
                    if (this.isMobile) {
                        if (!this.nextIcon.classList.contains(DISABLED$2)) {
                            addClass([this.nextIcon], [ICONDISABLED, DISABLED$2, OVERLAY$2]);
                        }
                    }
                    else {
                        var calendar_1 = closest(maxEle, '.' + RIGHTCALENDER);
                        calendar_1 = isNullOrUndefined(calendar_1) ? this.leftCalendar : calendar_1;
                        var isLeftCalendar = calendar_1.classList.contains(LEFTCALENDER);
                        if (!isLeftCalendar) {
                            if (!this.rightCalNextIcon.classList.contains(DISABLED$2)) {
                                addClass([this.rightCalNextIcon], [ICONDISABLED, DISABLED$2, OVERLAY$2]);
                            }
                        }
                        else {
                            if (!this.rightCalNextIcon.classList.contains(DISABLED$2)) {
                                addClass([this.rightCalNextIcon], [ICONDISABLED, DISABLED$2, OVERLAY$2]);
                            }
                            if (!this.leftCalNextIcon.classList.contains(DISABLED$2)) {
                                addClass([this.leftCalNextIcon], [ICONDISABLED, DISABLED$2, OVERLAY$2]);
                            }
                            if (!this.rightCalPrevIcon.classList.contains(DISABLED$2)) {
                                addClass([this.rightCalPrevIcon], [ICONDISABLED, DISABLED$2, OVERLAY$2]);
                            }
                        }
                    }
                }
            }
        }
        else {
            this.isMaxDaysClicked = false;
        }
    };
    CustomDateRangePicker.prototype.removeTimeValueFromDate = function (value) {
        var dateValue = new Date(value.getFullYear(), value.getMonth(), value.getDate());
        return dateValue;
    };
    CustomDateRangePicker.prototype.removeClassDisabled = function () {
        var tdCells = this.popupObj.element.querySelectorAll('.' + CALENDAR + ' td' + '.' + DATEDISABLED);
        for (var _i = 0, tdCells_7 = tdCells; _i < tdCells_7.length; _i++) {
            var ele = tdCells_7[_i];
            if (ele.classList.contains(DATEDISABLED)) {
                ej.base.removeClass([ele], [DATEDISABLED, DISABLED$2, OVERLAY$2]);
                EventHandler.add(ele, 'click', this.selectRange, this);
                if (!this.isMobile) {
                    EventHandler.add(ele, 'mouseover', this.hoverSelection, this);
                }
            }
        }
        if (this.isMobile) {
            if (this.nextIcon.classList.contains(ICONDISABLED)) {
                ej.base.removeClass([this.nextIcon], [ICONDISABLED, DISABLED$2, OVERLAY$2]);
            }
            if (this.previousIcon.classList.contains(ICONDISABLED)) {
                ej.base.removeClass([this.previousIcon], [ICONDISABLED, DISABLED$2, OVERLAY$2]);
            }
        }
        else {
            if (this.rightCalNextIcon.classList.contains(ICONDISABLED)) {
                ej.base.removeClass([this.rightCalNextIcon], [ICONDISABLED, DISABLED$2, OVERLAY$2]);
            }
            if (this.rightCalPrevIcon.classList.contains(ICONDISABLED)) {
                ej.base.removeClass([this.rightCalPrevIcon], [ICONDISABLED, DISABLED$2, OVERLAY$2]);
            }
            if (this.leftCalNextIcon.classList.contains(ICONDISABLED)) {
                ej.base.removeClass([this.leftCalNextIcon], [ICONDISABLED, DISABLED$2, OVERLAY$2]);
            }
        }
    };
    CustomDateRangePicker.prototype.updateHeader = function () {
        var format = { type: 'date', skeleton: 'yMMMd' };
        if (!isNullOrUndefined(this.endValue) && !isNullOrUndefined(this.startValue)) {
            var range = (Math.round(Math.abs((this.removeTimeValueFromDate(this.startValue).getTime() -
                this.removeTimeValueFromDate(this.endValue).getTime()) / (1000 * 60 * 60 * 24))) + 1);
            if (!isNullOrUndefined(this.disabledDayCnt)) {
                range = range - this.disabledDayCnt;
                this.disabledDayCnt = null;
            }
            this.popupObj.element.querySelector('.' + DAYSPAN).textContent = range.toString() + ' ' + this.l10n.getConstant('days');
        }
        else {
            this.popupObj.element.querySelector('.' + DAYSPAN).textContent = this.l10n.getConstant('selectedDays');
        }
        if (!this.isMobile) {
            if (!isNullOrUndefined(this.endValue) && !isNullOrUndefined(this.startValue)) {
                this.popupObj.element.querySelector('.' + ENDLABEL).textContent = this.globalize.formatDate(this.endValue, format);
            }
            else {
                this.popupObj.element.querySelector('.' + ENDLABEL).textContent = this.l10n.getConstant('endLabel');
            }
            if (!isNullOrUndefined(this.startValue)) {
                this.popupObj.element.querySelector('.' + STARTLABEL).textContent = this.globalize.formatDate(this.startValue, format);
            }
            else {
                this.popupObj.element.querySelector('.' + STARTLABEL).textContent = this.l10n.getConstant('startLabel');
            }
        }
        else {
            if (!isNullOrUndefined(this.startValue)) {
                this.startButton.element.textContent = this.globalize.formatDate(this.startValue, format);
            }
            else {
                this.startButton.element.textContent = this.l10n.getConstant('startLabel');
            }
            if (!isNullOrUndefined(this.endValue) && !isNullOrUndefined(this.startValue)) {
                this.endButton.element.textContent = this.globalize.formatDate(this.endValue, format);
            }
            else {
                this.endButton.element.textContent = this.l10n.getConstant('endLabel');
            }
        }
        if ((this.isDateDisabled(this.startValue) || this.isDateDisabled(this.endValue)) ||
            ((!isNullOrUndefined(this.startValue) && +this.startValue < +this.min)
                || (!isNullOrUndefined(this.endValue) && +this.endValue > +this.max)
                || ((!isNullOrUndefined(this.startValue) && !isNullOrUndefined(this.endValue))
                    && +this.startValue > +this.endValue))) {
            if (!this.isMobile) {
                this.popupObj.element.querySelector('.' + DAYSPAN).textContent = this.l10n.getConstant('selectedDays');
                this.popupObj.element.querySelector('.' + STARTLABEL).textContent = this.l10n.getConstant('startLabel');
                this.popupObj.element.querySelector('.' + ENDLABEL).textContent = this.l10n.getConstant('endLabel');
            }
            else {
                this.startButton.element.textContent = this.l10n.getConstant('startLabel');
                this.endButton.element.textContent = this.l10n.getConstant('endLabel');
                this.popupObj.element.querySelector('.' + DAYSPAN).textContent = this.l10n.getConstant('selectedDays');
            }
        }
        if (this.popupObj.element.querySelector('#custom_range')) {
            this.popupObj.element.querySelector('#custom_range').textContent =
                this.l10n.getConstant('customRange') !== '' ? this.l10n.getConstant('customRange') : 'Custom Range';
        }
    };
    CustomDateRangePicker.prototype.removeSelection = function () {
        this.startValue = null;
        this.endValue = null;
        this.setValue();
        this.removeSelectedAttributes();
        if (this.popupObj) {
            if (this.popupObj.element.querySelectorAll('.' + SELECTED$3).length > 0) {
                ej.base.removeClass(this.popupObj.element.querySelectorAll('.' + SELECTED$3), [STARTDATE, ENDDATE, SELECTED$3]);
            }
            if (this.popupObj.element.querySelectorAll('.' + FOCUSDATE).length > 0) {
                ej.base.removeClass(this.popupObj.element.querySelectorAll('.' + FOCUSDATE), FOCUSDATE);
            }
            if (this.popupObj.element.querySelectorAll('.' + RANGEHOVER).length > 0) {
                ej.base.removeClass(this.popupObj.element.querySelectorAll('.' + RANGEHOVER), [RANGEHOVER]);
            }
        }
    };
    CustomDateRangePicker.prototype.addSelectedAttributes = function (ele, date, isStartDate, sameDate) {
        if (ele) {
            var title = this.globalize.formatDate(date, { type: 'date', skeleton: 'full' });
            if (!isNullOrUndefined(sameDate) && sameDate) {
                ele.setAttribute('aria-label', 'The current start and end date is ' + '' + title);
            }
            else {
                ele.setAttribute('aria-label', 'The current ' + (isStartDate ? 'start' : 'end') + ' date is ' + '' + title);
            }
            ele.setAttribute('aria-selected', 'true');
        }
    };
    CustomDateRangePicker.prototype.removeSelectedAttributes = function () {
        if (this.popupObj) {
            var start = this.popupObj.element.querySelectorAll('.' + STARTDATE);
            for (var _i = 0, start_1 = start; _i < start_1.length; _i++) {
                var ele = start_1[_i];
                ele.setAttribute('aria-selected', 'false');
                ele.removeAttribute('aria-label');
            }
            var end = this.popupObj.element.querySelectorAll('.' + ENDDATE);
            for (var _a = 0, end_1 = end; _a < end_1.length; _a++) {
                var ele = end_1[_a];
                ele.setAttribute('aria-selected', 'false');
                ele.removeAttribute('aria-label');
            }
        }
    };
    CustomDateRangePicker.prototype.updateCalendarElement = function (calendar) {
        if (calendar.classList.contains(LEFTCALENDER)) {
            this.calendarElement = this.leftCalendar;
            this.currentDate = this.leftCalCurrentDate;
            this.previousIcon = this.leftCalPrevIcon;
            this.nextIcon = this.leftCalNextIcon;
        }
        else {
            this.calendarElement = this.rightCalendar;
            this.currentDate = this.rightCalCurrentDate;
            this.previousIcon = this.rightCalPrevIcon;
            this.nextIcon = this.rightCalNextIcon;
        }
        this.contentElement = calendar.querySelector('.' + CONTENT$1);
        this.tableBodyElement = select('.' + CONTENT$1 + ' tbody', calendar);
        this.table = calendar.querySelector('.' + CONTENT$1).getElementsByTagName('table')[0];
        this.headerTitleElement = calendar.querySelector('.' + HEADER$1 + ' .' + TITLE$1);
        this.headerElement = calendar.querySelector('.' + HEADER$1);
    };
    CustomDateRangePicker.prototype.navPrevMonth = function (e) {
        e.preventDefault();
        var ele = closest(e.target, '.' + LEFTCALENDER);
        ele = isNullOrUndefined(ele) ? closest(e.target, '.' + RIGHTCALENDER) : ele;
        this.updateCalendarElement(ele);
        this.navigatePrevious(e);
        if (!isNullOrUndefined(this.startValue) && isNullOrUndefined(this.endValue)) {
            this.updateMinMaxDays(ele);
        }
        this.updateControl(ele);
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    CustomDateRangePicker.prototype.deviceNavigation = function (ele) {
        this.deviceCalendarEvent();
        this.updateRange([this.popupObj.element.querySelector('.' + CALENDAR)]);
        if (this.endButton.element.classList.contains(ACTIVE$1)) {
            this.updateMinMaxDays(this.popupObj.element.querySelector('.' + CALENDAR));
        }
        if (this.endButton.element.classList.contains(ACTIVE$1)) {
            this.selectableDates();
        }
        if (this.currentView() === this.depth) {
            this.bindCalendarCellEvents();
        }
        this.removeFocusedDate();
    };
    CustomDateRangePicker.prototype.updateControl = function (calendar, customDate) {
        if (customDate === void 0) { customDate = null; }
        if (calendar.classList.contains(RIGHTCALENDER)) {
            this.rightCalCurrentDate = new Date(+(customDate ? customDate : this.currentDate));
        }
        else {
            this.leftCalCurrentDate = new Date(+this.currentDate);
        }
        this.calendarIconEvent();
        if ((((this.depth === 'Month')
            && this.leftCalendar.querySelector('.e-content').classList.contains('e-month')
            && this.rightCalendar.querySelector('.e-content').classList.contains('e-month'))
            || ((this.depth === 'Year')
                && this.leftCalendar.querySelector('.e-content').classList.contains('e-year')
                && this.rightCalendar.querySelector('.e-content').classList.contains('e-year'))
            || ((this.depth === 'Decade')
                && this.leftCalendar.querySelector('.e-content').classList.contains('e-decade')
                && this.rightCalendar.querySelector('.e-content').classList.contains('e-decade')))
            || this.isMobile) {
            this.bindCalendarCellEvents();
        }
        this.removeFocusedDate();
        this.updateRange([calendar]);
    };
    CustomDateRangePicker.prototype.navNextMonth = function (event) {
        event.preventDefault();
        var ele = closest(event.target, '.' + LEFTCALENDER);
        ele = isNullOrUndefined(ele) ? closest(event.target, '.' + RIGHTCALENDER) : ele;
        this.updateCalendarElement(ele);
        this.navigateNext(event);
        if (!isNullOrUndefined(this.startValue) && isNullOrUndefined(this.endValue)) {
            this.updateMinMaxDays(ele);
        }
        this.updateControl(ele);
    };
    CustomDateRangePicker.prototype.isPopupOpen = function () {
        if (!isNullOrUndefined(this.popupObj) && this.popupObj.element.classList.contains(POPUP$1)) {
            return true;
        }
        return false;
    };
    CustomDateRangePicker.prototype.createRangeHeader = function () {
        var labelContainer = this.createElement('div', { className: STARTENDCONTAINER });
        if (!this.isMobile) {
            var startLabel = this.createElement('a', { className: STARTLABEL });
            var endLabel = this.createElement('a', { className: ENDLABEL });
            var changeIcon = this.createElement('span', { className: CHANGEICON });
            attributes(startLabel, { 'aria-atomic': 'true', 'aria-live': 'assertive', 'aria-label': 'Start Date', 'role': 'button' });
            attributes(endLabel, { 'aria-atomic': 'true', 'aria-live': 'assertive', 'aria-label': 'End Date', 'role': 'button' });
            labelContainer.appendChild(startLabel);
            labelContainer.appendChild(changeIcon);
            labelContainer.appendChild(endLabel);
            startLabel.textContent = this.l10n.getConstant('startLabel');
            endLabel.textContent = this.l10n.getConstant('endLabel');
        }
        else {
            var endBtn = this.createElement('button', { className: ENDBUTTON });
            var startBtn = this.createElement('button', { className: STARTBUTTON });
            this.startButton = new Button({ content: this.l10n.getConstant('startLabel') }, startBtn);
            this.endButton = new Button({ content: this.l10n.getConstant('endLabel') }, endBtn);
            labelContainer.appendChild(startBtn);
            labelContainer.appendChild(endBtn);
        }
        return labelContainer;
    };
    CustomDateRangePicker.prototype.disableInput = function () {
        if (this.strictMode) {
            if (!isNullOrUndefined(this.previousStartValue) && !isNullOrUndefined(this.previousEndValue)) {
                this.startValue = this.previousStartValue;
                this.endValue = this.previousEndValue;
                this.setValue();
                this.updateInput();
            }
        }
        else {
            this.updateInput();
            this.clearRange();
            this.setProperties({ startDate: null }, true);
            this.setProperties({ endDate: null }, true);
            this.startValue = null;
            this.endValue = null;
            this.setValue();
            this.errorClass();
        }
        this.setProperties({ enabled: false }, true);
        Input.setEnabled(this.enabled, this.inputElement);
        this.bindEvents();
    };
    CustomDateRangePicker.prototype.validateMinMax = function () {
        this.min = isNullOrUndefined(this.min) || !(+this.min) ? this.min = new Date(1900, 0, 1) : this.min;
        this.max = isNullOrUndefined(this.max) || !(+this.max) ? this.max = new Date(2099, 11, 31) : this.max;
        if (!(this.min <= this.max)) {
            this.disableInput();
            return;
        }
        if (!isNullOrUndefined(this.minDays) && !isNullOrUndefined(this.maxDays)) {
            if (this.maxDays > 0 && this.minDays > 0 && (this.minDays > this.maxDays)) {
                this.maxDays = null;
            }
        }
        if (!isNullOrUndefined(this.minDays) && this.minDays < 0) {
            this.minDays = null;
        }
        if (!isNullOrUndefined(this.maxDays) && this.maxDays < 0) {
            this.maxDays = null;
        }
    };
    CustomDateRangePicker.prototype.validateRangeStrict = function () {
        if (!isNullOrUndefined(this.startValue)) {
            if (+this.startValue <= +this.min) {
                this.startValue = this.min;
                this.setValue();
            }
            else if (+this.startValue >= +this.min && +this.startValue >= +this.max) {
                this.startValue = this.max;
            }
        }
        if (!isNullOrUndefined(this.endValue)) {
            if (+this.endValue > +this.max) {
                this.endValue = this.max;
                this.setValue();
            }
            else if (+this.endValue < +this.min) {
                this.endValue = this.min;
                this.setValue();
            }
        }
        this.validateMinMaxDays();
    };
    CustomDateRangePicker.prototype.validateRange = function () {
        this.validateMinMaxDays();
    };
    CustomDateRangePicker.prototype.validateMinMaxDays = function () {
        if (!isNullOrUndefined(this.startValue) && !isNullOrUndefined(this.endValue)) {
            var range = (Math.round(Math.abs((this.removeTimeValueFromDate(this.startValue).getTime() -
                this.removeTimeValueFromDate(this.endValue).getTime()) / (1000 * 60 * 60 * 24))) + 1);
            if ((!isNullOrUndefined(this.minDays) && this.minDays > 0) && !(range >= this.minDays)) {
                if (this.strictMode) {
                    var date = new Date(+this.startValue);
                    date.setDate(date.getDate() + (this.minDays - 1));
                    if (+date > +this.max) {
                        this.endValue = this.max;
                        this.setValue();
                    }
                    else {
                        this.endValue = date;
                        this.setValue();
                    }
                }
                else {
                    this.startValue = null;
                    this.endValue = null;
                    this.setValue();
                }
            }
            if ((!isNullOrUndefined(this.maxDays) && this.maxDays > 0) && !(range <= this.maxDays)) {
                if (this.strictMode) {
                    this.endValue = new Date(+this.startValue);
                    this.endValue.setDate(this.endValue.getDate() + (this.maxDays - 1));
                    this.setValue();
                }
                else {
                    this.startValue = null;
                    this.endValue = null;
                    this.setValue();
                }
            }
        }
    };
    CustomDateRangePicker.prototype.renderCalendar = function () {
        this.calendarElement = this.createElement('div');
        this.calendarElement.classList.add(CALENDAR);
        if (this.enableRtl) {
            this.calendarElement.classList.add(RTL$1);
        }
        attributes(this.calendarElement, { 'data-role': 'calendar' });
        _super.prototype.createHeader.call(this);
        _super.prototype.createContent.call(this);
    };
    CustomDateRangePicker.prototype.isSameMonth = function (start, end) {
        if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
            return true;
        }
        return false;
    };
    CustomDateRangePicker.prototype.isSameYear = function (start, end) {
        if (start.getFullYear() === end.getFullYear()) {
            return true;
        }
        return false;
    };
    CustomDateRangePicker.prototype.isSameDecade = function (start, end) {
        var startYear = start.getFullYear();
        var endYear = end.getFullYear();
        if ((startYear - (startYear % 10)) === (endYear - (endYear % 10))) {
            return true;
        }
        return false;
    };
    CustomDateRangePicker.prototype.startMonthCurrentDate = function () {
        if (this.isSameMonth(this.min, this.max) || +this.currentDate > +this.max || this.isSameMonth(this.currentDate, this.max)) {
            this.currentDate = new Date(+this.max);
            this.currentDate.setDate(1);
            this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        }
        else if (this.currentDate < this.min) {
            this.currentDate = new Date(this.checkValue(this.min));
        }
    };
    CustomDateRangePicker.prototype.selectNextMonth = function () {
        if (!isNullOrUndefined(this.endValue) && !isNullOrUndefined(this.startValue) && !this.isSameMonth(this.endValue, this.currentDate)
            && !this.isDateDisabled(this.endValue) && !this.isDateDisabled(this.startValue)) {
            this.currentDate = new Date(+this.endValue);
        }
        else {
            this.currentDate.setDate(1);
            this.currentDate.setMonth(this.currentDate.getMonth() + 1);
            return;
        }
        if ((!isNullOrUndefined(this.startValue) && +this.startValue < +this.min)
            || (!isNullOrUndefined(this.endValue) && +this.endValue > +this.max)
            || ((!isNullOrUndefined(this.startValue) && !isNullOrUndefined(this.endValue)) && +this.startValue > +this.endValue)) {
            this.currentDate = new Date(new Date().setHours(0, 0, 0, 0));
            this.currentDate.setDate(1);
            var month = this.currentDate.getMonth() + 1;
            this.currentDate.setMonth(month);
        }
    };
    CustomDateRangePicker.prototype.selectNextYear = function () {
        if (!isNullOrUndefined(this.endValue) && !isNullOrUndefined(this.startValue) && !this.isSameYear(this.endValue, this.currentDate)
            && !this.isDateDisabled(this.endValue) && !this.isDateDisabled(this.startValue)) {
            this.currentDate = new Date(+this.endValue);
        }
        else {
            this.currentDate.setMonth(0);
            var yr = this.currentDate.getFullYear() + 1;
            this.currentDate.setFullYear(yr);
            return;
        }
        if ((!isNullOrUndefined(this.endValue) && +this.endValue > +this.max)
            || ((!isNullOrUndefined(this.startValue) && !isNullOrUndefined(this.endValue)) && +this.startValue > +this.endValue)
            || (!isNullOrUndefined(this.startValue) && +this.startValue < +this.min)) {
            this.currentDate = new Date(new Date().setHours(0, 0, 0, 0));
            this.currentDate.setMonth(0);
            this.currentDate.setFullYear(this.currentDate.getFullYear() + 1);
        }
    };
    CustomDateRangePicker.prototype.selectNextDecade = function () {
        if (!isNullOrUndefined(this.endValue) && !isNullOrUndefined(this.startValue) && !this.isSameDecade(this.endValue, this.currentDate)
            && !this.isDateDisabled(this.endValue) && !this.isDateDisabled(this.startValue)) {
            this.currentDate = new Date(+this.endValue);
        }
        else {
            var decyr = this.currentDate.getFullYear() + 10;
            this.currentDate.setFullYear(decyr);
            return;
        }
        if (((!isNullOrUndefined(this.startValue) && !isNullOrUndefined(this.endValue)) && +this.startValue > +this.endValue)
            || (!isNullOrUndefined(this.endValue) && +this.endValue > +this.max)
            || (!isNullOrUndefined(this.startValue) && +this.startValue < +this.min)) {
            this.currentDate = new Date(new Date().setHours(0, 0, 0, 0));
            this.currentDate.setFullYear(this.currentDate.getFullYear() + 10);
        }
    };
    CustomDateRangePicker.prototype.selectStartMonth = function () {
        if (!isNullOrUndefined(this.startValue)) {
            if (!isNullOrUndefined(this.max) && this.isSameMonth(this.startValue, this.max)) {
                this.currentDate = new Date(+this.max);
                this.currentDate.setDate(1);
                this.currentDate.setMonth(this.currentDate.getMonth() - 1);
            }
            else if (!(this.startValue >= this.min && this.startValue <= this.max)
                || this.isDateDisabled(this.startValue)) {
                this.currentDate = new Date(new Date().setHours(0, 0, 0, 0));
            }
            else {
                this.currentDate = new Date(+this.startValue);
            }
        }
        else {
            this.currentDate = new Date(new Date().setHours(0, 0, 0, 0));
            this.startMonthCurrentDate();
        }
        if ((!isNullOrUndefined(this.endValue) && +this.endValue > +this.max)
            || (!isNullOrUndefined(this.startValue) && +this.startValue < +this.min)
            || ((!isNullOrUndefined(this.startValue) && !isNullOrUndefined(this.endValue)) && +this.startValue > +this.endValue)) {
            this.currentDate = new Date(new Date().setHours(0, 0, 0, 0));
        }
        this.startMonthCurrentDate();
    };
    CustomDateRangePicker.prototype.createCalendar = function () {
        var calendarContainer = this.createElement('div', { className: CALENDARCONTAINER });
        if (!this.isMobile) {
            this.selectStartMonth();
            this.renderCalendar();
            this.leftCalCurrentDate = new Date(+this.currentDate);
            this.calendarElement.classList.add(LEFTCALENDER);
            this.leftCalPrevIcon = this.calendarElement.querySelector('.' + LEFTCALENDER + ' .' + PREVICON$1);
            this.leftCalNextIcon = this.calendarElement.querySelector('.' + LEFTCALENDER + ' .' + NEXTICON$1);
            this.leftTitle = this.calendarElement.querySelector('.' + LEFTCALENDER + ' .' + TITLE$1);
            remove(this.calendarElement.querySelector('.' + LEFTCALENDER + ' .' + ICONCONTAINER$1));
            this.calendarElement.querySelector('.' + LEFTCALENDER + ' .' + HEADER$1).appendChild(this.leftCalNextIcon);
            this.calendarElement.querySelector('.' + LEFTCALENDER + ' .' + HEADER$1).appendChild(this.leftCalPrevIcon);
            prepend([this.leftCalPrevIcon], this.calendarElement.querySelector('.' + LEFTCALENDER + ' .' + HEADER$1));
            this.leftCalendar = this.calendarElement;
            var leftContainer = this.createElement('div', { className: LEFTCONTAINER });
            var rightContainer = this.createElement('div', { className: RIGHTCONTAINER });
            leftContainer.appendChild(this.leftCalendar);
            calendarContainer.appendChild(leftContainer);
            if (!this.isMobile) {
                EventHandler.add(this.leftTitle, 'click', this.leftNavTitle, this);
            }
            if (this.start === 'Month') {
                this.selectNextMonth();
            }
            if (this.start === 'Year') {
                this.selectNextYear();
            }
            if (this.start === 'Decade') {
                this.selectNextDecade();
            }
            this.renderCalendar();
            this.rightCalCurrentDate = new Date(+this.currentDate);
            addClass([this.calendarElement], RIGHTCALENDER);
            this.rightCalendar = this.calendarElement;
            ej.base.removeClass([this.leftCalendar && this.leftCalendar.querySelector('.e-content tbody')], 'e-zoomin');
            ej.base.removeClass([this.rightCalendar && this.rightCalendar.querySelector('.e-content tbody')], 'e-zoomin');
            this.rightCalPrevIcon = this.calendarElement.querySelector('.' + RIGHTCALENDER + ' .' + PREVICON$1);
            this.rightCalNextIcon = this.calendarElement.querySelector('.' + RIGHTCALENDER + ' .' + NEXTICON$1);
            this.rightTitle = this.calendarElement.querySelector('.' + RIGHTCALENDER + ' .' + TITLE$1);
            remove(this.calendarElement.querySelector('.' + RIGHTCALENDER + ' .' + ICONCONTAINER$1));
            this.calendarElement.querySelector('table').setAttribute('tabindex', '0');
            this.calendarElement.querySelector('.' + RIGHTCALENDER + ' .' + HEADER$1).appendChild(this.rightCalNextIcon);
            this.calendarElement.querySelector('.' + RIGHTCALENDER + ' .' + HEADER$1).appendChild(this.rightCalPrevIcon);
            prepend([this.rightCalPrevIcon], this.calendarElement.querySelector('.' + RIGHTCALENDER + ' .' + HEADER$1));
            rightContainer.appendChild(this.rightCalendar);
            calendarContainer.appendChild(rightContainer);
            if (!this.isMobile) {
                EventHandler.add(this.rightTitle, 'click', this.rightNavTitle, this);
            }
        }
        else {
            if (!isNullOrUndefined(this.startValue)) {
                this.currentDate = new Date(+this.startValue);
            }
            _super.prototype.validateDate.call(this);
            _super.prototype.minMaxUpdate.call(this);
            _super.prototype.render.call(this);
            var prevIcon = this.calendarElement.querySelector('.' + CALENDAR + ' .' + PREVICON$1);
            var nextIcon = this.calendarElement.querySelector('.' + CALENDAR + ' .' + NEXTICON$1);
            remove(this.calendarElement.querySelector('.' + CALENDAR + ' .' + ICONCONTAINER$1));
            this.calendarElement.querySelector('.' + CALENDAR + ' .' + HEADER$1).appendChild(nextIcon);
            this.calendarElement.querySelector('.' + CALENDAR + ' .' + HEADER$1).appendChild(prevIcon);
            prepend([prevIcon], this.calendarElement.querySelector('.' + CALENDAR + ' .' + HEADER$1));
            this.deviceCalendar = this.calendarElement;
            calendarContainer.appendChild(this.calendarElement);
            this.headerTitleElement = this.calendarElement.querySelector('.' + CALENDAR + ' .' + HEADER$1 + ' .' + TITLE$1);
        }
        return calendarContainer;
    };
    CustomDateRangePicker.prototype.leftNavTitle = function (e) {
        if (this.isPopupOpen()) {
            this.calendarElement = this.leftCalendar;
            this.calendarNavigation(e, this.calendarElement);
        }
    };
    CustomDateRangePicker.prototype.calendarNavigation = function (e, element) {
        this.table = element.querySelector('table');
        this.headerTitleElement = element.querySelector('.e-title');
        this.tableBodyElement = element.querySelector('tbody');
        this.tableHeadElement = element.querySelector('thead');
        this.contentElement = element.querySelector('.e-content');
        this.updateCalendarElement(element);
        _super.prototype.navigateTitle.call(this, e);
        this.updateNavIcons();
    };
    CustomDateRangePicker.prototype.rightNavTitle = function (e) {
        if (this.isPopupOpen()) {
            this.calendarElement = this.rightCalendar;
            this.calendarNavigation(e, this.calendarElement);
        }
    };
    CustomDateRangePicker.prototype.clickEventEmitter = function (e) {
        if (!this.isMobile) {
            if (closest(e.target, '.e-calendar.e-left-calendar')) {
                this.calendarElement = this.leftCalendar;
                this.updateCalendarElement(this.leftCalendar);
            }
            else {
                this.calendarElement = this.rightCalendar;
                this.updateCalendarElement(this.rightCalendar);
            }
        }
    };
    /* eslint-disable valid-jsdoc, jsdoc/require-returns-description */
    /**
     * Gets the current view of the Calendar.
     *
     * @returns {string}
     * @private
     * @hidden
     */
    CustomDateRangePicker.prototype.currentView = function () {
        return _super.prototype.currentView.call(this);
    };
    /* eslint-enable valid-jsdoc, jsdoc/require-returns-description */
    CustomDateRangePicker.prototype.getCalendarView = function (view) {
        if (view === 'Year') {
            return 'Year';
        }
        else if (view === 'Decade') {
            return 'Decade';
        }
        else {
            return 'Month';
        }
    };
    CustomDateRangePicker.prototype.navigatedEvent = function (e) {
        this.trigger('navigated', this.navigatedArgs);
        if (!isNullOrUndefined(this.popupObj)) {
            var element = void 0;
            var view = this.getCalendarView(this.currentView());
            if (this.isMobile) {
                if (view === this.depth) {
                    this.bindCalendarCellEvents();
                    this.deviceNavigation();
                    this.removeFocusedDate();
                    this.checkMinMaxDays();
                }
                else {
                    this.selectableDates();
                }
            }
            else {
                if (!this.isMobile && view === this.depth) {
                    element = this.calendarElement.classList.contains('e-left-calendar') ? this.leftCalendar : this.rightCalendar;
                    if (element === this.leftCalendar && ((e && !e.currentTarget.children[0].classList.contains('e-icons'))
                        || (!isNullOrUndefined(this.controlDown)))) {
                        this.leftCalCurrentDate = new Date(+this.currentDate);
                        this.effect = '';
                        this.currentDate = this.leftCalCurrentDate;
                        this.updateCalendarElement(this.leftCalendar);
                        this.updateControl(this.leftCalendar);
                        this.updateCalendarElement(this.rightCalendar);
                        _super.prototype.navigateTo.call(this, view, this.rightCalCurrentDate);
                        var customDate = this.rightCalCurrentDate ? this.rightCalCurrentDate : this.currentDate;
                        this.updateControl(this.rightCalendar, customDate);
                        this.updateNavIcons();
                        this.calendarIconEvent();
                        this.calendarIconRipple();
                        this.controlDown = null;
                    }
                    else if (e && !e.currentTarget.children[0].classList.contains('e-icons')
                        || (!isNullOrUndefined(this.controlDown))) {
                        this.rightCalCurrentDate = new Date(+this.currentDate);
                        this.effect = '';
                        this.currentDate = this.rightCalCurrentDate;
                        this.updateCalendarElement(this.rightCalendar);
                        this.updateControl(this.rightCalendar);
                        this.updateCalendarElement(this.leftCalendar);
                        if (this.startValue && isNullOrUndefined(this.endValue)) {
                            if (view === 'Month' && this.startValue.getMonth() < this.rightCalCurrentDate.getMonth() &&
                                this.startValue.getFullYear() <= this.rightCalCurrentDate.getFullYear()) {
                                _super.prototype.navigateTo.call(this, view, new Date(+this.startValue));
                            }
                            else if (view === 'Year' && this.startValue.getFullYear() < this.rightCalCurrentDate.getFullYear()) {
                                _super.prototype.navigateTo.call(this, view, new Date(+this.startValue));
                            }
                            else {
                                _super.prototype.navigateTo.call(this, view, this.leftCalCurrentDate);
                            }
                        }
                        else {
                            _super.prototype.navigateTo.call(this, view, this.leftCalCurrentDate);
                        }
                        this.updateControl(this.leftCalendar);
                        this.updateNavIcons();
                        this.calendarIconEvent();
                        this.calendarIconRipple();
                        this.controlDown = null;
                    }
                    this.checkMinMaxDays();
                }
                else {
                    this.updateNavIcons();
                    this.calendarIconEvent();
                }
            }
        }
    };
    CustomDateRangePicker.prototype.createControl = function () {
        var controlContainer = this.createElement('div', { className: RANGECONTAINER });
        var headerContainer = this.createElement('div', { className: RANGEHEADER });
        var labelContainer = this.createRangeHeader();
        headerContainer.appendChild(labelContainer);
        var daySpan = this.createElement('div', { className: DAYSPAN });
        attributes(daySpan, { 'aria-label': 'Selected Days' });
        daySpan.textContent = this.l10n.getConstant('selectedDays');
        headerContainer.appendChild(daySpan);
        var separator = this.createElement('div', { className: SEPARATOR });
        var calendarContainer = this.createCalendar();
        controlContainer.appendChild(headerContainer);
        controlContainer.appendChild(separator);
        controlContainer.appendChild(calendarContainer);
        var footerSection = this.createElement('div', { className: FOOTER$1 });
        var cancelBtn = this.createElement('button', { className: CANCEL + ' ' + FLAT$1 + ' ' + CSS$1 });
        var applyBtn = this.createElement('button');
        addClass([applyBtn], [APPLY, FLAT$1, PRIMARY$1, CSS$1]);
        footerSection.appendChild(applyBtn);
        footerSection.appendChild(cancelBtn);
        var enable = !isNullOrUndefined(this.startValue) && !isNullOrUndefined(this.endValue);
        this.cancelButton = new Button({ content: this.l10n.getConstant('cancelText') }, cancelBtn);
        this.applyButton = new Button({ content: this.l10n.getConstant('applyText'), disabled: !enable }, applyBtn);
        EventHandler.add(applyBtn, 'click', this.applyFunction, this);
        EventHandler.add(cancelBtn, 'click', this.cancelFunction, this);
        this.popupWrapper.appendChild(controlContainer);
        if (!this.isMobile) {
            if (!isUndefined(this.presets[0].start && this.presets[0].end && this.presets[0].label)) {
                this.createPresets();
                this.listRippleEffect();
                addClass([controlContainer], RANGEBORDER);
                addClass([this.popupWrapper], 'e-preset-wrapper');
                var presets = this.popupWrapper.querySelector('.' + PRESETS);
                presets.style.height = this.popupWrapper.querySelector('.' + RANGECONTAINER).getBoundingClientRect().height + 'px';
            }
        }
        this.popupWrapper.appendChild(footerSection);
        if (this.isMobile) {
            this.deviceHeaderUpdate();
        }
        this.renderPopup();
    };
    CustomDateRangePicker.prototype.cancelFunction = function (eve) {
        if (document.activeElement !== this.inputElement) {
            this.preventFocus = true;
            this.inputElement.focus();
            addClass([this.inputWrapper.container], [INPUTFOCUS$1]);
        }
        eve.preventDefault();
        if (this.isKeyPopup) {
            this.inputElement.focus();
            this.isKeyPopup = false;
        }
        this.startValue = null;
        this.endValue = null;
        this.removeSelection();
        this.hide(eve);
    };
    CustomDateRangePicker.prototype.deviceHeaderUpdate = function () {
        if (isNullOrUndefined(this.startValue) && isNullOrUndefined(this.endValue)) {
            this.endButton.element.setAttribute('disabled', '');
            this.startButton.element.classList.add(ACTIVE$1);
        }
        else if (!isNullOrUndefined(this.startValue)) {
            this.startButton.element.classList.add(ACTIVE$1);
        }
    };
    CustomDateRangePicker.prototype.applyFunction = function (eve) {
        var isValueChanged = false;
        if (eve.type !== 'touchstart') {
            eve.preventDefault();
        }
        if (this.closeEventArgs && this.closeEventArgs.cancel) {
            this.startValue = this.popupWrapper.querySelector('.e-start-date') &&
                this.getIdValue(null, this.popupWrapper.querySelector('.e-start-date'));
            this.endValue = this.popupWrapper.querySelector('.e-end-date') &&
                this.getIdValue(null, this.popupWrapper.querySelector('.e-end-date'));
            this.setValue();
        }
        if (document.activeElement !== this.inputElement) {
            this.preventFocus = true;
            this.inputElement.focus();
            addClass([this.inputWrapper.container], [INPUTFOCUS$1]);
        }
        if (eve.type !== 'touchstart' &&
            this.closeEventArgs && !this.closeEventArgs.cancel) {
            eve.preventDefault();
        }
        if (!isNullOrUndefined(this.startValue) && !isNullOrUndefined(this.endValue)) {
            this.previousStartValue = new Date(+this.startValue);
            this.previousEndValue = new Date(+this.endValue);
            this.previousEleValue = this.inputElement.value;
            Input.setValue(this.rangeArgs(eve).text, this.inputElement, this.floatLabelType, this.showClearButton);
            if (+this.initStartDate !== +this.startValue || +this.initEndDate !== +this.endValue) {
                isValueChanged = true;
            }
            this.changeTrigger(eve);
            this.hide(eve ? eve : null);
            this.errorClass();
            isValueChanged = true;
        }
        else {
            this.hide(eve ? eve : null);
        }
        if (!(closest(eve.target, '.' + INPUTCONTAINER$1))
            && (!isValueChanged)) {
            this.focusOut();
        }
        if (!this.isMobile) {
            this.isKeyPopup = false;
            if (this.isRangeIconClicked) {
                this.inputWrapper.container.children[1].focus();
                this.keyInputConfigs = extend(this.keyInputConfigs, this.keyConfigs);
                this.popupKeyboardModule = new KeyboardEvents(this.inputWrapper.container.children[1], {
                    eventName: 'keydown',
                    keyConfigs: this.keyInputConfigs,
                    keyAction: this.popupKeyActionHandle.bind(this)
                });
            }
        }
    };
    CustomDateRangePicker.prototype.onMouseClick = function (event, item) {
        if (event.type === 'touchstart') {
            return;
        }
        var target = item || event.target;
        var li = closest(target, '.' + LISTCLASS);
        var isClick = li && li.classList.contains(ACTIVE$1);
        if (li && li.classList.contains(LISTCLASS)) {
            this.setListSelection(li, event);
        }
        this.preventFocus = true;
        this.inputElement.focus();
        if (!this.isMobile) {
            this.preventFocus = true;
            if (li && li.classList.contains(LISTCLASS) && li.getAttribute('id') === 'custom_range') {
                this.leftCalendar.children[1].firstElementChild.focus();
            }
            else {
                if (!isClick && event.type === 'keydown') {
                    this.inputElement.focus();
                }
            }
        }
    };
    CustomDateRangePicker.prototype.onMouseOver = function (event) {
        var li = closest(event.target, '.' + LISTCLASS);
        if (li && li.classList.contains(LISTCLASS) && !li.classList.contains(HOVER)) {
            addClass([li], HOVER);
        }
    };
    CustomDateRangePicker.prototype.onMouseLeave = function (event) {
        var item = closest(event.target, '.' + HOVER);
        if (!isNullOrUndefined(item)) {
            ej.base.removeClass([item], HOVER);
        }
    };
    CustomDateRangePicker.prototype.setListSelection = function (li, event) {
        if (li && (!li.classList.contains(ACTIVE$1) || (this.isMobile && li.classList.contains(ACTIVE$1)))) {
            if (this.isMobile && li.classList.contains(ACTIVE$1)) {
                this.activeIndex = Array.prototype.slice.call(this.liCollections).indexOf(li);
                var values_1 = this.presetsItem[this.activeIndex];
                if (values_1.id === 'custom_range') {
                    this.renderCustomPopup();
                    return;
                }
                return;
            }
            this.removeListSelection();
            this.activeIndex = Array.prototype.slice.call(this.liCollections).indexOf(li);
            addClass([li], ACTIVE$1);
            li.setAttribute('aria-selected', 'true');
            var values = this.presetsItem[this.activeIndex];
            if (values.id === 'custom_range') {
                this.renderCustomPopup();
            }
            else {
                this.applyPresetRange(values, event);
            }
        }
    };
    CustomDateRangePicker.prototype.removeListSelection = function () {
        var item = this.presetElement.querySelector('.' + ACTIVE$1);
        if (!isNullOrUndefined(item)) {
            ej.base.removeClass([item], ACTIVE$1);
            item.removeAttribute('aria-selected');
        }
    };
    CustomDateRangePicker.prototype.setValue = function () {
        this.modelValue = [this.startValue, this.endValue];
    };
    CustomDateRangePicker.prototype.applyPresetRange = function (values, e) {
        this.hide(null);
        this.presetsItem[this.presetsItem.length - 1].start = null;
        this.presetsItem[this.presetsItem.length - 1].end = null;
        this.startValue = values.start;
        this.endValue = values.end;
        this.setValue();
        this.refreshControl();
        this.trigger('select', this.rangeArgs(e));
        this.changeTrigger(e);
        this.previousEleValue = this.inputElement.value;
        this.isCustomRange = false;
        this.leftCalendar = this.rightCalendar = null;
        if (this.isKeyPopup) {
            this.isRangeIconClicked = false;
            this.inputElement.focus();
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    CustomDateRangePicker.prototype.showPopup = function (element, event) {
        this.presetHeight();
        if (this.zIndex === 1000) {
            this.popupObj.show(null, this.element);
        }
        else {
            this.popupObj.show(null, null);
        }
        if (this.isMobile) {
            this.popupObj.refreshPosition();
        }
    };
    CustomDateRangePicker.prototype.renderCustomPopup = function () {
        this.isCustomWindow = true;
        this.popupObj.hide();
        this.popupWrapper = this.createElement('div', { id: this.element.id + '_popup', className: ROOT$2 + ' ' + POPUP$1 });
        this.renderControl();
        this.openEventArgs.appendTo.appendChild(this.popupWrapper);
        this.showPopup();
        this.isCustomRange = true;
        if (!this.isMobile) {
            this.calendarFocus();
        }
    };
    CustomDateRangePicker.prototype.listRippleEffect = function () {
        for (var _i = 0, _a = this.liCollections; _i < _a.length; _i++) {
            var li = _a[_i];
            rippleEffect(li);
        }
    };
    CustomDateRangePicker.prototype.createPresets = function () {
        if (!isUndefined(this.presets[0].start && this.presets[0].end && this.presets[0].label)) {
            this.presetElement = this.createElement('div', { className: PRESETS, attrs: { 'tabindex': '0' } });
            var listTag = ListBase.createList(this.createElement, this.presetsItem, null, true);
            attributes(listTag, { 'role': 'listbox', 'aria-hidden': 'false', 'id': this.element.id + '_options', 'tabindex': '0' });
            this.presetElement.appendChild(listTag);
            this.popupWrapper.appendChild(this.presetElement);
            var customElement = this.presetElement.querySelector('#custom_range');
            if (!isNullOrUndefined(customElement)) {
                customElement.textContent = this.l10n.getConstant('customRange') !== '' ? this.l10n.getConstant('customRange')
                    : 'Custom Range';
            }
            this.liCollections = this.presetElement.querySelectorAll('.' + LISTCLASS);
            this.wireListEvents();
            if (this.isMobile) {
                this.presetElement.style.width = this.inputWrapper.container.getBoundingClientRect().width + 'px';
            }
            if (!isNullOrUndefined(this.activeIndex) && this.activeIndex > -1) {
                addClass([this.liCollections[this.activeIndex]], ACTIVE$1);
            }
        }
    };
    CustomDateRangePicker.prototype.wireListEvents = function () {
        EventHandler.add(this.presetElement, 'click', this.onMouseClick, this);
        if (!this.isMobile) {
            EventHandler.add(this.presetElement, 'mouseover', this.onMouseOver, this);
            EventHandler.add(this.presetElement, 'mouseout', this.onMouseLeave, this);
        }
    };
    CustomDateRangePicker.prototype.unWireListEvents = function () {
        if (!isNullOrUndefined(this.presetElement)) {
            EventHandler.remove(this.presetElement, 'click touchstart', this.onMouseClick);
            if (!this.isMobile) {
                EventHandler.remove(this.presetElement, 'mouseover', this.onMouseOver);
                EventHandler.remove(this.presetElement, 'mouseout', this.onMouseLeave);
            }
        }
    };
    CustomDateRangePicker.prototype.renderPopup = function () {
        var _this = this;
        this.popupWrapper.classList.add('e-control');
        var popupWidth = this.popupWrapper.getBoundingClientRect().width;
        if (!isNullOrUndefined(this.cssClass) && this.cssClass.trim() !== '') {
            this.popupWrapper.className += ' ' + this.cssClass;
        }
        if (this.isMobile && this.isCustomWindow) {
            this.modal = this.createElement('div');
            document.body.appendChild(this.modal);
        }
        this.popupObj = new Popup(this.popupWrapper, {
            relateTo: this.isMobile && this.isCustomWindow ? document.body :
                (!isNullOrUndefined(this.targetElement) ? this.targetElement : this.inputWrapper.container),
            position: (this.isMobile ?
                (!isUndefined(this.presets[0].start && this.presets[0].end && this.presets[0].label) && !this.isCustomWindow ?
                    { X: 'left', Y: 'bottom' } : { X: 'center', Y: 'center' }) :
                this.enableRtl ? { X: 'left', Y: 'bottom' } : { X: 'right', Y: 'bottom' }),
            offsetX: this.isMobile || this.enableRtl ? 0 : -popupWidth,
            offsetY: OFFSETVALUE$1,
            collision: this.isMobile ?
                (!isUndefined(this.presets[0].start && this.presets[0].end && this.presets[0].label) && !this.isCustomWindow ?
                    { X: 'fit' } : { X: 'fit', Y: 'fit' }) : { X: 'fit', Y: 'flip' },
            targetType: this.isMobile && this.isCustomWindow ? 'container' : 'relative',
            enableRtl: this.enableRtl,
            zIndex: this.zIndex,
            open: function () {
                attributes(_this.inputElement, { 'aria-expanded': 'true', 'aria-owns': _this.inputElement.id + '_options' });
                if (_this.value) {
                    attributes(_this.inputElement, { 'aria-activedescendant': _this.inputElement.id });
                }
                else {
                    _this.inputElement.removeAttribute('aria-activedescendant');
                }
                addClass([_this.inputWrapper.buttons[0]], ACTIVE$1);
                if (!_this.isMobile) {
                    if (_this.cancelButton) {
                        _this.btnKeyboardModule = new KeyboardEvents(_this.cancelButton.element, {
                            eventName: 'keydown',
                            keyAction: _this.popupKeyActionHandle.bind(_this),
                            keyConfigs: { tab: 'tab', altRightArrow: 'alt+rightarrow', altLeftArrow: 'alt+leftarrow' }
                        });
                        _this.btnKeyboardModule = new KeyboardEvents(_this.applyButton.element, {
                            eventName: 'keydown',
                            keyAction: _this.popupKeyActionHandle.bind(_this),
                            keyConfigs: { altRightArrow: 'alt+rightarrow', altLeftArrow: 'alt+leftarrow' }
                        });
                    }
                    if (!isNullOrUndefined(_this.leftCalendar)) {
                        if (!_this.isRangeIconClicked) {
                            _this.calendarFocus();
                        }
                    }
                    if (!isNullOrUndefined(_this.presetElement)) {
                        _this.keyInputConfigs = extend(_this.keyInputConfigs, _this.keyConfigs);
                        _this.presetKeyboardModule = new KeyboardEvents(_this.presetElement, {
                            eventName: 'keydown',
                            keyAction: _this.presetKeyActionHandler.bind(_this),
                            keyConfigs: _this.keyInputConfigs
                        });
                        _this.presetKeyboardModule = new KeyboardEvents(_this.presetElement, {
                            eventName: 'keydown',
                            keyAction: _this.popupKeyActionHandle.bind(_this),
                            keyConfigs: { altRightArrow: 'alt+rightarrow', altLeftArrow: 'alt+leftarrow' }
                        });
                        if (isNullOrUndefined(_this.leftCalendar)) {
                            _this.preventBlur = true;
                            _this.presetElement.focus();
                        }
                        else {
                            _this.presetElement.setAttribute('tabindex', '-1');
                        }
                    }
                    _this.popupKeyBoardHandler();
                }
                if (_this.isMobile && !Browser.isDevice) {
                    EventHandler.add(document, 'keydown', _this.popupCloseHandler, _this);
                }
            },
            close: function () {
                attributes(_this.inputElement, { 'aria-expanded': 'false' });
                _this.inputElement.removeAttribute('aria-owns');
                _this.inputElement.removeAttribute('aria-activedescendant');
                ej.base.removeClass([_this.inputWrapper.buttons[0]], ACTIVE$1);
                if (_this.isRangeIconClicked) {
                    _this.inputWrapper.container.children[1].focus();
                }
                if (!isUndefined(_this.presets[0].start && _this.presets[0].end && _this.presets[0].label)) {
                    _this.unWireListEvents();
                }
                if (!isNullOrUndefined(_this.popupObj)) {
                    if (!isNullOrUndefined(_this.popupObj.element.parentElement)) {
                        detach(_this.popupObj.element);
                    }
                    _this.popupObj.destroy();
                    _this.popupObj = null;
                }
                if (_this.isMobile && !Browser.isDevice) {
                    EventHandler.remove(document, 'keydown', _this.popupCloseHandler);
                }
            }, targetExitViewport: function () {
                if (!Browser.isDevice) {
                    _this.hide();
                }
            }
        });
        if (this.isMobile) {
            this.popupObj.element.classList.add(DEVICE$1);
            if (!this.isMobile) {
                this.popupObj.element.classList.add('e-bigger');
            }
        }
        if (this.isMobile && this.isCustomWindow) {
            addClass([this.modal], [DEVICE$1, ROOT$2, 'e-range-modal']);
            document.body.className += ' ' + OVERFLOW$1;
            this.modal.style.display = 'block';
        }
        EventHandler.add(document, 'mousedown touchstart', this.documentHandler, this);
    };
    CustomDateRangePicker.prototype.popupCloseHandler = function (e) {
        switch (e.keyCode) {
            case 27:
                this.hide(e);
                break;
        }
    };
    CustomDateRangePicker.prototype.calendarFocus = function () {
        var startDate = this.popupObj && this.popupObj.element.querySelector('.' + STARTDATE);
        if (startDate) {
            var ele = closest(startDate, '.' + RIGHTCALENDER);
            ele = isNullOrUndefined(ele) ? this.leftCalendar : ele;
            if (this.isRangeIconClicked) {
                this.inputWrapper.container.focus();
            }
            else {
                this.preventBlur = true;
                ele.children[1].firstElementChild.focus();
            }
            addClass([startDate], FOCUSDATE);
        }
        else {
            if (this.isRangeIconClicked) {
                this.inputWrapper.container.focus();
            }
            else {
                this.preventBlur = true;
                this.leftCalendar.children[1].firstElementChild.focus();
            }
        }
    };
    CustomDateRangePicker.prototype.presetHeight = function () {
        var presets = this.popupObj && this.popupObj.element.querySelector('.' + PRESETS);
        var rangeContainer = this.popupObj && this.popupObj.element.querySelector('.' + RANGECONTAINER);
        if (!isNullOrUndefined(presets) && !isNullOrUndefined(rangeContainer)) {
            presets.style.height = rangeContainer.getBoundingClientRect().height + 'px';
        }
    };
    CustomDateRangePicker.prototype.presetKeyActionHandler = function (e) {
        switch (e.action) {
            case 'moveDown':
                this.listMoveDown(e);
                this.setScrollPosition();
                e.preventDefault();
                break;
            case 'moveUp':
                this.listMoveUp(e);
                this.setScrollPosition();
                e.preventDefault();
                break;
            case 'enter':
                {
                    var hvrItem = this.getHoverLI();
                    var actItem = this.getActiveLI();
                    if (!isNullOrUndefined(this.leftCalendar) && !isNullOrUndefined(actItem)) {
                        if (isNullOrUndefined(hvrItem) || (!isNullOrUndefined(actItem) && actItem === hvrItem)) {
                            this.activeIndex = Array.prototype.slice.call(this.liCollections).indexOf(actItem);
                            var values = this.presetsItem[this.activeIndex];
                            if (values.id === 'custom_range') {
                                this.calendarFocus();
                                actItem.classList.remove(HOVER);
                                e.preventDefault();
                                return;
                            }
                        }
                    }
                    if (!isNullOrUndefined(hvrItem) || !isNullOrUndefined(actItem)) {
                        this.onMouseClick(e, hvrItem || actItem);
                    }
                    e.preventDefault();
                }
                break;
            case 'tab':
                if (this.leftCalendar) {
                    var item = this.getHoverLI();
                    if (!isNullOrUndefined(item)) {
                        item.classList.remove(HOVER);
                    }
                }
                else {
                    this.hide(e);
                    e.preventDefault();
                }
                break;
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    CustomDateRangePicker.prototype.listMoveDown = function (e) {
        var hvrItem = this.getHoverLI();
        var actItem = this.getActiveLI();
        if (!isNullOrUndefined(hvrItem)) {
            var li = hvrItem.nextElementSibling;
            if (!isNullOrUndefined(li) && li.classList.contains(LISTCLASS)) {
                ej.base.removeClass([hvrItem], HOVER);
                addClass([li], HOVER);
            }
        }
        else if (!isNullOrUndefined(actItem)) {
            var li = actItem.nextElementSibling;
            if (!isNullOrUndefined(li) && li.classList.contains(LISTCLASS)) {
                addClass([li], HOVER);
            }
        }
        else {
            addClass([this.liCollections[0]], HOVER);
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    CustomDateRangePicker.prototype.listMoveUp = function (e) {
        var hvrItem = this.getHoverLI();
        var actItem = this.getActiveLI();
        if (!isNullOrUndefined(hvrItem)) {
            var li = hvrItem.previousElementSibling;
            if (!isNullOrUndefined(li) && li.classList.contains(LISTCLASS)) {
                ej.base.removeClass([hvrItem], HOVER);
                addClass([li], HOVER);
            }
        }
        else if (!isNullOrUndefined(actItem)) {
            var li = actItem.previousElementSibling;
            if (!isNullOrUndefined(li) && li.classList.contains(LISTCLASS)) {
                addClass([li], HOVER);
            }
        }
    };
    CustomDateRangePicker.prototype.getHoverLI = function () {
        var item = this.presetElement.querySelector('.' + HOVER);
        return item;
    };
    CustomDateRangePicker.prototype.getActiveLI = function () {
        var item = this.presetElement.querySelector('.' + ACTIVE$1);
        return item;
    };
    CustomDateRangePicker.prototype.popupKeyBoardHandler = function () {
        this.popupKeyboardModule = new KeyboardEvents(this.popupWrapper, {
            eventName: 'keydown',
            keyAction: this.popupKeyActionHandle.bind(this),
            keyConfigs: { escape: 'escape' }
        });
        this.keyInputConfigs = extend(this.keyInputConfigs, this.keyConfigs);
        this.popupKeyboardModule = new KeyboardEvents(this.inputWrapper.container.children[1], {
            eventName: 'keydown',
            keyAction: this.popupKeyActionHandle.bind(this),
            keyConfigs: this.keyInputConfigs
        });
    };
    CustomDateRangePicker.prototype.setScrollPosition = function () {
        var listHeight = this.presetElement.getBoundingClientRect().height;
        var hover = this.presetElement.querySelector('.' + HOVER);
        var active = this.presetElement.querySelector('.' + ACTIVE$1);
        var element = !isNullOrUndefined(hover) ? hover : active;
        if (!isNullOrUndefined(element)) {
            var nextEle = element.nextElementSibling;
            var height = nextEle ? nextEle.offsetTop : element.offsetTop;
            var liHeight = element.getBoundingClientRect().height;
            if ((height + element.offsetTop) > listHeight) {
                this.presetElement.scrollTop = nextEle ? (height - (listHeight / 2 + liHeight / 2)) : height;
            }
            else {
                this.presetElement.scrollTop = 0;
            }
        }
    };
    CustomDateRangePicker.prototype.popupKeyActionHandle = function (e) {
        var presetElement = closest(e.target, '.' + PRESETS);
        switch (e.action) {
            case 'escape':
                if (this.isPopupOpen()) {
                    if (this.isKeyPopup) {
                        this.inputElement.focus();
                        this.isKeyPopup = false;
                    }
                    this.hide(e);
                }
                else {
                    this.inputWrapper.container.children[1].blur();
                }
                break;
            case 'enter':
                if (!this.isPopupOpen()) {
                    this.show(null, e);
                }
                else {
                    this.inputWrapper.container.children[1].focus();
                }
                break;
            case 'tab':
                this.hide(e);
                break;
            case 'altRightArrow':
                if (!isNullOrUndefined(presetElement)) {
                    this.cancelButton.element.focus();
                }
                else {
                    if (document.activeElement === this.cancelButton.element && this.applyButton.element.disabled !== true) {
                        this.applyButton.element.focus();
                    }
                    else {
                        this.leftCalendar.children[1].firstElementChild.focus();
                    }
                }
                e.preventDefault();
                break;
            case 'altLeftArrow':
                if (!isNullOrUndefined(presetElement)) {
                    this.rightCalendar.children[1].firstElementChild.focus();
                }
                else {
                    if (document.activeElement === this.applyButton.element && this.applyButton.element.disabled !== true) {
                        this.cancelButton.element.focus();
                    }
                    else {
                        if (!isNullOrUndefined(this.presetElement) && (document.activeElement === this.cancelButton.element)) {
                            this.presetElement.focus();
                        }
                        else {
                            this.rightCalendar.children[1].firstElementChild.focus();
                        }
                    }
                }
                e.preventDefault();
                break;
        }
    };
    CustomDateRangePicker.prototype.documentHandler = function (e) {
        if (isNullOrUndefined(this.popupObj)) {
            return;
        }
        var target = e.target;
        if (!this.inputWrapper.container.contains(target) ||
            (!isNullOrUndefined(this.popupObj) && !closest(target, '[id="' + this.popupWrapper.id + '"]') && e.type !== 'mousedown')) {
            if (e.type !== 'touchstart' && ((e.type === 'mousedown') ||
                this.closeEventArgs && !this.closeEventArgs.cancel)) {
                e.preventDefault();
            }
        }
        if ((isNullOrUndefined(this.targetElement) ||
            (!isNullOrUndefined(this.targetElement) && !(target === this.targetElement))) &&
            !(closest(target, '[id="' + this.popupWrapper.id + '"]'))
            && !(closest(target, '.' + INPUTCONTAINER$1) === this.inputWrapper.container)
            && !(closest(target, '.e-daterangepicker.e-popup') && (!target.classList.contains('e-day')))) {
            this.preventBlur = false;
            if (this.isPopupOpen() && document.body.contains(this.popupObj.element)) {
                this.applyFunction(e);
                if (!this.isMobile) {
                    this.isRangeIconClicked = false;
                }
            }
        }
    };
    CustomDateRangePicker.prototype.createInput = function () {
        var updatedCssClassValue = this.cssClass;
        if (!isNullOrUndefined(this.cssClass) && this.cssClass !== '') {
            updatedCssClassValue = (this.cssClass.replace(/\s+/g, ' ')).trim();
        }
        this.inputWrapper = Input.createInput({
            floatLabelType: this.floatLabelType,
            element: this.inputElement,
            properties: {
                readonly: this.readonly,
                placeholder: this.placeholder,
                cssClass: updatedCssClassValue,
                enabled: this.enabled,
                enableRtl: this.enableRtl,
                showClearButton: this.showClearButton
            },
            buttons: [DATERANGEICON]
        }, this.createElement);
        attributes(this.inputElement, {
            'tabindex': '0', 'aria-expanded': 'false', 'role': 'combobox',
            'autocomplete': 'off', 'aria-disabled': !this.enabled ? 'true' : 'false',
            'autocorrect': 'off', 'autocapitalize': 'off', 'spellcheck': 'false'
        });
        Input.addAttributes({ 'aria-label': 'select' }, this.inputWrapper.buttons[0]);
        if (!isNullOrUndefined(this.placeholder) && this.placeholder.trim() !== '') {
            Input.addAttributes({ 'aria-placeholder': this.placeholder }, this.inputElement);
        }
        this.setEleWidth(this.width);
        addClass([this.inputWrapper.container], DATERANGEWRAPPER);
        if (isNullOrUndefined(this.inputElement.getAttribute('name'))) {
            attributes(this.inputElement, { 'name': this.element.id });
        }
        if (this.inputElement.type === 'hidden') {
            this.inputWrapper.container.style.display = 'none';
        }
        this.refreshControl();
        this.previousEleValue = this.inputElement.value;
        this.inputElement.setAttribute('value', this.inputElement.value);
        this.startCopy = this.startDate;
        this.endCopy = this.endDate;
    };
    CustomDateRangePicker.prototype.setEleWidth = function (width) {
        if (typeof width === 'string') {
            this.inputWrapper.container.style.width = (this.width);
        }
        else if (typeof width === 'number') {
            this.inputWrapper.container.style.width = formatUnit(this.width);
        }
        else {
            this.inputWrapper.container.style.width = '100%';
        }
    };
    CustomDateRangePicker.prototype.adjustLongHeaderWidth = function () {
        if (this.dayHeaderFormat === 'Wide') {
            addClass([this.popupWrapper], DAYHEADERLONG$1);
        }
    };
    CustomDateRangePicker.prototype.refreshControl = function () {
        this.validateMinMax();
        if (this.strictMode) {
            this.validateRangeStrict();
        }
        var isDisabled = this.disabledDates();
        if (this.strictMode && (isDisabled)) {
            this.startValue = this.previousStartValue;
            this.setProperties({ startDate: this.startValue }, true);
            this.endValue = this.previousEndValue;
            this.setProperties({ endDate: this.endValue }, true);
            this.setValue();
        }
        this.updateInput();
        if (!this.strictMode) {
            this.validateRange();
        }
        if (!this.strictMode && (isDisabled)) {
            this.clearRange();
        }
        if (!isNullOrUndefined(this.endValue) && !isNullOrUndefined(this.startValue) &&
            !isDisabled && !isNullOrUndefined(this.renderDayCellArgs) && this.renderDayCellArgs.isDisabled) {
            this.disabledDateRender();
        }
        this.errorClass();
        this.previousStartValue = isNullOrUndefined(this.startValue) || isNaN(+this.startValue) ? null : new Date(+this.startValue);
        this.previousEndValue = isNullOrUndefined(this.endValue) || isNaN(+this.endValue) ? null : new Date(+this.endValue);
    };
    CustomDateRangePicker.prototype.updateInput = function () {
        if (!isNullOrUndefined(this.endValue) && !isNullOrUndefined(this.startValue)) {
            var formatOption = { format: this.formatString, type: 'date', skeleton: 'yMd' };
            var startDate = this.globalize.formatDate(this.startValue, formatOption);
            var endDate = this.globalize.formatDate(this.endValue, formatOption);
            Input.setValue(startDate + ' ' + this.separator + ' ' + endDate, this.inputElement, this.floatLabelType, this.showClearButton);
            this.previousStartValue = new Date(+this.startValue);
            this.previousEndValue = new Date(+this.endValue);
        }
        if (!this.strictMode && isNullOrUndefined(this.value) && this.invalidValueString) {
            Input.setValue(this.invalidValueString, this.inputElement, this.floatLabelType, this.showClearButton);
        }
    };
    CustomDateRangePicker.prototype.checkInvalidRange = function (value) {
        if (!isNullOrUndefined(value)) {
            var invalid = false;
            var startinvalue = void 0;
            var endinvalue = void 0;
            var startString = null;
            var endString = null;
            var valueString = null;
            var startObject = false;
            var endObject = false;
            var invalidobject = false;
            if (typeof (value) === 'string') {
                var range = value.split(' ' + this.separator + ' ');
                if (range.length === 2) {
                    startString = range[0];
                    endString = range[1];
                }
                else {
                    invalid = true;
                    valueString = value;
                }
            }
            else {
                if (value.length > 0) {
                    startinvalue = value[0];
                    endinvalue = value[1];
                }
                else {
                    startinvalue = value.start;
                    endinvalue = value.end;
                }
                if (!(startinvalue instanceof Date) && typeof (startinvalue) !== 'object') {
                    startString = this.getstringvalue(startinvalue);
                }
                else if (startinvalue instanceof Date) {
                    startObject = true;
                }
                else if (!isNullOrUndefined(startinvalue)) {
                    invalidobject = true;
                }
                if (!(endinvalue instanceof Date) && typeof (endinvalue) !== 'object') {
                    endString = this.getstringvalue(endinvalue);
                }
                else if (endinvalue instanceof Date) {
                    endObject = true;
                }
                else if (!isNullOrUndefined(endinvalue)) {
                    invalidobject = true;
                }
            }
            if ((isNullOrUndefined(startString) && !startObject && !isNullOrUndefined(endString)) ||
                (!isNullOrUndefined(startString) && !endObject && isNullOrUndefined(endString))) {
                invalid = true;
            }
            if (invalidobject) {
                startString = endString = valueString = null;
                invalid = true;
            }
            if (startString) {
                invalid = invalid || this.checkInvalidValue(startString);
            }
            if (endString) {
                invalid = invalid || this.checkInvalidValue(endString);
            }
            if (invalid) {
                if (startObject && !invalidobject) {
                    startString = startinvalue.toLocaleDateString();
                }
                if (endObject && !invalidobject) {
                    endString = endinvalue.toLocaleDateString();
                }
                if (!isNullOrUndefined(startString) && !isNullOrUndefined(endString)) {
                    valueString = startString + ' ' + this.separator + ' ' + endString;
                }
                else if (!isNullOrUndefined(startString)) {
                    valueString = startString;
                }
                else if (!isNullOrUndefined(endString)) {
                    valueString = endString;
                }
                this.invalidValueString = valueString;
                this.setProperties({ value: null }, true);
                this.setProperties({ startValue: null }, true);
                this.setProperties({ endValue: null }, true);
                this.startDate = null;
                this.endDate = null;
            }
        }
    };
    CustomDateRangePicker.prototype.getstringvalue = function (value) {
        var stringValue = null;
        if (!isNullOrUndefined(value) && (typeof value === 'number')) {
            stringValue = (value).toString();
        }
        else if (!isNullOrUndefined(value) && (typeof value === 'string')) {
            stringValue = '' + value;
        }
        return stringValue;
    };
    CustomDateRangePicker.prototype.checkInvalidValue = function (value) {
        var valueString = value;
        var invalid = false;
        var formatOpt = null;
        formatOpt = { format: this.formatString, type: 'date', skeleton: 'yMd' };
        if (typeof valueString !== 'string') {
            invalid = true;
        }
        else {
            var globalize = new CustomInternationalization(this.locale);
            if (!this.checkDateValue(globalize.parseDate(valueString, formatOpt))) {
                var extISOStr = null;
                var basISOString = null;
                // eslint-disable-next-line
                extISOStr = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;
                // eslint-disable-next-line
                basISOString = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;
                if ((!extISOStr.test(valueString) && !basISOString.test(valueString))
                    || (/^[a-zA-Z0-9- ]*$/).test(valueString) || isNaN(+new Date(this.checkValue(valueString)))) {
                    invalid = true;
                }
            }
        }
        return invalid;
    };
    CustomDateRangePicker.prototype.isDateDisabled = function (date) {
        if (isNullOrUndefined(date)) {
            return false;
        }
        var value = new Date(+date);
        if (+value < +this.min || +value > +this.max) {
            return true;
        }
        this.virtualRenderCellArgs = {
            date: value,
            isDisabled: false
        };
        var args = this.virtualRenderCellArgs;
        this.virtualRenderCellEvent(args);
        if (args.isDisabled) {
            return true;
        }
        return false;
    };
    CustomDateRangePicker.prototype.disabledDateRender = function () {
        this.disabledDays = [];
        this.disabledDayCnt = null;
        var localDate = new Date(+this.startValue);
        var count = 0;
        while (+localDate <= +this.endValue && +this.endValue <= +this.max) {
            this.virtualRenderCellArgs = {
                date: localDate,
                isDisabled: false
            };
            var args = this.virtualRenderCellArgs;
            this.virtualRenderCellEvent(args);
            if (args.isDisabled) {
                this.disabledDays.push(new Date(+args.date));
                if (+localDate > +this.startValue && +localDate < +this.endValue) {
                    count++;
                }
            }
            this.addDay(localDate, 1, null, this.max, this.min);
        }
        this.disabledDayCnt = count;
    };
    CustomDateRangePicker.prototype.virtualRenderCellEvent = function (args) {
        extend(this.virtualRenderCellArgs, { name: 'renderDayCell' });
        this.trigger('renderDayCell', args);
    };
    CustomDateRangePicker.prototype.disabledDates = function () {
        var isStartDisabled = false;
        var isEndDisabled = false;
        if (!isNullOrUndefined(this.endValue) && !isNullOrUndefined(this.startValue)) {
            isStartDisabled = this.isDateDisabled(this.startValue);
            isEndDisabled = this.isDateDisabled(this.endValue);
            if (!this.isPopupOpen()) {
                this.currentDate = null;
            }
            this.setValue();
        }
        return (isStartDisabled || isEndDisabled);
    };
    CustomDateRangePicker.prototype.setModelValue = function () {
        if (!this.value && this.startDate === null && this.endDate === null) {
            this.setProperties({ value: null }, true);
        }
        else if (this.value === null || this.value.start === null) {
            if (this.value === null) {
                this.setProperties({ value: [this.startDate, this.endDate] }, true);
            }
            else if (this.value.start === null) {
                this.setProperties({ value: { start: this.startDate, end: this.endDate } }, true);
            }
        }
        else {
            if ((this.value && this.value.length > 0) ||
                this.valueType && this.valueType.length > 0) {
                if (+this.startDate !== +this.value[0] || +this.endDate !== +this.value[1]) {
                    this.setProperties({ value: [this.startDate, this.endDate] }, true);
                }
                if (this.value && this.value[0] == null && this.value[1] == null) {
                    this.setProperties({ value: null }, true);
                }
            }
            else {
                if ((this.value && this.value.start)) {
                    this.setProperties({ value: { start: this.startDate, end: this.endDate } }, true);
                }
            }
        }
        this.createHiddenInput();
    };
    /**
     * To dispatch the event manually
     *
     * @param {HTMLElement} element - Specifies the element to dispatch the event.
     * @param {string} type - Specifies the name of the event.
     * @returns {void}
     */
    CustomDateRangePicker.prototype.dispatchEvent = function (element, type) {
        var evt = document.createEvent('HTMLEvents');
        evt.initEvent(type, false, true);
        element.dispatchEvent(evt);
        this.firstHiddenChild.dispatchEvent(evt);
    };
    CustomDateRangePicker.prototype.changeTrigger = function (e) {
        if (+this.initStartDate !== +this.startValue || +this.initEndDate !== +this.endValue) {
            this.setProperties({ endDate: this.checkDateValue(this.endValue) }, true);
            this.setProperties({ startDate: this.checkDateValue(this.startValue) }, true);
            this.setModelValue();
            if (this.isAngular && this.preventChange) {
                this.preventChange = false;
            }
            else {
                this.trigger('change', this.rangeArgs(e));
            }
        }
        this.previousEleValue = this.inputElement.value;
        this.initStartDate = this.checkDateValue(this.startValue);
        this.initEndDate = this.checkDateValue(this.endValue);
    };
    /**
     * This method is used to navigate to the month/year/decade view of the Calendar.
     *
     * @param  {string} view - Specifies the view of the Calendar.
     * @param  {Date} date - Specifies the focused date in a view.
     * @returns {void}
     * @hidden
     */
    CustomDateRangePicker.prototype.navigateTo = function (view, date) {
        if (this.isPopupOpen()) {
            if (view.toLowerCase() === 'month') {
                view = 'Month';
            }
            else if (view.toLowerCase() === 'year') {
                view = 'Year';
            }
            else if (view.toLowerCase() === 'decade') {
                view = 'Decade';
            }
            else {
                return;
            }
            if (this.getViewNumber(view) < this.getViewNumber(this.depth)) {
                view = this.depth;
            }
            if (this.isMobile) {
                _super.prototype.navigateTo.call(this, view, date);
            }
            else {
                if (date < this.min) {
                    date = new Date(+this.min);
                }
                else if (date >= this.max) {
                    date = new Date(+this.max);
                }
                if (view === 'Month' && this.isSameMonth(date, this.max)) {
                    date = new Date(this.max.getFullYear(), this.max.getMonth() - 1, this.min.getDate());
                }
                else if (view === 'Year' && this.isSameYear(date, this.max)) {
                    date = new Date((this.max.getFullYear() - 1), this.max.getMonth(), this.max.getDate());
                }
                else if (view === 'Decade' && this.isSameDecade(date, this.max)) {
                    date = new Date((this.max.getFullYear() - 10), this.max.getMonth(), this.max.getDate());
                }
                this.leftCalCurrentDate = date;
                this.navigate(this.leftCalendar, this.leftCalCurrentDate, view);
                if (view === 'Month') {
                    date = new Date(this.currentDate.setMonth(this.currentDate.getMonth() + 1));
                }
                else if (view === 'Year') {
                    date = new Date(this.currentDate.setFullYear(this.currentDate.getFullYear() + 1));
                }
                else {
                    date = new Date(this.currentDate.setFullYear(this.currentDate.getFullYear() + 10));
                }
                this.rightCalCurrentDate = date;
                this.navigate(this.rightCalendar, this.rightCalCurrentDate, view);
                this.leftKeyboardModule = this.rightKeyboardModule = null;
                this.updateNavIcons();
            }
            if (this.currentView() === this.depth) {
                this.bindCalendarCellEvents();
            }
            this.removeFocusedDate();
            this.updateRange((this.isMobile ? [this.calendarElement] : [this.leftCalendar, this.rightCalendar]));
        }
    };
    CustomDateRangePicker.prototype.navigate = function (calendar, date, view) {
        this.calendarElement = calendar;
        this.table = calendar.querySelector('table');
        this.tableBodyElement = calendar.querySelector('tbody');
        this.headerTitleElement = calendar.querySelector('.e-title');
        this.tableHeadElement = calendar.querySelector('thead');
        this.contentElement = calendar.querySelector('.e-content');
        this.previousIcon = calendar.querySelector('.e-prev');
        this.nextIcon = calendar.querySelector('.e-next');
        this.effect = ZOOMIN$1;
        _super.prototype.navigateTo.call(this, view, date);
    };
    /**
     * Sets the focus to widget for interaction.
     *
     * @returns {void}
     */
    CustomDateRangePicker.prototype.focusIn = function () {
        if (document.activeElement !== this.inputElement && this.enabled) {
            addClass([this.inputWrapper.container], [INPUTFOCUS$1]);
            this.inputElement.focus();
        }
    };
    /**
     * Remove the focus from widget, if the widget is in focus state.
     *
     * @returns {void}
     */
    CustomDateRangePicker.prototype.focusOut = function () {
        var isBlur = this.preventBlur;
        if (document.activeElement === this.inputElement) {
            ej.base.removeClass([this.inputWrapper.container], [INPUTFOCUS$1]);
            this.preventBlur = false;
            this.inputElement.blur();
            this.preventBlur = isBlur;
        }
    };
    /**
     * To destroy the widget.
     *
     * @returns {void}
     */
    CustomDateRangePicker.prototype.destroy = function () {
        this.unBindEvents();
        this.hide(null);
        var ariaAttrs = {
            'tabindex': '0', 'aria-expanded': 'false', 'role': 'combobox',
            'autocomplete': 'off', 'aria-disabled': !this.enabled ? 'true' : 'false',
            'autocorrect': 'off', 'autocapitalize': 'off', 'aria-invalid': 'false', 'spellcheck': 'false'
        };
        if (this.inputElement) {
            ej.base.removeClass([this.inputElement], [ROOT$2]);
            EventHandler.remove(this.inputElement, 'blur', this.inputBlurHandler);
            Input.removeAttributes(ariaAttrs, this.inputElement);
            if (!isNullOrUndefined(this.cloneElement.getAttribute('tabindex'))) {
                this.inputElement.setAttribute('tabindex', this.tabIndex);
            }
            else {
                this.inputElement.removeAttribute('tabindex');
            }
            this.ensureInputAttribute();
            this.inputElement.classList.remove('e-input');
            if (!isNullOrUndefined(this.inputWrapper)) {
                EventHandler.remove(this.inputWrapper.buttons[0], 'mousedown', this.rangeIconHandler);
                if (this.angularTag === null) {
                    this.inputWrapper.container.parentElement.appendChild(this.inputElement);
                }
                detach(this.inputWrapper.container);
            }
        }
        if (!isNullOrUndefined(this.inputKeyboardModule) && !this.isMobile) {
            this.inputKeyboardModule.destroy();
        }
        if (this.popupObj) {
            if (!this.isMobile) {
                this.clearCalendarEvents();
            }
        }
        _super.prototype.destroy.call(this);
        this.inputWrapper = this.popupWrapper = this.popupObj = this.cloneElement = this.presetElement = null;
        if (this.formElement) {
            EventHandler.remove(this.formElement, 'reset', this.formResetHandler);
        }
        if ((!isNullOrUndefined(this.firstHiddenChild))
            && (!isNullOrUndefined(this.secondHiddenChild))) {
            detach(this.firstHiddenChild);
            detach(this.secondHiddenChild);
            this.firstHiddenChild = this.secondHiddenChild = null;
            this.inputElement.setAttribute('name', this.element.getAttribute('data-name'));
            this.inputElement.removeAttribute('data-name');
        }
        this.closeEventArgs = null;
        this.leftCalendar = null;
        this.rightTitle = null;
        this.leftTitle = null;
        this.openEventArgs = null;
        this.leftCalNextIcon = null;
        this.rightCalendar = null;
        this.closeEventArgs = null;
        this.rightCalPrevIcon = null;
        this.leftCalPrevIcon = null;
        this.popupKeyboardModule = null;
        this.cancelButton = null;
        this.applyButton = null;
        this.calendarElement = null;
        this.leftKeyboardModule = null;
        this.rightCalNextIcon = null;
        this.leftCalNextIcon = null;
        this.btnKeyboardModule = null;
        this.rightKeyboardModule = null;
        this.leftKeyboardModule = null;
        this.presetKeyboardModule = null;
        this.liCollections = null;
        this.popupObj = null;
        this.popupWrapper = null;
    };
    CustomDateRangePicker.prototype.ensureInputAttribute = function () {
        var attr = [];
        for (var i = 0; i < this.inputElement.attributes.length; i++) {
            attr[i] = this.inputElement.attributes[i].name;
        }
        for (var i = 0; i < attr.length; i++) {
            if (isNullOrUndefined(this.cloneElement.getAttribute(attr[i]))) {
                if (attr[i].toLowerCase() === 'value') {
                    this.inputElement.value = '';
                }
                this.inputElement.removeAttribute(attr[i]);
            }
            else {
                if (attr[i].toLowerCase() === 'value') {
                    this.inputElement.value = this.cloneElement.getAttribute(attr[i]);
                }
                this.inputElement.setAttribute(attr[i], this.cloneElement.getAttribute(attr[i]));
            }
        }
    };
    /**
     * To get component name
     *
     * @returns {string} Returns the component name.
     * @private
     */
    CustomDateRangePicker.prototype.getModuleName = function () {
        return 'daterangepicker';
    };
    /* eslint-disable valid-jsdoc, jsdoc/require-returns-description */
    /**
     * Return the properties that are maintained upon browser refresh.
     *
     * @returns {string}
     */
    CustomDateRangePicker.prototype.getPersistData = function () {
        var keyEntity = ['startDate', 'endDate', 'value'];
        return this.addOnPersist(keyEntity);
    };
    /**
     * Return the selected range and day span in the DateRangePicker.
     *
     * @returns {Object}
     */
    CustomDateRangePicker.prototype.getSelectedRange = function () {
        var range;
        if (!isNullOrUndefined(this.startValue) && !isNullOrUndefined(this.endValue)) {
            range = (Math.round(Math.abs((this.removeTimeValueFromDate(this.startValue).getTime() -
                this.removeTimeValueFromDate(this.endValue).getTime()) / (1000 * 60 * 60 * 24))) + 1);
            if (!isNullOrUndefined(this.renderDayCellArgs) && this.renderDayCellArgs.isDisabled) {
                this.disabledDateRender();
            }
            if (!isNullOrUndefined(this.disabledDayCnt)) {
                range = range - this.disabledDayCnt;
                this.disabledDayCnt = null;
            }
        }
        else {
            range = 0;
        }
        return { startDate: this.startValue, endDate: this.endValue, daySpan: range };
    };
    /* eslint-enable valid-jsdoc, jsdoc/require-returns-description */
    /* eslint-disable valid-jsdoc, jsdoc/require-param */
    /**
     * To open the Popup container in the DateRangePicker component.
     *
     * @param {HTMLElement} element - Specifies element.
     * @returns {void}
     */
    CustomDateRangePicker.prototype.show = function (element, event) {
        var _this = this;
        if (this.isMobile && this.popupObj) {
            this.popupObj.refreshPosition();
        }
        if ((this.enabled && this.readonly) || !this.enabled || this.popupObj) {
            return;
        }
        else {
            if (!this.isPopupOpen()) {
                if (element) {
                    this.targetElement = element;
                }
                this.createPopup();
                if (this.isMobile || Browser.isDevice) {
                    this.mobileRangePopupWrap = this.createElement('div', { className: 'e-daterangepick-mob-popup-wrap' });
                    document.body.appendChild(this.mobileRangePopupWrap);
                }
                this.openEventArgs = {
                    popup: this.popupObj || null,
                    cancel: false,
                    date: this.inputElement.value,
                    model: this,
                    event: event ? event : null,
                    appendTo: this.isMobile || Browser.isDevice ? this.mobileRangePopupWrap : document.body
                };
                var eventArgs = this.openEventArgs;
                this.trigger('open', eventArgs, function (eventArgs) {
                    _this.openEventArgs = eventArgs;
                    if (!_this.openEventArgs.cancel) {
                        _this.openEventArgs.appendTo.appendChild(_this.popupWrapper);
                        _this.showPopup(element, event);
                        var isPreset = (!_this.isCustomRange || (_this.isMobile && _this.isCustomRange));
                        if (!isUndefined(_this.presets[0].start && _this.presets[0].end && _this.presets[0].label) && isPreset) {
                            _this.setScrollPosition();
                        }
                        _this.checkMinMaxDays();
                        if ((_this.isMobile) && (!isNullOrUndefined(_this.startDate)) && (isNullOrUndefined(_this.endDate))) {
                            _this.endButton.element.classList.add(ACTIVE$1);
                            _this.startButton.element.classList.remove(ACTIVE$1);
                            _this.endButton.element.removeAttribute('disabled');
                            _this.selectableDates();
                        }
                        _super.prototype.setOverlayIndex.call(_this, _this.mobileRangePopupWrap, _this.popupObj.element, _this.modal,
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            _this.isMobile || Browser.isDevice);
                    }
                });
            }
        }
    };
    /**
     * To close the Popup container in the DateRangePicker component.
     *
     * @returns {void}
     */
    CustomDateRangePicker.prototype.hide = function (event) {
        var _this = this;
        if (this.popupObj) {
            if (isNullOrUndefined(this.previousEndValue) && isNullOrUndefined(this.previousStartValue)) {
                this.clearRange();
            }
            else {
                if (!isNullOrUndefined(this.previousStartValue)) {
                    this.startValue = new Date(this.checkValue(this.previousStartValue));
                    this.setValue();
                    this.currentDate = new Date(this.checkValue(this.startValue));
                }
                else {
                    this.startValue = null;
                    this.setValue();
                }
                if (!isNullOrUndefined(this.previousEndValue)) {
                    this.endValue = new Date(this.checkValue(this.previousEndValue));
                    this.setValue();
                }
                else {
                    this.endValue = null;
                    this.setValue();
                }
            }
            if (this.isPopupOpen()) {
                this.closeEventArgs = {
                    cancel: false,
                    popup: this.popupObj,
                    date: this.inputElement.value,
                    model: this,
                    event: event ? event : null
                };
                var eventArgs = this.closeEventArgs;
                this.trigger('close', eventArgs, function (eventArgs) {
                    _this.closeEventArgs = eventArgs;
                    if (!_this.closeEventArgs.cancel) {
                        if (_this.isMobile) {
                            if (!isNullOrUndefined(_this.startButton) && !isNullOrUndefined(_this.endButton)) {
                                EventHandler.remove(_this.startButton.element, 'click touchstart', _this.deviceHeaderClick);
                                EventHandler.remove(_this.endButton.element, 'click touchstart', _this.deviceHeaderClick);
                            }
                        }
                        if (_this.popupObj) {
                            _this.popupObj.hide();
                            if (_this.preventBlur) {
                                _this.inputElement.focus();
                                addClass([_this.inputWrapper.container], [INPUTFOCUS$1]);
                            }
                        }
                        if (!_this.isMobile) {
                            if (!isNullOrUndefined(_this.leftKeyboardModule) && !isNullOrUndefined(_this.rightKeyboardModule)) {
                                _this.leftKeyboardModule.destroy();
                                _this.rightKeyboardModule.destroy();
                            }
                            if (!isNullOrUndefined(_this.presetElement)) {
                                _this.presetKeyboardModule.destroy();
                            }
                            if (!isNullOrUndefined(_this.cancelButton)) {
                                _this.btnKeyboardModule.destroy();
                            }
                        }
                        _this.targetElement = null;
                        ej.base.removeClass([document.body], OVERFLOW$1);
                        EventHandler.remove(document, 'mousedown touchstart', _this.documentHandler);
                        if (_this.isMobile && _this.modal) {
                            _this.modal.style.display = 'none';
                            _this.modal.outerHTML = '';
                            _this.modal = null;
                        }
                        if (_this.isMobile || Browser.isDevice) {
                            if (!isNullOrUndefined(_this.mobileRangePopupWrap)) {
                                _this.mobileRangePopupWrap.remove();
                                _this.mobileRangePopupWrap = null;
                            }
                        }
                        _this.isKeyPopup = _this.dateDisabled = false;
                    }
                    else {
                        ej.base.removeClass([_this.inputWrapper.buttons[0]], ACTIVE$1);
                    }
                    _this.updateClearIconState();
                    _this.updateHiddenInput();
                    if (_this.isMobile && _this.allowEdit && !_this.readonly) {
                        _this.inputElement.removeAttribute('readonly');
                    }
                });
            }
        }
        else {
            this.updateClearIconState();
            this.updateHiddenInput();
            if (this.isMobile && this.allowEdit && !this.readonly) {
                this.inputElement.removeAttribute('readonly');
            }
        }
    };
    /* eslint-enable valid-jsdoc, jsdoc/require-param */
    CustomDateRangePicker.prototype.setLocale = function () {
        this.globalize = new CustomInternationalization(this.locale);
        this.l10n.setLocale(this.locale);
        this.setProperties({ placeholder: this.l10n.getConstant('placeholder') }, true);
        Input.setPlaceholder(this.placeholder, this.inputElement);
        this.updateInput();
        this.updateHiddenInput();
        this.changeTrigger();
    };
    CustomDateRangePicker.prototype.refreshChange = function () {
        this.checkView();
        this.refreshControl();
        this.changeTrigger();
    };
    CustomDateRangePicker.prototype.setDate = function () {
        Input.setValue('', this.inputElement, this.floatLabelType, this.showClearButton);
        this.refreshChange();
    };
    CustomDateRangePicker.prototype.enableInput = function () {
        if (+this.min <= +this.max) {
            this.setProperties({ enabled: true }, true);
            Input.setEnabled(this.enabled, this.inputElement);
            if (this.element.hasAttribute('disabled')) {
                this.bindEvents();
            }
        }
    };
    CustomDateRangePicker.prototype.clearModelvalue = function (newProp, oldProp) {
        this.setProperties({ startDate: null }, true);
        this.setProperties({ endDate: null }, true);
        if (oldProp.value && oldProp.value.length > 0) {
            this.setProperties({ value: null }, true);
        }
        else if (oldProp.value && oldProp.value.start) {
            this.setProperties({ value: { start: null, end: null } }, true);
        }
        else if (oldProp.value && !oldProp.value.start) {
            this.setProperties({ value: { start: null, end: null } }, true);
        }
        this.updateValue();
        this.setDate();
    };
    CustomDateRangePicker.prototype.createHiddenInput = function () {
        if (isNullOrUndefined(this.firstHiddenChild) && isNullOrUndefined(this.secondHiddenChild)) {
            this.firstHiddenChild = this.createElement('input');
            this.secondHiddenChild = this.createElement('input');
        }
        if (!isNullOrUndefined(this.inputElement.getAttribute('name'))) {
            this.inputElement.setAttribute('data-name', this.inputElement.getAttribute('name'));
            this.inputElement.removeAttribute('name');
        }
        attributes(this.firstHiddenChild, {
            'type': 'text', 'name': this.inputElement.getAttribute('data-name'), 'class': HIDDENELEMENT
        });
        attributes(this.secondHiddenChild, {
            'type': 'text', 'name': this.inputElement.getAttribute('data-name'), 'class': HIDDENELEMENT
        });
        var format = { type: 'datetime', skeleton: 'yMd' };
        this.firstHiddenChild.value = this.startDate && this.globalize.formatDate(this.startDate, format);
        this.secondHiddenChild.value = this.endDate && this.globalize.formatDate(this.endDate, format);
        this.inputElement.parentElement.appendChild(this.firstHiddenChild);
        this.inputElement.parentElement.appendChild(this.secondHiddenChild);
    };
    CustomDateRangePicker.prototype.setMinMaxDays = function () {
        if (this.isPopupOpen()) {
            this.removeClassDisabled();
            this.checkMinMaxDays();
            if (this.isMobile) {
                this.selectableDates();
            }
            if (!this.strictMode && (isNullOrUndefined(this.startValue) && isNullOrUndefined(this.endValue))) {
                this.removeSelection();
            }
            else {
                this.updateRange((this.isMobile ? [this.calendarElement] : [this.leftCalendar, this.rightCalendar]));
            }
            this.updateHeader();
        }
    };
    // eslint-disable-next-line @typescript-eslint/tslint/config
    CustomDateRangePicker.prototype.getStartEndValue = function (date, isEnd) {
        if (this.depth === 'Month') {
            return this.checkDateValue(new Date(this.checkValue(date)));
        }
        else if (this.depth === 'Year') {
            return new Date(date.getFullYear(), date.getMonth() + (isEnd ? 1 : 0), isEnd ? 0 : 1);
        }
        else {
            return new Date(date.getFullYear(), isEnd ? 11 : 0, isEnd ? 31 : 1);
        }
    };
    /**
     * Called internally if any of the property value changed.
     *
     * @param {DateRangePickerModel} newProp - Returns the dynamic property value of the component.
     * @param {DateRangePickerModel} oldProp - Returns the previous property value of the component.
     * @returns {void}
     * @private
     */
    CustomDateRangePicker.prototype.onPropertyChanged = function (newProp, oldProp) {
        var format = { format: this.formatString, type: 'date', skeleton: 'yMd' };
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            var openPopup = ['maxDays', 'minDays', 'value'];
            if (openPopup.indexOf(prop) < 0) {
                this.hide(null);
            }
            switch (prop) {
                case 'width':
                    this.setEleWidth(this.width);
                    Input.calculateWidth(this.inputElement, this.inputWrapper.container);
                    if (!isNullOrUndefined(this.inputWrapper.buttons[0]) && !isNullOrUndefined(this.inputWrapper.container.getElementsByClassName('e-float-text-overflow')[0]) && this.floatLabelType !== 'Never') {
                        this.inputWrapper.container.getElementsByClassName('e-float-text-overflow')[0].classList.add('e-icon');
                    }
                    break;
                case 'separator':
                    this.previousEleValue = this.inputElement.value;
                    this.setProperties({ separator: newProp.separator }, true);
                    this.updateInput();
                    this.changeTrigger();
                    break;
                case 'placeholder':
                    Input.setPlaceholder(newProp.placeholder, this.inputElement);
                    this.setProperties({ placeholder: newProp.placeholder }, true);
                    break;
                case 'readonly':
                    Input.setReadonly(this.readonly, this.inputElement);
                    this.setRangeAllowEdit();
                    break;
                case 'cssClass':
                    this.updateCssClass(newProp.cssClass, oldProp.cssClass);
                    break;
                case 'enabled':
                    this.setProperties({ enabled: newProp.enabled }, true);
                    Input.setEnabled(this.enabled, this.inputElement);
                    if (this.enabled) {
                        this.inputElement.setAttribute('tabindex', this.tabIndex);
                    }
                    else {
                        this.inputElement.tabIndex = -1;
                    }
                    break;
                case 'allowEdit':
                    this.setRangeAllowEdit();
                    break;
                case 'enableRtl':
                    this.setProperties({ enableRtl: newProp.enableRtl }, true);
                    Input.setEnableRtl(this.enableRtl, [this.inputWrapper.container]);
                    break;
                case 'zIndex':
                    this.setProperties({ zIndex: newProp.zIndex }, true);
                    break;
                case 'format':
                    this.setProperties({ format: newProp.format }, true);
                    this.checkFormat();
                    this.updateInput();
                    this.changeTrigger();
                    break;
                case 'locale':
                    this.globalize = new CustomInternationalization(this.locale);
                    this.l10n.setLocale(this.locale);
                    this.setProperties({ placeholder: this.l10n.getConstant('placeholder') }, true);
                    Input.setPlaceholder(this.placeholder, this.inputElement);
                    this.setLocale();
                    break;
                case 'htmlAttributes':
                    this.updateHtmlAttributeToElement();
                    this.updateHtmlAttributeToWrapper();
                    this.setDataAttribute(true);
                    this.checkHtmlAttributes(true);
                    break;
                case 'showClearButton':
                    Input.setClearButton(this.showClearButton, this.inputElement, this.inputWrapper);
                    this.bindClearEvent();
                    break;
                case 'startDate':
                    if (typeof newProp.startDate === 'string') {
                        newProp.startDate = this.globalize.parseDate(newProp.startDate, format);
                    }
                    if (+this.initStartDate !== +newProp.startDate) {
                        this.startValue = this.getStartEndValue(newProp.startDate, false);
                        this.setDate();
                        this.setValue();
                    }
                    break;
                case 'endDate':
                    if (typeof newProp.endDate === 'string') {
                        newProp.endDate = this.globalize.parseDate(newProp.endDate, format);
                    }
                    if (+this.initEndDate !== +newProp.endDate) {
                        this.endValue = this.getStartEndValue(newProp.endDate, true);
                        this.setDate();
                        this.setValue();
                    }
                    break;
                case 'value':
                    this.invalidValueString = null;
                    this.checkInvalidRange(newProp.value);
                    if (typeof (newProp.value) === 'string') {
                        if (!this.invalidValueString) {
                            var rangeArray = newProp.value.split(' ' + this.separator + ' ');
                            this.value = [new Date(rangeArray[0]), new Date(rangeArray[1])];
                            this.updateValue();
                            this.setDate();
                        }
                        else {
                            this.clearModelvalue(newProp, oldProp);
                        }
                    }
                    else {
                        if ((!isNullOrUndefined(newProp.value) && newProp.value.length > 0)
                            || !isNullOrUndefined(newProp.value) && newProp.value.start) {
                            this.valueType = newProp.value;
                            if (newProp.value[0] === null || (newProp.value.start === null)) {
                                if (newProp.value.length === 1 || (newProp.value.start)) {
                                    this.clearModelvalue(newProp, oldProp);
                                }
                                else if (newProp.value[1] === null ||
                                    (newProp.value.start === null)) {
                                    this.clearModelvalue(newProp, oldProp);
                                }
                            }
                            else if ((+this.initStartDate !== +newProp.value[0]
                                || +this.initEndDate !== +newProp.value[1]) ||
                                (+this.initStartDate !== +(newProp.value.start
                                    || +this.initEndDate !== +newProp.value.start))) {
                                if (newProp.value.length === 1) {
                                    this.modelValue = newProp.value;
                                }
                                else if (newProp.value.start) {
                                    this.modelValue = newProp.value;
                                }
                                this.updateValue();
                                this.setDate();
                            }
                        }
                        else {
                            if (isNullOrUndefined(this.value)
                                || newProp.value.start == null) {
                                this.valueType = newProp.value;
                                this.startValue = null;
                                this.endValue = null;
                                this.clearModelvalue(newProp, oldProp);
                            }
                        }
                    }
                    if (this.isPopupOpen()) {
                        if (isNullOrUndefined(this.startValue) && isNullOrUndefined(this.endValue)) {
                            this.removeSelection();
                            if (this.isMobile) {
                                this.deviceHeaderUpdate();
                            }
                            return;
                        }
                        if (this.isMobile) {
                            this.navigate(this.deviceCalendar, this.startValue, this.currentView());
                            this.deviceHeaderUpdate();
                        }
                        else {
                            this.navigate(this.leftCalendar, this.startValue, this.currentView());
                            this.updateControl(this.leftCalendar);
                            this.navigate(this.rightCalendar, this.endValue, this.currentView());
                            this.updateControl(this.rightCalendar);
                        }
                        this.updateRange((this.isMobile ? [this.calendarElement] : [this.leftCalendar, this.rightCalendar]));
                        this.updateHeader();
                        this.applyButton.disabled = this.applyButton.element.disabled = false;
                    }
                    this.preventChange = this.isAngular && this.preventChange ? !this.preventChange : this.preventChange;
                    break;
                case 'minDays':
                    this.setProperties({ minDays: newProp.minDays }, true);
                    this.refreshChange();
                    this.setMinMaxDays();
                    break;
                case 'maxDays':
                    this.setProperties({ maxDays: newProp.maxDays }, true);
                    this.refreshChange();
                    this.setMinMaxDays();
                    break;
                case 'min':
                    this.setProperties({ min: this.checkDateValue(new Date(this.checkValue(newProp.min))) }, true);
                    this.previousEleValue = this.inputElement.value;
                    this.enableInput();
                    this.refreshChange();
                    break;
                case 'max':
                    this.setProperties({ max: this.checkDateValue(new Date(this.checkValue(newProp.max))) }, true);
                    this.enableInput();
                    this.refreshChange();
                    break;
                case 'strictMode':
                    this.invalidValueString = null;
                    this.setProperties({ strictMode: newProp.strictMode }, true);
                    this.refreshChange();
                    break;
                case 'presets':
                    this.setProperties({ presets: newProp.presets }, true);
                    this.processPresets();
                    break;
                case 'floatLabelType':
                    this.floatLabelType = newProp.floatLabelType;
                    Input.removeFloating(this.inputWrapper);
                    Input.addFloating(this.inputElement, this.floatLabelType, this.placeholder);
                    if (!isNullOrUndefined(this.inputWrapper.buttons[0]) && !isNullOrUndefined(this.inputWrapper.container.getElementsByClassName('e-float-text-overflow')[0]) && this.floatLabelType !== 'Never') {
                        this.inputWrapper.container.getElementsByClassName('e-float-text-overflow')[0].classList.add('e-icon');
                    }
                    break;
                case 'start':
                    this.setProperties({ start: newProp.start }, true);
                    this.refreshChange();
                    break;
                case 'depth':
                    this.setProperties({ depth: newProp.depth }, true);
                    this.refreshChange();
                    break;
            }
        }
    };
    __decorate$2([
        Property(null)
    ], CustomDateRangePicker.prototype, "value", void 0);
    __decorate$2([
        Property(false)
    ], CustomDateRangePicker.prototype, "enablePersistence", void 0);
    __decorate$2([
        Property(new Date(1900, 0, 1))
    ], CustomDateRangePicker.prototype, "min", void 0);
    __decorate$2([
        Property(new Date(2099, 11, 31))
    ], CustomDateRangePicker.prototype, "max", void 0);
    __decorate$2([
        Property(null)
    ], CustomDateRangePicker.prototype, "locale", void 0);
    __decorate$2([
        Property(null)
    ], CustomDateRangePicker.prototype, "firstDayOfWeek", void 0);
    __decorate$2([
        Property(false)
    ], CustomDateRangePicker.prototype, "weekNumber", void 0);
    __decorate$2([
        Property('Gregorian')
    ], CustomDateRangePicker.prototype, "calendarMode", void 0);
    __decorate$2([
        Property(false)
    ], CustomDateRangePicker.prototype, "openOnFocus", void 0);
    __decorate$2([
        Event()
    ], CustomDateRangePicker.prototype, "created", void 0);
    __decorate$2([
        Event()
    ], CustomDateRangePicker.prototype, "destroyed", void 0);
    __decorate$2([
        Event()
    ], CustomDateRangePicker.prototype, "change", void 0);
    __decorate$2([
        Event()
    ], CustomDateRangePicker.prototype, "cleared", void 0);
    __decorate$2([
        Event()
    ], CustomDateRangePicker.prototype, "navigated", void 0);
    __decorate$2([
        Event()
    ], CustomDateRangePicker.prototype, "renderDayCell", void 0);
    __decorate$2([
        Property(null)
    ], CustomDateRangePicker.prototype, "startDate", void 0);
    __decorate$2([
        Property(null)
    ], CustomDateRangePicker.prototype, "endDate", void 0);
    __decorate$2([
        Collection([{}], Presets)
    ], CustomDateRangePicker.prototype, "presets", void 0);
    __decorate$2([
        Property('')
    ], CustomDateRangePicker.prototype, "width", void 0);
    __decorate$2([
        Property(1000)
    ], CustomDateRangePicker.prototype, "zIndex", void 0);
    __decorate$2([
        Property(true)
    ], CustomDateRangePicker.prototype, "showClearButton", void 0);
    __decorate$2([
        Property(true)
    ], CustomDateRangePicker.prototype, "showTodayButton", void 0);
    __decorate$2([
        Property('Month')
    ], CustomDateRangePicker.prototype, "start", void 0);
    __decorate$2([
        Property('Month')
    ], CustomDateRangePicker.prototype, "depth", void 0);
    __decorate$2([
        Property('')
    ], CustomDateRangePicker.prototype, "cssClass", void 0);
    __decorate$2([
        Property('-')
    ], CustomDateRangePicker.prototype, "separator", void 0);
    __decorate$2([
        Property(null)
    ], CustomDateRangePicker.prototype, "minDays", void 0);
    __decorate$2([
        Property(null)
    ], CustomDateRangePicker.prototype, "maxDays", void 0);
    __decorate$2([
        Property(false)
    ], CustomDateRangePicker.prototype, "strictMode", void 0);
    __decorate$2([
        Property(null)
    ], CustomDateRangePicker.prototype, "keyConfigs", void 0);
    __decorate$2([
        Property(null)
    ], CustomDateRangePicker.prototype, "format", void 0);
    __decorate$2([
        Property(true)
    ], CustomDateRangePicker.prototype, "enabled", void 0);
    __decorate$2([
        Property(false)
    ], CustomDateRangePicker.prototype, "readonly", void 0);
    __decorate$2([
        Property(true)
    ], CustomDateRangePicker.prototype, "allowEdit", void 0);
    __decorate$2([
        Property('Never')
    ], CustomDateRangePicker.prototype, "floatLabelType", void 0);
    __decorate$2([
        Property(null)
    ], CustomDateRangePicker.prototype, "placeholder", void 0);
    __decorate$2([
        Property({})
    ], CustomDateRangePicker.prototype, "htmlAttributes", void 0);
    __decorate$2([
        Event()
    ], CustomDateRangePicker.prototype, "open", void 0);
    __decorate$2([
        Event()
    ], CustomDateRangePicker.prototype, "close", void 0);
    __decorate$2([
        Event()
    ], CustomDateRangePicker.prototype, "select", void 0);
    __decorate$2([
        Event()
    ], CustomDateRangePicker.prototype, "focus", void 0);
    __decorate$2([
        Event()
    ], CustomDateRangePicker.prototype, "blur", void 0);
    CustomDateRangePicker = __decorate$2([
        NotifyPropertyChanges
    ], CustomDateRangePicker);
    return CustomDateRangePicker;
}(CustomCalendarBase));


var __extends$4 = (undefined && undefined.__extends) || (function () {
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
var __decorate$4 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
///<reference path='../datepicker/datepicker-model.d.ts'/>
//class constant defination
var DATEWRAPPER$1 = 'e-date-wrapper';
var DATEPICKERROOT = 'e-datepicker';
var DATETIMEWRAPPER = 'e-datetime-wrapper';
var DAY$1 = new Date().getDate();
var MONTH$3 = new Date().getMonth();
var YEAR$3 = new Date().getFullYear();
var HOUR = new Date().getHours();
var MINUTE = new Date().getMinutes();
var SECOND = new Date().getSeconds();
var MILLISECOND = new Date().getMilliseconds();
var ROOT$4 = 'e-datetimepicker';
var DATETIMEPOPUPWRAPPER = 'e-datetimepopup-wrapper';
var INPUTWRAPPER$1 = 'e-input-group-icon';
var POPUP$3 = 'e-popup';
var TIMEICON$1 = 'e-time-icon';
var INPUTFOCUS$2 = 'e-input-focus';
var POPUPDIMENSION$1 = '250px';
var ICONANIMATION$1 = 'e-icon-anim';
var DISABLED$4 = 'e-disabled';
var ERROR$3 = 'e-error';
var CONTENT$3 = 'e-content';
var NAVIGATION$1 = 'e-navigation';
var ACTIVE$2 = 'e-active';
var HOVER$2 = 'e-hover';
var ICONS$1 = 'e-icons';
var HALFPOSITION$1 = 2;
var LISTCLASS$2 = 'e-list-item';
var ANIMATIONDURATION$1 = 100;
var OVERFLOW$3 = 'e-time-overflow';
/**
 * Represents the DateTimePicker component that allows user to select
 * or enter a date time value.
 * ```html
 * <input id="dateTimePicker"/>
 * ```
 * ```typescript
 * <script>
 *   let dateTimePickerObject:DateTimePicker = new DateTimePicker({ value: new Date() });
 *   dateTimePickerObject.appendTo("#dateTimePicker");
 * </script>
 * ```
 */
var CustomDateTimePicker = /** @__PURE__ @class */ (function (_super) {
    _super.Inject(BikramSambat);
    _super.Inject(ej.calendars.MaskedDateTime);
    __extends$4(CustomDateTimePicker, _super);
    /**
     * Constructor for creating the widget
     *
     * @param {DateTimePickerModel} options - Specifies the DateTimePicker model.
     * @param {string | HTMLInputElement} element - Specifies the element to render as component.
     * @private
     */
    function CustomDateTimePicker(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.valueWithMinutes = null;
        _this.scrollInvoked = false;
        _this.moduleName = _this.getModuleName();
        _this.dateTimeOptions = options;
        return _this;
    }
    CustomDateTimePicker.prototype.focusHandler = function () {
        if (!this.enabled) {
            return;
        }
        addClass([this.inputWrapper.container], INPUTFOCUS$2);
    };
    /**
     * Sets the focus to widget for interaction.
     *
     * @returns {void}
     */
    CustomDateTimePicker.prototype.focusIn = function () {
        _super.prototype.focusIn.call(this);
    };
    /**
     * Remove the focus from widget, if the widget is in focus state.
     *
     * @returns {void}
     */
    CustomDateTimePicker.prototype.focusOut = function () {
        if (document.activeElement === this.inputElement) {
            this.inputElement.blur();
            removeClass([this.inputWrapper.container], [INPUTFOCUS$2]);
        }
    };
    CustomDateTimePicker.prototype.blurHandler = function (e) {
        if (!this.enabled) {
            return;
        }
        // IE popup closing issue when click over the scrollbar
        if (this.isTimePopupOpen() && this.isPreventBlur) {
            this.inputElement.focus();
            return;
        }
        removeClass([this.inputWrapper.container], INPUTFOCUS$2);
        var blurArguments = {
            model: this
        };
        if (this.isTimePopupOpen()) {
            this.hide(e);
        }
        this.trigger('blur', blurArguments);
    };
    /**
     * To destroy the widget.
     *
     * @returns {void}
     */
    CustomDateTimePicker.prototype.destroy = function () {
        if (this.popupObject && this.popupObject.element.classList.contains(POPUP$3)) {
            this.popupObject.destroy();
            detach(this.dateTimeWrapper);
            this.dateTimeWrapper = undefined;
            this.liCollections = this.timeCollections = [];
            if (!isNullOrUndefined(this.rippleFn)) {
                this.rippleFn();
            }
        }
        var ariaAttribute = {
            'aria-live': 'assertive', 'aria-atomic': 'true', 'aria-invalid': 'false',
            'autocorrect': 'off', 'autocapitalize': 'off', 'spellcheck': 'false',
            'aria-expanded': 'false', 'role': 'combobox', 'autocomplete': 'off'
        };
        if (this.inputElement) {
            Input.removeAttributes(ariaAttribute, this.inputElement);
        }
        if (this.isCalendar()) {
            if (this.popupWrapper) {
                detach(this.popupWrapper);
            }
            this.popupObject = this.popupWrapper = null;
            this.keyboardHandler.destroy();
        }
        this.unBindInputEvents();
        this.liCollections = null;
        this.rippleFn = null;
        this.selectedElement = null;
        this.listTag = null;
        this.timeIcon = null;
        this.popupObject = null;
        this.preventArgs = null;
        this.keyboardModule = null;
        _super.prototype.destroy.call(this);
    };
    /**
     * To Initialize the control rendering.
     *
     * @returns {void}
     * @private
     */
    CustomDateTimePicker.prototype.render = function () {
        this.timekeyConfigure = {
            enter: 'enter',
            escape: 'escape',
            end: 'end',
            tab: 'tab',
            home: 'home',
            down: 'downarrow',
            up: 'uparrow',
            left: 'leftarrow',
            right: 'rightarrow',
            open: 'alt+downarrow',
            close: 'alt+uparrow'
        };
        this.valueWithMinutes = null;
        this.previousDateTime = null;
        this.isPreventBlur = false;
        this.cloneElement = this.element.cloneNode(true);
        this.dateTimeFormat = this.cldrDateTimeFormat();
        this.initValue = this.value;
        if (!isNullOrUndefined(closest(this.element, 'fieldset')) && closest(this.element, 'fieldset').disabled) {
            this.enabled = false;
        }
        _super.prototype.updateHtmlAttributeToElement.call(this);
        this.checkAttributes(false);
        var localeText = { placeholder: this.placeholder };
        this.l10n = new L10n('datetimepicker', localeText, this.locale);
        this.setProperties({ placeholder: this.placeholder || this.l10n.getConstant('placeholder') }, true);
        _super.prototype.render.call(this);
        this.createInputElement();
        _super.prototype.updateHtmlAttributeToWrapper.call(this);
        this.bindInputEvents();
        if (this.enableMask) {
            this.notify('createMask', {
                module: 'MaskedDateTime'
            });
        }
        this.setValue(true);
        if (this.enableMask && !this.value && this.maskedDateValue && (this.floatLabelType === 'Always' || !this.floatLabelType || !this.placeholder)) {
            Input.setValue(this.maskedDateValue, this.inputElement, this.floatLabelType, this.showClearButton);
        }
        this.setProperties({ scrollTo: this.checkDateValue(new Date(this.checkValue(this.scrollTo))) }, true);
        this.previousDateTime = this.value && new Date(+this.value);
        if (this.element.tagName === 'EJS-DATETIMEPICKER') {
            this.tabIndex = this.element.hasAttribute('tabindex') ? this.element.getAttribute('tabindex') : '0';
            this.element.removeAttribute('tabindex');
            if (!this.enabled) {
                this.inputElement.tabIndex = -1;
            }
        }
        Input.calculateWidth(this.inputElement, this.inputWrapper.container);
        if (!isNullOrUndefined(this.inputWrapper.buttons[0]) && !isNullOrUndefined(this.inputWrapper.container.getElementsByClassName('e-float-text-overflow')[0]) && this.floatLabelType !== 'Never') {
            this.inputWrapper.container.getElementsByClassName('e-float-text-overflow')[0].classList.add('e-date-time-icon');
        }
        this.renderComplete();
    };
    CustomDateTimePicker.prototype.setValue = function (isDynamic) {
        if (isDynamic === void 0) { isDynamic = false; }
        this.initValue = this.validateMinMaxRange(this.value);
        if (!this.strictMode && this.isDateObject(this.initValue)) {
            var value = this.validateMinMaxRange(this.initValue);
            Input.setValue(this.getFormattedValue(value), this.inputElement, this.floatLabelType, this.showClearButton);
            this.setProperties({ value: value }, true);
        }
        else {
            if (isNullOrUndefined(this.value)) {
                this.initValue = null;
                this.setProperties({ value: null }, true);
            }
        }
        this.valueWithMinutes = this.value;
        _super.prototype.updateInput.call(this, isDynamic);
    };
    CustomDateTimePicker.prototype.validateMinMaxRange = function (value) {
        var result = value;
        if (this.isDateObject(value)) {
            result = this.validateValue(value);
        }
        else {
            if (+this.min > +this.max) {
                this.disablePopupButton(true);
            }
        }
        this.checkValidState(result);
        return result;
    };
    CustomDateTimePicker.prototype.checkValidState = function (value) {
        this.isValidState = true;
        if (!this.strictMode) {
            if ((+(value) > +(this.max)) || (+(value) < +(this.min))) {
                this.isValidState = false;
            }
        }
        this.checkErrorState();
    };
    CustomDateTimePicker.prototype.checkErrorState = function () {
        if (this.isValidState) {
            removeClass([this.inputWrapper.container], ERROR$3);
        }
        else {
            addClass([this.inputWrapper.container], ERROR$3);
        }
        attributes(this.inputElement, { 'aria-invalid': this.isValidState ? 'false' : 'true' });
    };
    CustomDateTimePicker.prototype.validateValue = function (value) {
        var dateVal = value;
        if (this.strictMode) {
            if (+this.min > +this.max) {
                this.disablePopupButton(true);
                dateVal = this.max;
            }
            else if (+value < +this.min) {
                dateVal = this.min;
            }
            else if (+value > +this.max) {
                dateVal = this.max;
            }
        }
        else {
            if (+this.min > +this.max) {
                this.disablePopupButton(true);
                dateVal = value;
            }
        }
        return dateVal;
    };
    CustomDateTimePicker.prototype.disablePopupButton = function (isDisable) {
        if (isDisable) {
            addClass([this.inputWrapper.buttons[0], this.timeIcon], DISABLED$4);
            this.hide();
        }
        else {
            removeClass([this.inputWrapper.buttons[0], this.timeIcon], DISABLED$4);
        }
    };
    CustomDateTimePicker.prototype.getFormattedValue = function (value) {
        var dateOptions;
        if (!isNullOrUndefined(value)) {
            if (this.calendarMode === 'Gregorian') {
                dateOptions = { format: this.cldrDateTimeFormat(), type: 'dateTime', skeleton: 'yMd' };
            }
            else {
                dateOptions = { format: this.cldrDateTimeFormat(), type: 'dateTime', skeleton: 'yMd', calendar: 'bs' };
            }
            return this.globalize.formatDate(value, dateOptions);
        }
        else {
            return null;
        }
    };
    CustomDateTimePicker.prototype.isDateObject = function (value) {
        return (!isNullOrUndefined(value) && !isNaN(+value)) ? true : false;
    };
    CustomDateTimePicker.prototype.createInputElement = function () {
        removeClass([this.inputElement], DATEPICKERROOT);
        removeClass([this.inputWrapper.container], DATEWRAPPER$1);
        addClass([this.inputWrapper.container], DATETIMEWRAPPER);
        addClass([this.inputElement], ROOT$4);
        this.renderTimeIcon();
    };
    CustomDateTimePicker.prototype.renderTimeIcon = function () {
        this.timeIcon = Input.appendSpan(INPUTWRAPPER$1 + ' ' + TIMEICON$1 + ' ' + ICONS$1, this.inputWrapper.container);
    };
    CustomDateTimePicker.prototype.bindInputEvents = function () {
        EventHandler.add(this.timeIcon, 'mousedown', this.timeHandler, this);
        EventHandler.add(this.inputWrapper.buttons[0], 'mousedown', this.dateHandler, this);
        EventHandler.add(this.inputElement, 'blur', this.blurHandler, this);
        EventHandler.add(this.inputElement, 'focus', this.focusHandler, this);
        this.defaultKeyConfigs = extend(this.defaultKeyConfigs, this.keyConfigs);
        this.keyboardHandler = new KeyboardEvents(this.inputElement, {
            eventName: 'keydown',
            keyAction: this.inputKeyAction.bind(this),
            keyConfigs: this.defaultKeyConfigs
        });
    };
    CustomDateTimePicker.prototype.unBindInputEvents = function () {
        EventHandler.remove(this.timeIcon, 'mousedown touchstart', this.timeHandler);
        EventHandler.remove(this.inputWrapper.buttons[0], 'mousedown touchstart', this.dateHandler);
        if (this.inputElement) {
            EventHandler.remove(this.inputElement, 'blur', this.blurHandler);
            EventHandler.remove(this.inputElement, 'focus', this.focusHandler);
        }
        if (this.keyboardHandler) {
            this.keyboardHandler.destroy();
        }
    };
    CustomDateTimePicker.prototype.cldrTimeFormat = function () {
        var cldrTime;
        if (this.isNullOrEmpty(this.timeFormat)) {
            if (this.locale === 'en' || this.locale === 'en-US') {
                cldrTime = (getValue('timeFormats.short', getDefaultDateObject()));
            }
            else {
                cldrTime = (this.getCultureTimeObject(cldrData, '' + this.locale));
            }
        }
        else {
            cldrTime = this.timeFormat;
        }
        return cldrTime;
    };
    CustomDateTimePicker.prototype.cldrDateTimeFormat = function () {
        var cldrTime;
        var culture = new Internationalization(this.locale);
        var dateFormat = culture.getDatePattern({ skeleton: 'yMd' });
        if (this.isNullOrEmpty(this.formatString)) {
            cldrTime = dateFormat + ' ' + this.getCldrFormat('time');
        }
        else {
            cldrTime = this.formatString;
        }
        return cldrTime;
    };
    CustomDateTimePicker.prototype.getCldrFormat = function (type) {
        var cldrDateTime;
        if (this.locale === 'en' || this.locale === 'en-US') {
            cldrDateTime = (getValue('timeFormats.short', getDefaultDateObject()));
        }
        else {
            cldrDateTime = (this.getCultureTimeObject(cldrData, '' + this.locale));
        }
        return cldrDateTime;
    };
    CustomDateTimePicker.prototype.isNullOrEmpty = function (value) {
        if (isNullOrUndefined(value) || (typeof value === 'string' && value.trim() === '')) {
            return true;
        }
        else {
            return false;
        }
    };
    CustomDateTimePicker.prototype.getCultureTimeObject = function (ld, c) {
        if (this.calendarMode === 'Gregorian') {
            return getValue('main.' + '' + this.locale + '.dates.calendars.gregorian.timeFormats.short', ld);
        }
        else {
            return getValue('main.' + '' + this.locale + '.dates.calendars.bs.timeFormats.short', ld);
        }
    };
    CustomDateTimePicker.prototype.timeHandler = function (e) {
        if (!this.enabled) {
            return;
        }
        this.isIconClicked = true;
        if (Browser.isDevice) {
            this.inputElement.setAttribute('readonly', '');
        }
        if (e.currentTarget === this.timeIcon) {
            e.preventDefault();
        }
        if (this.enabled && !this.readonly) {
            if (this.isDatePopupOpen()) {
                _super.prototype.hide.call(this, e);
            }
            if (this.isTimePopupOpen()) {
                this.closePopup(e);
            }
            else {
                this.inputElement.focus();
                this.popupCreation('time', e);
                addClass([this.inputWrapper.container], [INPUTFOCUS$2]);
            }
        }
        this.isIconClicked = false;
    };
    CustomDateTimePicker.prototype.dateHandler = function (e) {
        if (!this.enabled) {
            return;
        }
        if (e.currentTarget === this.inputWrapper.buttons[0]) {
            e.preventDefault();
        }
        if (this.enabled && !this.readonly) {
            if (this.isTimePopupOpen()) {
                this.closePopup(e);
            }
            if (!isNullOrUndefined(this.popupWrapper)) {
                this.popupCreation('date', e);
            }
        }
    };
    CustomDateTimePicker.prototype.show = function (type, e) {
        if ((this.enabled && this.readonly) || !this.enabled) {
            return;
        }
        else {
            if (type === 'time' && !this.dateTimeWrapper) {
                if (this.isDatePopupOpen()) {
                    this.hide(e);
                }
                this.popupCreation('time', e);
            }
            else if (!this.popupObj) {
                if (this.isTimePopupOpen()) {
                    this.hide(e);
                }
                _super.prototype.show.call(this);
                this.popupCreation('date', e);
            }
        }
    };
    CustomDateTimePicker.prototype.toggle = function (e) {
        if (this.isDatePopupOpen()) {
            _super.prototype.hide.call(this, e);
            this.show('time', null);
        }
        else if (this.isTimePopupOpen()) {
            this.hide(e);
            _super.prototype.show.call(this, null, e);
            this.popupCreation('date', null);
        }
        else {
            this.show(null, e);
        }
    };
    CustomDateTimePicker.prototype.listCreation = function () {
        var dateObject;
        if (this.calendarMode === 'Gregorian') {
            dateObject = this.globalize.parseDate(this.inputElement.value, {
                format: this.cldrDateTimeFormat(), type: 'datetime'
            });
        }
        else {
            dateObject = this.globalize.parseDate(this.inputElement.value, {
                format: this.cldrDateTimeFormat(), type: 'datetime', calendar: 'bs'
            });
        }
        var value = isNullOrUndefined(this.value) ? this.inputElement.value !== '' ?
            dateObject : new Date() : this.value;
        this.valueWithMinutes = value;
        this.listWrapper = createElement('div', { className: CONTENT$3, attrs: { 'tabindex': '0' } });
        var min = this.startTime(value);
        var max = this.endTime(value);
        var listDetails = TimePickerBase.createListItems(this.createElement, min, max, this.globalize, this.cldrTimeFormat(), this.step);
        this.timeCollections = listDetails.collection;
        this.listTag = listDetails.list;
        attributes(this.listTag, { 'role': 'listbox', 'aria-hidden': 'false', 'id': this.element.id + '_options' });
        append([listDetails.list], this.listWrapper);
        this.wireTimeListEvents();
        var rippleModel = { duration: 300, selector: '.' + LISTCLASS$2 };
        this.rippleFn = rippleEffect(this.listWrapper, rippleModel);
        this.liCollections = this.listWrapper.querySelectorAll('.' + LISTCLASS$2);
    };
    CustomDateTimePicker.prototype.popupCreation = function (type, e) {
        if (Browser.isDevice) {
            this.element.setAttribute('readonly', 'readonly');
        }
        if (type === 'date') {
            if (!this.readonly && this.popupWrapper) {
                addClass([this.popupWrapper], DATETIMEPOPUPWRAPPER);
                attributes(this.popupWrapper, { 'id': this.element.id + '_datepopup' });
            }
        }
        else {
            if (!this.readonly) {
                this.dateTimeWrapper = createElement('div', {
                    className: ROOT$4 + ' ' + POPUP$3,
                    attrs: { 'id': this.element.id + '_timepopup', 'style': 'visibility:hidden ; display:block' }
                });
                if (!isNullOrUndefined(this.cssClass)) {
                    this.dateTimeWrapper.className += ' ' + this.cssClass;
                }
                if (!isNullOrUndefined(this.step) && this.step > 0) {
                    this.listCreation();
                    append([this.listWrapper], this.dateTimeWrapper);
                }
                document.body.appendChild(this.dateTimeWrapper);
                this.addTimeSelection();
                this.renderPopup();
                this.setTimeScrollPosition();
                this.openPopup(e);
                this.popupObject.refreshPosition(this.inputElement);
            }
        }
    };
    CustomDateTimePicker.prototype.openPopup = function (e) {
        var _this = this;
        this.preventArgs = {
            cancel: false,
            popup: this.popupObject,
            event: e || null
        };
        var eventArgs = this.preventArgs;
        this.trigger('open', eventArgs, function (eventArgs) {
            _this.preventArgs = eventArgs;
            if (!_this.preventArgs.cancel && !_this.readonly) {
                var openAnimation = {
                    name: 'FadeIn',
                    duration: ANIMATIONDURATION$1
                };
                if (_this.zIndex === 1000) {
                    _this.popupObject.show(new Animation(openAnimation), _this.element);
                }
                else {
                    _this.popupObject.show(new Animation(openAnimation), null);
                }
                addClass([_this.inputWrapper.container], [ICONANIMATION$1]);
                attributes(_this.inputElement, { 'aria-expanded': 'true' });
                attributes(_this.inputElement, { 'aria-owns': _this.inputElement.id + '_options' });
                EventHandler.add(document, 'mousedown touchstart', _this.documentClickHandler, _this);
            }
        });
    };
    CustomDateTimePicker.prototype.documentClickHandler = function (event) {
        var target = event.target;
        if ((!isNullOrUndefined(this.popupObject) && (this.inputWrapper.container.contains(target) && event.type !== 'mousedown' ||
            (this.popupObject.element && this.popupObject.element.contains(target)))) && event.type !== 'touchstart') {
            event.preventDefault();
        }
        if (!(closest(target, '[id="' + (this.popupObject && this.popupObject.element.id + '"]'))) && target !== this.inputElement
            && target !== this.timeIcon && !isNullOrUndefined(this.inputWrapper) && target !== this.inputWrapper.container) {
            if (this.isTimePopupOpen()) {
                this.hide(event);
                this.focusOut();
            }
        }
        else if (target !== this.inputElement) {
            if (!Browser.isDevice) {
                this.isPreventBlur = ((document.activeElement === this.inputElement) && (Browser.isIE || Browser.info.name === 'edge')
                    && target === this.popupObject.element);
            }
        }
    };
    CustomDateTimePicker.prototype.isTimePopupOpen = function () {
        return (this.dateTimeWrapper && this.dateTimeWrapper.classList.contains('' + ROOT$4)) ? true : false;
    };
    CustomDateTimePicker.prototype.isDatePopupOpen = function () {
        return (this.popupWrapper && this.popupWrapper.classList.contains('' + DATETIMEPOPUPWRAPPER)) ? true : false;
    };
    CustomDateTimePicker.prototype.renderPopup = function () {
        var _this = this;
        this.containerStyle = this.inputWrapper.container.getBoundingClientRect();
        if (Browser.isDevice) {
            this.timeModal = createElement('div');
            this.timeModal.className = '' + ROOT$4 + ' e-time-modal';
            document.body.className += ' ' + OVERFLOW$3;
            this.timeModal.style.display = 'block';
            document.body.appendChild(this.timeModal);
        }
        var offset = 4;
        this.popupObject = new Popup(this.dateTimeWrapper, {
            width: this.setPopupWidth(),
            zIndex: this.zIndex,
            targetType: 'container',
            collision: Browser.isDevice ? { X: 'fit', Y: 'fit' } : { X: 'flip', Y: 'flip' },
            relateTo: Browser.isDevice ? document.body : this.inputWrapper.container,
            position: Browser.isDevice ? { X: 'center', Y: 'center' } : { X: 'left', Y: 'bottom' },
            enableRtl: this.enableRtl,
            offsetY: offset,
            open: function () {
                _this.dateTimeWrapper.style.visibility = 'visible';
                addClass([_this.timeIcon], ACTIVE$2);
                if (!Browser.isDevice) {
                    _this.timekeyConfigure = extend(_this.timekeyConfigure, _this.keyConfigs);
                    _this.inputEvent = new KeyboardEvents(_this.inputWrapper.container, {
                        keyAction: _this.timeKeyActionHandle.bind(_this),
                        keyConfigs: _this.timekeyConfigure,
                        eventName: 'keydown'
                    });
                }
            }, close: function () {
                removeClass([_this.timeIcon], ACTIVE$2);
                _this.unWireTimeListEvents();
                _this.inputElement.removeAttribute('aria-activedescendant');
                remove(_this.popupObject.element);
                _this.popupObject.destroy();
                _this.dateTimeWrapper.innerHTML = '';
                _this.listWrapper = _this.dateTimeWrapper = undefined;
                if (_this.inputEvent) {
                    _this.inputEvent.destroy();
                }
            }, targetExitViewport: function () {
                if (!Browser.isDevice) {
                    _this.hide();
                }
            }
        });
        this.popupObject.element.style.maxHeight = POPUPDIMENSION$1;
    };
    CustomDateTimePicker.prototype.setDimension = function (width) {
        if (typeof width === 'number') {
            width = formatUnit(width);
        }
        else if (typeof width === 'string') {
            // eslint-disable-next-line no-self-assign
            width = width;
        }
        else {
            width = '100%';
        }
        return width;
    };
    CustomDateTimePicker.prototype.setPopupWidth = function () {
        var width = this.setDimension(this.width);
        if (width.indexOf('%') > -1) {
            var inputWidth = this.containerStyle.width * parseFloat(width) / 100;
            width = inputWidth.toString() + 'px';
        }
        return width;
    };
    CustomDateTimePicker.prototype.wireTimeListEvents = function () {
        EventHandler.add(this.listWrapper, 'click', this.onMouseClick, this);
        if (!Browser.isDevice) {
            EventHandler.add(this.listWrapper, 'mouseover', this.onMouseOver, this);
            EventHandler.add(this.listWrapper, 'mouseout', this.onMouseLeave, this);
        }
    };
    CustomDateTimePicker.prototype.unWireTimeListEvents = function () {
        if (this.listWrapper) {
            EventHandler.remove(this.listWrapper, 'click', this.onMouseClick);
            EventHandler.remove(document, 'mousedown touchstart', this.documentClickHandler);
            if (!Browser.isDevice) {
                EventHandler.add(this.listWrapper, 'mouseover', this.onMouseOver, this);
                EventHandler.add(this.listWrapper, 'mouseout', this.onMouseLeave, this);
            }
        }
    };
    CustomDateTimePicker.prototype.onMouseOver = function (event) {
        var currentLi = closest(event.target, '.' + LISTCLASS$2);
        this.setTimeHover(currentLi, HOVER$2);
    };
    CustomDateTimePicker.prototype.onMouseLeave = function () {
        this.removeTimeHover(HOVER$2);
    };
    CustomDateTimePicker.prototype.setTimeHover = function (li, className) {
        if (this.enabled && this.isValidLI(li) && !li.classList.contains(className)) {
            this.removeTimeHover(className);
            addClass([li], className);
        }
    };
    CustomDateTimePicker.prototype.getPopupHeight = function () {
        var height = parseInt(POPUPDIMENSION$1, 10);
        var popupHeight = this.dateTimeWrapper.getBoundingClientRect().height;
        return popupHeight > height ? height : popupHeight;
    };
    CustomDateTimePicker.prototype.changeEvent = function (e) {
        _super.prototype.changeEvent.call(this, e);
        if ((this.value && this.value.valueOf()) !== (this.previousDateTime && +this.previousDateTime.valueOf())) {
            this.valueWithMinutes = this.value;
            this.setInputValue('date');
            this.previousDateTime = this.value && new Date(+this.value);
        }
    };
    CustomDateTimePicker.prototype.updateValue = function (e) {
        this.setInputValue('time');
        if (+this.previousDateTime !== +this.value) {
            this.changedArgs = {
                value: this.value, event: e || null,
                isInteracted: !isNullOrUndefined(e),
                element: this.element
            };
            this.addTimeSelection();
            this.trigger('change', this.changedArgs);
            this.previousDateTime = this.previousDate = this.value;
        }
    };
    CustomDateTimePicker.prototype.setTimeScrollPosition = function () {
        var popupElement = this.selectedElement;
        if (!isNullOrUndefined(popupElement)) {
            this.findScrollTop(popupElement);
        }
        else if (this.dateTimeWrapper && this.checkDateValue(this.scrollTo)) {
            this.setScrollTo();
        }
    };
    CustomDateTimePicker.prototype.findScrollTop = function (element) {
        var listHeight = this.getPopupHeight();
        var nextElement = element.nextElementSibling;
        var height = nextElement ? nextElement.offsetTop : element.offsetTop;
        var lineHeight = element.getBoundingClientRect().height;
        if ((height + element.offsetTop) > listHeight) {
            this.dateTimeWrapper.scrollTop = nextElement ? (height - (listHeight / HALFPOSITION$1 + lineHeight / HALFPOSITION$1)) : height;
        }
        else {
            this.dateTimeWrapper.scrollTop = 0;
        }
    };
    CustomDateTimePicker.prototype.setScrollTo = function () {
        var element;
        var items = this.dateTimeWrapper.querySelectorAll('.' + LISTCLASS$2);
        if (items.length >= 0) {
            this.scrollInvoked = true;
            var initialTime = this.timeCollections[0];
            var scrollTime = this.getDateObject(this.checkDateValue(this.scrollTo)).getTime();
            element = items[Math.round((scrollTime - initialTime) / (this.step * 60000))];
        }
        else {
            this.dateTimeWrapper.scrollTop = 0;
        }
        if (!isNullOrUndefined(element)) {
            this.findScrollTop(element);
        }
        else {
            this.dateTimeWrapper.scrollTop = 0;
        }
    };
    CustomDateTimePicker.prototype.setInputValue = function (type) {
        if (type === 'date') {
            this.inputElement.value = this.previousElementValue = this.getFormattedValue(this.getFullDateTime());
            this.setProperties({ value: this.getFullDateTime() }, true);
        }
        else {
            var tempVal = this.getFormattedValue(new Date(this.timeCollections[this.activeIndex]));
            Input.setValue(tempVal, this.inputElement, this.floatLabelType, this.showClearButton);
            this.previousElementValue = this.inputElement.value;
            this.setProperties({ value: new Date(this.timeCollections[this.activeIndex]) }, true);
            if (this.enableMask) {
                this.createMask();
            }
        }
        this.updateIconState();
    };
    CustomDateTimePicker.prototype.getFullDateTime = function () {
        var value = null;
        if (this.isDateObject(this.valueWithMinutes)) {
            value = this.combineDateTime(this.valueWithMinutes);
        }
        else {
            value = this.previousDate;
        }
        return this.validateMinMaxRange(value);
    };
    CustomDateTimePicker.prototype.createMask = function () {
        this.notify('createMask', {
            module: 'MaskedDateTime'
        });
    };
    CustomDateTimePicker.prototype.combineDateTime = function (value) {
        if (this.isDateObject(value)) {
            var day = this.previousDate.getDate();
            var month = this.previousDate.getMonth();
            var year = this.previousDate.getFullYear();
            var hour = value.getHours();
            var minutes = value.getMinutes();
            var seconds = value.getSeconds();
            return new Date(year, month, day, hour, minutes, seconds);
        }
        else {
            return this.previousDate;
        }
    };
    CustomDateTimePicker.prototype.onMouseClick = function (event) {
        var target = event.target;
        var li = this.selectedElement = closest(target, '.' + LISTCLASS$2);
        if (li && li.classList.contains(LISTCLASS$2)) {
            this.timeValue = li.getAttribute('data-value');
            this.hide(event);
        }
        this.setSelection(li, event);
    };
    CustomDateTimePicker.prototype.setSelection = function (li, event) {
        if (this.isValidLI(li) && !li.classList.contains(ACTIVE$2)) {
            this.selectedElement = li;
            var index = Array.prototype.slice.call(this.liCollections).indexOf(li);
            this.activeIndex = index;
            this.valueWithMinutes = new Date(this.timeCollections[this.activeIndex]);
            addClass([this.selectedElement], ACTIVE$2);
            this.selectedElement.setAttribute('aria-selected', 'true');
            this.updateValue(event);
        }
    };
    CustomDateTimePicker.prototype.setTimeActiveClass = function () {
        var collections = isNullOrUndefined(this.dateTimeWrapper) ? this.listWrapper : this.dateTimeWrapper;
        if (!isNullOrUndefined(collections)) {
            var items = collections.querySelectorAll('.' + LISTCLASS$2);
            if (items.length) {
                for (var i = 0; i < items.length; i++) {
                    if (this.timeCollections[i] === +(this.valueWithMinutes)) {
                        items[i].setAttribute('aria-selected', 'true');
                        this.selectedElement = items[i];
                        this.activeIndex = i;
                        this.setTimeActiveDescendant();
                        break;
                    }
                }
            }
        }
    };
    CustomDateTimePicker.prototype.setTimeActiveDescendant = function () {
        if (!isNullOrUndefined(this.selectedElement) && this.value) {
            attributes(this.inputElement, { 'aria-activedescendant': this.selectedElement.getAttribute('id') });
        }
        else {
            this.inputElement.removeAttribute('aria-activedescendant');
        }
    };
    CustomDateTimePicker.prototype.addTimeSelection = function () {
        this.selectedElement = null;
        this.removeTimeSelection();
        this.setTimeActiveClass();
        if (!isNullOrUndefined(this.selectedElement)) {
            addClass([this.selectedElement], ACTIVE$2);
            this.selectedElement.setAttribute('aria-selected', 'true');
        }
    };
    CustomDateTimePicker.prototype.removeTimeSelection = function () {
        this.removeTimeHover(HOVER$2);
        if (!isNullOrUndefined(this.dateTimeWrapper)) {
            var items = this.dateTimeWrapper.querySelectorAll('.' + ACTIVE$2);
            if (items.length) {
                removeClass(items, ACTIVE$2);
                items[0].removeAttribute('aria-selected');
            }
        }
    };
    CustomDateTimePicker.prototype.removeTimeHover = function (className) {
        var hoveredItem = this.getTimeHoverItem(className);
        if (hoveredItem && hoveredItem.length) {
            removeClass(hoveredItem, className);
        }
    };
    CustomDateTimePicker.prototype.getTimeHoverItem = function (className) {
        var collections = isNullOrUndefined(this.dateTimeWrapper) ? this.listWrapper : this.dateTimeWrapper;
        var hoveredItem;
        if (!isNullOrUndefined(collections)) {
            hoveredItem = collections.querySelectorAll('.' + className);
        }
        return hoveredItem;
    };
    CustomDateTimePicker.prototype.isValidLI = function (li) {
        return (li && li.classList.contains(LISTCLASS$2) && !li.classList.contains(DISABLED$4));
    };
    CustomDateTimePicker.prototype.calculateStartEnd = function (value, range, method) {
        var day = value.getDate();
        var month = value.getMonth();
        var year = value.getFullYear();
        var hours = value.getHours();
        var minutes = value.getMinutes();
        var seconds = value.getSeconds();
        var milliseconds = value.getMilliseconds();
        if (range) {
            if (method === 'starttime') {
                return new Date(year, month, day, 0, 0, 0);
            }
            else {
                return new Date(year, month, day, 23, 59, 59);
            }
        }
        else {
            return new Date(year, month, day, hours, minutes, seconds, milliseconds);
        }
    };
    CustomDateTimePicker.prototype.startTime = function (date) {
        var tempStartValue;
        var start;
        var tempMin = this.min;
        var value = date === null ? new Date() : date;
        if ((+value.getDate() === +tempMin.getDate() && +value.getMonth() === +tempMin.getMonth() &&
            +value.getFullYear() === +tempMin.getFullYear()) || ((+new Date(value.getFullYear(), value.getMonth(), value.getDate())) <=
                +new Date(tempMin.getFullYear(), tempMin.getMonth(), tempMin.getDate()))) {
            start = false;
            tempStartValue = this.min;
        }
        else if (+value < +this.max && +value > +this.min) {
            start = true;
            tempStartValue = value;
        }
        else if (+value >= +this.max) {
            start = true;
            tempStartValue = this.max;
        }
        return this.calculateStartEnd(tempStartValue, start, 'starttime');
    };
    CustomDateTimePicker.prototype.endTime = function (date) {
        var tempEndValue;
        var end;
        var tempMax = this.max;
        var value = date === null ? new Date() : date;
        if ((+value.getDate() === +tempMax.getDate() && +value.getMonth() === +tempMax.getMonth() &&
            +value.getFullYear() === +tempMax.getFullYear()) || (+new Date(value.getUTCFullYear(), value.getMonth(), value.getDate()) >=
                +new Date(tempMax.getFullYear(), tempMax.getMonth(), tempMax.getDate()))) {
            end = false;
            tempEndValue = this.max;
        }
        else if (+value < +this.max && +value > +this.min) {
            end = true;
            tempEndValue = value;
        }
        else if (+value <= +this.min) {
            end = true;
            tempEndValue = this.min;
        }
        return this.calculateStartEnd(tempEndValue, end, 'endtime');
    };
    CustomDateTimePicker.prototype.hide = function (e) {
        var _this = this;
        if (this.popupObj || this.dateTimeWrapper) {
            this.preventArgs = {
                cancel: false,
                popup: this.popupObj || this.popupObject,
                event: e || null
            };
            var eventArgs = this.preventArgs;
            if (isNullOrUndefined(this.popupObj)) {
                this.trigger('close', eventArgs, function (eventArgs) {
                    _this.dateTimeCloseEventCallback(e, eventArgs);
                });
            }
            else {
                this.dateTimeCloseEventCallback(e, eventArgs);
            }
        }
        else {
            if (Browser.isDevice && this.allowEdit && !this.readonly) {
                this.inputElement.removeAttribute('readonly');
            }
            this.setAllowEdit();
        }
    };
    CustomDateTimePicker.prototype.dateTimeCloseEventCallback = function (e, eventArgs) {
        this.preventArgs = eventArgs;
        if (!this.preventArgs.cancel) {
            if (this.isDatePopupOpen()) {
                _super.prototype.hide.call(this, e);
            }
            else if (this.isTimePopupOpen()) {
                this.closePopup(e);
                removeClass([document.body], OVERFLOW$3);
                if (Browser.isDevice && this.timeModal) {
                    this.timeModal.style.display = 'none';
                    this.timeModal.outerHTML = '';
                    this.timeModal = null;
                }
                this.setTimeActiveDescendant();
            }
        }
        if (Browser.isDevice && this.allowEdit && !this.readonly) {
            this.inputElement.removeAttribute('readonly');
        }
        this.setAllowEdit();
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    CustomDateTimePicker.prototype.closePopup = function (e) {
        if (this.isTimePopupOpen() && this.popupObject) {
            var animModel = {
                name: 'FadeOut',
                duration: ANIMATIONDURATION$1,
                delay: 0
            };
            this.popupObject.hide(new Animation(animModel));
            this.inputWrapper.container.classList.remove(ICONANIMATION$1);
            attributes(this.inputElement, { 'aria-expanded': 'false' });
            this.inputElement.removeAttribute('aria-owns');
            EventHandler.remove(document, 'mousedown touchstart', this.documentClickHandler);
        }
    };
    CustomDateTimePicker.prototype.preRender = function () {
        this.checkFormat();
        this.dateTimeFormat = this.cldrDateTimeFormat();
        _super.prototype.preRender.call(this);
        removeClass([this.inputElementCopy], [ROOT$4]);
    };
    CustomDateTimePicker.prototype.getProperty = function (date, val) {
        if (val === 'min') {
            this.setProperties({ min: this.validateValue(date.min) }, true);
        }
        else {
            this.setProperties({ max: this.validateValue(date.max) }, true);
        }
    };
    CustomDateTimePicker.prototype.checkAttributes = function (isDynamic) {
        var attributes$$1 = isDynamic ? isNullOrUndefined(this.htmlAttributes) ? [] : Object.keys(this.htmlAttributes) :
            ['style', 'name', 'step', 'disabled', 'readonly', 'value', 'min', 'max', 'placeholder', 'type'];
        var value;
        for (var _i = 0, attributes_1 = attributes$$1; _i < attributes_1.length; _i++) {
            var prop = attributes_1[_i];
            if (!isNullOrUndefined(this.inputElement.getAttribute(prop))) {
                switch (prop) {
                    case 'name':
                        this.inputElement.setAttribute('name', this.inputElement.getAttribute(prop));
                        break;
                    case 'step':
                        this.step = parseInt(this.inputElement.getAttribute(prop), 10);
                        break;
                    case 'readonly':
                        if ((isNullOrUndefined(this.dateTimeOptions) || (this.dateTimeOptions['readonly'] === undefined)) || isDynamic) {
                            var readonly = this.inputElement.getAttribute(prop) === 'disabled' ||
                                this.inputElement.getAttribute(prop) === '' ||
                                this.inputElement.getAttribute(prop) === 'true' ? true : false;
                            this.setProperties({ readonly: readonly }, !isDynamic);
                        }
                        break;
                    case 'placeholder':
                        if ((isNullOrUndefined(this.dateTimeOptions) || (this.dateTimeOptions['placeholder'] === undefined)) || isDynamic) {
                            this.setProperties({ placeholder: this.inputElement.getAttribute(prop) }, !isDynamic);
                        }
                        break;
                    case 'min':
                        if ((isNullOrUndefined(this.dateTimeOptions) || (this.dateTimeOptions['min'] === undefined)) || isDynamic) {
                            value = new Date(this.inputElement.getAttribute(prop));
                            if (!this.isNullOrEmpty(value) && !isNaN(+value)) {
                                this.setProperties({ min: value }, !isDynamic);
                            }
                        }
                        break;
                    case 'disabled':
                        if ((isNullOrUndefined(this.dateTimeOptions) || (this.dateTimeOptions['enabled'] === undefined)) || isDynamic) {
                            var enabled = this.inputElement.getAttribute(prop) === 'disabled' ||
                                this.inputElement.getAttribute(prop) === 'true' ||
                                this.inputElement.getAttribute(prop) === '' ? false : true;
                            this.setProperties({ enabled: enabled }, !isDynamic);
                        }
                        break;
                    case 'value':
                        if ((isNullOrUndefined(this.dateTimeOptions) || (this.dateTimeOptions['value'] === undefined)) || isDynamic) {
                            value = new Date(this.inputElement.getAttribute(prop));
                            if (!this.isNullOrEmpty(value) && !isNaN(+value)) {
                                this.setProperties({ value: value }, !isDynamic);
                            }
                        }
                        break;
                    case 'max':
                        if ((isNullOrUndefined(this.dateTimeOptions) || (this.dateTimeOptions['max'] === undefined)) || isDynamic) {
                            value = new Date(this.inputElement.getAttribute(prop));
                            if (!this.isNullOrEmpty(value) && !isNaN(+value)) {
                                this.setProperties({ max: value }, !isDynamic);
                            }
                        }
                        break;
                }
            }
        }
    };
    CustomDateTimePicker.prototype.requiredModules = function () {
        var modules = [];
        if (this) {
            modules.push({ args: [this], member: 'bs' });
        }
        if (this.enableMask) {
            modules.push(this.maskedDateModule());
        }
        return modules;
    };
    CustomDateTimePicker.prototype.maskedDateModule = function () {
        var modules = { args: [this], member: 'MaskedDateTime' };
        return modules;
    };
    CustomDateTimePicker.prototype.getTimeActiveElement = function () {
        if (!isNullOrUndefined(this.dateTimeWrapper)) {
            return this.dateTimeWrapper.querySelectorAll('.' + ACTIVE$2);
        }
        else {
            return null;
        }
    };
    CustomDateTimePicker.prototype.createDateObj = function (val) {
        return val instanceof Date ? val : null;
    };
    CustomDateTimePicker.prototype.getDateObject = function (text) {
        if (!this.isNullOrEmpty(text)) {
            var dateValue = this.createDateObj(text);
            var value = this.valueWithMinutes;
            var status_1 = !isNullOrUndefined(value);
            if (this.checkDateValue(dateValue)) {
                var date = status_1 ? value.getDate() : DAY$1;
                var month = status_1 ? value.getMonth() : MONTH$3;
                var year = status_1 ? value.getFullYear() : YEAR$3;
                var hour = status_1 ? value.getHours() : HOUR;
                var minute = status_1 ? value.getMinutes() : MINUTE;
                var second = status_1 ? value.getSeconds() : SECOND;
                var millisecond = status_1 ? value.getMilliseconds() : MILLISECOND;
                if (!this.scrollInvoked) {
                    return new Date(year, month, date, hour, minute, second, millisecond);
                }
                else {
                    this.scrollInvoked = false;
                    return new Date(year, month, date, dateValue.getHours(), dateValue.getMinutes(), dateValue.getSeconds(), dateValue.getMilliseconds());
                }
            }
        }
        return null;
    };
    CustomDateTimePicker.prototype.findNextTimeElement = function (event) {
        var textVal = (this.inputElement).value;
        var value = isNullOrUndefined(this.valueWithMinutes) ? this.createDateObj(textVal) :
            this.getDateObject(this.valueWithMinutes);
        var dateTimeVal = null;
        var listCount = this.liCollections.length;
        if (!isNullOrUndefined(this.activeIndex) || !isNullOrUndefined(this.checkDateValue(value))) {
            if (event.action === 'home') {
                dateTimeVal = +(this.createDateObj(new Date(this.timeCollections[0])));
                this.activeIndex = 0;
            }
            else if (event.action === 'end') {
                dateTimeVal = +(this.createDateObj(new Date(this.timeCollections[this.timeCollections.length - 1])));
                this.activeIndex = this.timeCollections.length - 1;
            }
            else {
                if (event.action === 'down') {
                    for (var i = 0; i < listCount; i++) {
                        if (+value < this.timeCollections[i]) {
                            dateTimeVal = +(this.createDateObj(new Date(this.timeCollections[i])));
                            this.activeIndex = i;
                            break;
                        }
                    }
                }
                else {
                    for (var i = listCount - 1; i >= 0; i--) {
                        if (+value > this.timeCollections[i]) {
                            dateTimeVal = +(this.createDateObj(new Date(this.timeCollections[i])));
                            this.activeIndex = i;
                            break;
                        }
                    }
                }
            }
            this.selectedElement = this.liCollections[this.activeIndex];
            this.timeElementValue(isNullOrUndefined(dateTimeVal) ? null : new Date(dateTimeVal));
        }
    };
    CustomDateTimePicker.prototype.setTimeValue = function (date, value) {
        var dateString;
        var time;
        var val = this.validateMinMaxRange(value);
        var newval = this.createDateObj(val);
        if (this.getFormattedValue(newval) !== (!isNullOrUndefined(this.value) ? this.getFormattedValue(this.value) : null)) {
            this.valueWithMinutes = isNullOrUndefined(newval) ? null : newval;
            time = new Date(+this.valueWithMinutes);
        }
        else {
            if (this.strictMode) {
                //for strict mode case, when value not present within a range. Reset the nearest range value.
                date = newval;
            }
            this.valueWithMinutes = this.checkDateValue(date);
            time = new Date(+this.valueWithMinutes);
        }
        if (this.calendarMode === 'Gregorian') {
            dateString = this.globalize.formatDate(time, {
                format: !isNullOrUndefined(this.formatString) ? this.formatString : this.cldrDateTimeFormat(),
                type: 'dateTime', skeleton: 'yMd'
            });
        }
        else {
            dateString = this.globalize.formatDate(time, {
                format: !isNullOrUndefined(this.formatString) ? this.formatString : this.cldrDateTimeFormat(),
                type: 'dateTime', skeleton: 'yMd', calendar: 'bs'
            });
        }
        if (!this.strictMode && isNullOrUndefined(time)) {
            Input.setValue(dateString, this.inputElement, this.floatLabelType, this.showClearButton);
        }
        else {
            Input.setValue(dateString, this.inputElement, this.floatLabelType, this.showClearButton);
        }
        return time;
    };
    CustomDateTimePicker.prototype.timeElementValue = function (value) {
        if (!isNullOrUndefined(this.checkDateValue(value)) && !this.isNullOrEmpty(value)) {
            var date = value instanceof Date ? value : this.getDateObject(value);
            return this.setTimeValue(date, value);
        }
        return null;
    };
    CustomDateTimePicker.prototype.timeKeyHandler = function (event) {
        if (isNullOrUndefined(this.step) || this.step <= 0) {
            return;
        }
        var listCount = this.timeCollections.length;
        if (isNullOrUndefined(this.getTimeActiveElement()) || this.getTimeActiveElement().length === 0) {
            if (this.liCollections.length > 0) {
                if (isNullOrUndefined(this.value) && isNullOrUndefined(this.activeIndex)) {
                    this.activeIndex = 0;
                    this.selectedElement = this.liCollections[0];
                    this.timeElementValue(new Date(this.timeCollections[0]));
                }
                else {
                    this.findNextTimeElement(event);
                }
            }
        }
        else {
            var nextItemValue = void 0;
            if ((event.keyCode >= 37) && (event.keyCode <= 40)) {
                var index = (event.keyCode === 40 || event.keyCode === 39) ? ++this.activeIndex : --this.activeIndex;
                this.activeIndex = index = this.activeIndex === (listCount) ? 0 : this.activeIndex;
                this.activeIndex = index = this.activeIndex < 0 ? (listCount - 1) : this.activeIndex;
                nextItemValue = isNullOrUndefined(this.timeCollections[index]) ?
                    this.timeCollections[0] : this.timeCollections[index];
            }
            else if (event.action === 'home') {
                this.activeIndex = 0;
                nextItemValue = this.timeCollections[0];
            }
            else if (event.action === 'end') {
                this.activeIndex = listCount - 1;
                nextItemValue = this.timeCollections[listCount - 1];
            }
            this.selectedElement = this.liCollections[this.activeIndex];
            this.timeElementValue(new Date(nextItemValue));
        }
        this.isNavigate = true;
        this.setTimeHover(this.selectedElement, NAVIGATION$1);
        this.setTimeActiveDescendant();
        if (this.isTimePopupOpen() && this.selectedElement !== null && (!event || event.type !== 'click')) {
            this.setTimeScrollPosition();
        }
    };
    CustomDateTimePicker.prototype.timeKeyActionHandle = function (event) {
        if (this.enabled) {
            if (event.action !== 'right' && event.action !== 'left' && event.action !== 'tab') {
                event.preventDefault();
            }
            switch (event.action) {
                case 'up':
                case 'down':
                case 'home':
                case 'end':
                    this.timeKeyHandler(event);
                    break;
                case 'enter':
                    if (this.isNavigate) {
                        this.selectedElement = this.liCollections[this.activeIndex];
                        this.valueWithMinutes = new Date(this.timeCollections[this.activeIndex]);
                        this.setInputValue('time');
                        if (+this.previousDateTime !== +this.value) {
                            this.changedArgs.value = this.value;
                            this.addTimeSelection();
                            this.previousDateTime = this.value;
                        }
                    }
                    else {
                        this.updateValue(event);
                    }
                    this.hide(event);
                    addClass([this.inputWrapper.container], INPUTFOCUS$2);
                    this.isNavigate = false;
                    event.stopPropagation();
                    break;
                case 'escape':
                    this.hide(event);
                    break;
                default:
                    this.isNavigate = false;
                    break;
            }
        }
    };
    CustomDateTimePicker.prototype.inputKeyAction = function (event) {
        switch (event.action) {
            case 'altDownArrow':
                this.strictModeUpdate();
                this.updateInput();
                this.toggle(event);
                break;
        }
    };
    /**
     * Called internally if any of the property value changed.
     *
     * @param {DateTimePickerModel} newProp - Returns the dynamic property value of the component.
     * @param {DateTimePickerModel} oldProp - Returns the previous property value of the component.
     * @returns {void}
     * @deprecated
     */
    CustomDateTimePicker.prototype.onPropertyChanged = function (newProp, oldProp) {
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'value':
                    this.isDynamicValueChanged = true;
                    this.invalidValueString = null;
                    this.checkInvalidValue(newProp.value);
                    newProp.value = this.value;
                    newProp.value = this.validateValue(newProp.value);
                    if (this.enableMask) {
                        Input.setValue(this.maskedDateValue, this.inputElement, this.floatLabelType, this.showClearButton);
                    }
                    else {
                        Input.setValue(this.getFormattedValue(newProp.value), this.inputElement, this.floatLabelType, this.showClearButton);
                    }
                    this.valueWithMinutes = newProp.value;
                    this.setProperties({ value: newProp.value }, true);
                    if (this.popupObj) {
                        this.popupUpdate();
                    }
                    this.previousDateTime = new Date(this.inputElement.value);
                    this.updateInput();
                    this.changeTrigger(null);
                    this.preventChange = this.isAngular && this.preventChange ? !this.preventChange : this.preventChange;
                    if (this.enableMask && this.value) {
                        this.notify('createMask', {
                            module: 'MaskedDateTime'
                        });
                    }
                    break;
                case 'min':
                case 'max':
                    this.getProperty(newProp, prop);
                    this.updateInput();
                    break;
                case 'enableRtl':
                    Input.setEnableRtl(this.enableRtl, [this.inputWrapper.container]);
                    break;
                case 'cssClass':
                    if (!isNullOrUndefined(oldProp.cssClass)) {
                        oldProp.cssClass = (oldProp.cssClass.replace(/\s+/g, ' ')).trim();
                    }
                    if (!isNullOrUndefined(newProp.cssClass)) {
                        newProp.cssClass = (newProp.cssClass.replace(/\s+/g, ' ')).trim();
                    }
                    Input.setCssClass(newProp.cssClass, [this.inputWrapper.container], oldProp.cssClass);
                    if (this.dateTimeWrapper) {
                        Input.setCssClass(newProp.cssClass, [this.dateTimeWrapper], oldProp.cssClass);
                    }
                    break;
                case 'locale':
                    this.globalize = new Internationalization(this.locale);
                    this.l10n.setLocale(this.locale);
                    this.setProperties({ placeholder: this.l10n.getConstant('placeholder') }, true);
                    Input.setPlaceholder(this.l10n.getConstant('placeholder'), this.inputElement);
                    this.dateTimeFormat = this.cldrDateTimeFormat();
                    _super.prototype.updateInput.call(this);
                    break;
                case 'htmlAttributes':
                    this.updateHtmlAttributeToElement();
                    this.updateHtmlAttributeToWrapper();
                    this.checkAttributes(true);
                    break;
                case 'format':
                    this.setProperties({ format: newProp.format }, true);
                    this.checkFormat();
                    this.dateTimeFormat = this.formatString;
                    this.setValue();
                    if (this.enableMask) {
                        this.notify('createMask', {
                            module: 'MaskedDateTime'
                        });
                        if (!this.value) {
                            Input.setValue(this.maskedDateValue, this.inputElement, this.floatLabelType, this.showClearButton);
                        }
                    }
                    break;
                case 'placeholder':
                    Input.setPlaceholder(newProp.placeholder, this.inputElement);
                    break;
                case 'enabled':
                    Input.setEnabled(this.enabled, this.inputElement);
                    if (!this.enabled) {
                        this.inputElement.tabIndex = -1;
                    }
                    break;
                case 'strictMode':
                    this.invalidValueString = null;
                    this.updateInput();
                    break;
                case 'width':
                    this.setWidth(newProp.width);
                    Input.calculateWidth(this.inputElement, this.inputWrapper.container);
                    if (!isNullOrUndefined(this.inputWrapper.buttons[0]) && !isNullOrUndefined(this.inputWrapper.container.getElementsByClassName('e-float-text-overflow')[0]) && this.floatLabelType !== 'Never') {
                        this.inputWrapper.container.getElementsByClassName('e-float-text-overflow')[0].classList.add('e-date-time-icon');
                    }
                    break;
                case 'readonly':
                    Input.setReadonly(this.readonly, this.inputElement);
                    break;
                case 'floatLabelType':
                    this.floatLabelType = newProp.floatLabelType;
                    Input.removeFloating(this.inputWrapper);
                    Input.addFloating(this.inputElement, this.floatLabelType, this.placeholder);
                    if (!isNullOrUndefined(this.inputWrapper.buttons[0]) && !isNullOrUndefined(this.inputWrapper.container.getElementsByClassName('e-float-text-overflow')[0]) && this.floatLabelType !== 'Never') {
                        this.inputWrapper.container.getElementsByClassName('e-float-text-overflow')[0].classList.add('e-date-time-icon');
                    }
                    break;
                case 'scrollTo':
                    if (this.checkDateValue(new Date(this.checkValue(newProp.scrollTo)))) {
                        if (this.dateTimeWrapper) {
                            this.setScrollTo();
                        }
                        this.setProperties({ scrollTo: this.checkDateValue(new Date(this.checkValue(newProp.scrollTo))) }, true);
                    }
                    else {
                        this.setProperties({ scrollTo: null }, true);
                    }
                    break;
                case 'enableMask':
                    if (this.enableMask) {
                        this.notify('createMask', {
                            module: 'MaskedDateTime'
                        });
                        Input.setValue(this.maskedDateValue, this.inputElement, this.floatLabelType, this.showClearButton);
                    }
                    else {
                        if (this.inputElement.value === this.maskedDateValue) {
                            this.maskedDateValue = '';
                            Input.setValue(this.maskedDateValue, this.inputElement, this.floatLabelType, this.showClearButton);
                        }
                    }
                    break;
                default:
                    _super.prototype.onPropertyChanged.call(this, newProp, oldProp);
                    break;
            }
            if (!this.isDynamicValueChanged) {
                this.hide(null);
            }
            this.isDynamicValueChanged = false;
        }
    };
    /**
     * To get component name.
     *
     * @returns {string} Returns the component name.
     * @private
     */
    CustomDateTimePicker.prototype.getModuleName = function () {
        return 'datetimepicker';
    };
    CustomDateTimePicker.prototype.restoreValue = function () {
        this.previousDateTime = this.previousDate;
        this.currentDate = this.value ? this.value : new Date();
        this.valueWithMinutes = this.value;
        this.previousDate = this.value;
        this.previousElementValue = this.previousElementValue = (isNullOrUndefined(this.inputValueCopy)) ? '' :
            this.getFormattedValue(this.inputValueCopy);
    };
    __decorate$4([
        Property(null)
    ], CustomDateTimePicker.prototype, "timeFormat", void 0);
    __decorate$4([
        Property(30)
    ], CustomDateTimePicker.prototype, "step", void 0);
    __decorate$4([
        Property(null)
    ], CustomDateTimePicker.prototype, "scrollTo", void 0);
    __decorate$4([
        Property(1000)
    ], CustomDateTimePicker.prototype, "zIndex", void 0);
    __decorate$4([
        Property(null)
    ], CustomDateTimePicker.prototype, "value", void 0);
    __decorate$4([
        Property(null)
    ], CustomDateTimePicker.prototype, "keyConfigs", void 0);
    __decorate$4([
        Property({})
    ], CustomDateTimePicker.prototype, "htmlAttributes", void 0);
    __decorate$4([
        Property(false)
    ], CustomDateTimePicker.prototype, "enablePersistence", void 0);
    __decorate$4([
        Property(true)
    ], CustomDateTimePicker.prototype, "allowEdit", void 0);
    __decorate$4([
        Property(false)
    ], CustomDateTimePicker.prototype, "isMultiSelection", void 0);
    __decorate$4([
        Property(null)
    ], CustomDateTimePicker.prototype, "values", void 0);
    __decorate$4([
        Property(true)
    ], CustomDateTimePicker.prototype, "showClearButton", void 0);
    __decorate$4([
        Property(null)
    ], CustomDateTimePicker.prototype, "placeholder", void 0);
    __decorate$4([
        Property(false)
    ], CustomDateTimePicker.prototype, "strictMode", void 0);
    __decorate$4([
        Property(null)
    ], CustomDateTimePicker.prototype, "serverTimezoneOffset", void 0);
    __decorate$4([
        Property(new Date(1900, 0, 1))
    ], CustomDateTimePicker.prototype, "min", void 0);
    __decorate$4([
        Property(new Date(2099, 11, 31))
    ], CustomDateTimePicker.prototype, "max", void 0);
    __decorate$4([
        Property(null)
    ], CustomDateTimePicker.prototype, "firstDayOfWeek", void 0);
    __decorate$4([
        Property('Gregorian')
    ], CustomDateTimePicker.prototype, "calendarMode", void 0);
    __decorate$4([
        Property('Month')
    ], CustomDateTimePicker.prototype, "start", void 0);
    __decorate$4([
        Property('Month')
    ], CustomDateTimePicker.prototype, "depth", void 0);
    __decorate$4([
        Property(false)
    ], CustomDateTimePicker.prototype, "weekNumber", void 0);
    __decorate$4([
        Property(true)
    ], CustomDateTimePicker.prototype, "showTodayButton", void 0);
    __decorate$4([
        Property('Short')
    ], CustomDateTimePicker.prototype, "dayHeaderFormat", void 0);
    __decorate$4([
        Property(false)
    ], CustomDateTimePicker.prototype, "openOnFocus", void 0);
    __decorate$4([
        Property(false)
    ], CustomDateTimePicker.prototype, "enableMask", void 0);
    __decorate$4([
        Property({ day: 'day', month: 'month', year: 'year', hour: 'hour', minute: 'minute', second: 'second', dayOfTheWeek: 'day of the week' })
    ], CustomDateTimePicker.prototype, "maskPlaceholder", void 0);
    __decorate$4([
        Event()
    ], CustomDateTimePicker.prototype, "open", void 0);
    __decorate$4([
        Event()
    ], CustomDateTimePicker.prototype, "close", void 0);
    __decorate$4([
        Event()
    ], CustomDateTimePicker.prototype, "cleared", void 0);
    __decorate$4([
        Event()
    ], CustomDateTimePicker.prototype, "blur", void 0);
    __decorate$4([
        Event()
    ], CustomDateTimePicker.prototype, "focus", void 0);
    __decorate$4([
        Event()
    ], CustomDateTimePicker.prototype, "created", void 0);
    __decorate$4([
        Event()
    ], CustomDateTimePicker.prototype, "destroyed", void 0);
    CustomDateTimePicker = __decorate$4([
        NotifyPropertyChanges
    ], CustomDateTimePicker);
    return CustomDateTimePicker;
}(CustomDatePicker));