

$(document).ready(function () {

    // Setup - add a text input to each footer cell
    //  $('#datatable tfoot th').each( function () {
    //      var title = $(this).text();
    //      $(this).html( '<input type="text" placeholder="Search '+title+'" />' );
    //  } );
    $.myfunction = function () {
        table.row.add([
            counter + '.1',
            counter + '.2',
            counter,
            counter,
            counter,
            counter
        ]).draw(false);
        counter++;
    };
    // DataTable
    var table = $('#datatable').DataTable({
        "order": [[2, 'asc']],
        "paging": false,
        "searching": true,
        "oLanguage": {
            "sStripClasses": "",
            "sSearch": "",
            "sSearchPlaceholder": "Busca aqu\u00ED...",
        },

        "columnDefs": [{
            targets: 2,
            render: function (data, type, row) {
                var color = 'black';
                if (data.indexOf("-") == -1) {
                    color = 'green';
                }
                else {
                    color = 'red'
                }
                return '<span style="color:' + color + '">' + data + '</span>';
            }
        }]

    });

    //var t= $('#datatable').DataTable();
    var counter = 1;
    $('#addRow').on('click', function () {
        table.row.add([
            counter + '.1',
            counter + '.2',
            counter,
            counter,
            counter,
            counter
        ]).draw(false);
    });


    // Apply the search
    // table.columns().every( function () {
    //     var that = this;
    //
    //     $( 'input', this.footer() ).on( 'keyup change', function () {
    //         if ( that.search() !== this.value ) {
    //             that
    //                 .search( this.value )
    //                 .draw();
    //         }
    //     } );
    // } );
});
