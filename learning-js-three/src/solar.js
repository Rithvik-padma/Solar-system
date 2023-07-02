import * as three from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import stars from '../assets/solar-img/stars.jpg';
import sunI from '../assets/solar-img/sun.jpg';
import mercuryI from '../assets/solar-img/mercury.jpg';
import venusI from '../assets/solar-img/venus.jpg';
import marsI from '../assets/solar-img/mars.jpg';
import earthI from '../assets/solar-img/earth.jpg';
import saturnI from '../assets/solar-img/saturn.jpg';
import jupiterI from '../assets/solar-img/jupiter.jpg';
import uranusI from '../assets/solar-img/uranus.jpg';
import neptuneI from '../assets/solar-img/neptune.jpg';
import saturn_ringI from '../assets/solar-img/saturn_ring.png';

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

camera.position.set(-100, 150, 320);
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

const sunGeometry = new three.SphereGeometry(27, 100, 100);
const sunMaterial = new three.MeshBasicMaterial({
    color: '0xFCE570',
    map: texture.load(sunI)
});
const sun = new three.Mesh(sunGeometry, sunMaterial);
scene.add(sun)
sun.pnenumbra = 1;

const pointLight = new three.PointLight(0xFFFFFF, 1, 500)
scene.add(pointLight);

const createPlanet = (size, distance, ptexture, rotationAxis, ring) => {
    const geo = new three.SphereGeometry(size, 100, 100);
    const material = new three.MeshStandardMaterial({
        map: texture.load(ptexture)
    });
    const mesh = new three.Mesh(geo, material);
    const obj = new three.Object3D();
    obj.add(mesh);
    if(ring){
        const rgeo = new three.RingGeometry(
            ring.innerRadius,
            ring.outerRadius,
            50
        );
        const rmat = new three.MeshStandardMaterial({
            map: texture.load(ring.texture),
            side: three.DoubleSide
        })
        const rFig = new three.Mesh(rgeo, rmat);
        mesh.add(rFig);
    }
    mesh.position.x = distance;
    mesh.rotation.z = rotationAxis;
    scene.add(obj);
    return {mesh, obj};
}

const mercury = createPlanet(6, 70, mercuryI, 0.03);
const venus = createPlanet(9, 120, venusI, -2.7);
const earth = createPlanet(10, 180, earthI, 23);
const mars = createPlanet(8, 230, marsI, 25);
const jupiter = createPlanet(19, 310, jupiterI, 3);

console.log(mercury);

window.addEventListener('resize', function(e){
    renderer.setSize(window.innerWidth, window.innerHeight - 0.1);
    camera.aspect = window.innerWidth/(window.innerHeight - 0.1);
    camera.updateProjectionMatrix();
});

const animate = () => {
    sun.rotateY(0.002);

    mercury.obj.rotateY(0.02);
    venus.obj.rotateY(0.0075);
    earth.obj.rotateY(0.005);
    mars.obj.rotateY(0.004);
    jupiter.obj.rotateY(0.001)

    mercury.mesh.rotateY(0.002);
    venus.mesh.rotateY(0.001);
    earth.mesh.rotateY(0.01);
    mars.mesh.rotateY(0.009);
    jupiter.mesh.rotateY(0.02);

    renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate)