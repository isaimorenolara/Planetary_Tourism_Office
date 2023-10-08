$(document).ready(function () {
    var id = 0;

    $.getJSON('../json/planets.json', function (data) {
        const planetCarousel = $('#planetCarousel');
        const indicators = $('.carousel-indicators');

        data.forEach(function (planet, index) {
            const indicator = $('<button>')
                .attr('type', 'button')
                .attr('data-bs-target', '#carouselExampleCaptions')
                .attr('data-bs-slide-to', index)
                .attr('aria-label', `Slide ${index + 1}`);

            if (index === 0) {
                indicator.addClass('active'); // Marca el primer indicador como activo
            }

            indicators.append(indicator);

            const carouselItem = $('<div>').addClass('carousel-item');
            if (index === 0) {
                carouselItem.addClass('active'); // Marca el primer planeta como activo
            }

            const planetImage = $('<img>').addClass('rounded mx-auto d-block img-fluid mb-5 hola').attr('src', planet.image).attr('alt', planet.name);

            const planetDescription = $('<div>').addClass('carousel-caption d-none d-md-block filtro');
            const planetName = $('<h2>').text(planet.name).addClass('titulo');
            
            const planetInfo = $('<p>').text(planet.description);

            carouselItem.append(planetImage);
            planetDescription.append(planetName, planetInfo);
            carouselItem.append(planetDescription);

            planetCarousel.append(carouselItem);
        });

        $('#carouselExampleCaptions').carousel();
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