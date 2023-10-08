$(document).ready(function () {
    var id = 0;
    var selectedEndpoints = [];

    const planetDistances = {
        "Sun": {
            "Mercury": 57.9,
            "Venus": 108.2,
            "Earth": 149.6,
            "Mars": 227.9,
            "Jupiter": 778.3,
            "Saturn": 1427.0,
            "Uranus": 2871.0,
            "Neptune": 4497.1,
        },
        "Mercury": {
            "Sun": 57.9,
            "Venus": 50.3,
            "Earth": 91.7,
            "Mars": 120.0,
            "Jupiter": 720.5,
            "Saturn": 1366.0,
            "Uranus": 2824.0,
            "Neptune": 4440.1,
        },
        "Venus": {
            "Sun": 108.2,
            "Mercury": 50.3,
            "Earth": 41.4,
            "Mars": 78.3,
            "Jupiter": 670.1,
            "Saturn": 1315.6,
            "Uranus": 2773.6,
            "Neptune": 4389.7,
        },
        "Earth": {
            "Sun": 149.6,
            "Mercury": 91.7,
            "Venus": 41.4,
            "Mars": 54.6,
            "Jupiter": 629.8,
            "Saturn": 1271.0,
            "Uranus": 2722.8,
            "Neptune": 4338.9,
        },
        "Mars": {
            "Sun": 227.9,
            "Mercury": 120.0,
            "Venus": 78.3,
            "Earth": 54.6,
            "Jupiter": 575.1,
            "Saturn": 1217.3,
            "Uranus": 2668.1,
            "Neptune": 4284.2,
        },
        "Jupiter": {
            "Sun": 778.3,
            "Mercury": 720.5,
            "Venus": 670.1,
            "Earth": 629.8,
            "Mars": 575.1,
            "Saturn": 645.4,
            "Uranus": 2119.6,
            "Neptune": 3735.7,
        },
        "Saturn": {
            "Sun": 1427.0,
            "Mercury": 1366.0,
            "Venus": 1315.6,
            "Earth": 1271.0,
            "Mars": 1217.3,
            "Jupiter": 645.4,
            "Uranus": 1606.6,
            "Neptune": 3222.7,
        },
        "Uranus": {
            "Sun": 2871.0,
            "Mercury": 2824.0,
            "Venus": 2773.6,
            "Earth": 2722.8,
            "Mars": 2668.1,
            "Jupiter": 2119.6,
            "Saturn": 1606.6,
            "Neptune": 1616.1,
        },
        "Neptune": {
            "Sun": 4497.1,
            "Mercury": 4440.1,
            "Venus": 4389.7,
            "Earth": 4338.9,
            "Mars": 4284.2,
            "Jupiter": 3735.7,
            "Saturn": 3222.7,
            "Uranus": 1616.1,
        },
    };

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

    $(document).on('click', '.btn-add-endpoint', function () {
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

    $(".btn-add-endpoint").on("click", function () {
        var endpointValue = $(this).data("value");

        if (!selectedEndpoints.includes(endpointValue)) {
            selectedEndpoints.push(endpointValue);
            displaySelectedEndpoints();
        }
    });

    $('#agregar').on('click', function () {
        resetEndpointButtons();

        var startingPoint = $('#inputStartingPoint').val();
        var startingDate = $('#inputDate').val();
        var endingDate = $('#inputDate2').val();
        var modeOfTransport = $('#inputTransport').val();

        var selectedEndpointsArray = endingPointsArray; // Usar los puntos finales seleccionados

        console.log(selectedEndpointsArray);

        const totalDistance = calcularDistanciaTotal(startingPoint, selectedEndpointsArray);

        console.log(totalDistance);

        var newRow = '<tr>' +
            '<th scope="row" class="id">' + id + '</th>' +
            '<td class="startingPoint">' + startingPoint + '</td>' +
            '<td class="endingPoints">' + endingPointsArray.join(', ') + '</td>' +
            '<td class="startingDate">' + startingDate + '</td>' +
            '<td class="endingDate">' + endingDate + '</td>' +
            '<td class="modeOfTransport">' + modeOfTransport + '</td>' +
            '<td class="distance">' + totalDistance + ' km</td>' +
            '</tr>';

        $('tbody').append(newRow);

        $('#inputStartingPoint').val('');
        $('#planetSelect').val([]);
        $('#inputDate').val('');
        $('#inputDate2').val('');
        $('#inputTransport').val('');

        $('#selected-endpoints').empty()

        endingPointsArray = [];
        displaySelectedEndpoints();
        id++;
    });

    function calcularDistanciaTotal(startingPoint, selectedEndpointsArray) {
        let totalDistance = 0;

        for (let i = 0; i < selectedEndpointsArray.length; i++) {
            const currentPlanet = selectedEndpointsArray[i];
            const nextPlanet = selectedEndpointsArray[(i + 1) % selectedEndpointsArray.length]; // Obtén el siguiente planeta circularmente

            if (i === 0) {
                totalDistance += planetDistances[startingPoint][currentPlanet];
            }

            totalDistance += planetDistances[currentPlanet][nextPlanet];
        }

        return totalDistance.toFixed(2);
    }

});