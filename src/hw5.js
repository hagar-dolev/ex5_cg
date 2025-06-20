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

// Enhanced lighting setup with multiple light sources
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
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

// Additional fill light
const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
fillLight.position.set(-10, 15, -10);
scene.add(fillLight);

// Rim light for dramatic effect
const rimLight = new THREE.SpotLight(0xffffff, 0.5);
rimLight.position.set(0, 25, 0);
rimLight.angle = Math.PI / 6;
rimLight.penumbra = 0.3;
rimLight.castShadow = true;
scene.add(rimLight);

// Enable shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

function degrees_to_radians(degrees) {
  var pi = Math.PI;
  return degrees * (pi / 180);
}

// Create enhanced basketball court with detailed markings
function createBasketballCourt() {
  // Create court texture
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  // Wooden court texture
  ctx.fillStyle = "#c68642";
  ctx.fillRect(0, 0, 1024, 512);

  // Add wood grain effect
  for (let i = 0; i < 20; i++) {
    ctx.strokeStyle = `rgba(139, 69, 19, ${0.1 + Math.random() * 0.2})`;
    ctx.lineWidth = 2 + Math.random() * 3;
    ctx.beginPath();
    ctx.moveTo(0, i * 25 + Math.random() * 10);
    ctx.lineTo(1024, i * 25 + Math.random() * 10);
    ctx.stroke();
  }

  const courtTexture = new THREE.CanvasTexture(canvas);
  courtTexture.wrapS = THREE.RepeatWrapping;
  courtTexture.wrapT = THREE.RepeatWrapping;
  courtTexture.repeat.set(2, 1);

  const courtGeometry = new THREE.BoxGeometry(30, 0.2, 15);
  const courtMaterial = new THREE.MeshPhongMaterial({
    map: courtTexture,
    shininess: 50,
  });
  const court = new THREE.Mesh(courtGeometry, courtMaterial);
  court.receiveShadow = true;
  scene.add(court);

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

  // Three-point lines
  const threePointRadius = 6.25;

  // Left three-point line
  const leftThreePointPoints = [];
  for (let i = 0; i <= 32; i++) {
    const angle = -Math.PI / 2 + (i / 32) * Math.PI;
    leftThreePointPoints.push(
      new THREE.Vector3(
        -12 + Math.cos(angle) * threePointRadius,
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

  // Left three-point extensions
  const leftTopExtension = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-12, 0.11, threePointRadius),
    new THREE.Vector3(-15, 0.11, threePointRadius),
  ]);
  const leftTopLine = new THREE.Line(leftTopExtension, lineMaterial);
  scene.add(leftTopLine);

  const leftBottomExtension = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-12, 0.11, -threePointRadius),
    new THREE.Vector3(-15, 0.11, -threePointRadius),
  ]);
  const leftBottomLine = new THREE.Line(leftBottomExtension, lineMaterial);
  scene.add(leftBottomLine);

  // Right three-point line
  const rightThreePointPoints = [];
  for (let i = 0; i <= 32; i++) {
    const angle = Math.PI / 2 + (i / 32) * Math.PI;
    rightThreePointPoints.push(
      new THREE.Vector3(
        12 + Math.cos(angle) * threePointRadius,
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

  // Right three-point extensions
  const rightTopExtension = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(12, 0.11, threePointRadius),
    new THREE.Vector3(15, 0.11, threePointRadius),
  ]);
  const rightTopLine = new THREE.Line(rightTopExtension, lineMaterial);
  scene.add(rightTopLine);

  const rightBottomExtension = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(12, 0.11, -threePointRadius),
    new THREE.Vector3(15, 0.11, -threePointRadius),
  ]);
  const rightBottomLine = new THREE.Line(rightBottomExtension, lineMaterial);
  scene.add(rightBottomLine);

  // Free throw lines and key areas
  // Left free throw line
  const leftFreeThrowGeometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-12, 0.11, -1.8),
    new THREE.Vector3(-12, 0.11, 1.8),
  ]);
  const leftFreeThrow = new THREE.Line(leftFreeThrowGeometry, lineMaterial);
  scene.add(leftFreeThrow);

  // Left key area
  const leftKeyGeometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-12, 0.11, -1.8),
    new THREE.Vector3(-15, 0.11, -1.8),
    new THREE.Vector3(-15, 0.11, 1.8),
    new THREE.Vector3(-12, 0.11, 1.8),
  ]);
  const leftKey = new THREE.Line(leftKeyGeometry, lineMaterial);
  scene.add(leftKey);

  // Right free throw line
  const rightFreeThrowGeometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(12, 0.11, -1.8),
    new THREE.Vector3(12, 0.11, 1.8),
  ]);
  const rightFreeThrow = new THREE.Line(rightFreeThrowGeometry, lineMaterial);
  scene.add(rightFreeThrow);

  // Right key area
  const rightKeyGeometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(12, 0.11, -1.8),
    new THREE.Vector3(15, 0.11, -1.8),
    new THREE.Vector3(15, 0.11, 1.8),
    new THREE.Vector3(12, 0.11, 1.8),
  ]);
  const rightKey = new THREE.Line(rightKeyGeometry, lineMaterial);
  scene.add(rightKey);

  // Free throw circles
  const freeThrowRadius = 1.8;

  // Left free throw circle
  const leftFreeThrowCirclePoints = [];
  for (let i = 0; i <= 32; i++) {
    const angle = (i / 12) * Math.PI;
    leftFreeThrowCirclePoints.push(
      new THREE.Vector3(
        -12 + Math.cos(angle) * freeThrowRadius,
        0.11,
        Math.sin(angle) * freeThrowRadius
      )
    );
  }
  const leftFreeThrowCircleGeometry = new THREE.BufferGeometry().setFromPoints(
    leftFreeThrowCirclePoints
  );
  const leftFreeThrowCircle = new THREE.Line(
    leftFreeThrowCircleGeometry,
    lineMaterial
  );
  scene.add(leftFreeThrowCircle);

  // Right free throw circle
  const rightFreeThrowCirclePoints = [];
  for (let i = 0; i <= 32; i++) {
    const angle = (i / 12) * Math.PI;
    rightFreeThrowCirclePoints.push(
      new THREE.Vector3(
        12 + Math.cos(angle) * freeThrowRadius,
        0.11,
        Math.sin(angle) * freeThrowRadius
      )
    );
  }
  const rightFreeThrowCircleGeometry = new THREE.BufferGeometry().setFromPoints(
    rightFreeThrowCirclePoints
  );
  const rightFreeThrowCircle = new THREE.Line(
    rightFreeThrowCircleGeometry,
    lineMaterial
  );
  scene.add(rightFreeThrowCircle);
}

// Create enhanced basketball hoop with branded backboard and chain net
function createBasketballHoop(x, z, facingDirection) {
  const hoopGroup = new THREE.Group();

  // Rim (orange circle)
  const rimRadius = 0.45;
  const rimGeometry = new THREE.TorusGeometry(rimRadius, 0.05, 8, 32);
  rimGeometry.rotateX(Math.PI / 2);
  const rimMaterial = new THREE.MeshPhongMaterial({ color: 0xff8c00 });
  const rim = new THREE.Mesh(rimGeometry, rimMaterial);
  rim.position.set(x, 10, z);
  rim.castShadow = true;
  rim.receiveShadow = true;
  hoopGroup.add(rim);

  // Enhanced backboard with branding - made larger
  const backboardGeometry = new THREE.BoxGeometry(0.1, 1.2, 2.1); // Increased height and width

  // Create branded backboard texture
  const backboardCanvas = document.createElement("canvas");
  backboardCanvas.width = 256;
  backboardCanvas.height = 128;
  const backboardCtx = backboardCanvas.getContext("2d");

  // White background
  backboardCtx.fillStyle = "#ffffff";
  backboardCtx.fillRect(0, 0, 256, 128);

  // Add NBA logo/branding
  backboardCtx.fillStyle = "#000000";
  backboardCtx.font = "bold 24px Arial";
  backboardCtx.textAlign = "center";
  backboardCtx.fillText("NBA", 128, 64);
  backboardCtx.font = "12px Arial";
  backboardCtx.fillText("COURT", 128, 80);

  // Add red rectangle outline
  backboardCtx.strokeStyle = "#ff0000";
  backboardCtx.lineWidth = 4;
  backboardCtx.strokeRect(8, 8, 240, 112);

  const backboardTexture = new THREE.CanvasTexture(backboardCanvas);
  const backboardMaterial = new THREE.MeshPhongMaterial({
    map: backboardTexture,
    transparent: true,
    opacity: 0.9,
  });

  const backboard = new THREE.Mesh(backboardGeometry, backboardMaterial);
  backboard.position.set(x + facingDirection * 0.6, 10.5, z);
  backboard.castShadow = true;
  backboard.receiveShadow = true;
  hoopGroup.add(backboard);

  // Support pole
  const poleGeometry = new THREE.CylinderGeometry(0.1, 0.1, 11, 8);
  const poleMaterial = new THREE.MeshPhongMaterial({ color: 0x666666 });
  const pole = new THREE.Mesh(poleGeometry, poleMaterial);
  pole.position.set(x + facingDirection * 1.5, 5, z);
  pole.castShadow = true;
  pole.receiveShadow = true;
  hoopGroup.add(pole);

  // Support arm
  const armGeometry = new THREE.BoxGeometry(0.8, 0.1, 0.1);
  const armMaterial = new THREE.MeshPhongMaterial({ color: 0x666666 });
  const arm = new THREE.Mesh(armGeometry, armMaterial);
  arm.position.set(x + facingDirection * 1.1, 10.5, z);
  arm.castShadow = true;
  arm.receiveShadow = true;
  hoopGroup.add(arm);

  // Enhanced chain net
  const chainMaterial = new THREE.LineBasicMaterial({ color: 0xcccccc });
  const netSegments = 16;

  // Vertical chain lines
  for (let i = 0; i < netSegments; i++) {
    const angle = (i / netSegments) * 2 * Math.PI;
    const chainLineGeometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(
        x + Math.cos(angle) * rimRadius,
        10,
        z + Math.sin(angle) * rimRadius
      ),
      new THREE.Vector3(
        x + Math.cos(angle) * rimRadius * 0.7,
        8,
        z + Math.sin(angle) * rimRadius * 0.7
      ),
    ]);
    const chainLine = new THREE.Line(chainLineGeometry, chainMaterial);
    hoopGroup.add(chainLine);
  }

  // Horizontal chain rings
  for (let ring = 1; ring <= 4; ring++) {
    const ringRadius = rimRadius * (1 - ring * 0.12);
    const ringHeight = 10 - ring * 0.5;
    const ringPoints = [];

    for (let i = 0; i <= 20; i++) {
      const angle = (i / 20) * 2 * Math.PI;
      ringPoints.push(
        new THREE.Vector3(
          x + Math.cos(angle) * ringRadius,
          ringHeight,
          z + Math.sin(angle) * ringRadius
        )
      );
    }

    const ringGeometry = new THREE.BufferGeometry().setFromPoints(ringPoints);
    const chainRing = new THREE.Line(ringGeometry, chainMaterial);
    hoopGroup.add(chainRing);
  }

  scene.add(hoopGroup);
  return hoopGroup;
}

// Create enhanced basketball with better texture
function createBasketball() {
  const ballRadius = 0.25;
  const ballGeometry = new THREE.SphereGeometry(ballRadius, 32, 32);

  // Create enhanced basketball texture
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  // Orange background with gradient
  const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
  gradient.addColorStop(0, "#ff8c00");
  gradient.addColorStop(1, "#e67e00");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 512, 512);

  // Black seams with better design
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 12;
  ctx.lineCap = "round";

  // Horizontal seam
  ctx.beginPath();
  ctx.moveTo(0, 256);
  ctx.lineTo(512, 256);
  ctx.stroke();

  // Vertical seam
  ctx.beginPath();
  ctx.moveTo(256, 0);
  ctx.lineTo(256, 512);
  ctx.stroke();

  // Curved seams
  ctx.beginPath();
  ctx.arc(256, 256, 180, 0, 2 * Math.PI);
  ctx.stroke();

  // Additional curved seams for more realistic look
  ctx.beginPath();
  ctx.arc(256, 256, 120, 0, 2 * Math.PI);
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  const ballMaterial = new THREE.MeshPhongMaterial({
    map: texture,
    shininess: 30,
  });

  const basketball = new THREE.Mesh(ballGeometry, ballMaterial);
  basketball.position.set(0, ballRadius + 0.1, 0);
  basketball.castShadow = true;
  basketball.receiveShadow = true;

  scene.add(basketball);
  return basketball;
}

// Create stadium environment
function createStadiumEnvironment() {
  // Bleachers
  const bleacherMaterial = new THREE.MeshPhongMaterial({ color: 0x444444 });

  // Back bleachers (main seating area) - moved even closer
  for (let row = 0; row < 10; row++) {
    const bleacherGeometry = new THREE.BoxGeometry(35, 0.3, 2.5);
    const bleacher = new THREE.Mesh(bleacherGeometry, bleacherMaterial);
    bleacher.position.set(0, row * 0.6, 17 + row * 0.8); // Moved even closer (from 20 to 17)
    bleacher.castShadow = true;
    bleacher.receiveShadow = true;
    scene.add(bleacher);
  }

  // Scoreboard - moved closer and more grounded
  const scoreboardGeometry = new THREE.BoxGeometry(6, 2, 0.5);
  const scoreboardMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
  const scoreboard = new THREE.Mesh(scoreboardGeometry, scoreboardMaterial);
  scoreboard.position.set(0, 12, -18); // Lowered height and moved closer
  scoreboard.castShadow = true;
  scoreboard.receiveShadow = true;
  scene.add(scoreboard);

  // Scoreboard display
  const displayGeometry = new THREE.PlaneGeometry(5, 1.5);
  const displayMaterial = new THREE.MeshPhongMaterial({
    color: 0x00ff00,
    emissive: 0x00ff00,
    emissiveIntensity: 0.3,
  });
  const display = new THREE.Mesh(displayGeometry, displayMaterial);
  display.position.set(0, 12, -17.8); // Adjusted to match new scoreboard position
  scene.add(display);

  // Scoreboard support - made shorter and closer
  const supportGeometry = new THREE.CylinderGeometry(0.2, 0.2, 6, 8); // Reduced height
  const supportMaterial = new THREE.MeshPhongMaterial({ color: 0x666666 });
  const support = new THREE.Mesh(supportGeometry, supportMaterial);
  support.position.set(0, 9, -18); // Adjusted position
  support.castShadow = true;
  support.receiveShadow = true;
  scene.add(support);
}

// Camera preset positions
const cameraPresets = [
  { name: "Default", position: [0, 20, 25], lookAt: [0, 0, 0] },
  { name: "Side View", position: [25, 15, 0], lookAt: [0, 0, 0] },
  { name: "Top View", position: [0, 35, 0], lookAt: [0, 0, 0] },
  { name: "Hoop View", position: [15, 12, 0], lookAt: [15, 10, 0] },
  { name: "Court Level", position: [0, 2, 15], lookAt: [0, 0, 0] },
  { name: "Behind Hoop", position: [0, 8, 12], lookAt: [0, 0, 0] },
];

let currentCameraPreset = 0;

// Create all elements
createBasketballCourt();
createBasketballHoop(-15, 0, -1);
createBasketballHoop(15, 0, 1);
createBasketball();
createStadiumEnvironment();

// Set initial camera position
camera.position.set(...cameraPresets[0].position);
camera.lookAt(...cameraPresets[0].lookAt);

// Orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
let isOrbitEnabled = true;

// Enhanced UI with camera controls
const uiContainer = document.createElement("div");
uiContainer.style.position = "absolute";
uiContainer.style.bottom = "20px";
uiContainer.style.left = "20px";
uiContainer.style.color = "white";
uiContainer.style.fontSize = "14px";
uiContainer.style.fontFamily = "Arial, sans-serif";
uiContainer.style.textAlign = "left";
uiContainer.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
uiContainer.style.padding = "15px";
uiContainer.style.borderRadius = "10px";
uiContainer.style.minWidth = "200px";
document.body.appendChild(uiContainer);

function updateUI() {
  uiContainer.innerHTML = `
    <h4>Controls:</h4>
    <div><span style="background-color: #444; padding: 2px 6px; border-radius: 3px; font-family: monospace;">O</span> - Toggle orbit camera</div>
    <div><span style="background-color: #444; padding: 2px 6px; border-radius: 3px; font-family: monospace;">C</span> - Next camera preset</div>
    <div><span style="background-color: #444; padding: 2px 6px; border-radius: 3px; font-family: monospace;">Mouse</span> - Orbit camera (when enabled)</div>
    <div><span style="background-color: #444; padding: 2px 6px; border-radius: 3px; font-family: monospace;">Scroll</span> - Zoom camera</div>
    <br>
    <div><strong>Current View:</strong> ${cameraPresets[currentCameraPreset].name}</div>
  `;
}

// Handle key events
function handleKeyDown(e) {
  if (e.key === "o" || e.key === "O") {
    isOrbitEnabled = !isOrbitEnabled;
    controls.enabled = isOrbitEnabled;
  } else if (e.key === "c" || e.key === "C") {
    currentCameraPreset = (currentCameraPreset + 1) % cameraPresets.length;
    const preset = cameraPresets[currentCameraPreset];
    camera.position.set(...preset.position);
    camera.lookAt(...preset.lookAt);
    controls.target.set(...preset.lookAt);
    controls.update();
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

  // Update UI
  updateUI();

  renderer.render(scene, camera);
}

animate();
