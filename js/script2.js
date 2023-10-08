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

    var endingPointsArray = [];

    function resetEndpointButtons() {
        // Agrega la clase "btn-outline-dark" y quita la clase "btn-dark"
        $('.btn-add-endpoint').addClass('btn-outline-dark').removeClass('btn-dark');
    }

    $(document).on('click', '.btn-add-endpoint', function() {
        var endpoint = $(this).data('value');

        // Verificar si el endpoint ya está en el array
        var index = endingPointsArray.indexOf(endpoint);
        
        if (index === -1) {
            endingPointsArray.push(endpoint);
            $(this).addClass('btn-dark');
            $(this).removeClass('btn-outline-dark');
        } else {
            endingPointsArray.splice(index, 1);
            $(this).removeClass('btn-dark');
            $(this).addClass('btn-outline-dark');
        }

        displaySelectedEndpoints();
    });

    function displaySelectedEndpoints() {
        $('#selected-endpoints').empty();
        endingPointsArray.forEach(function (endpoint) {
            $('#selected-endpoints').append('<span class="badge bg-success me-2">' + endpoint + '</span>');
        });
    }

    $('#agregar').on('click', function () {
        resetEndpointButtons();

        var startingPoint = $('#inputStartingPoint').val();
        var startingDate = $('#inputDate').val();
        var endingDate = $('#inputDate2').val();
        var modeOfTransport = $('#inputTransport').val();

        // Añadir los valores a la tabla
        var newRow = '<tr>' +
            '<th scope="row" class="id">' + id + '</th>' +
            '<td class="startingPoint">' + startingPoint + '</td>' +
            '<td class="endingPoints">' + endingPointsArray.join(', ') + '</td>' +
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
        
        endingPointsArray = [];
        displaySelectedEndpoints();
        id++;
    });

});