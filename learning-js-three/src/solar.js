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

const ambientLight = new three.AmbientLight(0x333331);
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
sunG.pnenumbra = 1;

const pointLight = new three.PointLight(0xFFFFFF, 1, 200)
scene.add(pointLight);

const mercuryObj = new three.Object3D();
scene.add(mercuryObj);

const mercuryGeo = new three.SphereGeometry(5 ,100, 100)
const mercuryMat = new three.MeshStandardMaterial({
    map: texture.load(sun)
})
const mercuryG = new three.Mesh(mercuryGeo, mercuryMat);
mercuryObj.add(mercuryG);
mercuryG.position.x = 70;
mercuryG.rotation.z = 0.03

const venusObj = new three.Object3D();
scene.add(venusObj);

const venusGeo = new three.SphereGeometry(8 ,100, 100)
const venusMat = new three.MeshStandardMaterial({
    map: texture.load(venus)
})
const venusG = new three.Mesh(venusGeo, venusMat);
venusObj.add(venusG);
venusG.position.x = 120;
venusG.rotation.z = -2.7;

window.addEventListener('resize', function(e){
    renderer.setSize(window.innerWidth, window.innerHeight - 0.1);
    camera.aspect = window.innerWidth/(window.innerHeight - 0.1);
    camera.updateProjectionMatrix();
});

const animate = () => {
    sunG.rotateY(0.002);
    mercuryObj.rotateY(0.02);
    venusObj.rotateY(0.0075);
    mercuryG.rotateY(0.002);
    venusG.rotateY(0.001);
    renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate)