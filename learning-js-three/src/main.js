import * as THREE from 'three';

const renderer = new THREE.WebGLRenderer();
console.log("Threejs being used here")

renderer.setSize(window.innerWidth, window.innerHeight-0.1);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
    75, 
    window.innerWidth/(window.innerHeight-0.1),
    0.1,
    1000
)

// const axesHelper = new THREE.AxesHelper(2);
// scene.add(axesHelper);

camera.position.set(0, 0.5, 7)

const boxGeometry = new THREE.BoxGeometry()
const boxMaterial = new THREE.MeshBasicMaterial({color: 0x00FFF0});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

const animate = () => {
    box.rotation.x += 0.01;
    box.rotation.y += 0.01;
    scene.rotation.y += 0.01;
    scene.rotation.x += 0.01;
    if(box.position.z <= 2.5) box.position.z += 0.01;
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate)