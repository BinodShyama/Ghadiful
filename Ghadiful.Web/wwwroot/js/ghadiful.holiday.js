(function () {

    Schedule.Inject(Month);
    var holiDays = [];
    var EventTypes = [];
    Object.keys(group).forEach(function (key) {
        let val = group[key]["Name"];
        EventTypes.push(val);
    });
    Object.keys(holidays).forEach(function (key) {
        //get the value of name
        let val = holidays[key]["Name"];
        //push the name string in the array
        holiDays.push(val);
    });
    let scheduleObj = new Schedule({
        width: '100%',
        height: '650px',
        views: ['Month'],
        calendarMode: 'bs',
        selectedDate: new Date(),
        timeScale: { enable: false },
        showQuickInfo: false,
        editorTemplate: '#EventEditorTemplate',
        workDays: [0,1, 2,3,4 ,5],
        popupOpen: (args) => {
            if (args.type === 'Editor') {
                let groupDatSource = JSON.parse(JSON.stringify(group));
                if (args.data.Groups != undefined && args.data.Groups.length > 0) {
                    $.each(args.data.Groups, function (i, d) {
                        if (group.filter(c => c.Id == d).length) {
                            groupDatSource.filter(c => c.Id == d)[0].IsSelected = true;
                        }
                    });
                }

                let startElement = args.element.querySelector('#StartTime')
                if (!startElement.classList.contains('e-datepicker')) {
                    new CustomDatePicker({ value: new Date(startElement.value) || new Date(), calendarMode: 'bs', format: 'yyyy-MM-dd' }, startElement);
                }
                let endElement = args.element.querySelector('#EndTime')
                if (!endElement.classList.contains('e-datepicker')) {
                    new CustomDatePicker({ value: new Date(endElement.value) || new Date(), calendarMode: 'bs', format: 'yyyy-MM-dd' }, endElement);
                }
                let subject = args.element.querySelector('#Subject')
                let atcObject = new AutoComplete({
                    dataSource: holiDays,
                    placeholder: "Enter Holiday Detial"
                });

                atcObject.appendTo(subject);

                let HolidayGorup = args.element.querySelector('#Groups')
                if (!HolidayGorup.classList.contains('e-multiselect')) {
                    let listObj = new MultiSelect({
                        dataSource: groupDatSource,
                        fields: { text: 'Name', value: 'Id' },
                        //value: args.data.Groups,
                        placeholder: "Select Gorup",
                        allowFiltering: true,
                        query: (args.data.Groups != undefined && args.data.Groups.length > 0) ? new ej.data.Query().sortBy('IsSelected', 'descending').take(20) : new ej.data.Query().take(20),
                        filtering: function (e) {
                            e.preventDefaultAction = true;
                            var query = new ej.data.Query();
                            // frame the query based on search string with filter type.
                            query = (e.text !== '') ? query.where('Name', 'contains', e.text, true) : query;
                            // pass the filter data source, filter query to updateData method.
                            e.updateData(groupDatSource, query.take(20));
                        },
                        actionComplete: function (e) {
                            let start = 20;
                            let end = 25;
                            let listElement = listObj.list;
                            listElement.addEventListener('scroll', () => {
                                if (
                                    listElement.scrollTop + listElement.offsetHeight >=
                                    listElement.scrollHeight
                                ) {
                                    let filterQuery = new ej.data.Query();
                                    new ej.data.DataManager(groupDatSource)
                                        .executeQuery(filterQuery.range(start, end))
                                        .then((event) => {
                                            start = end;
                                            end += 5;
                                            listObj.addItem(event.result);
                                        })
                                        .catch((e) => { });
                                }
                            });
                        }

                    }, HolidayGorup);
                    listObj.value = args.data.Groups;

                }
            }
        },
        dataBinding: (args) => {
            $.each(args.result, function (i, d) {
                d.StartTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                d.EndTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                d.EndTime = new Date(new Date((d.EndTime)).setHours(23, 59, 59))
            });
        },
        eventRendered: (args) => {
            let GroupType = '';

            if (args.data.Groups != undefined && args.data.Groups.length > 0) {
                let d = group.filter(function (e) {
                    return args.data.Groups.includes(e.Id);
                });
                const type = [...new Set(d.map(item => item.Type))];
                if (type.length > 1)
                    GroupType = "MultiTypeGroup"
                else if (type[0] == 'Organization')
                    GroupType = "Organization"
                else
                    GroupType = 'Employee';
            }
            switch (GroupType) {
                case 'Employee':
                    (args.element).style.backgroundColor = '#F57F17';
                    break;
                case 'Organization':
                    (args.element).style.backgroundColor = '#7fa900';
                    break;
                case 'MultiTypeGroup':
                    (args.element).style.backgroundColor = '#8e24aa';
                    break;
            }
        },
        actionComplete: (args) => {
            if (args.requestType === "eventCreated" || args.requestType === "eventChanged" || args.requestType === 'eventRemoved') {
                var eventObj = args.data[0];
                eventObj.requestType = args.requestType;
                saveHoliday(eventObj);
            }
        },
        eventSettings: {
            editWindowOpen: function (args) {
                args.isAllDay = true; // Set IsAllDay to always be true in the edit form
            },

            dataSource: eventdata,
            fields: {
                subject: { name: 'Subject', validation: { required: true } },
                startTime: { name: 'StartTime', validation: { required: true } },
                endTime: { name: 'EndTime', validation: { required: true } },
                description: { name: 'Groups', validation: { required: true } },
            }
        },
        renderCell: (args) => {
            let weekDay = args.date.getDay();
            if (weekDay == 6) {
                args.element.classList.add('e-highlightweekend');
            }
        }
    });

    scheduleObj.appendTo('#Schedule');

    // Store the reference to the original addEvent method
    var originalAddEvent = Schedule.prototype.addEvent;
    var originalSaveEvent = Schedule.prototype.saveEvent;

    // Extend the addEvent method
    Schedule.prototype.addEvent = function (eventData, eventOptions, eventWrap) {
        // Perform any custom logic here
        eventData.IsAllDay = true;
        eventData.Subject = $('#Subject').val();
        eventData.EndTime = new Date((eventData.EndTime).setHours(23, 59, 59))
        // Call the original addEvent method
        originalAddEvent.call(this, eventData, eventOptions, eventWrap);
    };
    Schedule.prototype.saveEvent = function (eventData, eventOptions, eventWrap) {
        // Perform any custom logic here
        eventData.IsAllDay = true;
        eventData.Subject = $('#Subject').val();
        eventData.EndTime = new Date((eventData.EndTime).setHours(23, 59, 59))
        // Call the original addEvent method
        originalSaveEvent.call(this, eventData, eventOptions, eventWrap);
    };

    var getEventData = function (args) {
        let holidayId = null;

        let h = holidays.filter(c => c.Name == args.Subject);
        if (h.length) {
            holidayId = h[0].Id;
        }

        let tzoffset = (new Date(args.StartTime)).getTimezoneOffset() * 60000; //offset in milliseconds
        let startTime = (new Date(args.StartTime - tzoffset)).toISOString().slice(0, -1);
        tzoffset = (new Date(args.EndTime)).getTimezoneOffset() * 60000; //offset in milliseconds
        let endTime = (new Date(args.EndTime - tzoffset)).toISOString().slice(0, -1);

        return {
            Id: args.Id,
            Subject: args.Subject,
            Groups: args.Groups,
            HolidayId: holidayId,
            StartTime: startTime,
            EndTime: endTime,
            RequestType: args.requestType
        }
    }
    var saveHoliday = function (args) {
        let eventdata = getEventData(args)
        $.ajax({
            type: "POST",
            url: "/Holiday/UpdateData",
            data: eventdata,
            success: function (response) {
                console.log("Event saved successfully");
            },
            error: function (error) {
                console.log("Error occurred while saving the event");
            }
        });
    }
})();