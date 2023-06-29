import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui';

const renderer = new THREE.WebGLRenderer();
console.log("Threejs being used here")

renderer.setSize(window.innerWidth, window.innerHeight-0.1);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
    45, 
    window.innerWidth/(window.innerHeight-0.1),
    0.1,
    1000
)

const orbit = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

camera.position.set(-10, 30, 30)
orbit.update()

const boxGeometry = new THREE.BoxGeometry(2, 2, 2)
const boxMaterial = new THREE.MeshBasicMaterial({color: 0x00FFF0});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);
box.position.x = 9;

const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0xFFFFFF,
    side: THREE.DoubleSide
})

const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = Math.PI * -0.5;

const gridHelper = new THREE.GridHelper(30, 30);
scene.add(gridHelper)

const sphereGeometry = new THREE.SphereGeometry(4, 100 , 100);
const sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0x0FF000
})
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);

const gui = new dat.GUI();

const options = {
    sphereColor: '#ffea00',
    wireframe: false,
    speed: 0.01
}

gui.addColor(options, 'sphereColor').onChange((e) => sphere.material.color.set(e))
gui.add(options, 'wireframe').onChange((e) => sphere.material.wireframe = e)
gui.add(options, 'speed', 0.01, 0.1)

let step = 0;

const animate = (time) => {
    box.rotation.x = time/1000;
    box.rotation.y = time/1000;
    step += options.speed
    sphere.position.y = 3.8 + 8 * Math.abs(Math.sin(step))
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate)