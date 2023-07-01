import * as three from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import stars from '../assets/solar-img/stars.jpg';
import sun from '../assets/solar-img/sun.jpg';
import mercury from '../assets/solar-img/mercury.jpg';
import venus from '../assets/solar-img/venus.jpg';
import mars from '../assets/solar-img/mars.jpg';
import earth from '../assets/solar-img/earth.jpg';
import saturn from '../assets/solar-img/saturn.jpg';
import jupiter from '../assets/solar-img/jupiter.jpg';
import uranus from '../assets/solar-img/uranus.jpg';
import neptune from '../assets/solar-img/neptune.jpg';
import saturn_ring from '../assets/solar-img/saturn_ring.png';

const renderer = new three.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight -0.1);

document.body.appendChild(renderer.domElement)

const scene = new three.Scene();

const camera = new three.PerspectiveCamera(
    45,
    window.innerWidth/(window.innerHeight - 0.1),
    0.1,
    1000
);

const orbitControls = new OrbitControls(camera, renderer.domElement);

camera.position.set(-90, 140, 200);
orbitControls.update()

const ambientLight = new three.AmbientLight(0x333333);
scene.add(ambientLight);

const texture = new three.TextureLoader(); 
const cubeTexture = new three.CubeTextureLoader();

scene.background = cubeTexture.load([
    stars,
    stars,
    stars,
    stars,
    stars,
    stars
])

const sunGeometry = new three.SphereGeometry(30, 100, 100);
const sunMaterial = new three.MeshBasicMaterial({
    color: '0xFCE570',
    map: texture.load(sun)
});

const sunG = new three.Mesh(sunGeometry, sunMaterial);
scene.add(sunG)

window.addEventListener('resize', function(e){
    renderer.setSize(window.innerWidth, window.innerHeight - 0.1);
    camera.aspect = window.innerWidth/(window.innerHeight - 0.1);
    camera.updateProjectionMatrix();
});

const animate = () => {
    renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate)