import { OrbitControls } from "./OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
// Set background color
scene.background = new THREE.Color(0x87ceeb); // Sky blue background

// Add lights to the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(10, 20, 15);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 50;
directionalLight.shadow.camera.left = -20;
directionalLight.shadow.camera.right = 20;
directionalLight.shadow.camera.top = 20;
directionalLight.shadow.camera.bottom = -20;
scene.add(directionalLight);

// Enable shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

function degrees_to_radians(degrees) {
  var pi = Math.PI;
  return degrees * (pi / 180);
}

// Create basketball court with all markings
function createBasketballCourt() {
  // Court floor - wooden brown surface
  const courtGeometry = new THREE.BoxGeometry(30, 0.2, 15);
  const courtMaterial = new THREE.MeshPhongMaterial({
    color: 0xc68642, // Brown wood color
    shininess: 50,
  });
  const court = new THREE.Mesh(courtGeometry, courtMaterial);
  court.receiveShadow = true;
  scene.add(court);

  // Court lines material
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });

  // Center line
  const centerLineGeometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0.11, -7.5),
    new THREE.Vector3(0, 0.11, 7.5),
  ]);
  const centerLine = new THREE.Line(centerLineGeometry, lineMaterial);
  scene.add(centerLine);

  // Center circle
  const centerCirclePoints = [];
  const centerCircleRadius = 1.8;
  for (let i = 0; i <= 64; i++) {
    const angle = (i / 64) * 2 * Math.PI;
    centerCirclePoints.push(
      new THREE.Vector3(
        Math.cos(angle) * centerCircleRadius,
        0.11,
        Math.sin(angle) * centerCircleRadius
      )
    );
  }
  const centerCircleGeometry = new THREE.BufferGeometry().setFromPoints(
    centerCirclePoints
  );
  const centerCircle = new THREE.Line(centerCircleGeometry, lineMaterial);
  scene.add(centerCircle);

  // Three-point lines (curved arcs)
  const threePointRadius = 6.75;
  const threePointAngle = Math.PI / 3; // 60 degrees

  // Left three-point line
  const leftThreePointPoints = [];
  for (let i = 0; i <= 32; i++) {
    const angle =
      -Math.PI / 2 - threePointAngle + (i / 32) * 2 * threePointAngle;
    leftThreePointPoints.push(
      new THREE.Vector3(
        -15 + Math.cos(angle) * threePointRadius,
        0.11,
        Math.sin(angle) * threePointRadius
      )
    );
  }
  const leftThreePointGeometry = new THREE.BufferGeometry().setFromPoints(
    leftThreePointPoints
  );
  const leftThreePoint = new THREE.Line(leftThreePointGeometry, lineMaterial);
  scene.add(leftThreePoint);

  // Right three-point line
  const rightThreePointPoints = [];
  for (let i = 0; i <= 32; i++) {
    const angle =
      Math.PI / 2 - threePointAngle + (i / 32) * 2 * threePointAngle;
    rightThreePointPoints.push(
      new THREE.Vector3(
        15 + Math.cos(angle) * threePointRadius,
        0.11,
        Math.sin(angle) * threePointRadius
      )
    );
  }
  const rightThreePointGeometry = new THREE.BufferGeometry().setFromPoints(
    rightThreePointPoints
  );
  const rightThreePoint = new THREE.Line(rightThreePointGeometry, lineMaterial);
  scene.add(rightThreePoint);

  // Free throw lines (optional bonus feature)
  const freeThrowRadius = 1.8;

  // Left free throw circle
  const leftFreeThrowPoints = [];
  for (let i = 0; i <= 32; i++) {
    const angle = (i / 32) * Math.PI;
    leftFreeThrowPoints.push(
      new THREE.Vector3(
        -15 + Math.cos(angle) * freeThrowRadius,
        0.11,
        -7.5 + Math.sin(angle) * freeThrowRadius
      )
    );
  }
  const leftFreeThrowGeometry = new THREE.BufferGeometry().setFromPoints(
    leftFreeThrowPoints
  );
  const leftFreeThrow = new THREE.Line(leftFreeThrowGeometry, lineMaterial);
  scene.add(leftFreeThrow);

  // Right free throw circle
  const rightFreeThrowPoints = [];
  for (let i = 0; i <= 32; i++) {
    const angle = (i / 32) * Math.PI;
    rightFreeThrowPoints.push(
      new THREE.Vector3(
        15 + Math.cos(angle) * freeThrowRadius,
        0.11,
        7.5 + Math.sin(angle) * freeThrowRadius
      )
    );
  }
  const rightFreeThrowGeometry = new THREE.BufferGeometry().setFromPoints(
    rightFreeThrowPoints
  );
  const rightFreeThrow = new THREE.Line(rightFreeThrowGeometry, lineMaterial);
  scene.add(rightFreeThrow);
}

// Create basketball hoop with all components
function createBasketballHoop(x, z, facingDirection) {
  const hoopGroup = new THREE.Group();

  // Rim (orange circle)
  const rimRadius = 0.45;
  const rimGeometry = new THREE.TorusGeometry(rimRadius, 0.05, 8, 32);
  const rimMaterial = new THREE.MeshPhongMaterial({ color: 0xff8c00 }); // Orange
  const rim = new THREE.Mesh(rimGeometry, rimMaterial);
  rim.position.set(x, 10, z); // 10 feet height
  rim.castShadow = true;
  rim.receiveShadow = true;
  hoopGroup.add(rim);

  // Backboard (white, partially transparent)
  const backboardGeometry = new THREE.BoxGeometry(1.8, 1.05, 0.1);
  const backboardMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.8,
  });
  const backboard = new THREE.Mesh(backboardGeometry, backboardMaterial);
  backboard.position.set(x + facingDirection * 0.6, 10.5, z); // Behind the rim
  backboard.castShadow = true;
  backboard.receiveShadow = true;
  hoopGroup.add(backboard);

  // Support pole
  const poleGeometry = new THREE.CylinderGeometry(0.1, 0.1, 10, 8);
  const poleMaterial = new THREE.MeshPhongMaterial({ color: 0x666666 }); // Gray
  const pole = new THREE.Mesh(poleGeometry, poleMaterial);
  pole.position.set(x + facingDirection * 1.5, 5, z); // Behind backboard
  pole.castShadow = true;
  pole.receiveShadow = true;
  hoopGroup.add(pole);

  // Support arm connecting pole to backboard
  const armGeometry = new THREE.BoxGeometry(0.8, 0.1, 0.1);
  const armMaterial = new THREE.MeshPhongMaterial({ color: 0x666666 }); // Gray
  const arm = new THREE.Mesh(armGeometry, armMaterial);
  arm.position.set(x + facingDirection * 1.1, 10.5, z);
  arm.castShadow = true;
  arm.receiveShadow = true;
  hoopGroup.add(arm);

  // Net (using line segments)
  const netMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
  const netSegments = 12;

  // Vertical net lines
  for (let i = 0; i < netSegments; i++) {
    const angle = (i / netSegments) * 2 * Math.PI;
    const netLineGeometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(
        x + Math.cos(angle) * rimRadius,
        10,
        z + Math.sin(angle) * rimRadius
      ),
      new THREE.Vector3(
        x + Math.cos(angle) * rimRadius * 0.8,
        8.5,
        z + Math.sin(angle) * rimRadius * 0.8
      ),
    ]);
    const netLine = new THREE.Line(netLineGeometry, netMaterial);
    hoopGroup.add(netLine);
  }

  // Horizontal net rings
  for (let ring = 1; ring <= 3; ring++) {
    const ringRadius = rimRadius * (1 - ring * 0.15);
    const ringHeight = 10 - ring * 0.5;
    const ringPoints = [];

    for (let i = 0; i <= 16; i++) {
      const angle = (i / 16) * 2 * Math.PI;
      ringPoints.push(
        new THREE.Vector3(
          x + Math.cos(angle) * ringRadius,
          ringHeight,
          z + Math.sin(angle) * ringRadius
        )
      );
    }

    const ringGeometry = new THREE.BufferGeometry().setFromPoints(ringPoints);
    const netRing = new THREE.Line(ringGeometry, netMaterial);
    hoopGroup.add(netRing);
  }

  scene.add(hoopGroup);
  return hoopGroup;
}

// Create static basketball
function createBasketball() {
  const ballRadius = 0.25;
  const ballGeometry = new THREE.SphereGeometry(ballRadius, 32, 32);

  // Create basketball texture with seams
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  // Orange background
  ctx.fillStyle = "#ff8c00";
  ctx.fillRect(0, 0, 512, 512);

  // Black seams
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(0, 256);
  ctx.lineTo(512, 256);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(256, 0);
  ctx.lineTo(256, 512);
  ctx.stroke();

  // Curved seams
  ctx.beginPath();
  ctx.arc(256, 256, 200, 0, 2 * Math.PI);
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  const ballMaterial = new THREE.MeshPhongMaterial({
    map: texture,
    shininess: 30,
  });

  const basketball = new THREE.Mesh(ballGeometry, ballMaterial);
  basketball.position.set(0, ballRadius + 0.1, 0); // Center court, slightly above ground
  basketball.castShadow = true;
  basketball.receiveShadow = true;

  scene.add(basketball);
  return basketball;
}

// Create all elements
createBasketballCourt();
createBasketballHoop(-15, 0, -1); // Left hoop
createBasketballHoop(15, 0, 1); // Right hoop
createBasketball();

// Set camera position for better view
camera.position.set(0, 20, 25);
camera.lookAt(0, 0, 0);

// Orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
let isOrbitEnabled = true;

// Instructions display
const instructionsElement = document.createElement("div");
instructionsElement.style.position = "absolute";
instructionsElement.style.bottom = "20px";
instructionsElement.style.left = "20px";
instructionsElement.style.color = "white";
instructionsElement.style.fontSize = "16px";
instructionsElement.style.fontFamily = "Arial, sans-serif";
instructionsElement.style.textAlign = "left";
instructionsElement.innerHTML = `
  <h3>Controls:</h3>
  <p>O - Toggle orbit camera</p>
`;
document.body.appendChild(instructionsElement);

// Handle key events
function handleKeyDown(e) {
  if (e.key === "o" || e.key === "O") {
    isOrbitEnabled = !isOrbitEnabled;
    controls.enabled = isOrbitEnabled;
  }
}

document.addEventListener("keydown", handleKeyDown);

// Handle window resize
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onWindowResize);

// Animation function
function animate() {
  requestAnimationFrame(animate);

  // Update controls
  if (isOrbitEnabled) {
    controls.update();
  }

  renderer.render(scene, camera);
}

animate();
