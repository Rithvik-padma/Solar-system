import * as three from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import stars from '/stars.jpg';
import sunI from '/sun.jpg';
import mercuryI from '/mercury.jpg';
import venusI from '/venus.jpg';
import marsI from '/mars.jpg';
import earthI from '/earth.jpg';
import saturnI from '/saturn.jpg';
import jupiterI from '/jupiter.jpg';
import uranusI from '/uranus.jpg';
import neptuneI from '/neptune.jpg';
import saturn_ringI from '/saturn_ring.png';

const renderer = new three.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement)

const scene = new three.Scene();

const camera = new three.PerspectiveCamera(
    50,
    window.innerWidth/window.innerHeight,
    0.01,
    1000
);

const orbitControls = new OrbitControls(camera, renderer.domElement);

camera.position.set(-100, 250, 400);
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
]);

const sunGeometry = new three.SphereGeometry(27, 100, 100);
const sunMaterial = new three.MeshBasicMaterial({
    color: '0xFCE570',
    map: texture.load(sunI)
});
const sun = new three.Mesh(sunGeometry, sunMaterial);
scene.add(sun)
sun.pnenumbra = 1;

const pointLight = new three.PointLight(0xFFFFFF, 1, 2500)
scene.add(pointLight);

const createPlanet = (size, distance, ptexture, rotationAxis, ring) => {
    const geo = new three.SphereGeometry(size, 100, 100);
    const material = new three.MeshStandardMaterial({
        map: texture.load(ptexture)
    });
    const mesh = new three.Mesh(geo, material);
    const obj = new three.Object3D();
    obj.add(mesh);
    let rFig;
    if(ring){
        const rgeo = new three.RingGeometry(
            ring.innerRadius,
            ring.outerRadius,
            100
        );
        const rmat = new three.MeshStandardMaterial({
            map: texture.load(ring.texture),
            side: three.DoubleSide
        })
        rFig = new three.Mesh(rgeo, rmat);
        mesh.add(rFig);
    }
    mesh.position.x = distance;
    mesh.rotation.x = rotationAxis * Math.PI/180;
    if(ring) {
        rFig.rotation.x = Math.PI * (90)/180;

    }
    scene.add(obj);
    return {mesh, obj};
}

const mercury = createPlanet(6, 70, mercuryI, 0.03);
const venus = createPlanet(9, 120, venusI, -2.7);
const earth = createPlanet(10, 180, earthI, 23);
const mars = createPlanet(8, 230, marsI, 25);
const jupiter = createPlanet(19, 310, jupiterI, 3);
const saturn = createPlanet(17, 390, saturnI, 27, {
    innerRadius: 20,
    outerRadius: 30,
    texture: saturn_ringI
});
const uranus = createPlanet(11.5, 470, uranusI, 98);
const neptune = createPlanet(11.5, 515, neptuneI, 30);

window.addEventListener('resize', function(e){
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
});

const animate = () => {
    sun.rotateY(0.002);

    mercury.obj.rotateY(0.02);
    venus.obj.rotateY(0.0075);
    earth.obj.rotateY(0.005);
    mars.obj.rotateY(0.004);
    jupiter.obj.rotateY(0.001);
    saturn.obj.rotateY(0.00045);
    uranus.obj.rotateY(0.0002);
    neptune.obj.rotateY(0.00005);

    mercury.mesh.rotateY(0.002);
    venus.mesh.rotateY(0.001);
    earth.mesh.rotateY(0.01);
    mars.mesh.rotateY(0.009);
    jupiter.mesh.rotateY(0.02);
    saturn.mesh.rotateY(0.019);
    uranus.mesh.rotateY(0.015);
    neptune.mesh.rotateY(0.004);

    renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate)