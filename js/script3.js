let modal = document.getElementById('modal');
let planetTexture = 'earth.png'; // Textura predeterminada

function loadTexture(textureName, id) {
    planetTexture = textureName;
    openModal(id);
}

function openModal(id) {
    modal.style.display = 'block';
    loadPlanet(id);
}

function closeModal() {
    modal.style.display = 'none';
}

function loadPlanet(planetId) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth - 20, window.innerHeight); // Tamaño del renderizador

    document.querySelector('.planet-viewMax').innerHTML = '';
    document.querySelector('.planet-viewMax').appendChild(renderer.domElement);


    const geometry = new THREE.SphereGeometry(1, 64, 64);
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('/images/' + planetTexture); // Ruta de la textura
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const planet = new THREE.Mesh(geometry, material);
    scene.add(planet);

    camera.position.z = 5;

    // Obtener y mostrar nombres de lugares turísticos en el modal
    $.getJSON('/json/planets.json', function(data) {
        const selectedPlanet = data.find(planet => planet.position == planetId);
        if (selectedPlanet) {
            const touristSpots = selectedPlanet.tourist_spots;
            if (touristSpots && touristSpots.length > 0) {
                const touristSpotsHtml = touristSpots.map(spot => `<p>${spot.name}</p>`).join('');
                document.querySelector('.tourist-spots').innerHTML = `<h3>Lugares turísticos:</h3>${touristSpotsHtml}`;
            } else {
                document.querySelector('.tourist-spots').innerHTML = '<p>No hay lugares turísticos para este planeta.</p>';
            }
        } else {
            document.querySelector('.tourist-spots').innerHTML = '<p>Planeta no encontrado en los datos.</p>';
        }
    })
    .fail(function(error) {
        document.querySelector('.tourist-spots').innerHTML = `<p>Error al cargar el archivo JSON: ${error}</p>`;
    });

    const animate = () => {
        requestAnimationFrame(animate);
        planet.rotation.y += 0.005;
        renderer.render(scene, camera);
    };

    
    

    animate();
}

