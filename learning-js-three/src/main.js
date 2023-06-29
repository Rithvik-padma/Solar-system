import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui';

const renderer = new THREE.WebGLRenderer();

renderer.shadowMap.enabled = true;

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

const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    side: THREE.DoubleSide
})

const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = Math.PI * -0.5;
plane.receiveShadow = true;

const gridHelper = new THREE.GridHelper(30, 30);
scene.add(gridHelper)

const sphereGeometry = new THREE.SphereGeometry(4, 100 , 100);
const sphereMaterial = new THREE.MeshStandardMaterial({
    color: 0x0FF000
})

const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);
sphere.position.set(-10, 0, 5)
sphere.castShadow = true;

const ambientLight = new THREE.AmbientLight(0x333333)
scene.add(ambientLight)

// const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.2)
// scene.add(directionalLight)
// directionalLight.position.set(-40, 50, 20)
// directionalLight.castShadow = true;

// const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 3);
// scene.add(directionalLightHelper)

// const dLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
// scene.add(dLightShadowHelper);

const spotLight = new THREE.SpotLight(0xFFFFFF);
scene.add(spotLight);
spotLight.position.set(-50, 100, 0);
spotLight.castShadow = true;

const sLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(sLightHelper);

const gui = new dat.GUI();

const options = {
    sphereColor: '#ffea00',
    wireframe: false,
    speed: 0.01,
    angle: 0.2,
    penumbra: 0,
    intensity: 1
}

gui.addColor(options, 'sphereColor').onChange((e) => sphere.material.color.set(e))
gui.add(options, 'wireframe').onChange((e) => sphere.material.wireframe = e)
gui.add(options, 'speed', 0.01, 0.1)
gui.add(options, 'angle', 0 , 1)
gui.add(options, 'penumbra', 0, 1)
gui.add(options, 'intensity', 0, 1)
let step = 0;

const animate = (time) => {
    box.rotation.x = time/1000;
    box.rotation.y = time/1000;
    step += options.speed
    sphere.position.y = 3.8 + 8 * Math.abs(Math.sin(step))

    spotLight.angle = options.angle;
    spotLight.penumbra = options.penumbra;
    spotLight.intensity = options.intensity;
    sLightHelper.update()
    scene.rotation.y = time/5000
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate)