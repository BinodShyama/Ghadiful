
/**
 *
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
//class constant defination.
var OTHERMONTH$1 = 'e-other-month';
var YEAR$1 = 'e-year';
var MONTH$1 = 'e-month';
var DECADE$1 = 'e-decade';
var DISABLED$1 = 'e-disabled';
var OVERLAY$1 = 'e-overlay';
var WEEKEND$1 = 'e-weekend';
var WEEKNUMBER$1 = 'e-week-number';
var SELECTED$1 = 'e-selected';
var FOCUSEDDATE$1 = 'e-focused-date';
var OTHERMONTHROW$1 = 'e-month-hide';
var TODAY$1 = 'e-today';
var LINK$1 = 'e-day';
var CELL$1 = 'e-cell';
var dayMilliSeconds$1 = 86400000;
var minDecade = 2060;
var maxDecade = 2069;
var BikramSambat = /** @__PURE__ @class */ (function () {
    function BikramSambat(instance) {
        this.calendarInstance = instance;
    }
    BikramSambat.prototype.getModuleName = function () {
        return 'bs';
    };
    BikramSambat.prototype.bsTitleUpdate = function (date, view) {
        var globalize = new CustomInternationalization(this.calendarInstance.locale);
        globalize
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
                var startBSYear = 1361;
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
                this.calendarInstance.currentDate = bsDate.month == 12 ? this.toGregorian(bsDate.year + 1, 1, 1) : this.toGregorian(bsDate.year, bsDate.month + 1, 1);
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
                this.calendarInstance.currentDate = bsDate.month == 1 ? this.toGregorian(bsDate.year - 1, 12, 1) : this.toGregorian(bsDate.year, bsDate.month - 1, 1);
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
        var year = (parseInt(startHdrYr, 10) - 2).toString();
        startFullYr = startHdrYr - 57;// Math.round(parseInt(startHdrYr, 10) * 0.97 + 622);
        endFullYr = endHdrYr - 57;// Math.round(parseInt(endHdrYr, 10) * 0.97 + 622);
        var startYear = parseInt(year, 10) - 57;// Math.round(parseInt(year, 10) * 0.97 + 622);
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
                bsDate.year <= endFullYr || bsDate.year === parseInt(endHdrYr, 10) + 1) {
                var tdEle = this.bsDayCell(localDate);
                attributes(tdEle, { 'role': 'gridcell' });
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
            } ``
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