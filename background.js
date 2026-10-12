import * as THREE from 'three';

/**
 * Enhanced 3D Background Engine for HEIN SOE KHANT Portfolio
 * Spreads floating 3D geometries throughout the entire page scroll depth.
 * Fully responsive across all screen sizes (mobile, tablet, desktop, ultrawide).
 * Supports Desktop mouse parallax, Smartphone touch drag, scroll kinetic velocity, and gyroscope tilt.
 */

const isMobileScreen = () => window.innerWidth < 768;

const CONFIG = {
    colors: {
        gridLocked: '#1e240a',
        gridFree: '#dcd8cf',
        accentLime: '#C8F32B',
        accentViolet: '#7B5CFF',
        accentOrange: '#FF7A3D',
        accentCyan: '#00e5ff'
    },
    // Dynamic mesh count scaled to screen size & performance
    get meshCount() {
        const width = window.innerWidth;
        if (width < 480) return 12;   // Mobile
        if (width < 768) return 16;   // Large Mobile / Phablet
        if (width < 1200) return 20;  // Tablet / Small Laptop
        return 24;                    // Desktop / Ultrawide
    },
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
};

const geometries = [
    new THREE.IcosahedronGeometry(1.2, 0),        // D20
    new THREE.TorusKnotGeometry(0.8, 0.25, 48, 8),// Magic Knot
    new THREE.TorusGeometry(1.0, 0.2, 16, 32),    // Portal Ring
    new THREE.OctahedronGeometry(1.3, 0),         // Mana Crystal
    new THREE.DodecahedronGeometry(1.1, 0),       // Dodecahedron
    new THREE.BoxGeometry(1.4, 1.4, 1.4),         // Cyber Cube
    new THREE.ConeGeometry(1.0, 1.8, 6),          // Relic Spike
    new THREE.TetrahedronGeometry(1.3, 0)         // Pyramid
];

// Scene Setup
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 150);
camera.position.set(0, 0, 14);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x000000, 0); // Transparent so CSS background shows
renderer.domElement.id = 'bg-canvas';

// Prepend or append canvas
const existingCanvas = document.getElementById('bg-canvas');
if (existingCanvas) {
    existingCanvas.replaceWith(renderer.domElement);
} else {
    document.body.prepend(renderer.domElement);
}

// Infinite Matrix Grid (floats in the distance)
const grid = new THREE.GridHelper(120, 60, CONFIG.colors.gridFree, CONFIG.colors.gridFree);
grid.position.y = -10;
grid.material.transparent = true;
grid.material.opacity = 0.35;
scene.add(grid);

// Dynamic Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);

const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.0);
dirLight1.position.set(10, 20, 15);
scene.add(dirLight1);

const dirLight2 = new THREE.DirectionalLight(0xC8F32B, 0.6);
dirLight2.position.set(-15, -10, -5);
scene.add(dirLight2);

// Colors pool
const palette = [
    CONFIG.colors.accentLime,
    CONFIG.colors.accentViolet,
    CONFIG.colors.accentOrange,
    CONFIG.colors.accentCyan
];

// Floating Mesh Class
class FloatingObject {
    constructor(index, total) {
        this.index = index;
        this.total = total;
        this.group = new THREE.Group();
        const geo = geometries[Math.floor(Math.random() * geometries.length)];
        const colorHex = palette[Math.floor(Math.random() * palette.length)];
        this.color = new THREE.Color(colorHex);

        // Solid material (Free Mode)
        this.matSolid = new THREE.MeshStandardMaterial({
            color: this.color,
            roughness: 0.35,
            metalness: 0.25,
            transparent: true,
            opacity: 0.65
        });
        this.meshSolid = new THREE.Mesh(geo, this.matSolid);
        this.group.add(this.meshSolid);

        // Wireframe overlay (Both & Locked Mode)
        const wireGeo = new THREE.WireframeGeometry(geo);
        this.matWire = new THREE.LineBasicMaterial({
            color: this.color,
            transparent: true,
            opacity: 0.5
        });
        this.meshWire = new THREE.LineSegments(wireGeo, this.matWire);
        this.group.add(this.meshWire);

        // Animation attributes
        this.floatSpeed = 0.5 + Math.random() * 0.8;
        this.floatAmp = 0.4 + Math.random() * 0.6;
        this.seed = Math.random() * Math.PI * 2;

        this.rotSpeed = new THREE.Vector3(
            (Math.random() - 0.5) * 0.015,
            (Math.random() - 0.5) * 0.02,
            (Math.random() - 0.5) * 0.015
        );

        this.resetPosition();
        scene.add(this.group);
    }

    resetPosition() {
        const isMobile = isMobileScreen();
        const verticalRange = 44;
        const progress = this.index / this.total;
        const yPos = 8 - progress * verticalRange + (Math.random() - 0.5) * 4;
        const side = this.index % 2 === 0 ? 1 : -1;

        let xPos;
        if (isMobile) {
            // Screen width in Three units at z=14 is ~6.7 units total (-3.35 to +3.35)
            // Distribute nicely along left and right edges with small center clearance
            xPos = side * (1.1 + Math.random() * 2.2);
        } else {
            // Desktop wider spread
            xPos = side * (5.5 + Math.random() * 8);
        }
        const zPos = (Math.random() - 0.5) * 7 - 2;

        this.basePos = new THREE.Vector3(xPos, yPos, zPos);
        this.group.position.copy(this.basePos);

        // Subtle scale down on mobile so it doesn't obstruct text
        const baseScale = isMobile ? 0.68 : 1.0;
        this.group.scale.setScalar(baseScale);
    }

    update(time, speedMultiplier = 1.0) {
        // Keep rotating smoothly so the scene always feels alive
        this.group.rotation.x += this.rotSpeed.x * speedMultiplier;
        this.group.rotation.y += this.rotSpeed.y * speedMultiplier;
        this.group.rotation.z += this.rotSpeed.z * speedMultiplier;

        // Gentle floating wave
        this.group.position.y = this.basePos.y + Math.sin(time * this.floatSpeed + this.seed) * this.floatAmp;
    }

    setMode(mode) {
        if (mode === 'locked') {
            // Locked Mode: Glowing Cyber-wireframe style
            this.matSolid.opacity = 0.08;
            this.matWire.opacity = 0.85;
            this.matWire.color = new THREE.Color(CONFIG.colors.accentLime);
        } else {
            // Free Mode: Clean geometric shapes
            const isMobile = isMobileScreen();
            this.matSolid.opacity = isMobile ? 0.45 : 0.65;
            this.matWire.opacity = 0.35;
            this.matWire.color = this.color;
        }
    }
}

// Generate floating objects
let floatingObjects = [];

function initializeFloatingObjects() {
    floatingObjects.forEach(obj => {
        scene.remove(obj.group);
    });
    floatingObjects = [];

    const count = CONFIG.meshCount;
    for (let i = 0; i < count; i++) {
        floatingObjects.push(new FloatingObject(i, count));
    }

    const currentMode = document.body.getAttribute('data-mode') || localStorage.getItem('portfolio-mode') || 'free';
    window.updateBgMode(currentMode);
}

// Update Mode Function for Background
window.updateBgMode = function(mode) {
    if (mode === 'locked') {
        grid.material.color.set(CONFIG.colors.gridLocked);
        grid.material.opacity = 0.5;
        dirLight2.color.set(CONFIG.colors.accentLime);
    } else {
        grid.material.color.set(CONFIG.colors.gridFree);
        grid.material.opacity = 0.3;
        dirLight2.color.set(CONFIG.colors.accentViolet);
    }
    floatingObjects.forEach(obj => obj.setMode(mode));
};

// Initial creation
initializeFloatingObjects();

/* ============================================================
   MULTI-DEVICE INPUT ENGINE: MOUSE, TOUCH, SCROLL & GYROSCOPE
   ============================================================ */
let inputX = 0;
let inputY = 0;
let targetCameraY = 0;
let gyroX = 0;
let gyroY = 0;
let scrollVelocity = 0;
let lastScrollY = window.scrollY;
let lastScrollTime = performance.now();

let isTouchActive = false;

// 1. Mouse Tracking (PC)
window.addEventListener('mousemove', (e) => {
    inputX = (e.clientX / window.innerWidth) * 2 - 1;
    inputY = -(e.clientY / window.innerHeight) * 2 + 1;
}, { passive: true });

// 2. Touch Tracking (Smartphones & Tablets)
window.addEventListener('touchstart', (e) => {
    isTouchActive = true;
    if (e.touches.length > 0) {
        const touch = e.touches[0];
        inputX = (touch.clientX / window.innerWidth) * 2 - 1;
        inputY = -(touch.clientY / window.innerHeight) * 2 + 1;
    }
}, { passive: true });

window.addEventListener('touchmove', (e) => {
    isTouchActive = true;
    if (e.touches.length > 0) {
        const touch = e.touches[0];
        inputX = (touch.clientX / window.innerWidth) * 2 - 1;
        inputY = -(touch.clientY / window.innerHeight) * 2 + 1;
    }
}, { passive: true });

window.addEventListener('touchend', () => {
    isTouchActive = false;
}, { passive: true });

// 3. Gyroscope / Device Orientation (Phone Tilt)
let gyroActive = false;
function handleOrientation(e) {
    if (e.gamma !== null && e.beta !== null) {
        gyroActive = true;
        // gamma: left-to-right tilt in degrees [-90, 90]
        const clampedGamma = Math.max(-30, Math.min(30, e.gamma));
        // beta: front-to-back tilt in degrees, centered around natural 45deg viewing angle
        const clampedBeta = Math.max(-30, Math.min(30, e.beta - 45));

        gyroX = clampedGamma / 30; // -1 to 1
        gyroY = -clampedBeta / 30; // -1 to 1
    }
}

// Global hook to request iOS / mobile gyro permission on direct user gesture
window.initBackgroundGyro = function() {
    if (gyroActive) return;
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
            .then(res => {
                if (res === 'granted') {
                    window.addEventListener('deviceorientation', handleOrientation, { passive: true });
                }
            })
            .catch(() => {});
    } else if (typeof window.DeviceOrientationEvent !== 'undefined') {
        window.addEventListener('deviceorientation', handleOrientation, { passive: true });
    }
};

// Immediate registration for non-iOS mobile devices
if (typeof window.DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission !== 'function') {
    window.addEventListener('deviceorientation', handleOrientation, { passive: true });
}

// iOS Safari requires user gesture (click or touchend) to request gyro permission
window.addEventListener('click', () => {
    if (window.initBackgroundGyro) window.initBackgroundGyro();
}, { once: true, passive: true });

window.addEventListener('touchend', () => {
    if (window.initBackgroundGyro) window.initBackgroundGyro();
}, { once: true, passive: true });

// 4. Scroll Depth & Kinetic Velocity
function onScroll() {
    const now = performance.now();
    const currentY = window.scrollY;
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const progress = currentY / maxScroll;
    
    // Camera travels down through the 3D space
    targetCameraY = -progress * 36;

    // Track scroll velocity for kinetic response
    const dt = Math.max(16, now - lastScrollTime);
    const deltaY = currentY - lastScrollY;
    scrollVelocity = deltaY / dt;
    lastScrollY = currentY;
    lastScrollTime = now;
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// 5. Debounced Responsive Resize & Orientation Change
let resizeTimeout;
function handleResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        initializeFloatingObjects();
    }, 150);
}
window.addEventListener('resize', handleResize);
window.addEventListener('orientationchange', handleResize);

// 6. Animation Loop
let currentCamX = 0;
let currentCamY = 0;

function animate() {
    requestAnimationFrame(animate);
    const now = performance.now();
    const time = now * 0.001;

    // Decay scroll kinetic velocity smoothly
    scrollVelocity *= 0.93;

    // Decay touch swipe inertia when released
    if (!isTouchActive) {
        inputX *= 0.94;
        inputY *= 0.94;
    }

    if (!CONFIG.reducedMotion) {
        const isMobile = isMobileScreen();
        // Give mobile devices strong, tangible gyroscope depth
        const gyroGainX = isMobile ? 3.0 : 1.2;
        const gyroGainY = isMobile ? 2.2 : 1.0;

        const blendedX = inputX * 0.8 + (gyroX * gyroGainX);
        const blendedY = inputY * 0.8 + (gyroY * gyroGainY);

        // Smooth camera follow with damping
        currentCamX += (blendedX * 2.2 - currentCamX) * 0.08;
        currentCamY += (targetCameraY + blendedY * 1.5 - currentCamY) * 0.08;

        camera.position.x = currentCamX;
        camera.position.y = currentCamY;

        // Kinetic camera tilt on scroll and device orientation
        camera.rotation.x = -scrollVelocity * 0.015 + (blendedY * 0.06);
        camera.rotation.y = -blendedX * 0.07;
        camera.rotation.z = blendedX * 0.025;

        grid.position.y = camera.position.y - 12;
    }

    // Boost floating object spin speed during active touch scroll
    const speedBoost = 1.0 + Math.min(Math.abs(scrollVelocity) * 2.5, 4.0);
    floatingObjects.forEach(obj => obj.update(time, speedBoost));

    renderer.render(scene, camera);
}
animate();
