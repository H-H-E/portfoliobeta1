import '/style.css';
import * as THREE from 'three';
import { Interaction } from 'three.interaction';
import {
    OrbitControls
} from 'three/examples/jsm/controls/OrbitControls';
import {
    GLTFLoader
} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {
    OBJLoader
} from 'three/examples/jsm/loaders/OBJLoader.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

import vertexShader from './shaders/vertex.glsl';

import fragmentShader from './shaders/fragment.glsl';
import { RGB_ETC1_Format } from 'three';

// Setup
const loader = new GLTFLoader();
const tloader = new OBJLoader();
const HusseinHead = new THREE.Object3D();
loader.load('assets/models/HusseinwithFro.glb', function (gltf) {

    const pyramid = gltf.scene;
    HusseinHead.add(pyramid);
    pyramid.scale.set(1,1,1);


}, undefined, function (error) {

    console.error(error);

});
const brainloader = new GLTFLoader();
const Brain = new THREE.Object3D();
brainloader.load('assets/models/BrainModel-Simplified/BrainModel-Simplified.gltf', function (gltf) {

    const BrainOBJ = gltf.scene;
    Brain.add(BrainOBJ);
    scene.add(Brain);
    Brain.scale.set(1,1,1);


}, undefined, function (error) {

    console.error(error);

});

const HusseinTextObject = new THREE.Object3D();
const floader = new FontLoader();
const displayText = 'Hussein'

floader.load('assets/font/Roboto_Regular.json', function (font) {
    const fgeometry = new TextGeometry(displayText, {
        font: font,
		size: 80,
		height: 5,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 10,
		bevelSize: 8,
		bevelOffset: 0,
		bevelSegments: 5
		 });
    const fmaterial = new THREE.MeshPhongMaterial(
        { color: (0,0,180), 
            shininess: 90, 
            reflectivity: 100,
            metalletness: 0.5,
            emissiveMap: new THREE.TextureLoader().load('assets/pics/starsfortext.jpeg'),
            specular: 0x030f16,
            emissive: 0x030f16,
            wireframe: false,
            map: new THREE.TextureLoader().load('assets/pics/starsfortext.jpeg')

             });
    //const fmaterial = new THREE.ShaderMaterial( { uniforms: { time: { value: 1.0 }, resolution: { value: new THREE.Vector2() } }, vertexShader: document.getElementById( 'vertexShader' ).textContent, fragmentShader: document.getElementById( 'fragmentShader' ).textContent } );
    const ftext = new THREE.Mesh(fgeometry, fmaterial);
    scene.add(ftext);
    HusseinTextObject.add(ftext);
    HusseinTextObject.rotation.set(0, 0, 0);
    HusseinTextObject.position.set(-9, 0, -7);
    const scale = 0.012;

    HusseinTextObject.scale.set(scale,scale,scale);
    
  
    
});
//const pyramid = new THREE.Mesh(loader.parse(pyramid).scene, new THREE.MeshPhongMaterial({ color: 0xffffff }));
//scene.add(pyramid);



function pointmaker(a, b, c) {
    const vertices = [];

    for ( let i = 0; i < 10000; i ++ ) {
    
        const x = THREE.MathUtils.randFloatSpread( 2000 );
        const y = THREE.MathUtils.randFloatSpread( 2000 );
        const z = THREE.MathUtils.randFloatSpread( 2000 );
    
        vertices.push( x, y, z );
    
    }
    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
    
    const material = new THREE.PointsMaterial( { color: 0x8c     } );
    
    const points = new THREE.Points( geometry, material );
    
    scene.add( points );

    points.position.set(a, b, c);

}





const scene = new THREE.Scene();



const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ();
camera.position.setY(0.75);
camera.position.setX(-3);

//renderer.render(scene, camera);

// Pathway

const pgeometry = new THREE.BoxGeometry(1,1,10);
const pmaterial = new THREE.MeshPhongMaterial({
    color: 0x040081
});
const path = new THREE.Mesh(pgeometry, pmaterial);

const path2 = new THREE.Mesh(pgeometry, pmaterial);
const path3 = new THREE.Mesh(pgeometry, pmaterial);
const path4 = new THREE.Mesh(pgeometry, pmaterial);

path.add(path2);
path.add(path3);
path.add(path4);



scene.add(path);
path.position.set(0, -2, -5);
path.rotation.set(0, 0, 0);

path2.position.set(0, 0, 0);
path3.position.set(0, 0, 10);
path4.position.set(0, 0, 20);




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


// Background

const spaceTexture = new THREE.TextureLoader().load('assets/8k_stars.jpeg');
scene.background = spaceTexture;
//HusseinHead.material = spaceTexture;

// Avatar

const jeffTexture = new THREE.TextureLoader().load('hussein.png');

const hussein = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({
    map: jeffTexture
}));


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

const testmaterial = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: {
        moonTexture: {  moonTexture},},
    
})
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    testmaterial

    );

// Scene adding


scene.add(HusseinHead);
HusseinHead.position.set(-2, 1, -15);
HusseinHead.rotation.set(-0, -0.15, 0);
Array(900).fill().forEach(addStar);

scene.add(Brain);

scene.add(moon);
scene.add(sphere)
sphere.scale.set(.5, .5, .5);
sphere.position.set(0, 0, -7);

moon.position.z = 30;
moon.position.setX(-10);

scene.add(HusseinTextObject);
//ftext.fmaterial.color.set(0xffffff);
const textLight = new THREE.PointLight((0,0,200), 1, 100);
scene.add(textLight);





// Scroll Animation

function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    moon.rotation.x += 0.05;
    moon.rotation.y += 0.075;
    moon.rotation.z += 0.05;
    console.log(t);

    //hussein.position.y += 0.01;
    //hussein.rotation.z += 0.01;

   // HusseinHead.position.z = t * 0.01;
    //HusseinHead.rotation.z += 0.01;

    //displayText = str(document.body.getBoundingClientRect().top)

   

    camera.position.z = t * -0.01;
    pointLight.position.x = t * -0.09;
    pointLight.position.y = t * -0.09;
    //camera.position.x = t * -0.0002;
    //camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

//texto('Hussein', -2, 1, -15);
function animate() {
    requestAnimationFrame(animate);

    const speed = 0.01;

    


   // HusseinHead.position.y += 0.1;
   // HusseinHead.rotation.y -= speed
    moon.rotation.x += 0.005;

    // controls.update();

    renderer.render(scene, camera);
}

animate();
//pointmaker(0, 0, 0);
