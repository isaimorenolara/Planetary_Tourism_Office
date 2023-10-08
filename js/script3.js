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
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(400, 400); // Tamaño del renderizador

    document.querySelector('.planet').innerHTML = '';
    document.querySelector('.planet').appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('/images/' + planetTexture); // Ruta de la textura
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const planet = new THREE.Mesh(geometry, material);
    scene.add(planet);

    camera.position.z = 5;

    // Imprimir nombres de lugares turísticos
    $.getJSON('/json/planets.json', function(data) {
        const selectedPlanet = data.find(planet => planet.position == planetId);
        if (selectedPlanet) {
            const touristSpots = selectedPlanet.tourist_spots;
            if (touristSpots && touristSpots.length > 0) {
                console.log('Lugares turísticos:', touristSpots.map(spot => spot.name).join(', '));
            } else {
                console.log('No hay lugares turísticos para este planeta.');
            }
        } else {
            console.error('Planeta no encontrado en los datos.');
        }
    })
    .fail(function(error) {
        console.error('Error al cargar el archivo JSON', error);
    });

    const animate = () => {
        requestAnimationFrame(animate);
        planet.rotation.y += 0.005;
        renderer.render(scene, camera);
    };

    animate();
}

