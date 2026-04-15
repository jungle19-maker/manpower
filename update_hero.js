const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

const colorfulOverrides = `

/* ===================================================
   COLORFUL HERO OVERRIDES
   =================================================== */

:root {
  --gradient-hero: linear-gradient(135deg, #1341b0 0%, #1a56db 25%, #8b3dff 60%, #ff5e62 100%);
}

.hero-section {
  color: white;
}

.hero-heading {
  color: white;
}

.hero-heading .gradient-text {
  background: linear-gradient(to right, #ffffff, #ffe0e0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-subheading {
  color: rgba(255, 255, 255, 0.9);
}

.hero-badge {
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.stat-number {
  background: none;
  -webkit-text-fill-color: white;
  color: white;
}

.stat-label {
  color: rgba(255, 255, 255, 0.85);
  font-weight: 600;
}

.stat-divider {
  background: rgba(255, 255, 255, 0.3);
}

.btn-hero-secondary {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.4);
  color: white;
  backdrop-filter: blur(12px);
}

.btn-hero-secondary:hover {
  background: white;
  color: #1a56db;
  border-color: white;
}

.btn-hero-primary {
  background: white;
  color: #1a56db;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
}

.btn-hero-primary:hover {
  background: #f8faff;
  color: #1341b0;
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.25);
}

/* Adjust blobs for colorful background */
.blob-1 {
  background: radial-gradient(circle, rgba(255, 255, 255, 0.2), transparent);
}

.blob-2 {
  background: radial-gradient(circle, rgba(0, 255, 200, 0.25), transparent);
}

.blob-3 {
  background: radial-gradient(circle, rgba(255, 200, 0, 0.2), transparent);
}

.particle {
  background: white;
  opacity: 0.5;
}

/* Make sure the hero main card blends beautifully */
.hero-main-card {
  background: rgba(255, 255, 255, 0.98);
}
`;

if (!css.includes('COLORFUL HERO OVERRIDES')) {
  fs.appendFileSync('style.css', colorfulOverrides);
  console.log('Appended colorful overrides successfully.');
} else {
  console.log('Overrides already present.');
}
