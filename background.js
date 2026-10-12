import * as THREE from 'three';

/**
 * Enhanced 3D Background Engine for HEIN SOE KHANT Portfolio
 * Spreads floating 3D geometries throughout the entire page scroll depth.
 * Fully responsive across all screen sizes (mobile, tablet, desktop, ultrawide).
 */

const CONFIG = {
    colors: {
        gridLocked: '#1e240a',
        gridFree: '#dcd8cf',
        accentLime: '#C8F32B',
        accentViolet: '#7B5CFF',
        accentOrange: '#FF7A3D',
        accentCyan: '#00e5ff'
    },
    // Dynamic mesh count based on screen size and performance
    getMeshCount: () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const pixelArea = width * height;
        
        // Scale mesh count based on screen real estate
        if (pixelArea < 480000) return 12;      // Small phones (< 360px width)
        if (pixelArea < 921600) return 16;      // Standard phones (360-480px)
        if (pixelArea < 2073600) return 20;     // Tablets (768px+)
        if (pixelArea < 3686400) return 24;     // Laptops (1366px+)
        return 28;                               // Desktop/Ultrawide (1920px+)
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
        this.group = new THREE.Group();
        const geo = geometries[Math.floor(Math.random() * geometries.length)];
        const colorHex = palette[Math.floor(Math.random() * palette.length)];
        this.color = new THREE.Color(colorHex);

        // Distribute along page scroll depth (Y: +6 down to -38)
        const verticalRange = 44;
        const progress = index / total;
        const yPos = 8 - progress * verticalRange + (Math.random() - 0.5) * 4;
        
        // Responsive horizontal scatter based on screen width
        const viewportWidth = window.innerWidth;
        const maxHorizontalSpread = Math.min(viewportWidth / 2, 50); // Cap at 50 units
        const side = index % 2 === 0 ? 1 : -1;
        const xPos = side * (maxHorizontalSpread * 0.4 + Math.random() * maxHorizontalSpread * 0.4);
        const zPos = (Math.random() - 0.5) * 8 - 2;

        this.basePos = new THREE.Vector3(xPos, yPos, zPos);
        this.group.position.copy(this.basePos);

        // Floating offset & speed
        this.floatSpeed = 0.5 + Math.random() * 0.8;
        this.floatAmp = 0.4 + Math.random() * 0.6;
        this.seed = Math.random() * Math.PI * 2;

        this.rotSpeed = new THREE.Vector3(
            (Math.random() - 0.5) * 0.015,
            (Math.random() - 0.5) * 0.02,
            (Math.random() - 0.5) * 0.015
        );

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

        scene.add(this.group);
    }

    update(time) {
        // Keep objects animated even when reduced-motion preferences are enabled
        // so the background keeps feeling alive.
        this.group.rotation.x += this.rotSpeed.x;
        this.group.rotation.y += this.rotSpeed.y;
        this.group.rotation.z += this.rotSpeed.z;

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
            this.matSolid.opacity = 0.65;
            this.matWire.opacity = 0.35;
            this.matWire.color = this.color;
        }
    }
}

// Generate floating objects
let floatingObjects = [];

function initializeFloatingObjects() {
    // Clear old objects
    floatingObjects.forEach(obj => {
        scene.remove(obj.group);
    });
    floatingObjects = [];

    // Create new objects based on current screen size
    const meshCount = CONFIG.getMeshCount();
    for (let i = 0; i < meshCount; i++) {
        floatingObjects.push(new FloatingObject(i, meshCount));
    }
}

initializeFloatingObjects();

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

// Initial mode check
const initialMode = localStorage.getItem('portfolio-mode') || 'free';
window.updateBgMode(initialMode);

// Mouse Parallax & Scroll Depth
let mouseX = 0;
let mouseY = 0;
let targetCameraY = 0;

window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
});

function onScroll() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    // Camera travels down as user scrolls through sections
    targetCameraY = -progress * 36;
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Comprehensive resize handler for all screen sizes
let resizeTimeout;
function handleResize() {
    // Clear previous timeout to debounce resize events
    clearTimeout(resizeTimeout);
    
    resizeTimeout = setTimeout(() => {
        // Update camera aspect ratio
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        
        // Update renderer size
        renderer.setSize(window.innerWidth, window.innerHeight);
        
        // Reinitialize floating objects for new screen size
        initializeFloatingObjects();
        
        // Reset mode to apply to new objects
        const currentMode = document.body.getAttribute('data-mode') || 'free';
        window.updateBgMode(currentMode);
    }, 250); // Debounce to avoid excessive recalculations
}

window.addEventListener('resize', handleResize);
window.addEventListener('orientationchange', handleResize);

// Animation Loop
let lastTime = performance.now();
function animate() {
    requestAnimationFrame(animate);
    const now = performance.now();
    const time = now * 0.001;

    if (!CONFIG.reducedMotion) {
        // Smooth camera parallax + scroll follow
        // Scale based on screen size to prevent excessive movement on mobile
        const screenScale = Math.min(window.innerWidth / 1920, 1);
        camera.position.x += (mouseX * 1.8 * screenScale - camera.position.x) * 0.05;
        camera.position.y += (targetCameraY + mouseY * 0.8 * screenScale - camera.position.y) * 0.06;
        grid.position.y = camera.position.y - 12;
    }

    floatingObjects.forEach(obj => obj.update(time));
    renderer.render(scene, camera);
}
animate();
