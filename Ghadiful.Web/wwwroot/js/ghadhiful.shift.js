var Shift = (function () {
    function Shift() {
        return this;
    }

    Shift.InitilizeComponents = function () {
        $('#create-new').on('click', function () {
            var bootstrapModal = new bootstrap.Modal($('#shiftmodal'));
            bootstrapModal.show();
        });

        let startTime = new ej.calendars.TimePicker({
            placeholder: 'Select a Time',
            format: 'HH:mm',
        });

        // render initialized timepicker
        startTime.appendTo('#startTime');

        let endTime = new ej.calendars.TimePicker({
            placeholder: 'Select a Time',
            format: 'HH:mm',
        });

        // render initialized timepicker
        endTime.appendTo('#endTime');
    }
    return Shift;
});
new Shift();