import {
    GLTFLoader
} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {
    OBJLoader
} from 'three/examples/jsm/loaders/OBJLoader.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';



function texto(str, x, y, z) {
    var loader = new THREE.FontLoader();
    loader.load('assets/font/Roboto_Regular.json', function (font) {
        var textogeometry = new THREE.TextGeometry(str, {
            font: font,
            size: 1,
            height: 0.1,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.01,
            bevelSize: 0.01,
            bevelSegments: 5
        });
        var textomaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            opacity: 1,
            transparent: true,
            map: new THREE.TextureLoader().load('assets/pics/starsfortext.jpeg')
        });
        var texto = new THREE.Mesh(geometry, material);
        texto.position.set(x, y, z);
        texto.rotation.x = -Math.PI / 2;
        texto.rotation.y = 0;
        texto.rotation.z = 0;
        texto.scale.set(1, 1, 1);
        scene.add(texto);
    });
}