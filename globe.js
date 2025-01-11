
/*
// globe.js

// Create the scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create a renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x0d004d,1); // Set background color to blue
document.body.appendChild(renderer.domElement);

// Create a sphere geometry and wrap the Earth texture around it
const geometry = new THREE.SphereGeometry(2, 32, 32);
const texture = new THREE.TextureLoader().load('https://upload.wikimedia.org/wikipedia/commons/8/83/Equirectangular_projection_SW.jpg');
const material = new THREE.MeshBasicMaterial({ map: texture });
const globe = new THREE.Mesh(geometry, material);
scene.add(globe);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    globe.rotation.y += 0.01; // Rotate the globe
    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start the animation
animate();


// globe.js

// Crear la escena, cámara, renderer y el globo (igual que antes)
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x0d004d, 1);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(2, 32, 32);
const texture = new THREE.TextureLoader().load('https://upload.wikimedia.org/wikipedia/commons/8/83/Equirectangular_projection_SW.jpg');
const material = new THREE.MeshBasicMaterial({ map: texture });
const globe = new THREE.Mesh(geometry, material);
scene.add(globe);

// Función para convertir latitud y longitud a coordenadas esféricas
function latLongToVector3(lat, lon, radius) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const x = -((radius) * Math.sin(phi) * Math.cos(theta));
    const z = ((radius) * Math.sin(phi) * Math.sin(theta));
    const y = ((radius) * Math.cos(phi));
    return new THREE.Vector3(x, y, z);
}

// Lista para almacenar los pines
const pins = [];

// Función para agregar un pin en un país
function addPin(lat, lon) {
    const pinGeometry = new THREE.SphereGeometry(0.05, 16, 16);
    const pinMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const pin = new THREE.Mesh(pinGeometry, pinMaterial);
    const position = latLongToVector3(lat, lon, 2.05);
    pin.position.copy(position);
    pins.push(pin);  // Almacenar el pin para actualizarlo después
    scene.add(pin);
}

// Obtener coordenadas de varios países usando la API
function addPinsForCountries(countryNames) {
    countryNames.forEach(countryName => {
        fetch(`https://restcountries.com/v3.1/name/${countryName}`)
            .then(response => response.json())
            .then(data => {
                const country = data[0];
                const lat = country.latlng[0];
                const lon = country.latlng[1];
                addPin(lat, lon);
            })
            .catch(error => console.error(`Error obteniendo datos de ${countryName}:`, error));
    });
}

// Lista de nombres de países
const countriesList = ["Mexico", "Spain", "France", "Japan", "Brazil", "Canada", "Australia"];
addPinsForCountries(countriesList);


// Animación del globo
function animate() {
    requestAnimationFrame(animate);
    globe.rotation.y += 0.01;  // Rotar la esfera

    // Actualizar la posición de los pines para que se muevan con el globo
    pins.forEach(pin => {
        // Convertir la posición del pin a coordenadas esféricas actualizadas con la rotación
        const lat = pin.position.clone().normalize().multiplyScalar(2.05);
        pin.position.copy(lat);

        // Aplicar la rotación del globo a los pines
        pin.position.applyMatrix4(globe.matrixWorld); // Usar la matriz de transformación global
    });

    renderer.render(scene, camera);
}

// Manejar el redimensionamiento de la ventana
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Iniciar la animación
animate();
*/

// Crear la escena, cámara, renderer y el globo
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x0d004d, 1);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(2, 32, 32);
const texture = new THREE.TextureLoader().load('https://upload.wikimedia.org/wikipedia/commons/8/83/Equirectangular_projection_SW.jpg');
const material = new THREE.MeshBasicMaterial({ map: texture });
const globe = new THREE.Mesh(geometry, material);
scene.add(globe);

// Crear un grupo para contener los pines, de modo que sigan la rotación del globo
const pinsGroup = new THREE.Group();
scene.add(pinsGroup);

// Función para convertir latitud y longitud a coordenadas esféricas
function latLongToVector3(lat, lon, radius) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const x = -((radius) * Math.sin(phi) * Math.cos(theta));
    const z = ((radius) * Math.sin(phi) * Math.sin(theta));
    const y = ((radius) * Math.cos(phi));
    return new THREE.Vector3(x, y, z);
}

// Lista para almacenar los pines
const pins = [];

// Función para agregar un pin en un país
function addPin(lat, lon) {
    const pinGeometry = new THREE.SphereGeometry(0.05, 16, 16);
    const pinMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const pin = new THREE.Mesh(pinGeometry, pinMaterial);
    const position = latLongToVector3(lat, lon, 2.05);
    pin.position.copy(position);
    pins.push({ pin, lat, lon });  // Guardamos los pines con latitud y longitud
    pinsGroup.add(pin);  // Añadimos el pin al grupo para que siga la rotación del globo
    console.log(`Pin added at lat: ${lat}, lon: ${lon}`);
}

// Obtener coordenadas de varios países usando la API
function addPinsForCountries(countryNames) {
    countryNames.forEach(countryName => {
        fetch(`https://restcountries.com/v3.1/name/${countryName}`)
            .then(response => response.json())
            .then(data => {
                const country = data[0];
                const lat = country.latlng[0];
                const lon = country.latlng[1];
                addPin(lat, lon);
            })
            .catch(error => console.error(`Error obteniendo datos de ${countryName}:`, error));
    });
}

// Lista de países
const countriesList = ["Mexico", "France", "Japan", "Canada", "Australia", "USA", "El Salvador", "Costa Rica", "Panama", "Nicaragua", "Colombia", "Venezuela", "Brazil", "Argentina", "Chile", "Peru", "Ecuador", "Paraguay", "Italy", "Spain", "Holland", "England", "Germany", "Denmark", "Norway", "Poland", "Czechia", "Hungary", "Israel", "Tunisia", "Algeria", "United Arab Emirates", "South Africa", "Indonesia", "New Zealand"];
addPinsForCountries(countriesList);

// Variables para rotar el globo según el movimiento del mouse
let mouseX = 0;
let mouseY = 0;

// Función para manejar el movimiento del cursor
function onMouseMove(event) {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
}

// Agregar el evento de movimiento del mouse
window.addEventListener('mousemove', onMouseMove);

// Crear un elemento para mostrar el nombre del país
const countryNameDisplay = document.createElement('div');
countryNameDisplay.style.position = 'absolute';
countryNameDisplay.style.top = '10px';
countryNameDisplay.style.left = '10px';
countryNameDisplay.style.color = 'white';
countryNameDisplay.style.fontSize = '20px';
countryNameDisplay.style.pointerEvents = 'none'; // Para que no interfiera con los clics
document.body.appendChild(countryNameDisplay);

// Raycaster para detectar clics
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Función para manejar el clic en los pines
function onMouseClick(event) {
    // Convertir las coordenadas del mouse a espacio de normalizado
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Actualizar el raycaster con la cámara y la posición del mouse
    raycaster.setFromCamera(mouse, camera);

    // Calcular objetos intersectados
    const intersects = raycaster.intersectObjects(pinsGroup.children);

    if (intersects.length > 0) {
        // Obtener el pin intersectado
        const intersectedPin = intersects[0].object;

        // Encontrar el país correspondiente al pin
        const pinData = pins.find(({ pin }) => pin === intersectedPin);
        if (pinData) {
            // Mostrar el nombre del país
            countryNameDisplay.innerText = `País: ${countriesList[pins.indexOf(pinData)]}`;
        }
    }
}

// Agregar el evento de clic
window.addEventListener('click', onMouseClick);

// Función para actualizar las posiciones de los pines según la rotación
function updatePinPositions() {
    pins.forEach(({ pin, lat, lon }) => {
        const position = latLongToVector3(lat, lon, 2.05);
        const rotatedPosition = position.clone().applyEuler(globe.rotation);
        pin.position.copy(rotatedPosition);
    });
}

// Animación del globo
function animate() {
    requestAnimationFrame(animate);
    globe.rotation.y = mouseX * Math.PI;
    globe.rotation.x = mouseY * Math.PI / 4;
    updatePinPositions();
    renderer.render(scene, camera);
}

// Iniciar la animación
animate();
