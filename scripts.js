import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Interaction } from "./interaction/src/index";
import * as dat from "dat.gui";

let bgImage =
  "https://res.cloudinary.com/satria-img/image/upload/v1694406746/3D/sun_lg35cv.jpg";
const renderer = new THREE.WebGLRenderer();
let controls;

renderer.shadowMap.enabled = true;

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const orbit = new OrbitControls(camera, renderer.domElement);
const interaction = new Interaction(renderer, scene, camera);

const axesHelper = new THREE.AxesHelper(50);
// scene.add(axesHelper);

camera.position.set(-10, 30, 100);
orbit.update();

const modelLoader = new GLTFLoader();
modelLoader.load(
  "doty.glb",
  function (gltf) {
    console.log("gltf", gltf);
    gltf.scene.position.set(0, -100, -100);
    gltf.scene.rotation.set(0, -30.5, 0);
    gltf.scene.scale.set(200, 200, 200);
    scene.add(gltf.scene);

    gltf.scene.cursor = "pointer";

    gltf.scene.on("click", function (ev) {
      var modal = document.getElementById("backdrop");
      modal.style.display = "flex";
    });
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  (error) => {
    console.log(error);
  }
);

// const boxGeometry = new THREE.BoxGeometry();
// const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const box = new THREE.Mesh(boxGeometry, boxMaterial);
// scene.add(box);

const planeGeometry = new THREE.PlaneGeometry(500, 500);
const planeMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
  // transparent: true,
  // opacity: 0,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
// scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;
plane.position.y = -100;
plane.receiveShadow = true;

const gridHelper = new THREE.GridHelper(30);
gridHelper.position.y = -200;
// scene.add(gridHelper);

const sphereGeometry = new THREE.SphereGeometry(4, 50, 50);
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: 0x0000ff,
  wireframe: true,
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);
sphere.position.set(20, -50, -50);
sphere.castShadow = true;
sphere.cursor = "pointer";
sphere.on("click", function (ev) {
  var modal = document.getElementById("backdrop");
  modal.style.display = "flex";
});

const snowTexture = new THREE.TextureLoader().load(
  "https://res.cloudinary.com/satria-img/image/upload/v1694406745/3D/snow_bepugv.jpg"
);
const snowGeometry = new THREE.BoxGeometry(30, 30, 30);
const snowMaterial = new THREE.MeshBasicMaterial({
  map: snowTexture,
  side: THREE.DoubleSide,
});
const snow = new THREE.Mesh(snowGeometry, snowMaterial);
snow.position.set(-100, -100, -100);
scene.add(snow);
snow.cursor = "pointer";

const forestTexture = new THREE.TextureLoader().load(
  "https://res.cloudinary.com/satria-img/image/upload/v1694406747/3D/test_avtohl.jpg"
);
const forestGeometry = new THREE.BoxGeometry(30, 30, 30);
const forestMaterial = new THREE.MeshBasicMaterial({
  map: forestTexture,
  side: THREE.DoubleSide,
});
const forest = new THREE.Mesh(forestGeometry, forestMaterial);
forest.position.set(100, -100, -100);
scene.add(forest);
forest.cursor = "pointer";

const sunTexture = new THREE.TextureLoader().load(
  "https://res.cloudinary.com/satria-img/image/upload/v1694406746/3D/sun_lg35cv.jpg"
);
const sunGeometry = new THREE.BoxGeometry(30, 30, 30);
const sunMaterial = new THREE.MeshBasicMaterial({
  map: sunTexture,
  side: THREE.DoubleSide,
});
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
sun.position.set(200, -100, -100);
scene.add(sun);
sun.cursor = "pointer";

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
scene.add(directionalLight);
directionalLight.position.set(0, 30, 30);
directionalLight.castShadow = true;
directionalLight.shadow.camera.bottom = -12;

const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
// scene.add(dLightHelper);

const dLightShadowHelper = new THREE.CameraHelper(
  directionalLight.shadow.camera
);
// scene.add(dLightShadowHelper);

// const spotLight = new THREE.SpotLight(0xFFFFFF);
// scene.add(spotLight);
// spotLight.position.set(-100, 100, 0);
// spotLight.castShadow = true;
// spotLight.angle = 0.2;

// const sLightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(sLightHelper);

// scene.fog = new THREE.Fog(0xffffff, 0, 200);
// scene.fog = new THREE.FogExp2(0xffffff, 0.01);

// renderer.setClearColor(0xFFEA00)
const textureLoader = new THREE.TextureLoader();
// scene.background = textureLoader.load(Stars)
// const cubeTextureLoader = new THREE.CubeTextureLoader()
// scene.background = cubeTextureLoader.load([stars, stars, meme1, meme2, meme1, meme2])

// Load the panorama image
const loader = new THREE.TextureLoader();
const texture = loader.load(bgImage);

// Set the texture wrapping and flipping options
texture.wrapS = THREE.RepeatWrapping;
texture.repeat.x = -1;

// Create a new sphere geometry to hold the panorama image
const geometry = new THREE.SphereGeometry(500, 60, 40);

// Flip the geometry inside out so that the image is displayed on the inside of the sphere
geometry.scale(-1, 1, 1);

// Create a new material with the loaded texture
const material = new THREE.MeshBasicMaterial({
  map: texture,
});

// Create a new mesh with the geometry and material
const mesh = new THREE.Mesh(geometry, material);

// Add the mesh to the scene
scene.add(mesh);

forest.on("click", function (ev) {
  const texture = loader.load(
    "https://res.cloudinary.com/satria-img/image/upload/v1694406747/3D/test_avtohl.jpg"
  );

  // Set the texture wrapping and flipping options
  texture.wrapS = THREE.RepeatWrapping;
  texture.repeat.x = -1;

  mesh.material.map = texture;
  // scene.add(mesh);
});

snow.on("click", function (ev) {
  const texture = loader.load(
    "https://res.cloudinary.com/satria-img/image/upload/v1694406745/3D/snow_bepugv.jpg"
  );

  // Set the texture wrapping and flipping options
  texture.wrapS = THREE.RepeatWrapping;
  texture.repeat.x = -1;

  mesh.material.map = texture;
  // scene.add(mesh);
});

sun.on("click", function (ev) {
  const texture = loader.load(
    "https://res.cloudinary.com/satria-img/image/upload/v1694406746/3D/sun_lg35cv.jpg"
  );

  // Set the texture wrapping and flipping options
  texture.wrapS = THREE.RepeatWrapping;
  texture.repeat.x = -1;

  mesh.material.map = texture;
  // scene.add(mesh);
});

// Create a new OrbitControls object to enable mouse drag controls
controls = new OrbitControls(camera, renderer.domElement);

// Disable vertical movement of the camera
controls.enableZoom = false;
controls.enablePan = false;
controls.maxDistance = 100;

// Set the controls to rotate around the panorama image
controls.rotateSpeed = -0.25;

// const gui = new dat.GUI();

const options = {
  sphereColor: "#ffea00",
  wireframe: false,
  speed: 0.01,
  angle: 0.2,
  penumbra: 0,
  intensity: 1,
};

// gui.addColor(options, "sphereColor").onChange(function (e) {
//   sphere.material.color.set(e);
// });

// gui.add(options, "wireframe").onChange(function (e) {
//   sphere.material.wireframe = e;
// });

// gui.add(options, "speed", 0, 0.1);
// gui.add(options, "angle", 0, 1);
// gui.add(options, "penumbra", 0, 1);
// gui.add(options, "intensity", 0, 1);

let step = 0;

function animate(time) {
  // box.rotation.x = time / 1000;
  // box.rotation.y = time / 1000;

  step += options.speed;
  sphere.position.y = -70 * Math.abs(Math.sin(step));

  directionalLight.angle = options.angle;
  directionalLight.penumbra = options.penumbra;
  directionalLight.intensity = options.intensity;
  dLightHelper.update();

  controls.update();

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
