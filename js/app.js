let container;
let camera;
let renderer;
let scene;
let model;

function init() {
  container = document.querySelector(".scene");

  scene = new THREE.Scene();

  const fov = 35;
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1;
  const far = 500;

  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(20, 10, 20);

  const ambient = new THREE.AmbientLight(0x404040, 1.5);
  scene.add(ambient);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(10, 10, 10);
  scene.add(light);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);

  let loader = new THREE.GLTFLoader();
  loader.load("../3D/scene.gltf", function (gltf) {
    scene.add(gltf.scene);
    model = gltf.scene.children[0];
    model.position.set(0, -4, 0);
    animate();
  });
  var controls = new THREE.OrbitControls(camera, renderer.domElement);

  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2();
  var isDragging = false;
  var dragObject;

  document.addEventListener("mousemove", (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    // mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    if (isDragging) {
      raycaster.ray.intersectPlane(plane, planeIntersect);
      dragObject.position.addVectors(planeIntersect, shift);
    }
  });

  document.addEventListener("mousedown", () => {
    var intersects = raycaster.intersectObjects([model]);
    if (intersects.length > 0) {
      controls.enabled = false;
      pIntersect.copy(intersects[0].point);
      plane.setFromNormalAndCoplanarPoint(pNormal, pIntersect);
      shift.subVectors(intersects[0].object.position, intersects[0].point);
      isDragging = true;
      dragObject = intersects[0].object;
    }
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    dragObject = null;
    controls.enabled = true;
  });

  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });
}

function animate() {
  requestAnimationFrame(animate);
  model.rotation.z += 0.001;
  renderer.render(scene, camera);
}

init();
