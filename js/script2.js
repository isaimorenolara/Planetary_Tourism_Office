$(document).ready(function () {
    var id = 0;

    $.getJSON('../json/planets.json', function (data) {
        console.log(data);

        var carousel = $('#carouselExampleIndicators2');

        var carouselInner = carousel.find('.carousel-inner');

        for (var i = 0; i < data.length; i++) {
            var planet = data[i];

            var card = $('<div class="col-md-4 mb-3">');
            var cardContent = $('<div class="card">');
            var cardImage = $('<img class="img-fluid" alt="100%x280">').attr('src', planet.image);
            var cardBody = $('<div class="card-body">');
            var cardTitle = $('<h4 class="card-title">').text(planet.name);
            var cardText = $('<p class="card-text">').text(planet.description);

            cardBody.append(cardTitle, cardText);
            cardContent.append(cardImage, cardBody);
            card.append(cardContent);

            if (i === 0) {
                card.addClass('active');
            }
            carouselInner.append(card);
        }

        carousel.carousel();
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