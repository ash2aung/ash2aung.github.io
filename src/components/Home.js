import React, { useState, useEffect, useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { motion } from "framer-motion";
import * as THREE from "three";
import { Github, Linkedin, Mail } from 'lucide-react';
import resume from "../assets/resume.pdf";
import '../styles/Home.css';

// =============================================================================
// TEXT SCRAMBLE EFFECT
// =============================================================================
const TARGET_NAME = 'Ash Aung';
const SCRAMBLE_CHARS = 'abcdefghijklmnopqrstuvwxyz';

function useTextScramble(targetText, startDelay = 600) {
  const [displayText, setDisplayText] = useState([]);
  const frameRef = useRef(0);

  useEffect(() => {
    // Initialize with random characters
    const initial = targetText.split('').map((ch, i) => {
      if (ch === ' ') return { char: '\u00A0', locked: true, isSpace: true };
      if (ch === '.') return { char: '.', locked: true, isDot: true };
      return { 
        char: SCRAMBLE_CHARS[Math.floor(Math.random() * 26)], 
        locked: false,
        scrambling: true 
      };
    });
    setDisplayText(initial);

    // Start scramble after delay
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        frameRef.current++;
        
        setDisplayText(prev => {
          let allLocked = true;
          const next = prev.map((item, i) => {
            if (item.locked) return item;
            allLocked = false;
            
            const lockChance = Math.min(0.015 + frameRef.current * 0.0018, 0.14);
            const posBonus = i < frameRef.current / 5 ? 0.08 : 0;
            
            if (Math.random() < lockChance + posBonus) {
              return { 
                ...item, 
                char: targetText[i], 
                locked: true, 
                scrambling: false,
                justLocked: true 
              };
            }
            return { 
              ...item, 
              char: SCRAMBLE_CHARS[Math.floor(Math.random() * 26)] 
            };
          });
          
          if (allLocked) clearInterval(interval);
          return next;
        });
      }, 65);

      return () => clearInterval(interval);
    }, startDelay);

    return () => clearTimeout(timeout);
  }, [targetText, startDelay]);

  return displayText;
}

function ScrambleText({ text }) {
  const displayChars = useTextScramble(text);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <span className="hero-name" ref={containerRef}>
      {displayChars.map((item, i) => {
        // Check if character should glow based on mouse proximity
        let isGlowing = false;
        if (containerRef.current) {
          const chars = containerRef.current.querySelectorAll('.char');
          if (chars[i]) {
            const rect = chars[i].getBoundingClientRect();
            const dist = Math.hypot(
              mousePos.x - (rect.left + rect.width / 2),
              mousePos.y - (rect.top + rect.height / 2)
            );
            isGlowing = dist < 120;
          }
        }
        
        return (
          <span
            key={i}
            className={`char ${item.isSpace ? 'space' : ''} ${item.isDot ? 'dot' : ''} ${item.scrambling ? 'scrambling' : ''} ${isGlowing ? 'glow' : ''}`}
            style={item.justLocked ? { 
              animation: 'charLock 0.15s cubic-bezier(0.34,1.56,0.64,1)' 
            } : {}}
          >
            {item.char}
          </span>
        );
      })}
    </span>
  );
}

// =============================================================================
// FLUID SHADER BACKGROUND
// =============================================================================
const fluidVertexShader = `
  void main() {
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fluidFragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;

  float hash(vec2 p) { 
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); 
  }

  float noise(vec2 p) {
    vec2 i = floor(p); 
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1,0)), f.x),
      mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x), 
      f.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    mat2 rot = mat2(0.877, 0.479, -0.479, 0.877);
    for (int i = 0; i < 5; i++) { 
      v += a * noise(p); 
      p = rot * p * 2.0; 
      a *= 0.5; 
    }
    return v;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution;
    float t = uTime;
    vec2 q = vec2(
      fbm(uv * 3.0 + vec2(t * 0.12, t * 0.08)),
      fbm(uv * 3.0 + vec2(5.2, 1.3) + vec2(t * 0.1, -t * 0.06))
    );
    vec2 r = vec2(
      fbm(uv * 3.0 + q * 2.2 + vec2(1.7, 9.2) + t * 0.07),
      fbm(uv * 3.0 + q * 2.2 + vec2(8.3, 2.8) + t * 0.09)
    );
    float mDist = length((uMouse - uv) * vec2(uResolution.x / uResolution.y, 1.0));
    float mEffect = smoothstep(0.45, 0.0, mDist);
    float f = fbm(uv * 3.0 + r * 1.6 + mEffect * 0.2);

    vec3 base  = vec3(0.976, 0.976, 0.969);
    vec3 sage  = vec3(0.82, 0.87, 0.77);
    vec3 cream = vec3(0.94, 0.93, 0.89);
    vec3 sky   = vec3(0.87, 0.90, 0.94);

    vec3 color = base;
    color = mix(color, sage,  smoothstep(0.2, 0.8, f)   * 0.45);
    color = mix(color, cream, smoothstep(0.3, 0.7, q.x) * 0.30);
    color = mix(color, sky,   smoothstep(0.35, 0.75, r.y) * 0.20);
    color += vec3(0.015, 0.025, 0.01) * mEffect;
    gl_FragColor = vec4(color, 1.0);
  }
`;

function FluidBackground() {
  const meshRef = useRef();
  const { size } = useThree();
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: 1.0 - e.clientY / window.innerHeight,
      };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
  }), [size]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.uTime.value = state.clock.elapsedTime;
      meshRef.current.material.uniforms.uMouse.value.lerp(
        new THREE.Vector2(mouseRef.current.x, mouseRef.current.y),
        0.05
      );
    }
  });

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.uResolution.value.set(size.width, size.height);
    }
  }, [size]);

  return (
    <mesh ref={meshRef} frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={fluidVertexShader}
        fragmentShader={fluidFragmentShader}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  );
}

// =============================================================================
// DATA SWARM (3D Particle Sphere)
// =============================================================================
const PARTICLE_COUNT = 1500;
const SWARM_RADIUS = 1.14;

function DataSwarm() {
  const pointsRef = useRef();
  const { camera, size } = useThree();
  const pointerRef = useRef({ active: false, ndc: new THREE.Vector2() });
  
  // Initialize particle positions
  const { positions, basePositions, baseNormals, colors } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const basePositions = new Float32Array(PARTICLE_COUNT * 3);
    const baseNormals = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    
    const GRAPHITE = new THREE.Color('#1a1a16');
    const DARK_SAGE = new THREE.Color('#3a4a2a');
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      const y = 1 - ((i + 0.5) / PARTICLE_COUNT) * 2;
      const ring = Math.sqrt(1 - y * y);
      const theta = goldenAngle * i;

      const nx = Math.cos(theta) * ring;
      const ny = y;
      const nz = Math.sin(theta) * ring;

      const bx = nx * SWARM_RADIUS;
      const by = ny * SWARM_RADIUS;
      const bz = nz * SWARM_RADIUS;

      positions[i3] = bx;
      positions[i3 + 1] = by;
      positions[i3 + 2] = bz;

      basePositions[i3] = bx;
      basePositions[i3 + 1] = by;
      basePositions[i3 + 2] = bz;

      baseNormals[i3] = nx;
      baseNormals[i3 + 1] = ny;
      baseNormals[i3 + 2] = nz;

      const useSage = Math.random() < 0.15;
      const c = useSage ? DARK_SAGE : GRAPHITE;
      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;
    }
    
    return { positions, basePositions, baseNormals, colors };
  }, []);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e) => {
      const canvas = document.querySelector('.data-swarm-canvas canvas');
      if (!canvas) return;
      
      const rect = canvas.getBoundingClientRect();
      pointerRef.current.ndc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointerRef.current.ndc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      pointerRef.current.active = true;
    };
    
    const handleMouseLeave = () => {
      pointerRef.current.active = false;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    
    const points = pointsRef.current;
    const posAttr = points.geometry.attributes.position;
    const posArray = posAttr.array;
    
    // Idle rotation
    points.rotation.y += delta * 0.13;
    points.rotation.x = THREE.MathUtils.lerp(
      points.rotation.x, 
      Math.sin(state.clock.elapsedTime * 0.35) * 0.06, 
      0.06
    );
    
    // Pointer interaction
    const influenceRadius = 0.85;
    const influenceRadiusSq = influenceRadius * influenceRadius;
    const maxPush = 0.6;
    const repelEase = 1 - Math.exp(-delta * 20);
    const returnEase = 1 - Math.exp(-delta * 9);
    
    let pointerLX = 999, pointerLY = 999, pointerLZ = 999;
    
    if (pointerRef.current.active) {
      const pointerWorld = new THREE.Vector3(
        pointerRef.current.ndc.x,
        pointerRef.current.ndc.y,
        0.5
      ).unproject(camera);
      
      const pointerRayDir = pointerWorld.clone().sub(camera.position).normalize();
      const dz = pointerRayDir.z;
      
      if (Math.abs(dz) > 1e-5) {
        const toPlane = -camera.position.z / dz;
        const pointerHit = camera.position.clone().addScaledVector(pointerRayDir, toPlane);
        const pointerLocal = pointerHit.clone();
        points.worldToLocal(pointerLocal);
        pointerLX = pointerLocal.x;
        pointerLY = pointerLocal.y;
        pointerLZ = pointerLocal.z;
      }
    }
    
    for (let i = 0; i < posArray.length; i += 3) {
      const bx = basePositions[i];
      const by = basePositions[i + 1];
      const bz = basePositions[i + 2];

      const dx = bx - pointerLX;
      const dy = by - pointerLY;
      const dz = bz - pointerLZ;
      const d2 = dx * dx + dy * dy + dz * dz;

      if (pointerRef.current.active && d2 < influenceRadiusSq) {
        const falloff = 1 - d2 / influenceRadiusSq;
        const push = maxPush * falloff * falloff;
        const tx = bx + baseNormals[i] * push;
        const ty = by + baseNormals[i + 1] * push;
        const tz = bz + baseNormals[i + 2] * push;
        posArray[i] = THREE.MathUtils.lerp(posArray[i], tx, repelEase);
        posArray[i + 1] = THREE.MathUtils.lerp(posArray[i + 1], ty, repelEase);
        posArray[i + 2] = THREE.MathUtils.lerp(posArray[i + 2], tz, repelEase);
      } else {
        posArray[i] = THREE.MathUtils.lerp(posArray[i], bx, returnEase);
        posArray[i + 1] = THREE.MathUtils.lerp(posArray[i + 1], by, returnEase);
        posArray[i + 2] = THREE.MathUtils.lerp(posArray[i + 2], bz, returnEase);
      }
    }
    
    posAttr.needsUpdate = true;
  });

  // Calculate point size based on canvas size
  const pointSize = useMemo(() => {
    const minDim = Math.min(size.width, size.height);
    return THREE.MathUtils.clamp(minDim / 6500, 0.035, 0.055);
  }, [size]);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
          usage={THREE.DynamicDrawUsage}
        />
        <bufferAttribute
          attach="attributes-color"
          count={PARTICLE_COUNT}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={pointSize}
        transparent
        depthWrite={false}
        vertexColors
        opacity={0.98}
        sizeAttenuation
      />
    </points>
  );
}

// =============================================================================
// MAIN HOME COMPONENT
// =============================================================================
function Home({ onOpenAbout }) {
  const [toast, setToast] = useState(false);

  const handleEmailClick = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('hwa201@sfu.ca');
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  return (
    <div className="hero">
      {/* Fluid Shader Background Canvas */}
      <div className="fluid-canvas-container">
        <Canvas
          orthographic
          camera={{ left: -1, right: 1, top: 1, bottom: -1, near: 0, far: 1 }}
          gl={{ antialias: false }}
          style={{ position: 'absolute', inset: 0 }}
        >
          <FluidBackground />
        </Canvas>
      </div>
      
      {/* Noise overlay */}
      <div className="hero-noise-overlay" />
      
      {/* Toast Notification */}
      {toast && (
        <div className="toast-notification">
          Email copied to clipboard!
        </div>
      )}
      
      <div className="hero-content">
        <div className="hero-main">
          <motion.div 
            className="hero-left"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="hero-eyebrow">
              <span className="pulse-dot" />
              Software Systems &middot; SFU
            </div>
            
            <h1 className="hero-name-container">
              <ScrambleText text={TARGET_NAME} />
            </h1>
            
            <motion.p 
              className="hero-bio"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.8 }}
            >
              Software Systems @ SFU, aspiring product manager. Building at the intersection of engineering and user experience.
            </motion.p>
            
            <motion.div 
              className="hero-btns"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2 }}
            >
              <a href="#projects" className="btn-primary mag-btn">
                View Work &rarr;
              </a>
              <a href={resume} className="btn-ghost mag-btn" download>
                Resume
              </a>
            </motion.div>
            
            <motion.button
              className="about-trigger cursor-trigger"
              onClick={onOpenAbout}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2.3 }}
              whileHover={{ 
                y: -2,
                borderColor: '#5a7a4a',
                color: '#5a7a4a',
                boxShadow: '0 0 24px rgba(90,122,74,0.12), 0 4px 12px rgba(90,122,74,0.08)',
              }}
            >
              <span className="trigger-caret">&gt;</span> execute /about_me
            </motion.button>
            
            <motion.div 
              className="hero-socials"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2.5 }}
            >
              <a href="https://github.com/ash2aung" target="_blank" rel="noreferrer">
                <Github size={18} />
              </a>
              <a href="https://linkedin.com/in/ash2aung" target="_blank" rel="noreferrer">
                <Linkedin size={18} />
              </a>
              <button onClick={handleEmailClick} className="social-btn">
                <Mail size={18} />
              </button>
            </motion.div>
          </motion.div>
          
          {/* Data Swarm 3D Canvas */}
          <motion.div 
            className="data-swarm-canvas"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Canvas
              camera={{ fov: 48, position: [0, 0, 5], near: 0.1, far: 100 }}
              gl={{ 
                antialias: true, 
                alpha: true,
                toneMapping: THREE.ACESFilmicToneMapping,
                toneMappingExposure: 1.2,
              }}
            >
              <DataSwarm />
            </Canvas>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="scroll-indicator"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 3 }}
      >
        <span>scroll</span>
        <div className="scroll-line" />
      </motion.div>
    </div>
  );
}

export default Home;
