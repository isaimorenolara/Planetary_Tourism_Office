$(document).ready(function () {
    var id = 0;

    $.getJSON('../json/planets.json', function (data) {
        console.log(data);
        
    });

    $('#agregar').on('click', function () {
        var startingPoint = $('#inputStartingPoint').val();
        var endingPoints = $('#planetSelect').val();
        var startingDate = $('#inputDate').val();
        var endingDate = $('#inputDate2').val();
        var modeOfTransport = $('#inputTransport').val();

        // Añadir los valores a la tabla
        var newRow = '<tr>' +
            '<th scope="row" class="id">' + id + '</th>' +
            '<td class="startingPoint">' + startingPoint + '</td>' +
            '<td class="endingPoints">' + endingPoints.join(', ') + '</td>' +
            '<td class="startingDate">' + startingDate + '</td>' +
            '<td class="endingDate">' + endingDate + '</td>' +
            '<td class="modeOfTransport">' + modeOfTransport + '</td>' +
            '</tr>';

        $('tbody').append(newRow);

        // Limpiar los campos del formulario
        $('#inputStartingPoint').val('');
        $('#planetSelect').val([]);
        $('#inputDate').val('');
        $('#inputDate2').val('');
        $('#inputTransport').val('');
        id++;
    });

    function reasignarIDs() {
        var rows = $('tbody tr');
        rows.each(function (index) {
            $(this).find('.id').text(index);
        });
        id = rows.length;
    }
});