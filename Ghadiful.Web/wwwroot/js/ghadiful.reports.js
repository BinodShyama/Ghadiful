
var CheckIn = (function () {
    function CkeckIn() {
        return this;
    }
    CheckIn.InitilizeComponents = function () {
        let startDatePickerObject = new CustomDatePicker({
            calendarMode: "bs",
            format: 'yyyy-MM-dd',
            value:this.StartDate,
            placeholder:'yyyy-mm-dd',
            selectedDate: this.StartDate,
            value: this.StartDate,
            change: this.OnStartDateValueChanged
        });
        let endDatePickerObject = new CustomDatePicker({
            calendarMode: "bs",
            placeholder: 'yyyy-mm-dd',
            format: 'yyyy-MM-dd',
            selectedDate: this.EndDate,
            value: this.EndDate,
            change: this.OnEndDateValueChanged
        });
        startDatePickerObject.appendTo('#startDate');
        endDatePickerObject.appendTo('#endDate');
    }
    CheckIn.OnStartDateValueChanged = function (args) {
        CheckIn.StartDate = args.value;
    }
    CheckIn.OnEndDateValueChanged = function (args) {
        CheckIn.EndDate = args.value;
    }
    CheckIn.StartDate = new Date();
    CheckIn.EndDate = new Date();
});

var OverTime = (function () {
    function OverTime() {
        return this;
    }
    OverTime.InitilizeComponents = function () {
        let startDatePickerObject = new CustomDatePicker({
            calendarMode: "bs",
            format: 'yyyy-MM-dd',
            placeholder: 'yyyy-mm-dd',
            selectedDate: this.StartDate,
            value: this.StartDate,
            change: this.OnStartDateValueChanged
        });
        let endDatePickerObject = new CustomDatePicker({
            calendarMode: "bs",
            placeholder: 'yyyy-mm-dd',
            format: 'yyyy-MM-dd',
            selectedDate: this.EndDate,
            value: this.EndDate,
            change: this.OnEndDateValueChanged
        });
        startDatePickerObject.appendTo('#startDate');
        endDatePickerObject.appendTo('#endDate');
    }
    OverTime.OnStartDateValueChanged = function (args) {
        OverTime.StartDate = args.value;
    }
    OverTime.OnEndDateValueChanged = function (args) {
        OverTime.EndDate = args.value;
    }
    OverTime.StartDate = new Date();
    OverTime.EndDate = new Date();

    return OverTime;
});


var Payroll = (function () {
    function Payroll() {
        return this;
    }
    Payroll.InitilizeComponents = function () {
        let startDatePickerObject = new CustomDatePicker({
            calendarMode: "bs",
            format: 'yyyy-MM-dd',
            placeholder: 'yyyy-mm-dd',
            selectedDate: this.StartDate,
            value: this.StartDate,
            change: this.OnStartDateValueChanged
        });
        let endDatePickerObject = new CustomDatePicker({
            calendarMode: "bs",
            placeholder: 'yyyy-mm-dd',
            format: 'yyyy-MM-dd',
            selectedDate: this.EndDate,
            value: this.EndDate,
            change: this.OnEndDateValueChanged
        });
        startDatePickerObject.appendTo('#startDate');
        endDatePickerObject.appendTo('#endDate');
    }
    Payroll.OnStartDateValueChanged = function (args) {
        Payroll.StartDate = args.value;
    }
    Payroll.OnEndDateValueChanged = function (args) {
        Payroll.EndDate = args.value;
    }
    Payroll.StartDate = new Date();
    Payroll.EndDate = new Date();
    return Payroll;
});
CheckIn();
