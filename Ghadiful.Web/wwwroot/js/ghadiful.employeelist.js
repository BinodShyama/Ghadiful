var dataTable = {};
var employee = {
    load: function () {
        dataTable = $('#employee-list').DataTable({
            "processing": true,
            "responsive": true,
            "serverSide": true,
            "scrollX": true,
            "ordering": true,
            "paging": true,
            "searching": true,
            "ajax": {
                "url": '/Employee/List',
                "type": 'POST',
                "data": function (d) {
                    d.searchModel = {
                        organization: '',
                    }
                },
                "dataSrc": function (d) {
                    // Format API response for DataTables
                    var response = d;
                    if (typeof d.response != 'undefined') {
                        response = d.response;
                    }
                    return response.data;
                }
            },
            "columns": [
                {
                    "data": "name", "title": "Name", render: function (data, display, row, a) {
                        return "<a class='btn-link' href='#'>" + data + "</a>";
                    }
                },
                { "data": "officialNumber", "title": "Official Number" },
                { "data": "deviceEnrollNumber", "title": "Device Enroll Number" },
                { "data": "payrollNumber", "title": "Payroll Number" },
                { "data": "phoneNumber", "title": "Phone Number" },
                { "data": "email", "title": "Email" },
                { "data": "organization", "title": "Organization" },
                { "data": "status", "title": "Status" },
            ],

        });
    },

    dataTableFilter: function () {
        dataTable.ajax.reload();
    },

    dataTableClearFilter: function () {
        $('.select-chosen').val('')
        $('.select-chosen').trigger("chosen:updated");
        dataTable.ajax.reload();
    }
}