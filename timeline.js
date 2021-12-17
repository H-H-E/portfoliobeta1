import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 10000);

var loader = new THREE.CubeTextureLoader();
loader.setPath( 'textures/cube/' );
 
var textureCube = loader.load( [
    'px.png', 'nx.png',
    'py.png', 'ny.png',
    'pz.png', 'nz.png'
] );
 
var material = new THREE.MeshBasicMaterial( { envMap: textureCube } );


var geometry = new THREE.BoxGeometry(1,1,1);
var mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

renderer.vr.enabled = true;
renderer.animate( update );

 
WEBVR.getVRDisplay( function ( device ) {
 
    renderer.vr.setDevice( device );
    document.body.appendChild( WEBVR.getButton( device, renderer.domElement ) );
 
} );