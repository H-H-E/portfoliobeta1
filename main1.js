import './style.css';
import * as THREE from 'three';
import {
  OrbitControls
} from 'three/examples/jsm/controls/OrbitControls';
import {
  GLTFLoader
} from 'three/examples/jsm/loaders/GLTFLoader.js';

// Setup
const loader = new GLTFLoader();

const pyramidobject = new THREE.Object3D();

loader.load('assets/models/hussein.glb', function (gltf) {

  const pyramid = gltf.scene;
  pyramidobject.add(pyramid);
  pyramid.scale.set(0.5, 0.5, 0.5);
  pyramid.material = new THREE.MeshBasicMaterial();
  pyramid.TextureLoader = new THREE.TextureLoader('space.jpeg');
  pyramid.material.map = pyramid.TextureLoader.load('space.jpeg');


}, undefined, function (error) {

  console.error(error);

});



//const pyramid = new THREE.Mesh(loader.parse(pyramid).scene, new THREE.MeshPhongMaterial({ color: 0xffffff }));
//scene.add(pyramid);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(10);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshPhongMaterial({
  color: 0x040081
});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.025, 24, 24);
  const material = new THREE.MeshPhongMaterial({
    color: 0xffffff
  });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

scene.add(pyramidobject);
pyramidobject.position.set(0, 0, -4);
//pyramidobject.
Array(700).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('assets/space.jpeg');
//const spaceVideo = document.getElementById('video');
//const spaceVideoTexture = new THREE.VideoTexture(spaceVideo);
scene.background = spaceTexture;
pyramidobject.material = spaceTexture;

// Avatar

const jeffTexture = new THREE.TextureLoader().load('hussein.png');

const hussein = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({
  map: jeffTexture
}));

//scene.add(hussein);

// Moon

const moonTexture = new THREE.TextureLoader().load('moon.jpeg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

hussein.position.z = -5;
hussein.position.x = 2;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  hussein.position.y += 0.01;
  hussein.rotation.z += 0.01;

  pyramidobject.rotation.y += 0.01;
  //pyramidobject.rotation.z += 0.01;

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;


  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  //pyramidobject.position.y += 0.1;
 // pyramidobject.position.y -= 0.01;
  moon.rotation.x += 0.005;

  // controls.update();

  renderer.render(scene, camera);
}

animate();