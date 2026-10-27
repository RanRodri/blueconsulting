import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, Lightformer } from '@react-three/drei';

/* Paleta de marca */
const C = { steel: '#556A88', sage: '#87A09A', mist: '#B6CDCB', lav: '#A5ADBE', deep: '#36465F' };

/* Aleatorio determinista (el paisaje es el mismo en cada carga) */
function rng(seed) { let s = seed; return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646; }

/* Cielo: degradado vertical con colores de vértice (sin iluminación, sin niebla) */
function Sky() {
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(120, 70, 1, 8);
    const top = new THREE.Color('#2b3a52'), mid = new THREE.Color('#556A88'), low = new THREE.Color('#9db7b6');
    const col = [];
    const p = g.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const t = (p.getY(i) + 35) / 70; // 0 abajo, 1 arriba
      const c = t > 0.5 ? mid.clone().lerp(top, (t - 0.5) / 0.5) : low.clone().lerp(mid, t / 0.5);
      col.push(c.r, c.g, c.b);
    }
    g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
    return g;
  }, []);
  return <mesh geometry={geo} position={[0, 4, -32]}><meshBasicMaterial vertexColors fog={false} /></mesh>;
}

/* Cordillera low-poly: malla con facetas (flatShading) y perfil de cresta aleatorio */
function Ridge({ z, y, h, color, seed, width = 70, jag = 1 }) {
  const geo = useMemo(() => {
    const R = rng(seed), cols = 36, rows = 5;
    const g = new THREE.PlaneGeometry(width, h, cols, rows);
    const p = g.attributes.position;
    const prof = Array.from({ length: cols + 1 }, (_, i) => {
      const x = i / cols;
      return 0.35 + 0.5 * Math.abs(Math.sin(x * 7 + seed)) * (0.6 + 0.4 * Math.sin(x * 2.3 + seed * 2)) + R() * 0.25 * jag;
    });
    for (let i = 0; i < p.count; i++) {
      const cx = i % (cols + 1), ry = Math.floor(i / (cols + 1)); // ry 0 = arriba
      const f = 1 - ry / rows;               // 1 en la cresta, 0 en la base
      p.setY(i, -h / 2 + f * h * Math.min(1, prof[cx]) );
      p.setZ(i, (R() - 0.5) * 1.6 * f * jag);
      p.setX(i, p.getX(i) + (R() - 0.5) * (width / cols) * 0.5);
    }
    g.computeVertexNormals();
    return g;
  }, [seed, h, width, jag]);
  return <mesh geometry={geo} position={[0, y, z]}><meshStandardMaterial color={color} flatShading roughness={0.95} metalness={0} /></mesh>;
}

/* Agua: plano facetado con oleaje muy suave */
function Water() {
  const ref = useRef();
  const { geo, base } = useMemo(() => {
    const g = new THREE.PlaneGeometry(60, 26, 30, 14); g.rotateX(-Math.PI / 2);
    return { geo: g, base: Float32Array.from(g.attributes.position.array) };
  }, []);
  useFrame(({ clock }) => {
    const p = geo.attributes.position, t = clock.elapsedTime * 0.5;
    for (let i = 0; i < p.count; i++) {
      const x = base[i * 3], zz = base[i * 3 + 2];
      p.setY(i, Math.sin(x * 0.5 + t) * 0.07 + Math.cos(zz * 0.7 + t * 1.2) * 0.06);
    }
    p.needsUpdate = true;
  });
  return (
    <mesh ref={ref} geometry={geo} position={[0, -2.6, -4]}>
      <meshPhysicalMaterial color={C.steel} flatShading roughness={0.35} metalness={0.2} clearcoat={0.2} envMapIntensity={0.35} transparent opacity={0.94} />
    </mesh>
  );
}

/* Anillo "pincelada": toro abierto que se afina como el círculo del logo */
function BrushRing({ pointer }) {
  const group = useRef();
  const { viewport } = useThree();
  const geo = useMemo(() => {
    const arc = Math.PI * 2 * 0.86, R = 1.6;
    const g = new THREE.TorusGeometry(R, 0.2, 40, 220, arc);
    const p = g.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
      let a = Math.atan2(y, x); if (a < 0) a += Math.PI * 2;
      const u = Math.min(1, a / arc);
      const taper = 0.12 + 0.88 * Math.pow(Math.sin(Math.PI * Math.pow(u, 0.8)), 0.8); // fino en las puntas
      const rr = Math.hypot(x, y), k = (rr - R) * taper;
      const nx = x / rr, ny = y / rr;
      p.setXYZ(i, nx * (R + k), ny * (R + k), z * taper * (1 + 0.15 * Math.sin(u * 9)));
    }
    g.computeVertexNormals();
    return g;
  }, []);
  const portrait = viewport.aspect < 0.9;
  const pos = portrait ? [1.7, 3.5, -3] : [4.6, 2.0, -1];
  const s = portrait ? 0.42 : 0.88;
  useFrame((st, dt) => {
    const g = group.current; if (!g) return;
    const t = st.clock.elapsedTime;
    const tx = pointer.current.y * 0.35, ty = pointer.current.x * 0.5;
    g.rotation.x += (tx + Math.sin(t * 0.4) * 0.12 - g.rotation.x) * Math.min(1, dt * 2.5);
    g.rotation.y += (ty - 0.35 + Math.cos(t * 0.3) * 0.15 - g.rotation.y) * Math.min(1, dt * 2.5);
    g.rotation.z += 0.0015;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.8} floatingRange={[-0.15, 0.15]}>
      <group ref={group} position={pos} scale={s}>
        <mesh geometry={geo}>
          <meshPhysicalMaterial color="#f4fbfa" metalness={0.05} roughness={0.05} clearcoat={1} clearcoatRoughness={0.03} iridescence={0.8} iridescenceIOR={1.4} envMapIntensity={3.2} />
        </mesh>
        <mesh geometry={geo} scale={0.7} rotation={[0, 0, 2.4]}>
          <meshPhysicalMaterial color={C.mist} metalness={0.4} roughness={0.08} clearcoat={1} envMapIntensity={2.6} />
        </mesh>
        <mesh position={[0.15, -0.1, -0.5]}>
          <sphereGeometry args={[0.14, 24, 24]} />
          <meshPhysicalMaterial color={C.mist} roughness={0.1} clearcoat={1} emissive={C.mist} emissiveIntensity={0.25} />
        </mesh>
      </group>
    </Float>
  );
}

function Rig({ pointer }) {
  useFrame(({ camera }, dt) => {
    const k = Math.min(1, dt * 2);
    camera.position.x += (pointer.current.x * 0.7 - camera.position.x) * k;
    camera.position.y += (1.4 + pointer.current.y * 0.3 - camera.position.y) * k;
    camera.lookAt(0, 0.9, 0);
  });
  return null;
}

function Scene({ pointer }) {
  return (
    <>
      <fog attach="fog" args={['#86a09f', 7, 36]} />
      <Sky />
      <hemisphereLight args={['#e6f0ef', '#4a5f7a', 1.6]} />
      <directionalLight position={[-6, 8, 4]} intensity={0.7} color="#fff6ea" />
      <directionalLight position={[8, 3, -6]} intensity={0.7} color={C.mist} />
      <Environment frames={1} resolution={256} background={false}>
        <Lightformer form="rect" intensity={6} position={[-5, 4, 3]} scale={[8, 4, 1]} color="#ffffff" />
        <Lightformer form="rect" intensity={4} position={[6, 1, 2]} scale={[5, 5, 1]} color={C.mist} />
        <Lightformer form="ring" intensity={5} position={[0, 5, -4]} scale={6} color="#ffffff" />
      </Environment>
      <Ridge z={-24} y={1.2} h={10} color={C.mist} seed={11} jag={1.1} />
      <Ridge z={-17} y={-0.1} h={8} color={C.lav} seed={23} />
      <Ridge z={-11} y={-1.0} h={7} color={C.sage} seed={37} />
      <Ridge z={-6} y={-1.9} h={5.4} color={C.steel} seed={51} jag={0.9} />
      <Water />
      <Ridge z={-1.5} y={-3.7} h={4} color={C.deep} seed={77} width={46} jag={0.8} />
      <BrushRing pointer={pointer} />
      <Rig pointer={pointer} />
    </>
  );
}

export default function Hero3D({ onReady }) {
  const wrap = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const el = wrap.current;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0 });
    io.observe(el);
    const move = (e) => { pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1; pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1); };
    window.addEventListener('pointermove', move, { passive: true });
    return () => { io.disconnect(); window.removeEventListener('pointermove', move); };
  }, []);
  return (
    <div ref={wrap} className="hero3d" aria-hidden="true">
      <Canvas
        frameloop={visible ? 'always' : 'never'}
        dpr={[1, 1.5]}
        camera={{ position: [0, 1.4, 9], fov: 42, near: 0.1, far: 80 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => { gl.toneMapping = THREE.ACESFilmicToneMapping; gl.toneMappingExposure = 1.05; onReady?.(); }}
      >
        <Scene pointer={pointer} />
      </Canvas>
    </div>
  );
}
