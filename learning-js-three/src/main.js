import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

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

const boxGeometry = new THREE.BoxGeometry(4, 4, 4)
const boxMaterial = new THREE.MeshBasicMaterial({color: 0x00FFF0});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshBasicMaterial({color: 0xFFFFFF})
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);

const animate = () => {
    box.rotation.x += 0.01;
    box.rotation.y += 0.01;
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate)