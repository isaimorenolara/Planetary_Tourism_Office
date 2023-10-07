let modal = document.getElementById('modal');
let planetTexture = 'earth.png'; // Textura predeterminada

function loadTexture(textureName) {
    planetTexture = textureName;
    openModal();
}

function openModal() {
    modal.style.display = 'block';
    loadPlanet();
}

function closeModal() {
    modal.style.display = 'none';
}

function loadPlanet() {
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

    const animate = () => {
        requestAnimationFrame(animate);
        planet.rotation.y += 0.005;
        renderer.render(scene, camera);
    };

    animate();
}
